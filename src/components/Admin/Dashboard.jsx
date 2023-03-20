import React, { useState } from "react";
import { ConnectWallet,useAddress,useContract,useContractRead,Web3Button,} from "@thirdweb-dev/react";
import { ethers } from "ethers";

function Dashboard() {


  const { contract } = useContract("0xe84223ddA56997b7A665c86972E5D0501Ed1A62B");
  const [response, setResponse] = useState();
  const [address, setAddress] = useState();

  const {data} = useContractRead(contract,"Check",address)
  const {complaintAddress,isLoading } = useContractRead(contract,"ComplaintAddress")
  console.log(complaintAddress)


  const handleResponse = (e) => setResponse(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);

  return (
    <main className="container mx-auto py-8 lg:px-32 text-white">
        <section className="bg-primary rounded-lg shadow-md p-8 mb-8 text-center">
        {data && (
          <div className="border border-gray-300 rounded-md p-4">
            <p className="mb-2">
              Address: <span className="font-medium">{data[0]}</span>
            </p>
            <p className="mb-2">
              Name: <span className="font-medium">{data[1]}</span>
            </p>
            <p className="mb-2">
              Email: <span className="font-medium">{data[2]}</span>
            </p>
            <p className="mb-2">
              Complaint: <span className="font-medium">{data[3]}</span>
            </p>
            <p className="mb-2">
              Mobile: <span className="font-medium">{ethers.BigNumber.from(data[4]._hex).toString()}</span>
            </p>
            <p className="mb-2">
              Time Stamp:{" "}
              <span className="font-medium">
              {new Date(parseInt(data[5]._hex) * 1000).toLocaleString()}
              </span>
            </p>
            <p className="mb-2">
              Response:
              <span className={`font-medium ${data[6] ? "": "text-red-500"}`}>
                {data[6] ? data[6] : "No Response"}
              </span>
            </p>
            <p className="mb-2">
              Response Time:{" "}
              <span className="font-medium">
              {data[7]._hex !== "1/1/1970, 5:30:00 am"
            ? new Date(parseInt(data[7]._hex) * 1000).toLocaleString()
            : "No Response"}
              </span>
            </p>
            <p>
              Status:{" "}
              <span
                className={`font-medium ${
                  data[8] ? "text-green-500" : "text-red-500"
                }`}
              >
                {data[8] ? "Resolved" : "Pending"}
              </span>
            </p>
          </div>
        )}
        </section>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-3">
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

      <Web3Button
      contractAddress="0xe84223ddA56997b7A665c86972E5D0501Ed1A62B"
      action={(contract) => {
        contract.call("Respond", address, response)
      }}
    >
      Respond
    </Web3Button>
    </main>
  );
}

export default Dashboard;
