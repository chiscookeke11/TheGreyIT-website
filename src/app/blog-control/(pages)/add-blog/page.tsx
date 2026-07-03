"use client"

import TiptapEditor from "@/components/admin/TipTapEditor";
import Button from "@/components/UI/Button";
import React, { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Loading from "@/components/UI/Loading";
import PostScheduler from "@/components/UI/PostScheduler";
import { ResearchBlogType } from "@/types/types";
import imageCompression from "browser-image-compression"


export default function Page() {
    const [formValues, setFormValues] = useState<ResearchBlogType>({
        title: "",
        tagline: "",
        content: "",
        author: "",
        image: "",
        publicationDate: new Date(),
        category: "",
        createdAt: new Date(),
        id: 0,
        slug: "",
        status: "published"
    })

    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [showSchedulerForm, setShowSchedulerForm] = useState(false)

    //  File input ref
    const fileInputRef = useRef<HTMLInputElement | null>(null)


    // This function handles input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    // This function handles change in the textarea
    const handleTipTapChange = (value: string) => {
        setFormValues((prev) => ({
            ...prev,
            content: value,
        }))
    }



    // This function handles image upload to supabase storage
    const uploadImage = async ({ requireImage = true }: { requireImage?: boolean } = {}) => {
        if (!file) {
            if (requireImage) {
                toast.error("Please select an image")
            }
            return
        }


        let fileToUpload = file;

        try {
            fileToUpload = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: "image/webp"
            });
        } catch (err) {
            console.error("Compression failed, uploading original", err)
        }


        const filename = `${Date.now()}-${file.name}`

        const { error } = await supabase.storage
            .from("TheGreyITBucket")
            .upload(filename, fileToUpload, {
                contentType: "image/webp",
            })

        if (error) {
            console.error("Upload error")
            toast.error("Upload failed")
            return
        }

        const { data: publicUrl } = supabase.storage
            .from("TheGreyITBucket")
            .getPublicUrl(filename)

        return publicUrl.publicUrl
    }




    // This function handles form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            !formValues.title ||
            !formValues.publicationDate ||
            !formValues.content ||
            !formValues.author
        ) {
            toast.error("Please fill in the required fields")
            return;
        }

        // ADD THIS
        if (!file) {
            toast.error("Please select an image")
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
            status: "published"
        })

        if (error) {
            console.error("Failed to upload blog")
            toast.error("Failed to upload blog")
            setLoading(false)
            return;
        }

        toast.success("Blog added successfully!")

        setFormValues({
            title: "",
            tagline: "",
            content: "",
            image: "",
            author: "",
            publicationDate: new Date(),
            category: "",
            createdAt: new Date(),
            id: 0,
            slug: "",
            status: "published"
        })

        setFile(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }

        setLoading(false)
    }



    useEffect(() => {
        document.body.style.overflowY = showSchedulerForm ? " hidden " : "auto"

        return () => {
            document.body.style.overflowY = "auto"
        }

    }, [showSchedulerForm])

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
                    <TiptapEditor
                        content={formValues.content}
                        onChange={handleTipTapChange}
                    />
                </div>




                <div className="w-fit flex items-center gap-3 " >
                    <Button
                        variant="default"
                        disabled={loading}
                        className=" w-fit !text-base !py-2 !font-semibold   "
                    >
                        {loading ? <Loading /> : "Submit"}
                    </Button>


                    <Button
                        onClick={() => setShowSchedulerForm(true)}
                        variant="default"
                        type="button"
                        className=" w-fit !text-base !py-2 !font-semibold
                     bg-gray-700 text-white  "
                    >
                        Schedule post
                    </Button>
                </div>


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
                        value={String(formValues.publicationDate)}
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


            <PostScheduler
                data={formValues}
                setShowSchedulerForm={setShowSchedulerForm}
                showSchedulerForm={showSchedulerForm}
                imageUrl={() => uploadImage({ requireImage: false })}
                setFormValues={setFormValues}
            />

        </form>
    )
}
