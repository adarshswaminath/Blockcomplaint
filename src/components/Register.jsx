import { Web3Button } from "@thirdweb-dev/react";
import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [complaint, setComplaint] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, mob, complaint);
  };
  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl font-medium">Register Complaint</h1>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              name="name"
              className="w-52 h-12 text-center"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="w-52 h-12 text-center"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="text"
            name="mob"
            className="h-12 text-center"
            value={mob}
            placeholder="Mobile No"
            onChange={(e) => setMob(e.target.value)}
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
            className="bg-white text-black w-20 m-auto px-4 py-2 rounded"
            contractAddress="0xe84223ddA56997b7A665c86972E5D0501Ed1A62B"
            action={(contract) => {
              contract.call("Register", name,email,complaint,mob);
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
