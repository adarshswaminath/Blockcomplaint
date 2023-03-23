import React, { useState } from 'react'
import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react"
import { ethers } from 'ethers'

function Dashboard() {
  const { contract } = useContract("0xf9144213df6ab9FE7eF79c70033001662AFc997F")
  const [id, setID] = useState()
  const [response, setResponse] = useState('')
  const [count, setCount] = useState(0)



  return (
    <div className='p-3 text-center'>
      <div className="flex :grid sm:grid-cols-3 gap3 ">
      <div className="card w-80 bg-blue-600 text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Total Complaints</h2>
          <p>{ethers.BigNumber.from(count).toString()}</p>
          <div className="card-actions justify-end">
            <Web3Button
              contractAddress='0xf9144213df6ab9FE7eF79c70033001662AFc997F'
              action={async (contract) => setCount(await contract.call('TotalCompalints'))}
              useContract={useContract} className='btn'
            >Total</Web3Button>
          </div>
        </div>
      </div>
   
      </div>
      <div className="form p-6 bg-green-400 m-2 grid items-center ">
        <h2 className="text-white">Response</h2>
        <input type="text" className='p-2 mb-2 text-center' placeholder='Complaint ID'
          onChange={(e) => setID(e.target.value)}
        />
        <textarea id="" cols="30" rows="10" placeholder='Response' className='mb-2 text-center'
          onChange={(e) => setResponse(e.target.value)}
        ></textarea>
        <Web3Button
          contractAddress='0xf9144213df6ab9FE7eF79c70033001662AFc997F'
          action={(contract) => {
            contract.call("Respond", id, response)
          }}
        >Submit</Web3Button>
      </div>

    </div>
  )
}

export default Dashboard
