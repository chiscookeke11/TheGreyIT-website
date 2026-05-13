"use client"


import Button from "@/components/UI/Button";
import { supabase } from "@/lib/supabaseClient";
import { CertificatesDataType } from "@/types/types";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../UI/Loading";


export default function VerifyCertificatePage() {

    const [certNumber, setCertNumber] = useState("");
    const [result, setResult] = useState<CertificatesDataType | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCertNumber(e.target.value)
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!certNumber) {
            toast.error("Please provide the certificate number")
            return
        };

        setLoading(true)

        const { data, error } = await supabase
            .from("certificates")
            .select("*")
            .eq("certifcate_number", certNumber)
            .maybeSingle();

        if (error) {
            setLoading(false)
            return;
        }

        if (!data) {
            setNotFound(true);
            setResult(null);
            setLoading(false)
        } else {
            toast.success("Certificate found!")
            setNotFound(false);
            setResult(data);
            setLoading(false)
        }

        setCertNumber("");
        setLoading(false)
    };





    return (
        <div className="w-full min-h-screen flex flex-col bg-white">


            <div className="w-full h-full flex items-center justify-center px-[4%] py-40 ">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-3xl bg-[#f2f5fc] rounded-md py-5 px-3 md:px-7 shadow-md flex flex-col items-start gap-6"
                >
                    <hr className="bg-gray-500 w-full border border-gray-500 my-3" />

                    <h3 className=" text-gray-700 font-semibold text-xl w-[90%] " >
                        Enter Certificate Number on the input box below to check certificate
                        authentication
                    </h3>

                    <div className="w-full min-w-xs flex items-center gap-3  ">
                        <input
                            type="text"
                            value={certNumber}
                            onChange={handleChange}
                            placeholder="Enter Cert No."
                            className="w-[70%] flex-1 outline-none border border-gray-700 h-full py-4 px-4 rounded-sm"
                        />
                        <Button variant="default">{loading ? <Loading /> : "Verify"}</Button>
                    </div>

                    {notFound && (
                        <div className=" w-full p-4 rounded-md mt-4 flex flex-col gap-3 items-start  ">

                            <Image src={"/verify_certificate/file.png"} width={500} height={500} alt="icon" className="w-[150px] h-[150px] mx-auto " />

                            <h3 className="text-red-600 font-semibold text-2xl mx-auto mb-2 text-center ">
                                Verification Unsuccessful
                            </h3>

                            <p className="text-base font-normal">Thank you for using the <b> The Grey IT & Educational Consults Certificate Verification Portal.</b>
                                We could not verify the certificate using the details provided. The information does <b>not match</b> any certificate recorded in our system.</p>



                            <ul className="flex flex-col gap-1 font-medium my-5 list-disc pl-5 ">
                                <h4> <b>Possible reasons include:</b> </h4>
                                <li>Incorrect Certificate ID</li>
                                <li>Expired or revoked certificate</li>
                                <li>A document that was <b>not issued</b> by The Grey IT</li>
                            </ul>


                            <p className="text-base font-normal">
                                Please review the details and try again. If you require assistance or wish to confirm authenticity manually, contact us:
                            </p>


                            <ul className="flex flex-col gap-1 font-medium my-5" >
                                <h4 className="text-lg font-semibold" ><b>Verification Office</b></h4>
                                <li>  Email: verification@thegreyit.org</li>
                                <li> Phone: +234-906 689 5390</li>
                                <li>Website: <a href="https://thegreyit.org" className="text-blue-600" target="_blank" >https://thegreyit.org</a></li>
                            </ul>


                            <p className="text-base font-normal">Only certificates issued directly by <b>The Grey IT </b> or authorised partners appear in this system.</p>
                        </div>

                    )}


                    {/* Result for Successful Verification  */}
                    {result && (
                        <div className=" w-full py-4 px-2 rounded-md mt-4 flex flex-col gap-3 items-start  ">

                            <Image src={"/verify_certificate/success.svg"} width={500} height={500} alt="icon" className="w-[150px] h-[150px] mx-auto " />


                            <h2 className="font-semibold text-green-700 text-2xl mb-2 mx-auto text-center ">
                                Certificate Verification Successful
                            </h2>

                            <p className="text-base font-normal">Thank you for using the <b>The Grey IT & Educational Consults Certificate Verification Portal.</b></p>

                            <p className="text-base font-normal">This certificate has been <b>successfully verified.</b> The information provided corresponds accurately with our official student training and certification records.</p>




                            <ul className="flex flex-col gap-1 font-medium my-5">
                                <h4 className="text-lg font-semibold" > <b>Verified Certificate Details</b> </h4>
                                <li>Student Name: {result.student_name} </li>
                                <li>Certificate ID: {result.certifcate_number} </li>
                                <li>Course Title: {result.course_title} </li>
                                <li>Award Type: {result.certificate_type} </li>
                                <li>Date of Completion: {new Date(result.date_of_completion).toLocaleDateString("en-GB")} </li>
                                <li>Verification Status: <i>Valid – Issued by The Grey IT & Educational Consults</i></li>
                            </ul>




                            <p className="text-base font-normal">This confirmation affirms that the certificate holder has completed the required training and demonstrated competence under our approved curriculum.</p>

                            <p className="text-base font-normal">For further authentication or official documentation, please contact:</p>






                            <ul className="flex flex-col gap-1 font-medium my-5" >
                                <h4 className="text-lg font-semibold" ><b>Verification Office</b></h4>
                                <li>  Email: verification@thegreyit.org</li>
                                <li> Phone: +234- 906 689 5390</li>
                                <li>Website: <a href="https://thegreyit.org" className="text-blue-600" target="_blank" >https://thegreyit.org</a></li>
                            </ul>


                            <p>Thank you for supporting transparent and credible skills development.</p>
                        </div>
                    )}

                    <hr className="bg-gray-500 w-full border border-gray-500 my-3" />
                </form>
            </div>
        </div>

    )
}