import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import AdminNav from '@/components/adminNav'
import { Auth } from 'aws-amplify'
import configaws from '@/utils/config-aws'

const AdminLayout = ({ children }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetchUser().then((user) => {
            setUser(user)
            configaws(user.idToken)
        })
    }, [false])

    const fetchUser = async () => {
        try {
            const user = await Auth.currentSession()
            return user
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                    <div className="col-span-1">
                        <AdminNav />
                    </div>
                    <div className="col-span-4">{children}</div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout
