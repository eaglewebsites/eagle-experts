import Link from 'next/link'
import Navbar from '@/components/navbar'
import { DynamoDB } from 'aws-sdk'
const AWS = require('aws-sdk')

const Expert = ({ response }) => {
    const {
        id,
        title,
        sub_title,
        accent_color,
        background_image,
        description,
        social_links,
        phone,
        address,
        business_hours,
        email,
        logo,
        ad_image,
    } = response

    return (
        <>
            <Navbar />
            <section className="my-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-8 px-4 md:px-0">
                        <h1 className="text-4xl font-bold">{title}</h1>
                        <p className="text-gray-800 text-xl">{sub_title}</p>
                    </div>
                </div>
            </section>

            <section className="my-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 px-4 md:px-0">
                        <div className="md:col-span-5 md:pr-12">
                            <div className="grid grid-cols-1 gap-4">
                                <div
                                    className="rounded-lg overlfow-hidden text-center text-4xl flex items-center justify-center mb-8 bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgba(166, 46, 29, 0), ${accent_color}),url(${background_image})`,
                                    }}
                                >
                                    <div>
                                        <img
                                            className="shadow-2xl rounded-lg border-8 border-white my-24 w-64 h-64"
                                            src={logo}
                                            alt="Elite Academy Logo"
                                        />
                                    </div>
                                </div>
                                <div className="">{description}</div>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <div className="grid grid-cols-1 gap-4">
                                <label className="uppercase tracking-wide text-gray-600 font-semibold text-sm">
                                    Visit Us
                                </label>
                                <div className="">
                                    {social_links.facebook && (
                                        <a
                                            href="https://www.facebook.com/EliteacademyMA"
                                            className="flex flex-row justify-between items-center rounded-full bg-blue-600 text-white pl-4 pr-6 py-2 transition transform ease-in-out duration-150 hover:-translate-y-1 mb-5"
                                        >
                                            <div>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="css-i6dzq1"
                                                >
                                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                                </svg>
                                            </div>
                                            <div>Facebook</div>
                                        </a>
                                    )}
                                    {social_links.youtube && (
                                        <a
                                            href="https://www.youtube.com/channel/UCXnC4Wj7Ikd9iWC45qm9Fdw"
                                            className="flex flex-row justify-between items-center rounded-full bg-red-700 text-white pl-4 pr-6 py-2 transition transform ease-in-out duration-150 hover:-translate-y-1 mb-5"
                                        >
                                            <div>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="css-i6dzq1"
                                                >
                                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                                </svg>
                                            </div>
                                            <div>Youtube</div>
                                        </a>
                                    )}
                                    {social_links.instagram && (
                                        <a
                                            href="https://www.instagram.com/explore/locations/285630308622879/elite-academy-of-martial-arts/?hl=en"
                                            className="flex flex-row justify-between items-center rounded-full bg-gradient-to-br from-indigo-600 to-pink-500 text-white pl-4 pr-6 py-2 transition transform ease-in-out duration-150 hover:-translate-y-1 mb-5"
                                        >
                                            <div>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="css-i6dzq1"
                                                >
                                                    <rect
                                                        x="2"
                                                        y="2"
                                                        width="20"
                                                        height="20"
                                                        rx="5"
                                                        ry="5"
                                                    ></rect>
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                    <line
                                                        x1="17.5"
                                                        y1="6.5"
                                                        x2="17.51"
                                                        y2="6.5"
                                                    ></line>
                                                </svg>
                                            </div>
                                            <div>Instagram</div>
                                        </a>
                                    )}
                                    {social_links.twitter && (
                                        <a
                                            href="https://twitter.com/eliteacademyma"
                                            className="flex flex-row justify-between items-center rounded-full bg-blue-400 text-white pl-4 pr-6 py-2 transition transform ease-in-out duration-150 hover:-translate-y-1 mb-5"
                                        >
                                            <div>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="css-i6dzq1"
                                                >
                                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                </svg>
                                            </div>
                                            <div>Twitter</div>
                                        </a>
                                    )}
                                    {social_links.website && (
                                        <a
                                            href="https://twitter.com/eliteacademyma"
                                            className="flex flex-row justify-between items-center rounded-full bg-white text-blue-600 pl-4 pr-6 py-2 transition transform ease-in-out duration-150 hover:-translate-y-1 mb-5"
                                        >
                                            <div>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    stroke="currentColor"
                                                    strokeWidth="1.6"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-gray-700"
                                                >
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <circle cx="12" cy="12" r="4"></circle>
                                                    <line x1="21.17" y1="8" x2="12" y2="8"></line>
                                                    <line
                                                        x1="3.95"
                                                        y1="6.06"
                                                        x2="8.54"
                                                        y2="14"
                                                    ></line>
                                                    <line
                                                        x1="10.88"
                                                        y1="21.94"
                                                        x2="15.46"
                                                        y2="14"
                                                    ></line>
                                                </svg>
                                            </div>
                                            <div>Website</div>
                                        </a>
                                    )}
                                </div>
                                <label className="uppercase tracking-wide text-gray-600 font-semibold text-sm">
                                    Contact Us
                                </label>
                                {phone && (
                                    <a
                                        href="tel:7854304200"
                                        className="flex flex-row justify-between items-center rounded-full bg-green-500 text-white pl-4 pr-6 py-2 transition transform ease-in-out duration-150 hover:-translate-y-1"
                                    >
                                        <div>
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="css-i6dzq1"
                                            >
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </div>
                                        <div>{phone}</div>
                                    </a>
                                )}
                                {email && (
                                    <a
                                        href={`mailto:${email}`}
                                        className="overflow-hidden flex flex-row justify-between items-center rounded-full bg-gray-200 text-gray-900 pl-4 pr-6 py-2 transition transform ease-in-out duration-150 hover:-translate-y-1 mb-5"
                                    >
                                        <div>
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </div>
                                        <div>{email}</div>
                                    </a>
                                )}
                                {address && (
                                    <>
                                        <label className="uppercase tracking-wide text-gray-600 font-semibold text-sm">
                                            Find Us
                                        </label>
                                        <div className="font-bold mb-5">{address}</div>
                                    </>
                                )}
                                <label className="uppercase tracking-wide text-gray-600 font-semibold text-sm">
                                    Business Hours
                                </label>
                                <div className="">
                                    <ul>
                                        <li className="flex items-center">
                                            <span className="w-2/5">Monday:</span>
                                            <span className="font-semibold text-gray-900">
                                                {business_hours.monday}
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2/5">Tuesday:</span>
                                            <span className="font-semibold text-gray-900">
                                                {business_hours.tuesday}
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2/5">Wednesday:</span>
                                            <span className="font-semibold text-gray-900">
                                                {business_hours.wednesday}
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2/5">Thursday:</span>
                                            <span className="font-semibold text-gray-900">
                                                {business_hours.thursday}
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2/5">Friday:</span>
                                            <span className="font-semibold text-gray-900">
                                                {business_hours.friday}
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2/5">Saturday:</span>
                                            <span className="font-semibold text-gray-900">
                                                {business_hours.saturday}
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2/5">Sunday:</span>
                                            <span className="font-semibold text-gray-900">
                                                {business_hours.sunday}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                {ad_image && (
                                    <div>
                                        <img
                                            src="/img/elite_academy/elite_experts_ad.gif"
                                            alt="Elite Experts"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export const getServerSideProps = async (context) => {
    AWS.config.update({
        region: 'us-east-1',
    })

    const Dynamo = new AWS.DynamoDB.DocumentClient()

    let params = {
        TableName: 'eagle-experts',
        Key: {
            pk: `EXPERT#${context.params.id}`,
            sk: process.env.NEXT_PUBLIC_SITE,
        },
    }

    const response = await Dynamo.get(params, function (err) {
        if (err) {
            console.log(err)
        }
    }).promise()

    // let params = {
    //     TableName: 'eagle-experts',
    //     IndexName: 'gsi1',
    //     KeyConditionNames: {
    //         '#location': 'sk',
    //         '#expert': 'pk',
    //     },
    //     KeyConditionValues: {
    //         ':location': {
    //             S: location,
    //         },
    //         ':active': {
    //             S: 'ACTIVE',
    //         },
    //     },
    //     KeyConditionExpression: '#location = :location and begins_with(#expert, :active)',
    // }

    // const response = await Dynamo.getItem(params, function (err, data) {
    //     if (err) {
    //         return {
    //             error: true,
    //         }
    //     } else {
    //         console.log(data)
    //         return data
    //     }
    // }).promise()

    // const data = {
    //     id: context.params.id,
    //     title: 'Elite Academy of Martial Arts',
    //     sub_title: 'Committed to Improving Lives Through Martial Arts In Junction City',
    //     accent_color: '#ab2b20',
    //     background_image:
    //         'https://img1.wsimg.com/isteam/ip/4c954b51-f8eb-4002-97f1-bb6eddeb13d4/80773713_780249395773994_8608299799143251968_n.jpg/:/rs=w:2460,h:1260,cg:true,m/cr=w:2460,h:1260,a:cc',
    //     description: 'Really long description',
    //     social_links: {
    //         facebook: 'https://www.facebook.com/EliteacademyMA',
    //         youtube: 'https://www.youtube.com/channel/UCXnC4Wj7Ikd9iWC45qm9Fdw',
    //         instagram:
    //             'https://www.instagram.com/explore/locations/285630308622879/elite-academy-of-martial-arts/?hl=en',
    //         website: 'https://eliteacademyma.com/',
    //     },
    //     phone: '785-430-4200',
    //     address: '826 N Washing St, Junction City, KS 66441',
    //     business_hours: {
    //         monday: '4:30 - 9:00 PM',
    //         tuesday: '4:30 - 9:00 PM',
    //         wednesday: '4:30 - 9:00 PM',
    //         thursday: '4:30 - 9:00 PM',
    //         friday: '4:30 - 9:00 PM',
    //         saturday: '4:30 - 9:00 PM',
    //         sunday: 'Closed',
    //     },
    //     email: 'example@example.com',
    //     logo: 'https://experts.jcpost.com/img/elite_academy/Elite_Logo.jpg',
    //     ad_image: 'https://experts.jcpost.com/img/elite_academy/elite_experts_ad.gif',
    // }

    // Pass data to the page via props
    return {
        props: {
            response: response.Item,
        },
    }
}

export default Expert
