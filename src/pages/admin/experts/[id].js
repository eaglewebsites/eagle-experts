import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'

const Expert = () => {
    return (
        <AdminLayout>
            <div>Expert admin</div>
        </AdminLayout>
    )
}

export default withAuthenticator(Expert)
