import { useState, useEffect } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as Icon from 'react-feather'
import queryExperts from '@/utils/queryExperts'
import { Auth } from 'aws-amplify'

const Location = () => {
    const router = useRouter()
    const { id: location } = router.query

    const [loading, setLoading] = useState(false)
    const [experts, setExperts] = useState([])

    useEffect(() => {
        setLoading(true)
        if (location) {
            Auth.currentSession().then((data) => {
                const token = data.getAccessToken().getJwtToken()
                fetchExperts(location, token).then((data) => {
                    if (data.error) {
                        alert('Not authorized to this resource')
                    } else {
                        setExperts(data.data)
                    }
                    setLoading(false)
                })
            })
        }
    }, [location])

    const fetchExperts = async (location, token) => {
        try {
            /**
             * Fetch data from dynamo
             */

            console.log(`fetching data for ${location}...`)
            const experts = await fetch(`/api/admin/list?location=${location.toUpperCase()}`, {
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
            alert('something went wrong getting experts')
        }
    }

    return (
        <AdminLayout>
            <div className="text-3xl font-bold capitalize mb-8">{location} Experts</div>
            {loading && <div>Loading...</div>}
            <Link href={`/admin/experts/new?location=${location}`}>
                <a className="w-64 text-center mb-4 px-6 py-2 bg-gradient-to-b from-green-400 to-green-500 text-white rounded hover:from-green-500 hover:to-green-400 flex flex-row items-center shadow-lg">
                    <Icon.Plus className="mr-2" /> Create New Expert
                </a>
            </Link>
            {!loading && experts && (
                <div className="rounded bg-white overflow-hidden divide-y-2 divide-dashed divide-blue-100 shadow-xl">
                    {experts &&
                        experts.map((item, index) => (
                            <Link
                                key={index}
                                href={`/admin/experts/${item.pk.replace(/#/g, '%23')}?location=${
                                    item.sk
                                }`}
                            >
                                <a className="px-4 py-3 flex justify-between items-center hover:bg-blue-200">
                                    <div>{item.title}</div>
                                    <div>
                                        <div
                                            className={`${
                                                item.gsi1sk.includes('ACTIVE#')
                                                    ? 'bg-green-500 text-green-50'
                                                    : 'bg-red-500 text-red-50'
                                            } rounded-full shadow px-3 text-sm py-1`}
                                        >
                                            {item.gsi1sk.includes('ACTIVE#') ? 'Active' : 'Pending'}
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                </div>
            )}
        </AdminLayout>
    )
}

export default withAuthenticator(Location)
