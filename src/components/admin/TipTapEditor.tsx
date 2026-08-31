
"use client"

import type React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Spinner } from "../UI/Spinner"
import { useEffect, useRef } from "react"
import Image from "@tiptap/extension-image"

interface TiptapEditorProps {
    content: string
    onChange: (value: string) => void
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
    content,
    onChange,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                allowBase64: true,
            }),
        ],
        content: content || "",
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    // Sync external content changes
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content || "")
        }
    }, [content, editor])

    // Handle image selection
    const handleImageSelect = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]

        if (!file || !editor) return

        // Make sure the selected file is an image
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.")
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            const base64 = reader.result as string

            editor
                .chain()
                .focus()
                .setImage({
                    src: base64,
                })
                .run()
        }

        reader.readAsDataURL(file)

        // Allow the user to select the same image again
        event.target.value = ""
    }

    if (!editor) {
        return <Spinner />
    }

    return (
        <div className="border border-gray-300 bg-[#e8e8e8] rounded-md overflow-hidden flex flex-col">

            {/* Toolbar */}
            <div className="p-2 bg-white border-b border-gray-300">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer "
                >
                    Add Image
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                />
            </div>

            {/* Editor */}
            <div className="p-4 min-h-[200px] max-h-[300px] flex-1 overflow-y-auto flex flex-col">
                <EditorContent
                    editor={editor}
                    className="
                        prose
                        prose-sm
                        max-w-none
                        border-none
                        focus:ring-0
                        focus:outline-none
                        flex-1
                        h-full

                        [&_.ProseMirror]:min-h-full
                        [&_.ProseMirror]:h-full
                        [&_.ProseMirror]:flex
                        [&_.ProseMirror]:flex-col
                        [&_.ProseMirror]:outline-none
                        [&_.ProseMirror]:border-none

                        [&_.ProseMirror_img]:max-w-full
                        [&_.ProseMirror_img]:h-auto
                        [&_.ProseMirror_img]:object-contain
                        [&_.ProseMirror_img]:mx-auto
                        [&_.ProseMirror_img]:my-4
                    "
                />
            </div>
        </div>
    )
}

export default TiptapEditor
