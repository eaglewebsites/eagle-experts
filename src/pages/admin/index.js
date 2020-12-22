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
            <div>Experts Admin</div>
        </AdminLayout>
    )
}

export default withAuthenticator(Admin)
