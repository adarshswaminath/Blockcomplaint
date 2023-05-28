import React,{useState} from 'react'
import {Web3Button} from "@thirdweb-dev/react"
import { MdClose } from "react-icons/md";


function Ownership() {
    const [newOwner,setNewOwner] = useState()
    const [owner,setOwner] = useState()
    

  return (
    <div>
        <div className="text-center justify-center">
            {/* form */}
            <form className="bg-gray-200 border-gray-600 border-b-4 border-r-4  p-8 border  m-auto w-96 rounded-lg">
               <div className="grid grid-cols-1">
               <MdClose onClick={() => setOwnerShip(false)}/>
               <span className='font-semibold'>Using This Function Too Risky</span>
               </div>
                <div className='mt-2'>
                    <input type="text" className='text-center' placeholder='Owner Address' required/>
                    <input type="text" className='mt-2 mb-3 text-center' placeholder='New Owner Address'required/>
                    <Web3Button>Submit</Web3Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Ownership