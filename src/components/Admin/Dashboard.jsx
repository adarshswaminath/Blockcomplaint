import React, { useState } from "react";
import { Web3Button,useContract,useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

function Dashboard() {
  const { contract } = useContract("0xe84223ddA56997b7A665c86972E5D0501Ed1A62B");

  const [response, setResponse] = useState();
  const [address, setAddress] = useState();

  const handleResponse = (e) => setResponse(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const { data, isLoading } = useContractRead(contract, 'Check', address);
  const handleSubmit = async () => {
    if (data) {
      const { name, email, mob, time, description, status ,response} = {
        name: data[0],
        email: data[1],
        mobile: data[2],
        time: data[3],
        description: data[4],
        status: data[5],
        response: data[6] || "No Response"
      };
    }
  };

  return (
    <main className="container mx-auto py-8 lg:px-32 text-white">
      {data && (
        <section className="bg-primary rounded-lg shadow-md p-8 mb-8 text-center">
            <p className="mb-2">
              Name: <span className="font-medium">{data[0]}</span>
            </p>
            <p className="mb-2">
              Email: <span className="font-medium">{data[1]}</span>
            </p>
            <p className="mb-2">
              Mobile: <span className="font-medium">{ethers.BigNumber.from(data[2]._hex).toString()}</span>
            </p><p className="mb-2">
              Time: <span className="font-medium">{ethers.BigNumber.from(data[3]._hex).toString()}</span>
            </p>
            <p className="mb-2">
              Complaint: <span className="font-medium">{data[4]}</span>
            </p>
            <p className="mb-2">
              Status:   <span
                className={`font-medium ${
                  data[5] ? "text-green-500" : "text-red-500"
                }`}
              >
                {data[5] ? "Resolved" : "Pending"}
              </span>
            </p>
            <p className="mb-2">
              Response: <span className="font-medium">{data[6]}</span>
            </p>
        </section>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white text-xl font-bold">
          <label htmlFor="address" className="block mb-4">
            Address:
          </label>
          <input
            type="text"
            id="address"
            className="w-full h-12 bg-white text-black text-center"
            placeholder="Enter address"
            onChange={handleAddress}
          />
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white text-xl font-bold">
          <label htmlFor="message" className="block mb-4">
            Message:
          </label>
          <input
            type="text"
            id="message"
            className="w-full h-12 bg-white text-black text-center"
            placeholder="Enter message"
            onChange={handleResponse}
          />
        </div>
      </div>

      <Web3Button className="bg-primary rounded-lg shadow-md p-6 mt-8">
        Submit
      </Web3Button>
    </main>
  );
}

export default Dashboard;
