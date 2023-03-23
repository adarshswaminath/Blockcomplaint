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
        address === '0x154980C4Cb162E231d28fBb45157B634b7eb670F' ? 
            <Dashboard /> : 
            <div>
                <Form/>
            </div>
    )
}

export default Admin
