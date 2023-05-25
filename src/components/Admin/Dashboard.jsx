import React, { useState, useEffect } from 'react'
import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react"
import { ethers } from 'ethers'
import { MdClose } from "react-icons/md"

function Dashboard() {
  const { contract } = useContract("0xB5CEa5e135651a152729e706a3D1274C1518e8bf") // Contract address 
  const [complaintId, setComplaintId] = useState() // Get complaint id from admin
  const [showResponse, setShowResponse] = useState(false) // Toggle responding window
  const [totalStatusUpdate,setStatusUpdate] = useState(0) // Total no.of complaint status updated
  const [lastResponseId,setLastResponseId] = useState(0)
  // @admin complaints count
  const [count, setCount] = useState(0) // Total complaint count
  // function to get total complaint registered
  const handleCount = async (contract) => setCount(await contract.call('TotalCompalints'))
  // handle responsedashboard
  // total complaints update status
  const handleTotalStatus = async (contract) => setStatusUpdate(await contract.call("TotalStatusUpdate"))
  const handleLastResponse = async (contract) => setLastResponseId(await contract.call("LastRespondedComplaint")) 
  useEffect(() => {
    handleCount(contract)
  }, [])

  // compoent for respond to complaint
  function Respond() {
    // @admin complaint id
    const [complaintId, setComplaintId] = useState()
    const handleSubmitId = (event) => setComplaintId(event.target.value)
    console.log(complaintId)
    // @admin response to the complaint
    const [response, setResponse] = useState()
    const handleSubmitResponse = (event) => setResponse(event.target.value)
    console.log(response)
    // read data from the contract
    const { data, isLoading } = useContractRead(contract, "getComplaint", complaintId)
    // <-------- @front-end --------->
    return (
      <div className='p-3'>
        <button className="font-bold py-2 px-4 rounded mb-1" onClick={() => setShowResponse(false)}>
          <MdClose className=" text-gray-400 text-xl" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="shadow-lg p-6 rounded-lg text-center justify-center items-center border-2 border-gray-600">
            <div className="mb-4">
              <input type="text" className="p-3 rounded-lg text-center border border-gray-600" placeholder="ID" onChange={handleSubmitId} />
            </div>
            <div className="mb-4">
              <textarea name="" id="" cols="30" rows="10"
                onChange={handleSubmitResponse} className="text-center rounded-lg border border-gray-600" placeholder='Response'
              ></textarea>
            </div>
            <div className='w-1/3 m-auto'>
              <Web3Button
                className="bg-white font-bold hover:shadow-lg hover:text-white p-3 rounded-lg shadow-md text-blue-400 transition duration-300"
                contractAddress="0xB5CEa5e135651a152729e706a3D1274C1518e8bf"
                action={(contract) => {
                  contract.call("Respond", complaintId, response);
                }}>
                Respond
              </Web3Button>
            </div>
          </div>

          {data && (
            <div className="p-6 rounded-lg shadow-md border-2 border-gray-600">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="mb-2 font-semibold text-sm uppercase">Complaint ID</p>
                  <p className="text-2xl font-bold text-blue-500">{ethers.BigNumber.from(data[0]._hex).toString()}</p>
                </div>
                <div className="text-center">
                  <p className="mb-2 font-semibold text-sm uppercase">Complaint Status</p>
                  <p className={`text-2xl font-bold ${data[10] ? "text-green-500" : "text-red-600"}`}>
                    {data[10] ? "Resolved" : "Pending"}
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-semibold text-gray-500 text-sm uppercase">Complaint</p>
                  <p className="text-lg">{data[6]}</p>
                </div>
                <div>
                  <p className="mb-2 font-semibold text-gray-500  text-sm uppercase">Response</p>
                  <p className="text-lg">{data[8] ? data[8] : "No response yet"}</p>
                </div>
                <div>
                  <p className="mb-2 font-semibold text-gray-500  text-sm uppercase">Complainant Information</p>
                  <p className="text-lg">{data[1]}</p>
                  <p className="text-lg">{data[2]}</p>
                  <p className="text-lg">{data[3]}</p>
                  <p className="text-lg">{ethers.BigNumber.from(data[4]._hex).toString()}</p>
                </div>
                <div>
                  <p className="mb-2 font-semibold text-gray-500 text-sm uppercase">Complaint Details</p>
                  <p className="text-lg">Complaint Time: {new Date(parseInt(data[7]._hex) * 1000).toLocaleString()}</p>
                  <p className="text-lg">
                    Response Time: {data[9] ? new Date(parseInt(data[9]._hex) * 1000).toLocaleString() : "No response yet"}
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-semibold text-gray-500  text-sm uppercase">Wallet</p>
                  <p className="text-lg">{data[5]}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="heading p-4">
        <h1 className="title text-xl lg:text-3xl">Hi admin,</h1>
        <h1 className="text-2xl lg:text-6xl font-semibold">
          Welcome Back 👋
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-white p-4">
        {/* div flex the card */}
        <div className="flex gap-3">
          {/* card 1 */}
          <div className="card flex-1 p-8 rounded-lg bg-gray-700 text-center">
            <span className="text-4xl mb-2 font-bold">
              {ethers.BigNumber.from(count).toString()}
            </span>
            <button onClick={() => handleCount(contract)}>
               Total Complaints
            </button>
          </div>
          {/* card 2 */}
          <div className="card flex-1 text-center p-8 rounded-lg bg-gray-700">
            <span className="text-4xl mb-2 font-bold">
              {ethers.BigNumber.from(lastResponseId).toString()}
            </span>
            <button onClick={() => handleLastResponse(contract)}> Last Responded Complaint ID</button>
          </div>
        </div>
        {/* close flex div */}
        {/* second flex start */}
        <div className="flex gap-3">
          {/* card 3 */}
          <div className="card flex-1 text-center p-8 rounded-lg bg-gray-700">
            <button
              className="font-semibold m-8"
              onClick={() => setShowResponse(true)}
            >
              Respond
            </button>
          </div>
          {/* card 4  */}
          {/* bg-gradient-to-tl from-cyan-400 to-indigo-500 */}
          <div className="card flex-1 text-center p-8 rounded-lg bg-gray-700">
            <span className='font-bold text-4xl'>{ethers.BigNumber.from(totalStatusUpdate).toString()} </span>
            <button onClick={() => handleTotalStatus(contract)}>Status Updated Complaints</button>
          </div>
        </div>
        {/* second flex div close */}
      </div>
      {showResponse && <Respond />}
    </div>

  )
}


export default Dashboard
