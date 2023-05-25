import React from 'react'
import { ConnectWallet, useAddress ,useContract, useContractRead} from '@thirdweb-dev/react'
import Dashboard from './Admin/Dashboard'

const Form = () => {
    return (
        <div>
            <div className="h-screen flex items-center justify-center">
                <div className="p-8">
                <ConnectWallet/>
                </div>
            </div>
        </div>
    )
}

const Admin = () => {
    // get contract owner
    const { contract } = useContract("0xB5CEa5e135651a152729e706a3D1274C1518e8bf");
    const { data, isLoading } = useContractRead(contract, "owner")
    // get wallet address
    const address = useAddress()

    return (
        address === data ? 
            <Dashboard/> : 
            <div>
                <Form/>
            </div>
    )
}

export default Admin
