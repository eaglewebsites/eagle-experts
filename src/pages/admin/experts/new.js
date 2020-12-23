import { useState, useEffect, useMemo, useCallback } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import AdminLayout from '@/components/adminLayout'
import { useRouter } from 'next/router'
import fields from '@/utils/fields'
import { nanoid } from 'nanoid'
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Range, Element as SlateElement } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import insert from '@/utils/insert'
import * as Icon from 'react-feather'
import { Auth, Storage } from 'aws-amplify'
import isUrl from 'is-url'

/**
 * Should use the fields utility, being lazy for now
 */
const socials = ['facebook', 'youtube', 'twitter', 'instagram', 'website']
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const NewExpert = () => {
    const router = useRouter()
    const { location } = router.query
    const [expertStatus, setExpertStatus] = useState('PENDING')

    const defaultState = {
        ...fields,
        pk: `EXPERT#${nanoid()}`,
        description: [
            {
                type: 'paragraph',
                children: [{ text: '' }],
            },
        ],
    }

    const [expert, setExpert] = useState(defaultState)

    useEffect(() => {
        setExpert({
            ...expert,
            sk: location,
        })
    }, [location])

    const createExpert = () => {
        Auth.currentSession().then((data) => {
            const token = data.getAccessToken().getJwtToken()
            fetch(`/api/admin/create`, {
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...expert,
                    gsi1pk: location.toUpperCase(),
                    gsi1sk: `${expertStatus}#EXPERT#${nanoid()}`,
                }),
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    console.log(data)
                    alert('New expert was created successfully.')
                    setExpert({
                        ...defaultState,
                    })
                })
        })
    }
    // insert(expert).then((data) => {
    //     alert('New expert was created successfully.')
    //     setExpert({
    //         ...defaultState,
    //     })
    // })

    return (
        <AdminLayout>
            <div className="mb-24 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold capitalize mb-8">New {location} Expert</div>
                    <button
                        onClick={() => createExpert()}
                        className="text-center mb-4 px-6 py-2 bg-gradient-to-b from-green-400 to-green-500 text-white rounded hover:from-green-500 hover:to-green-400 flex flex-row items-center shadow-lg"
                    >
                        <Icon.Plus className="mr-2" /> Create Expert
                    </button>
                </div>
                <div className="flex flex-col">
                    <Label value="Status" />
                    <select
                        className="w-32"
                        value={expertStatus}
                        onChange={(event) => setExpertStatus(event.target.value)}
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
                    label="Accent Color (Hex value) Leave blank for default"
                    placeholder="#000000"
                    value={expert.accent_color}
                    onChange={(value) => setExpert({ ...expert, accent_color: value })}
                />
                <ImageUpload
                    label="Logo"
                    value={expert.logo}
                    onUploadComplete={(url) => setExpert({ ...expert, logo: url })}
                />
                <ImageUpload
                    label="Background Image"
                    value={expert.background_image}
                    onUploadComplete={(url) => setExpert({ ...expert, background_image: url })}
                />
                <div className="mb-8">
                    <RichText
                        label="Blog"
                        value={expert.description}
                        onChange={(newValue) => setExpert({ ...expert, description: newValue })}
                    />
                </div>

                <div className="ml-8 mt-8 space-y-4">
                    <Label value="Social Items" />
                    {socials.map((item, index) => (
                        <TextInput
                            placeholder="eg https://"
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
                <div className="ml-8 space-y-4">
                    {weekdays.map((item, index) => (
                        <TextInput
                            placeholder="eg 8:00AM - 5:00PM"
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
                <ImageUpload
                    label="Sidebar Ad Image"
                    value={expert.ad_image}
                    onUploadComplete={(url) => setExpert({ ...expert, ad_image: url })}
                />
            </div>
        </AdminLayout>
    )
}

const Label = ({ value }) => (
    <label className="uppercase tracking-wide text-gray-700">{value}</label>
)

const TextInput = ({ label, value, onChange, placeholder = '' }) => (
    <div className="flex flex-col">
        <Label value={label} />
        <input
            placeholder={placeholder}
            className="p-2 rounded border border-gray-300 focus:border-blue-500 bg-gray-50 focus:bg-white outline-none"
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
)

const ImageUpload = ({ value, label, onUploadComplete }) => {
    const [isUploading, setUploading] = useState(false)

    const onChange = (event) => {
        setUploading(true)
        const file = event.target.files[0]
        Storage.put(`${nanoid()}.jpg`, file)
            .then((result) => {
                /**
                 * Returns key on success
                 * {key : 'test.txt'}
                 */
                console.log(result)
                setUploading(false)
                onUploadComplete(`https://eagle-experts.s3.amazonaws.com/public/${result.key}`)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="flex flex-col">
            <Label value={label} />
            <div className="bg-gray-200 text-center py-8 flex flex-col">
                <div>Image Upload {isUploading ? 'Uploading...' : null}</div>
                <div>
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={(event) => onChange(event)}
                    />
                </div>
                {value !== '' && <img className="h-24 w-auto" src={value} />}
            </div>
        </div>
    )
}

const RichText = ({ label, value, onChange }) => {
    // Create a Slate editor object that won't change across renders.
    const editor = useMemo(() => withLinks(withReact(createEditor())), [])

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    // const renderElement = useCallback((props) => {
    //     switch (props.element.type) {
    //         case 'code':
    //             return <CodeElement {...props} />
    //         default:
    //             return <DefaultElement {...props} />
    //     }
    // }, [])

    const renderElement = useCallback((props) => <Element {...props} />, [])
    const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

    return (
        <div>
            <Label value={label} />
            <div>
                <Slate editor={editor} value={value} onChange={(newValue) => onChange(newValue)}>
                    <div className="flex flex-row space-x-3 items-center py-3">
                        <MarkButton format="bold" icon={<Icon.Bold size={24} />} />
                        <BlockButton format="heading-one" icon={<Icon.Type size={24} />} />
                        <LinkButton />
                    </div>
                    <Editable
                        className="bg-white rounded p-3"
                        spellCheck
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
        </div>
    )
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
        split: true,
    })
    const newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return (
                <h1 className="text-3xl leading-loose" {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'link':
            return (
                <a className="text-blue-500 hover:underline" {...attributes} href={element.url}>
                    {children}
                </a>
            )
        default:
            return (
                <p className="leading-loose" {...attributes}>
                    {children}
                </p>
            )
    }
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })

    return !!match
}

const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <button
            className={isBlockActive(editor, format) ? 'text-blue-400' : ''}
            onMouseDown={(event) => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            {icon}
        </button>
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

const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <button
            className={isMarkActive(editor, format) ? 'text-blue-400' : ''}
            onMouseDown={(event) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            {icon}
        </button>
    )
}

const insertLink = (editor, url) => {
    if (editor.selection) {
        wrapLink(editor, url)
    }
}

const isLinkActive = (editor) => {
    const [link] = Editor.nodes(editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
}

const unwrapLink = (editor) => {
    Transforms.unwrapNodes(editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
}

const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

const withLinks = (editor) => {
    const { insertData, insertText, isInline } = editor

    editor.isInline = (element) => {
        return element.type === 'link' ? true : isInline(element)
    }

    editor.insertText = (text) => {
        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertText(text)
        }
    }

    editor.insertData = (data) => {
        const text = data.getData('text/plain')

        if (text && isUrl(text)) {
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor
}

const LinkButton = () => {
    const editor = useSlate()
    return (
        <button
            className={isLinkActive(editor) ? 'text-blue-400' : ''}
            onMouseDown={(event) => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the link:')
                if (!url) return
                insertLink(editor, url)
            }}
        >
            <Icon.Link size={24} />
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

export default withAuthenticator(NewExpert)
