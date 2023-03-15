import React, { useState } from 'react';
import { ethers } from "ethers";
import { useContract, useContractRead } from '@thirdweb-dev/react';

function Search() {
  const { contract } = useContract("0x90dF5D02fe5e879f0ffbA22Be0D80506869C5f7F");
  const [address, setAddress] = useState('');
  const handleAddress = (e) => setAddress(e.target.value); // user address
  // getting data from the contract
  const { data, isLoading } = useContractRead(contract, 'Read', address);
  const handleSubmit = async () => {
    if (data) {
      const { name, email, mob, time, description, status ,response} = {
        name: data[0],
        time: data[3],
        description: data[4],
        status: data[5],
        response: data[6] || "No Response"
      };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 m-8">
      <h1 className="text-white text-2xl mb-2">Search</h1>
      <div className="grid grid-cols-1 gap-3 p-8 rounded-lg w-96">
        <input type="text" className="h-12 p-3" placeholder="Address to Search" onChange={handleAddress} />
      </div>

      <div className="flex-grow py-8 max-w-md">
        {data && (
          <div className="border border-gray-300 rounded-md p-4">
            <p className="mb-2">
              Name: <span className="font-medium">{data[0]}</span>
            </p>
            <p className="mb-2">
              Time Stamp:{" "}
              <span className="font-medium">
                {ethers.BigNumber.from(data[3]._hex).toString()}
              </span>
            </p>
            <p className="mb-2">
              Description:{" "}
              <span className="font-medium">{data[4]}</span>
            </p>
            <p>
              Status:{" "}
              <span
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
