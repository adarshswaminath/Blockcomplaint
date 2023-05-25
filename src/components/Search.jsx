import React, { useState } from "react";
import { ethers } from "ethers";
import { useContract, useContractRead } from "@thirdweb-dev/react";

function Search() {
  const { contract } = useContract(
    "0xB5CEa5e135651a152729e706a3D1274C1518e8bf"
  );
  const [address, setAddress] = useState("");
  const handleAddress = (e) => setAddress(e.target.value); // user address
  // getting data from the contract
  const { data, isLoading } = useContractRead(contract, "Search", address);


  return (
    <div className="flex flex-col items-center justify-center p-8 m-8">
      <h1 className="text-3xl">Search</h1>
      <div className="grid grid-cols-1 gap-3 p-8 rounded-lg w-96">
        <input
          type="text"
          className="h-12 p-4 border border-black rounded-lg"
          placeholder="Address to Search"
          onChange={handleAddress}
        />
      </div>

      <div className="flex-grow  max-w-md">
        {data && (
          <div className="border border-gray-600 rounded-md p-4">
            <p className="mb-2">
              Id : {ethers.BigNumber.from(data[0]._hex).toString()}
            </p>
            <p className="mb-2">
              Complaint: {data[6]}
            </p>
            <p className="mb-2">
              Time Stamp:{" "}
              <span className="font-medium">
              {new Date(parseInt(data[7]._hex) * 1000).toLocaleString()}
              </span>
            </p>
            <p className="mb-2">
              Response:
              <span className={`font-medium ${data[8] ? "": "text-red-500"}`}>
                {data[8] ? data[8] : "No Response"}
              </span>
            </p>
            <p className="mb-2">
              Response Time:{" "}
              <span className="font-medium">
              { new Date(parseInt(data[9]._hex) * 1000).toLocaleString() }
              </span>
            </p>
            <p>
              Status:{" "}
              <span
                className={`font-medium ${
                  data[10] ? "text-green-500" : "text-red-500"
                }`}
              >
                {data[10] ? "Resolved" : "Pending"}
              </span>
            </p>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
