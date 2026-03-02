"use client"

import TiptapEditor from "@/components/admin/TipTapEditor";
import Button from "@/components/UI/Button";
import React, { useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
    const [formValues, setFormValues] = useState({
        title: "",
        content: "",
        author: "",
        image: "",
        publicationDate: ""
    })

    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    //  File input ref
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleTipTapChange = (value: string) => {
        setFormValues((prev) => ({
            ...prev,
            content: value,
        }))
    }

    const uploadImage = async () => {
        if (!file) {
            toast.error("Please select an image")
            return
        }

        const filename = `${Date.now()}-${file.name}`

        const { error } = await supabase.storage
            .from("TheGreyITBucket")
            .upload(filename, file)

        if (error) {
            console.error("Upload error", error.message)
            toast.error("Upload failed")
            return
        }

        const { data: publicUrl } = supabase.storage
            .from("TheGreyITBucket")
            .getPublicUrl(filename)

        return publicUrl.publicUrl
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formValues.title || !formValues.publicationDate || !formValues.content || !formValues.author) {
            toast.error("Please fill in the required fields")
            return;
        }

        setLoading(true)

        const imageUrl = await uploadImage()

        const { error } = await supabase.from("blog").insert({
            title: formValues.title,
            author: formValues.author,
            content: formValues.content,
            image: imageUrl || "",
            publicationDate: formValues.publicationDate,
            slug: formValues.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, ''),
        })

        if (error) {
            console.error("Failed to upload blog", error)
            toast.error("Failed to upload blog")
            setLoading(false)
            return;
        }

        toast.success("Blog added successfully!")

        //  Reset form state
        setFormValues({
            title: "",
            content: "",
            image: "",
            author: "",
            publicationDate: "",
        })

        setFile(null)

        //  Reset file input manually
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }

        setLoading(false)
    }

    return (
        <div className="w-full min-h-screen flex items-start justify-start py-10 px-[3%] bg-white">

            <Link href={"/"} className="bg-gray-700 text-white size-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-[110%] duration-300 ease-in-out transition-all">
                <ChevronLeft />
            </Link>

            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto flex flex-col gap-10 items-center px-5 py-8 bg-gray-700 h-fit rounded-md text-white font-poppins">
                <h1>Add Research Blog</h1>

                <div className="w-full flex flex-col items-start gap-7">

                    <label htmlFor="title" className="w-full flex flex-col items-start gap-1">
                        <span>Title</span>
                        <input
                            value={formValues.title}
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleInputChange}
                            className="w-full py-2 px-5 border border-white outline-none text-base rounded-sm"
                        />
                    </label>

                    <label htmlFor="author" className="w-full flex flex-col items-start gap-1">
                        <span>Author</span>
                        <input
                            value={formValues.author}
                            type="text"
                            id="author"
                            name="author"
                            onChange={handleInputChange}
                            className="w-full py-2 px-5 border border-white outline-none text-base rounded-sm"
                        />
                    </label>

                    <label htmlFor="publicationDate" className="w-full flex flex-col items-start gap-1">
                        <span>Publication Date</span>
                        <input
                            value={formValues.publicationDate}
                            type="date"
                            id="publicationDate"
                            name="publicationDate"
                            onChange={handleInputChange}
                            className="w-full py-2 px-5 border border-white outline-none text-base rounded-sm"
                        />
                    </label>

                    <div className="w-full flex flex-col gap-1 text-black">
                        <span className="text-lg font-semibold text-white">Content</span>
                        <TiptapEditor
                            content={formValues.content}
                            onChange={handleTipTapChange}
                        />
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <span className="text-lg font-semibold text-white">Upload Image</span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setFile(e.target.files[0])
                                }
                            }}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-gray-700 file:bg-white hover:file:bg-gray-300 file:cursor-pointer"
                        />
                    </div>
                </div>

                <Button variant="outline" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                </Button>
            </form>
        </div>
    )
}