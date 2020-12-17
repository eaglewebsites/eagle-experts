import { useState, useEffect } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as Icon from 'react-feather'

const Location = () => {
    const router = useRouter()
    const { id: location } = router.query

    const [loading, setLoading] = useState(false)
    const [experts, setExperts] = useState([])

    useEffect(() => {
        setLoading(true)
        if (location) {
            fetchExperts(location).then((data) => {
                setLoading(false)
                setExperts(data)
            })
        }
    }, [location])

    const fetchExperts = async (location) => {
        try {
            /**
             * Fetch data from dynamo
             */
            console.log(`fetching data for ${location}...`)
            return [
                {
                    title: 'Elite Academy of Martial Arts',
                    active: true,
                    id: '1234',
                },
                {
                    title: 'dfsa fsad fas fasasf',
                    active: true,
                    id: '123423234',
                },
                {
                    title: 'TEStsetest',
                    active: false,
                    id: '123423333234',
                },
            ]
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
                    {experts.map((item) => (
                        <Link key={item.id} href={`/admin/experts/${item.id}`}>
                            <a className="px-4 py-3 flex justify-between items-center hover:bg-blue-200">
                                <div>{item.title}</div>
                                <div>
                                    <div
                                        className={`${
                                            item.active
                                                ? 'bg-green-500 text-green-50'
                                                : 'bg-red-500 text-red-50'
                                        } rounded-full shadow px-3 text-sm py-1`}
                                    >
                                        {item.active ? 'Active' : 'Pending'}
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
