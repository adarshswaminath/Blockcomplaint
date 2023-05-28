import { Web3Button, useAddress, useContract, useContractRead, ConnectWallet } from "@thirdweb-dev/react"
import React from 'react'
import { ethers } from "ethers"

function Update() {
  const address = useAddress()
  const { contract } = useContract("0xB5CEa5e135651a152729e706a3D1274C1518e8bf")
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
          <h1 className="text-3xl text-gray-800 font-bold">Update Status</h1>
          <ConnectWallet />
        </div>
        <div className="rounded-lg shadow-lg p-6 mb-8 border border-gray-600 border-b-4 border-r-4">
          <div className="mb-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : data ? (
              <>
                <p className="">
                  <span className="font-bold mr-2">Id:{" "}</span>
                  {id}
                </p>
                <p className="">
                  <span className="font-bold mr-2">Name:{" "}</span>
                  {name}
                </p>
                <p className="">
                  <span className="font-bold mr-2">Email:{" "}</span>
                  {email}
                </p>
                <p className="">
                  <span className="font-bold mr-2">Mobile:{" "}</span>
                  {mobile}
                </p>
                <p className="">
                  <span className="font-bold mr-2">Complaint:{" "}</span>
                  {complaint}
                </p>
                <p className="">
                  <span className="font-bold mr-2">Time:{" "}</span>
                  {time}
                </p>
                <p className="">
                  <span className="font-bold mr-2">Response:{" "}</span>
                  {resposnse}
                </p>
                <p className="">
                  <span className="font-bold mr-2">Reponse Time:{" "} </span>
                  {response_time}
                </p>
                <p>
                  <span className="font-bold">Status {" "}</span>
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
            contractAddress="0xB5CEa5e135651a152729e706a3D1274C1518e8bf"
            action={(contract) => {
              contract.call('UpdateStatus')
            }}
            className=" py-2 px-4 rounded"
          >
            Update
          </Web3Button>
        </div>
      </div>
    </div>
  )
}

export default Update
