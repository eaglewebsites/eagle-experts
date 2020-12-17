import { useState, useEffect } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'
import { useRouter } from 'next/router'
import fields from '@/utils/fields'
import { nanoid } from 'nanoid'

const socials = ['facebook', 'youtube', 'twitter', 'instagram', 'website']
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const NewExpert = () => {
    const router = useRouter()
    const { location } = router.query
    const [expert, setExpert] = useState({
        ...fields,
        id: `ACTIVE#EXPERT#${nanoid()}`,
        location: location.toUpperCase(),
    })

    return (
        <AdminLayout>
            <div className="mb-24">
                <div className="text-3xl font-bold capitalize mb-8">New {location} Expert</div>
                <TextInput
                    label="title"
                    value={expert.title}
                    onChange={(value) => setExpert({ ...expert, title: value })}
                />
                <TextInput
                    label="Subtitle"
                    value={expert.subtitle}
                    onChange={(value) => setExpert({ ...expert, subtitle: value })}
                />
                <TextInput
                    label="Accent Color (Hex value)"
                    value={expert.accent_color}
                    onChange={(value) => setExpert({ ...expert, accent_color: value })}
                />
                <ImageUpload label="Logo" />
                <ImageUpload label="Background Image" />
                <RichText label="Description" />
                <Label value="Social Items" />
                <div className="ml-8">
                    {socials.map((item) => (
                        <TextInput
                            label={item}
                            value={expert.business_hours[item]}
                            onChange={(value) =>
                                setExpert({
                                    ...expert,
                                    business_hours: { ...expert.business_hours, [item]: value },
                                })
                            }
                        />
                    ))}
                </div>
                <TextInput
                    label="Phone"
                    value={expert.phone}
                    onChange={(value) => setExpert({ ...expert, phone: value })}
                />
                <TextInput
                    label="Address"
                    value={expert.address}
                    onChange={(value) => setExpert({ ...expert, address: value })}
                />
                <TextInput
                    label="Email"
                    value={expert.email}
                    onChange={(value) => setExpert({ ...expert, email: value })}
                />
                <Label value="Business Hours" />
                <div className="ml-8">
                    {weekdays.map((item) => (
                        <TextInput
                            label={item}
                            value={expert.business_hours[item]}
                            onChange={(value) =>
                                setExpert({
                                    ...expert,
                                    business_hours: { ...expert.business_hours, [item]: value },
                                })
                            }
                        />
                    ))}
                </div>
                <TextInput
                    label="Promotional Video URL"
                    value={expert.promo_video_url}
                    onChange={(value) => setExpert({ ...expert, promo_video_url: value })}
                />
                <ImageUpload label="Sidebar Ad Image" />
            </div>
        </AdminLayout>
    )
}

const Label = ({ value }) => (
    <label className="uppercase tracking-wide text-gray-700">{value}</label>
)

const TextInput = ({ label, value, onChange }) => (
    <div className="flex flex-col">
        <Label value={label} />
        <input
            className="p-2 rounded border border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white outline-none"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
)

const ImageUpload = ({ label }) => {
    return (
        <div className="flex flex-col">
            <Label value={label} />
            <div className="bg-gray-200 text-center py-8">
                <div>Image Upload</div>
            </div>
        </div>
    )
}

const RichText = ({ label }) => {
    return (
        <div className="flex flex-col">
            <Label value={label} />
            <div className="h-24 bg-orange-100">Rich text</div>
        </div>
    )
}

export default withAuthenticator(NewExpert)
