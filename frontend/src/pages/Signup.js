import React, { useState } from "react";
import { Link } from "react-router-dom";

import contractaddress from "../artifacts/addresses/contract-address.json"
import { Form, Input, Button, Card, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import Navbar from "../components/Navbar"
const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi
const { ethers } = require("ethers");
const { Option } = Select;

const Signup = () => {
  const [registered, setRegistered] = useState(false);

  const [form] = Form.useForm(); // Create a form instance
  const contractAddress = contractaddress
    console.log(contractAddress)
    const contractABI=abi
    console.log(abi)
  const handleSignup = async (values) => {
    try {
      if (typeof window.ethereum === 'undefined') {
        // MetaMask is not installed or not accessible
        alert("Please install and unlock MetaMask to use this application.");
        return;
      }

      // Connect to the MetaMask provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider)
      // Request account access from the user
      await provider.send("eth_requestAccounts", []);

      // Get the signer
      const signer = provider.getSigner();
      console.log(signer)
      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      if (values.role === "manufacturer") {
        await contract.registerManufacturer(values.email, values.password);
      } 
      else if (values.role === "safetyofficer") {
        await contract.registerSafetyOfficer(values.email, values.password);
      }
      else if(values.role==="analyst"){
        await contract.registerAnalyst(values.email,values.password)
      } 
      else if(values.role==="safetycommissioner"){
        await contract.registerCommissioner(values.email,values.password)
      }
      else {
        alert("Invalid role");
        return;
      }

      setRegistered(true);
	  alert("success")
    } catch (error) {
      console.error(error);
      alert("An error occurred during signup");
    }
  };

  const handleReset = () => {
    form.resetFields();
    setRegistered(false);
  };

  return (
    <div>
      {/* <Navbar/> */}
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-2xl shadow-lg">
        {registered ? (
          <div>
            <h2>Registration Successful!</h2>
            <p>
              Please proceed to the <Link to="/signin">Signin Page</Link> to log in.
            </p>
            <Button type="primary" onClick={handleReset}>
              Register Another User
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center">
          <img
            src="https://img.freepik.com/free-vector/online-world-concept-illustration_114360-2212.jpg?w=740&t=st=1708364698~exp=1708365298~hmac=748dfd68ac4777e77d03af6f5e2f57bf3c111f17b0cf73d34c39581e9dfafed7"
            alt="Privacy policy concept illustration"
            className="object-cover rounded-lg w-3/6 h-full"
          />
            <div className="w-2/3 p-4">
            <h2 className="text-2xl font-bold mb-4" >User Signup</h2>
            <Form form={form} onFinish={handleSignup} className="space-y-4">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" className="w-full" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" className="w-full" />
              </Form.Item>
              <Form.Item
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select placeholder="Select Role" className="w-full">
                  <Option value="manufacturer">Food manufacturer</Option>
                  <Option value="analyst">Food Analyst</Option>
                  <Option value="safetyofficer">Food Safety Officer</Option>
                  <Option value="safetycommissioner">Food Safety commissioner</Option>


                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit"  className="w-full bg-blue-700">
                  Signup
                </Button>
              </Form.Item>
            </Form>
            </div>
          </div>
        )}
      </Card>
    </div>
    </div>
  );
};

export default Signup;