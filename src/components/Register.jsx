import { Web3Button } from "@thirdweb-dev/react";
import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address,setAddress] = useState("")
  const [complaint, setComplaint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, mobile, complaint);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="p-8 bg-gray-300 grid justify-center items-center gap-3">
          <div>
            <h1 className="text-2xl mb-2 text-center">Register Complaint</h1>
          </div>
          <div className="grid lg:flex gap-3">
            <input
              type="text"
              name="name"
              className="p-3 text-center rounded-lg"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="p-3 text-center rounded-lg"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="text"
            name="address"
            className="p-6 text-center rounded-lg"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            name="mob"
            className="p-3 text-center rounded-lg"
            value={mobile}
            placeholder="Mobile No"
            onChange={(e) => setMobile(e.target.value)}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="text-center"
            value={complaint}
            placeholder="Complaint"
            onChange={(e) => setComplaint(e.target.value)}
          ></textarea>
          <Web3Button
            className="w-20 m-auto px-4 py-2 rounded"
            contractAddress="0xB5CEa5e135651a152729e706a3D1274C1518e8bf"
            action={(contract) => {
              contract.call("Register", name,email,address,mobile,complaint);
            }}
          >
            Submit
          </Web3Button>
        </form>
      </div>
    </div>
  );
}

export default Register;
