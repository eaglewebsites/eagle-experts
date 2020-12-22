import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar'

const Index = () => {
    const [isLoading, setLoading] = useState(false)
    const [experts, setExperts] = useState([])

    useEffect(() => {
        setLoading(true)
        fetchData().then(({ data }) => {
            setExperts(data)
            setLoading(false)
        })
    }, [])

    const fetchData = async () => {
        try {
            const experts = await fetch(
                `/api/public/list?location=${process.env.NEXT_PUBLIC_SITE}`
            ).then((response) => response.json())
            return experts
        } catch (err) {
            console.log(err)
            alert('Something went wrong getting data. Please try again.')
        }
    }

    return (
        <>
            <Navbar />
            <section className="container mx-auto my-12 p-4">
                <img className="mx-auto h-48" src="/img/eagle-logo-blue.png" alt="Eagle Logo" />
                <h1 className="text-xl md: text-6xl lg:text-7xl font-black text-center -mt-20 tracking-wide">
                    Eagle Experts
                </h1>
                <p className="text-center text-xl leading-loose">
                    Your guide to finding the best <br />
                    <strong className="italic text-white bg-blue-900 px-2 py-1 rounded">
                        local services
                    </strong>
                </p>
            </section>
            <section className="container mx-auto my-12 p-4">
                <h2 className="text-2xl md:text-4xl uppercase text-center font-light tracking-wide mb-4">
                    Businesses Committed to Improve Everyday Living
                </h2>
                <p className="text-center text-lg antialiased">Tap on a business to learn more</p>
            </section>
            <section className="max-w-6xl mx-auto my-12">
                {isLoading && (
                    <div className="text-center py-12 text-gray-800 w-full">Loading Experts...</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                    {!isLoading &&
                        experts &&
                        experts.map((item, index) => (
                            <Link
                                href={`/experts/${item.pk.replace(/ACTIVE#EXPERT#/g, '')}`}
                                key={index}
                            >
                                <a className="transition duration-150 ease-in-out flex justify-between rounded-lg overflow-hidden shadow-lg md:border-4 md:border-white hover:border-blue-500 bg-white">
                                    <img
                                        className="w-32 md:w-48 object-cover"
                                        src={item.background_image}
                                    />
                                    <div className="flex-1 p-4 bg-white">
                                        <p className="text-center text-xl">{item.title}</p>
                                        <div className="h-1 bg-orange-400 w-12 mx-auto rounded-full"></div>
                                        <img className="mx-auto h-32 pt-3" src={item.logo} />
                                    </div>
                                </a>
                            </Link>
                        ))}
                </div>
            </section>
        </>
    )
}

export default Index
