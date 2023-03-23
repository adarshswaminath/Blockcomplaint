import { Web3Button, useAddress, useContract, useContractRead, ConnectWallet } from "@thirdweb-dev/react"
import React from 'react'
import { ethers } from "ethers"

function Update() {
  const address = useAddress()
  const { contract } = useContract("0xf9144213df6ab9FE7eF79c70033001662AFc997F")
  const { data, isLoading } = useContractRead(contract, 'Search', address)
  let id, complainter, name, email, addr, mobile, wallet, complaint, time, resposnse, response_time, status
  if (data) {
    id = ethers.BigNumber.from(data[0]._hex).toString()
    name = data[1]
    email = data[2]
    addr = data[3]
    mobile = ethers.BigNumber.from(data[4]._hex).toString()
    wallet = data[5]
    complaint = data[6]
    time = new Date(parseInt(data[7]._hex) * 1000).toLocaleString()
    resposnse = data[8]
    response_time = new Date(parseInt(data[9]._hex) * 1000).toLocaleString()
    status = data[10]




    // complainter = data[0];
    // name = data[1];
    // email = data[2];
    // complaint = data[3];
    // mobile = ethers.BigNumber.from(data[4]._hex).toString();
    // time = new Date(parseInt(data[5]._hex) * 1000).toLocaleString();
    // response = data[6];
    // responseTime = new Date(parseInt(data[7]._hex) * 1000).toLocaleString();
    // status = data[8];
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
                  <span className="font-bold mr-2">Id:{" "}</span>
                  {id}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Name:{" "}</span>
                  {name}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Email:{" "}</span>
                  {email}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Mobile:{" "}</span>
                  {mobile}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Complaint:{" "}</span>
                  {complaint}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Time:{" "}</span>
                  {time}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Response:{" "}</span>
                  {resposnse}
                </p>
                <p className="text-white">
                  <span className="font-bold mr-2">Reponse Time:{" "} </span>
                  {response_time}
                </p>
                <p>
                  <span className="text-white font-bold">Status {" "}</span>
                  <span
                    className={`font-medium ${status ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {status ? "Resolved" : "Pending"}
                  </span>
                </p>
              </>
            ) : (
              <p>No data found.</p>
            )}
          </div>
          <Web3Button
            contractAddress="0xf9144213df6ab9FE7eF79c70033001662AFc997F"
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
