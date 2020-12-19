import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'

const Admin = () => {
    return (
        <AdminLayout>
            <div>Admin Home Screen</div>
        </AdminLayout>
    )
}

export default withAuthenticator(Admin)
