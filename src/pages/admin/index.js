import Navbar from '@/components/navbar'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'

const Admin = () => {
    const router = useRouter()

    const handleLogout = () => {
        Auth.signOut()
            .then((data) => {
                router.push('/')
            })
            .catch((err) => {
                alert('something went wrong logging out')
                console.log(err)
            })
    }

    return (
        <div>
            <Navbar />
            <div>Admin Page</div>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    )
}

export default withAuthenticator(Admin)
