import React, { useState } from "react";
import { create } from "ipfs-http-client";
window.Buffer = window.Buffer || require("buffer").Buffer;
const projectId = "2OFpkjdSKUiJCRJfbI9QRZRICV8";
const projectSecret = "6eeb6d7bf188824bfb895b953c98ae08";

const auth =
  "Basic" +
  " " +
  Buffer.from(projectId + ":" + projectSecret).toString("base64");

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);
  const [link, setLink] = useState(null);

  const ipfsClient = async () => {
    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      apiPath: "/api/v0",
      headers: {
        authorization: auth,
      },
    });
    return ipfs;
  };

  const uploadFile = async () => {
    let ipfs = await ipfsClient();
    const result = await ipfs.add(file);
    console.log(result);
    setHash(result.path);
    setLink("https://educhain.infura-ipfs.io/ipfs/" + result.path);
  };

  const getPdf = async () => {
    let ipfs = await ipfsClient();
    const chunks = [];
    for await (const chunk of ipfs.cat(hash)) {
      chunks.push(chunk);
    }

    const data = Buffer.concat(chunks);
    const fileName = `${hash}.pdf`;

    const file = new File([data], fileName, {
      type: "application/pdf",
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
      <br />
      {hash && (
        <p>
          File uploaded with hash:
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </p>
      )}

      {hash && <p>Hash: {hash}</p>}
      <br />
      <button onClick={getPdf}>Get</button>
    </div>
  );
};

export default FileUpload;