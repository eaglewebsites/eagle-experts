import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as Icon from 'react-feather'

const AdminNav = () => {
    const router = useRouter()
    const links = [
        {
            title: 'Dashboard',
            link: '/admin',
            icon: <Icon.Home />,
        },
        {
            title: 'JC / Manhattan',
            link: '/admin/location/jc',
            icon: <Icon.MapPin />,
        },
        {
            title: 'Hays',
            link: '/admin/location/hays',
            icon: <Icon.MapPin />,
        },
    ]

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
        <>
            <div className="grid grid-cols-1 gap-2">
                {links.map((item, index) => (
                    <Link href={item.link} key={index}>
                        <a
                            className={`flex flex-row items-center text-gray-800 hover:text-blue-600 pb-4`}
                        >
                            <div className="w-6 h-6 mr-2 text-gray-500">{item.icon}</div>
                            <div>{item.title}</div>
                        </a>
                    </Link>
                ))}
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-transparent via-blue-300 mt-4 mb-8 rounded-full"></div>
            <div>
                <button
                    onClick={() => handleLogout()}
                    className="flex flex-row items-center text-gray-800"
                >
                    <div className="w-6 h-6 mr-2 text-gray-500">
                        <Icon.LogOut />
                    </div>
                    <div>Logout</div>
                </button>
            </div>
        </>
    )
}

export default AdminNav
