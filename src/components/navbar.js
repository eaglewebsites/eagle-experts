import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
    const [isMenuVisible, setMenuVisibility] = useState(false)
    const [links, setLinks] = useState([
        {
            title: 'Home',
            icon: '🏡',
            url: '/',
            target: '_self',
        },
        {
            title: 'Advertise with us',
            icon: '📝',
            url: '/advertise',
            target: '_self',
        },
        {
            title: 'Post Site',
            icon: '🗞',
            url: '',
            target: '_blank',
        },
    ])

    return (
        <>
            <div className="bg-lightBlue-900">
                <div className="h-2 bg-orange-400 w-full"></div>
                <div className="max-w-7xl mx-auto flex flex-row justify-between items-center p-4">
                    <div>
                        <Link href="/">
                            <a className="flex items-center flex-row text-xl md:text-3xl font-semibold text-white">
                                <img
                                    className="h-8 md:h-12 mr-4"
                                    src="/img/eagle-logo-blue.png"
                                    alt="Eagle Logo"
                                />
                                Eagle Experts
                            </a>
                        </Link>
                    </div>
                    <div className="hidden md:grid grid-flow-col divide-x-2 divide-blue-500">
                        {links.map((item, index) => (
                            <Link href={item.url} key={index}>
                                <a className="text-white hover:underline tracking-wide px-4">
                                    {item.title}
                                </a>
                            </Link>
                        ))}
                    </div>
                    <div className="block md:hidden pt-2">
                        <button
                            onClick={() => setMenuVisibility(true)}
                            className="focus:outline-none"
                        >
                            <div className="w-8 h-8">
                                <svg
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white"
                                >
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`${
                    isMenuVisible ? 'fixed' : 'hidden'
                } top-0 left-0 z-30 w-screen h-screen bg-black bg-opacity-80 flex flex-row `}
            >
                <div className="h-full w-2/3 bg-white">
                    <div className="divide-y-2 border-b-2 flex flex-col">
                        {links.map((item, index) => (
                            <Link href={item.url} key={index}>
                                <a className="tracking-wide p-4">
                                    <span className="mr-2">{item.icon}</span>
                                    {item.title}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex-1 text-right" onClick={() => setMenuVisibility(false)}>
                    <button onClick={() => setMenuVisibility(false)} className="focus:outline-none">
                        <div className="w-12 h-12 mr-3 mt-2">
                            <svg
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                class="text-white"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar
