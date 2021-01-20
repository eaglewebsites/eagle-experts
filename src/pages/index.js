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
                            <Link href={`/experts/${item.pk.replace(/EXPERT#/g, '')}`} key={index}>
                                <a className="rounded bg-white overflow-hidden relative transform duration-150 ease-in-out hover:shadow-xl ">
                                    <div className="col-span-2 md:col-span-1 flex flex-row">
                                        <div
                                            className="w-32 md:w-48 bg-gray-200 bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url('${item.background_image}')`,
                                            }}
                                            alt={`${item.title} background image`}
                                        ></div>
                                        <div className="flex-1 p-4">
                                            <div className="text-center text-2xl font-medium mb-6">
                                                {item.title}
                                            </div>
                                            <div className="flex justify-center px-6 ">
                                                <img
                                                    src={item.logo}
                                                    alt={`${item.title} logo`}
                                                    className="object-contain h-36"
                                                />
                                            </div>
                                            <div className="flex justify-end h-24 items-end">
                                                <div
                                                    className={`px-2 py-1 text-sm bg-orange-500 text-orange-50 rounded${
                                                        item.category ? '' : 'invisible'
                                                    }`}
                                                >
                                                    {item.category}
                                                </div>
                                            </div>
                                        </div>
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
