import React, { useState } from "react";
import { ethers } from "ethers";
import { useContract, useContractRead } from "@thirdweb-dev/react";

function Search() {
  const { contract } = useContract(
    "0xe84223ddA56997b7A665c86972E5D0501Ed1A62B"
  );
  const [address, setAddress] = useState("");
  const handleAddress = (e) => setAddress(e.target.value); // user address
  // getting data from the contract
  const { data, isLoading } = useContractRead(contract, "Check", address);


  return (
    <div className="flex flex-col items-center justify-center p-8 m-8">
      <h1 className="text-white text-2xl mb-2">Search</h1>
      <div className="grid grid-cols-1 gap-3 p-8 rounded-lg w-96">
        <input
          type="text"
          className="h-12 p-3"
          placeholder="Address to Search"
          onChange={handleAddress}
        />
      </div>

      <div className="flex-grow py-8 max-w-md">
        {data && (
          <div className="border border-gray-300 rounded-md p-4">
            <p className="mb-2">
              Name: <span className="font-medium">{data[1]}</span>
            </p>
            <p className="mb-2">
              Complaint: <span className="font-medium">{data[3]}</span>
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
              {new Date(parseInt(data[7]._hex) * 1000).toLocaleString()}
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
      </div>
    </div>
  );
}

export default Search;
