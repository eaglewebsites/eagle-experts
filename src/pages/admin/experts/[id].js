import { useEffect, useState, useMemo, useCallback } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'
import getExpert from '@/utils/getExpert'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import * as Icon from 'react-feather'
// Import the Slate editor factory.
import { createEditor, Editor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate } from 'slate-react'

/**
 * Should use the fields utility, being lazy for now
 */
const socials = ['facebook', 'youtube', 'twitter', 'instagram', 'website']
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const Expert = () => {
    const router = useRouter()
    const { id, location } = router.query
    const [expert, setExpert] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [expertStatus, setExpertStatus] = useState('')

    useEffect(() => {
        if (id && location) {
            Auth.currentSession().then((data) => {
                const token = data.getAccessToken().getJwtToken()
                fetchExpert(token).then((data) => {
                    if (data.error) {
                        console.log(data)
                        setError(true)
                    } else {
                        setExpert({
                            ...data.data,
                            description: JSON.parse(data.data.description),
                        })

                        setExpertStatus(data.data.gsi1sk.includes('ACTIVE') ? 'ACTIVE' : 'PENDING')
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

    const handleUpdate = () => {
        Auth.currentSession().then((data) => {
            const token = data.getAccessToken().getJwtToken()
            updateExpert(token).then((data) => {
                alert('Expert was updated.')
                router.push(`/admin/location/${location}`)
            })
        })
    }

    const updateExpert = async (token) => {
        try {
            const url = `/api/admin/update?id=${id.replace(
                /#/g,
                '%23'
            )}&location=${location.toUpperCase()}`
            const expertupdate = await fetch(url, {
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expert),
            }).then((response) => {
                return response.json()
            })
            return expertupdate
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
            {!loading && (
                <div className="mb-24">
                    <div className="flex justify-between items-center">
                        <div className="text-3xl font-bold capitalize mb-8">Edit Expert</div>
                        <button
                            onClick={() => handleUpdate()}
                            className="text-center mb-4 px-6 py-2 bg-gradient-to-b from-blue-400 to-blue-500 text-white rounded hover:from-blue-500 hover:to-blue-400 flex flex-row items-center shadow-lg"
                        >
                            <Icon.Check className="mr-2" /> Update
                        </button>
                    </div>
                    <div>
                        <select
                            value={expertStatus}
                            onChange={(event) => {
                                setExpertStatus(event.target.value)
                                setExpert({
                                    ...expert,
                                    gsi1sk: expert.gsi1sk.replace(
                                        expert.gsi1sk.split('#')[0],
                                        event.target.value
                                    ),
                                })
                            }}
                        >
                            <option value="ACTIVE">Active</option>
                            <option value="PENDING">Pending</option>
                        </select>
                    </div>
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
                    <RichText
                        label="Description"
                        value={expert.description}
                        onChange={(newValue) => setExpert({ ...expert, description: newValue })}
                    />
                    <Label value="Social Items" />
                    <div className="ml-8">
                        {socials.map((item, index) => (
                            <TextInput
                                key={index}
                                label={item}
                                value={expert.social_links[item]}
                                onChange={(value) =>
                                    setExpert({
                                        ...expert,
                                        social_links: { ...expert.social_links, [item]: value },
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
                        {weekdays.map((item, index) => (
                            <TextInput
                                key={index}
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
            )}
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

const RichText = ({ label, value, onChange }) => {
    // Create a Slate editor object that won't change across renders.
    const editor = useMemo(() => withReact(createEditor()), [])

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

    return (
        <div>
            <Label value={label} />
            <Slate editor={editor} value={value} onChange={(newValue) => onChange(newValue)}>
                <MarkButton format="bold" title="Bold" />
                <Editable
                    placeholder="Enter some text…"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => {
                        if (event.key === '&') {
                            event.preventDefault()
                            editor.insertText('and')
                        }
                    }}
                />
            </Slate>
        </div>
    )
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const MarkButton = ({ format, title }) => {
    const editor = useSlate()
    return (
        <button
            active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            {title}
        </button>
    )
}

// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>
}

export default withAuthenticator(Expert)
