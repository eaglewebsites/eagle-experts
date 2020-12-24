import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'
import { Auth } from 'aws-amplify'
import { useState, useEffect } from 'react'

const Admin = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        Auth.currentSession().then((data) => setUser(data))
    }, [])

    return (
        <AdminLayout>
            <div>
                <div className="text-xl font-bold">Eagle Experts Admin</div>
                <p className="text-gray-700 pb-5">
                    Manage the businesses that are part of Eagle Experts across all regions.
                </p>
                <p className="text-gray-700">
                    Click on the market you want to manage to the left. Each expert can only be
                    assigned one market. If you have a business that needs to be in two separate
                    markets, you will need to duplicate data.
                </p>
            </div>
        </AdminLayout>
    )
}

export default withAuthenticator(Admin)
