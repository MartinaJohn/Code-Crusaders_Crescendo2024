import React, { useState, useEffect } from 'react';
import GreeterAddress from "../artifacts/addresses/contract-address.json"
import GreeterABI from '../artifacts/contracts/Greeter.sol/Greeter.json'
const ethers = require("ethers")

function Greeter() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [newGreeting, setNewGreeting] = useState('');
 console.log(GreeterAddress)
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      setSigner(provider.getSigner());
    }
  }, []);
 
  useEffect(() => {
    if (provider && signer) {
      const contract = new ethers.Contract(
               GreeterAddress,
               GreeterABI.abi,
               signer
             );
      setContract(contract);
    }
  }, [provider, signer]);
 
  useEffect(() => {
    if (contract) {
      async function fetchGreeting() {
        const greeting = await contract.greet();
        setGreeting(greeting);
      }
 
      fetchGreeting();
    }
  }, [contract]);
 
  const handleSetGreeting = async () => {
    if (contract) {
      const tx = await contract.setGreeting(newGreeting);
      await tx.wait();
      const greeting = await contract.greet();
      setGreeting(greeting);
    }
  };
 
  return (
    <div>
      <h1>{greeting}</h1>
      <input
        type="text"
        value={newGreeting}
        onChange={(e) => setNewGreeting(e.target.value)}
      />
      <button onClick={handleSetGreeting}>Set Greeting</button>
    </div>
  );
 }
 

export default Greeter;
