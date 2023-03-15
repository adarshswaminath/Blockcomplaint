import React from 'react'
import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
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
    const address = useAddress()

    return (
        address === '0x4203446B84F9a7f224f8BEf1191Ce5519f1Cf531' ? 
            <Dashboard /> : 
            <div>
                <Form/>
            </div>
    )
}

export default Admin
