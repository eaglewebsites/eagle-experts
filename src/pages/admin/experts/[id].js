import { useEffect, useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'
import getExpert from '@/utils/getExpert'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'

const Expert = () => {
    const router = useRouter()
    const { id, location } = router.query
    const [expert, setExpert] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (id && location) {
            Auth.currentSession().then((data) => {
                const token = data.getAccessToken().getJwtToken()
                fetchExpert(token).then((data) => {
                    if (data.error) {
                        console.log(data)
                        setError(true)
                    } else {
                        setExpert(data.data)
                    }
                    setLoading(false)
                })
            })
        }
    }, [id])

    const fetchExpert = async (token) => {
        try {
            console.log(router.query.id)
            const url = `/api/admin/get?id=${id.replace(
                /#/g,
                '%23'
            )}&location=${location.toUpperCase()}`
            console.log(`fetch this fucking thign...`)
            console.log(url)
            const experts = await fetch(url, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                return response.json()
            })
            return experts
        } catch (err) {
            console.log(err)
            alert('something went wrong')
        }
    }

    if (error) {
        return <div>Something went wrong getting expert</div>
    }

    return (
        <AdminLayout>
            {loading && <div>Loading...</div>}
            {!loading && <div>Expert: {JSON.stringify(expert)}</div>}
        </AdminLayout>
    )
}

export default withAuthenticator(Expert)
