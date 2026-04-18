"use client"

import TiptapEditor from "@/components/admin/TipTapEditor";
import Button from "@/components/UI/Button";
import React, { useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
    const [formValues, setFormValues] = useState({
        title: "",
        tagline: "",
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
            tagline: formValues.tagline,
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
            tagline: "",
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
        <form className="w-full min-h-screen flex flex-col-reverse md:flex-row items-center md:items-stretch justify-start pt-36 pb-10 px-[2%] bg-white gap-10  ">


            {/* Left side  */}
            <div className="w-full flex-1  py-10 h-fit bg-gray-700 px-7 flex flex-col items-start gap-6 font-poppins font-medium text-lg text-white rounded-sm  "  >

                <Link href={"/blog-control"} className="mb-3 " >
                    <button className="bg-white text-gray-700 size-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-[110%] duration-300 ease-in-out transition-all">
                        <ArrowLeft />
                    </button>
                </Link>


                <h1 className="text-2xl font-semibold "  >Add Research Blog</h1>


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


                <div className="w-full flex flex-col gap-1 text-black">
                    <span className="text-lg font-medium text-gray-700">Content</span>
                    <TiptapEditor
                        content={formValues.content}
                        onChange={handleTipTapChange}
                    />
                </div>


                <Button
                variant="outline"
                disabled={loading}
                className=" w-full max-w-xs rounded-sm hover:rounded-[100px]  "
                >
                    {loading ? "Loading..." : "Submit"}
                </Button>


            </div>


            {/* right side  */}
            <div className="w-full h-fit bg-gray-700 py-10 max-w-md flex flex-col items-start gap-6 text-white px-4 rounded-md  font-poppins font-medium text-lg "  >

                {/* The tagline input */}
                <label htmlFor="tagline" className="w-full flex flex-col items-start gap-1">
                    <span>Tagline</span>
                    <input
                        value={formValues.tagline}
                        type="text"
                        id="tagline"
                        name="tagline"
                        onChange={handleInputChange}
                        className="w-full py-2 px-5 border border-white outline-none text-base rounded-sm"
                    />
                </label>



                {/* The author input  */}
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


                {/* The publication date input */}
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



        </form>
    )
}