import { Web3Button } from '@thirdweb-dev/react'
import React from 'react'

function Update() {
  return (
    <div>
      <div className="place-items-center p-12 m-12  rounded-lg">
      <h1 className="text-white text-2xl text-center mb-6">Update Status</h1>
        <Web3Button>Submit</Web3Button>
      </div>
    </div>
  )
}

export default Update