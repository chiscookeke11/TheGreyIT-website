'use client'

import { useEffect, useRef, useState } from "react"
import { ResearchBlogType, UpdateBlogProps, updateBlogType } from "@/types/types"
import { supabase } from "@/lib/supabaseClient"
import toast from "react-hot-toast"
import { X } from "lucide-react"
import { Spinner } from "./Spinner"
import { CustomCheckBox } from "./CustomCheckbox"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css";



const statusOptions: ResearchBlogType["status"][] = [
    "published",
    "scheduled",
]


export default function UpdateBlog({
    selectedIndex,
    updateBlogInUI,
    setShowEditModal,
}: UpdateBlogProps) {

    const [loading, setLoading] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState<updateBlogType | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const modalRef = useRef<HTMLFormElement | null>(null)

    const [formValues, setFormValues] = useState<updateBlogType>({
        title: "",
        content: "",
        tagline: "",
        author: "",
        image: "",
        publicationDate: "",
    })

    const [status, setStatus] = useState<ResearchBlogType["status"] | null>(null)

    const fileInputRef = useRef<HTMLInputElement | null>(null)


    //  this function closes the modal on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                setShowEditModal(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.body.style.overflowY = "hidden"

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.body.style.overflowY = "auto"
        }
    }, [])



    /* ---------------- FETCH BLOG -------------- */
    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true)


            const { data, error } = await supabase
                .from("blog")
                .select("*")
                .eq("id", selectedIndex)
                .single()

            if (error) {
                toast.error("Error fetching blog")
            } else {
                setSelectedBlog(data)
                setFormValues({
                    author: data.author,
                    content: data.content,
                    image: data.image,
                    publicationDate: data.publicationDate?.split("T")[0] || "",
                    title: data.title,
                    tagline: data.tagline ?? ""
                })

                setStatus(data.status)
            }

            setLoading(false)
        }

        if (selectedIndex) fetchBlog()
    }, [selectedIndex])

    /* ---------------- INPUT HANDLERS ---------------- */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormValues(prev => ({ ...prev, [name]: value }))
    }

    const handleTipTapChange = (value: string) => {
        setFormValues(prev => ({ ...prev, content: value }))
    }

    /* ---------------- IMAGE UPLOAD ---------------- */
    const uploadImageToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "lsp_preset")
        formData.append("cloud_name", "dmgwgxdd9")

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dmgwgxdd9/image/upload",
            {
                method: "POST",
                body: formData,
            }
        )

        if (!response.ok) throw new Error("Image upload failed")

        const data = await response.json()
        return data.secure_url
    }

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formValues.title.trim() || !formValues.content.trim()) {
            toast.error("Please fill in required fields")
            return
        }

        setLoading(true)

        try {
            let imageUrl = formValues.image

            if (file) {
                imageUrl = await uploadImageToCloudinary(file)
            }

            const { data, error } = await supabase
                .from("blog")
                .update({
                    title: formValues.title,
                    content: formValues.content,
                    author: formValues.author,
                    tagline: formValues.tagline,
                    publicationDate: formValues.publicationDate,
                    image: imageUrl,
                    status: status
                })
                .eq("id", selectedIndex)
                .select()


            if (error) {
                toast.error(error.message)
                return
            }

            const updatedBlog = data?.[0]
            updateBlogInUI(updatedBlog)

            toast.success("Blog updated successfully")
            setShowEditModal(false)
        } catch (err) {
            toast.error("Failed to update blog")
        } finally {
            setLoading(false)
        }
    }

    /* ---------------- LOADING SCREEN ---------------- */
    if (loading && !selectedBlog) {
        return (
            <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50">
                <Spinner />
            </div>
        )
    }




    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">

            <form
                ref={modalRef}
                onSubmit={handleSubmit}
                className="w-full max-w-2xl max-h-[95vh] overflow-y-auto bg-[#F7FCFE] shadow-md rounded-md p-8 flex flex-col gap-6"
            >

                <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="ml-auto text-red-600 cursor-pointer"
                >
                    <X size={28} />
                </button>

                <h2 className="text-center text-xl font-bold text-gray-700">
                    Update Blog
                </h2>

                {/* TITLE */}
                <label className="flex flex-col gap-1">
                    <span>Title *</span>
                    <input
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        className="border px-4 py-2 rounded-md"
                        required
                    />
                </label>

                {/* TITLE */}
                <label className="flex flex-col gap-1">
                    <span>Tagline *</span>
                    <input
                        name="tagline"
                        value={formValues.tagline}
                        onChange={handleChange}
                        className="border px-4 py-2 rounded-md"
                        required
                    />
                </label>

                {/* AUTHOR */}
                <label className="flex flex-col gap-1">
                    <span>Author</span>
                    <input
                        name="author"
                        value={formValues.author}
                        onChange={handleChange}
                        className="border px-4 py-2 rounded-md"
                    />
                </label>


                {/* STATUS */}
                <div className="flex flex-col gap-1">
                    <span>Status</span>
                    <div className=" flex items-center  gap-15 justify-items-stretch  "  >
                        {statusOptions.map((option) => {
                            const isChecked = status === option
                            return (
                                <CustomCheckBox
                                    key={option}
                                    checked={isChecked}
                                    label={option ?? ""}
                                    id={option?.toLowerCase() ?? ""}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setStatus(option)
                                        }
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* DATE */}
                <label className="flex flex-col gap-1">
                    <span>Publication Date</span>
                    <input
                        type="date"
                        name="publicationDate"
                        value={formValues.publicationDate}
                        onChange={handleChange}
                        className="border px-4 py-2 rounded-md"
                    />
                </label>

                {/* CONTENT */}
                <div className="flex flex-col gap-2">
                    <span>Content *</span>
                    <ReactQuill
                        theme="snow"
                        value={formValues.content}
                        onChange={handleTipTapChange}
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, 3, false] }],
                                ["bold", "italic", "underline", "strike"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                [{ align: [] }],
                                ["link", "image"],
                                ["clean"],
                            ],
                        }}
                        placeholder="Write your content..."
                        className="w-full  "
                    />
                </div>

                {/* IMAGE */}
                <label className="w-full flex flex-col gap-1">
                    <span className="text-lg font-semibold text-gray-700">Upload Image</span>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setFile(e.target.files[0])
                            }
                        }}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:text-white file:bg-gray-700 hover:file:bg-gray-400 file:cursor-pointer"
                    />

                    {formValues.image && (
                        <img
                            src={formValues.image}
                            alt="Blog image"
                            className="w-full h-48 object-cover rounded-md"
                        />
                    )}
                </label>

                {/* BUTTONS */}
                <div className="flex gap-4 ml-auto">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gray-700 text-white px-6 py-2 rounded-md"
                    >
                        {loading ? "Updating..." : "Update Blog"}
                    </button>
                </div>
            </form>
        </div>
    )
}