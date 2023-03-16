import { Web3Button, useAddress, useContract, useContractRead, ConnectWallet } from "@thirdweb-dev/react"
import React from 'react'
import { ethers } from "ethers"

function Update() {
  const address = useAddress()
  const { contract } = useContract("0xe84223ddA56997b7A665c86972E5D0501Ed1A62B")
  const { data, isLoading } = useContractRead(contract, 'Check', address)
  let complainter,name, email, complaint,mobile, time, response,responseTime,status;
  if (data) {
    complainter = data[0];
    name = data[1];
    email = data[2];
    complaint = data[3];
    mobile = ethers.BigNumber.from(data[4]._hex).toString();
    time = new Date(parseInt(data[5]._hex) * 1000).toLocaleString();
    response = data[6];
    responseTime = new Date(parseInt(data[7]._hex) * 1000).toLocaleString();
    status = data[8];
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white">Update Status</h1>
          <ConnectWallet />
        </div>
        <div className="bg-slate-700 rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : data ? (
              <>
                <p className="text-white">
                  <span className="font-bold mr-2">Address:</span>
                  {complainter}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Name:</span>
                  {name}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Email:</span>
                  {email}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Mobile No:</span>
                  {mobile}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Complaint:</span>
                  {complaint}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Complaint Registered:</span>
                  {time}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Response:</span>
                  {response}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Responsed Time:</span>
                  {responseTime}
                </p>
               
                <p className="text-white">
                  <span className="font-bold mr-2">Status:</span>
                  <span className={status ? 'text-green-500' : 'text-red-500'}>
                    {status ? 'Resolved' : 'Pending'}
                  </span>
                </p>
              </>
            ) : (
              <p>No data found.</p>
            )}
          </div>
          <Web3Button
            contractAddress="0xe84223ddA56997b7A665c86972E5D0501Ed1A62B"
            action={(contract) => {
              contract.call('UpdateStatus')
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update
          </Web3Button>
        </div>
      </div>
    </div>
  )
}

export default Update
