"use client"

import Button from "@/components/UI/Button";
import React, { useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
        <form
            onSubmit={handleSubmit}
            className="w-full min-h-screen flex flex-col-reverse md:flex-row items-center bg-gray-100
            md:items-stretch justify-start gap-10 px-4 py-10 rounded-lg border border-gray-300 ">


            {/* Left side  */}
            <div className="w-full flex-1  py-10 h-fit bg-white px-7 flex flex-col items-start gap-6 font-poppins font-medium text-lg text-gray-700 rounded-sm border border-gray-300 "  >

                <Link href={"/blog-control"} className="mb-3 " >
                    <button className="bg-gray-700 text-white size-10 rounded-full flex items-center justify-center
                     cursor-pointer hover:scale-[110%] duration-300 ease-in-out transition-all shadow-2xlss ">
                        <ArrowLeft />
                    </button>
                </Link>


                <h1 className="text-2xl font-medium "  >Create New Blog</h1>


                <label htmlFor="title" className="w-full flex flex-col items-start gap-1">
                    <span className="text-base" >Title</span>
                    <input
                        value={formValues.title}
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleInputChange}
                        className="w-full py-2 px-5 border border-gray-300 bg-[#e8e8e8] outline-none text-sm rounded-sm"
                    />
                </label>


                <div className="w-full flex flex-col gap-1 text-gray-700">
                    <span className="text-base  text-gray-700">Content</span>

                    <ReactQuill
                        theme="snow"
                        value={formValues.content}
                        onChange={(content) =>
                            setFormValues((prev) => ({
                                ...prev,
                                content,
                            }))
                        }
                        placeholder="Start writing your article content here..."
                        className="w-full h-full max-h-75 "
                    />
                </div>





                <Button
                    variant="default"
                    disabled={loading}
                    className=" w-fit !text-base !py-2 !font-semibold   "
                >
                    {loading ? "Loading..." : "Submit"}
                </Button>


            </div>


            {/* right side  */}
            <div className="w-full h-fit bg-white border border-gray-300 py-10 max-w-md flex flex-col items-start gap-6 text-gray-700 px-4 rounded-md  font-poppins font-medium text-lg "  >

                {/* The tagline input */}
                <label htmlFor="tagline" className="w-full flex flex-col items-start gap-1">
                    <span className="text-base"  >Tagline</span>
                    <input
                        value={formValues.tagline}
                        type="text"
                        id="tagline"
                        name="tagline"
                        onChange={handleInputChange}
                        className="w-full py-2 px-5 border border-gray-300 bg-[#e8e8e8] outline-none text-sm rounded-sm"
                    />
                </label>



                {/* The author input  */}
                <label htmlFor="author" className="w-full flex flex-col items-start gap-1">
                    <span className="text-base" >Author</span>
                    <input
                        value={formValues.author}
                        type="text"
                        id="author"
                        name="author"
                        onChange={handleInputChange}
                        className="w-full py-2 px-5 border border-gray-300 bg-[#e8e8e8] outline-none text-sm rounded-sm"
                    />
                </label>


                {/* The publication date input */}
                <label htmlFor="publicationDate" className="w-full flex flex-col items-start gap-1">
                    <span className="text-base" >Publication Date</span>
                    <input
                        value={formValues.publicationDate}
                        type="date"
                        id="publicationDate"
                        name="publicationDate"
                        onChange={handleInputChange}
                        className="w-full py-2 px-5 border border-gray-300 bg-[#e8e8e8] outline-none text-sm rounded-sm"
                    />
                </label>

                <div className="w-full flex flex-col gap-1">
                    <span className="text-base  text-gray-700">Upload Image</span>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0])
                            }
                        }}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300
                        file:text-sm file:font-semibold file:text-gray-700 file:bg-white
                         hover:file:bg-gray-300 file:cursor-pointer text-sm "
                    />
                </div>

            </div>



        </form>
    )
}