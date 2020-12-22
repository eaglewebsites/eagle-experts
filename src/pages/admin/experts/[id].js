import { useEffect, useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'
import getExpert from '@/utils/getExpert'
import { useRouter } from 'next/router'

const Expert = () => {
    const router = useRouter()
    const { id } = router.query
    const [expert, setExpert] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (id) {
            getExpert(decodeURI(id), process.env.NEXT_PUBLIC_SITE).then((data) => {
                console.log(data)
                if (data.error) {
                    setError(true)
                }
                setExpert(data.response)
                setLoading(false)
            })
        }
    }, [id])

    if (error) {
        return <div>Something went wrong getting expert</div>
    }

    return (
        <AdminLayout>
            {loading && <div>Loading...</div>}
            {!loading && <div>Expert: {expert.title}</div>}
        </AdminLayout>
    )
}

export default withAuthenticator(Expert)
