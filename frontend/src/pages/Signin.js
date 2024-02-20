import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

import contractaddress from "../artifacts/addresses/contract-address.json"
// import Navbar from "../components/Navbar";
const { ethers } = require("ethers");
const abi=require('../artifacts/contracts/Crusader.sol/Crusader.json').abi
const Signin = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const contractAddress = contractaddress;
  const contractABI = abi;

  const handleLogin = async (values) => {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install and unlock MetaMask to use this application.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      let manufacturer, analyst, safetyofficer, safetycommissioner;
      try {
        console.log("working");
        manufacturer = await contract.manufacturers(address);
        console.log(manufacturer.username);
      } catch (error) {
        console.error("Error calling researchers function: ", error);
      }
      try {
        console.log("working");

			analyst = await contract.analysts(address);
            console.log(analyst.username)
		  } catch (error) {
			console.error("Error calling funders function: ", error);
		  }
          try{
            safetyofficer=await contract.safetyofficers(address)
            console.log(safetyofficer.username)
          }
          
          catch(error){
			console.error("Error calling funders function: ", error);

          }
          try{
            safetycommissioner=await contract.safetycommissioners(address)
          }
          catch(error){
            console.error("Error calling funders function: ",error)
          }

    
		  if (manufacturer.username === values.email && manufacturer.password === values.password) {
      
			setRole("manufacturer");
			toast.success("Login successful!")
			setTimeout(() => {
				navigate("/manufacturer");
			}, 1200); 
			  
		  } else if (analyst && analyst.username === values.email && analyst.password === values.password) {
			setRole("analyst");
			setTimeout(() => {
				navigate("/analyst");
			}, 1200);
		  }
         
          else if(safetycommissioner && safetycommissioner.username===values.email && safetycommissioner.password===values.password){
            setRole("safetycommissioner")
			setTimeout(() => {
				navigate("/safetycommissioner")
			}, 1200);
          }
          else if(safetyofficer && safetyofficer.username===values.email && safetyofficer.password===values.password){
            setRole("safetyofficer")
			setTimeout(() => {
				navigate("/safetyofficer")
			}, 1200);
          }
           else {
			toast.error("Login Failed!")
		  }
		} catch (error) {
		  console.error(error);
		  toast.error("An error occurred during login");
		}
	  };

  return(
	<div>
	<Toaster/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-lg shadow-lg">
        <div className="flex justify-center items-center">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?size=626&ext=jpg&ga=GA1.1.900017827.1707918895&semt=sph"
            alt="Privacy policy concept illustration"
            className="object-cover rounded-lg w-3/6 h-full"
          />
          <div className="w-2/3 p-4">
            <h2 className="text-2xl font-bold mb-4">Login Here</h2>
            <Form
              onFinish={handleLogin}
              initialValues={{ remember: true }}
              className="space-y-4"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email"
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  className="w-full"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-700"
                >
                  Login
                </Button>
              </Form.Item>
              <div className="text-center">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-700 font-semibold">
                  Sign Up
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Card>
    </div>
		
	</div>
  );
};

export default Signin;
