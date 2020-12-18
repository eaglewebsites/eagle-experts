import { useState, useEffect } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import AdminLayout from '@/components/adminLayout'

const Admin = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetchUser().then((user) => setUser(user))
    }, [])

    const fetchUser = async () => {
        try {
            const user = await Auth.currentSession()
            return user
        } catch (err) {
            console.log(err)
        }
    }

    const sendTest = () => {
        const url = '/api/create'
        var bearer = 'Bearer ' + user.idToken.jwtToken
        fetch(url, {
            method: 'GET',
            withCredentials: true,
            credentials: 'include',
            headers: {
                Authorization: bearer,
                'Content-Type': 'application/json',
            },
        })
            .then((responseJSON) => {
                return responseJSON.json()
            })
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    return (
        <AdminLayout>
            <div>Admin Home Screen</div>
            <button onClick={() => sendTest()}>Send request</button>
            <div>{user && JSON.stringify(user)}</div>
        </AdminLayout>
    )
}

export default withAuthenticator(Admin)
