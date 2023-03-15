import { React, useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [complaint, setComplaint] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleMobile = (e) => setMobile(e.target.value);
  const handleComplaint = (e) => setComplaint(e.target.value);

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="grid gap-3">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="input input-bordered"
            placeholder="Name"
            onChange={handleName}
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Email"
            onClick={handleEmail}
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Mobile Number"
            onClick={handleMobile}
          />
          <textarea
            className="textarea input-bordered"
            cols="30"
            rows="10"
            placeholder="Complaint"
            onClick={handleComplaint}
          />
          <Web3Button>
            Submit
          </Web3Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
