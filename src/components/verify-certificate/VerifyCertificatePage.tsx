"use client"


import Button from "@/components/UI/Button";
import { supabase } from "@/lib/supabaseClient";
import { CertificatesDataType } from "@/types/types";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../UI/Loading";
import { CircleAlert, Mail, Phone } from "lucide-react";


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
        <div className="w-full min-h-screen flex flex-col bg-white pt-20 md:pt-28 ">



            <div className="w-full min-h-screen flex flex-col md:flex-row items-stretch justify-between border border-[#E2E8F0]   " >

                {/* the left side */}
                <div className="  basis-[50%] flex items-center justify-center
                 border-t-0 border border-[#E2E8F0] py-18  px-[3%]  "  >

                    <div className="flex flex-col items-start gap-7 max-w-xl w-full h-fit" >

                        <div className=" space-y-3 text-start " >
                            <h1 className=" text-[#0F172A] font-semibold text-xl w-[90%] font-poppins " >Certificate Authentication</h1>

                            <p className="font-poppins text-sm md:text-base text-[#64748B] " >Enter Certificate Number on the input box below to check certificate authentication</p>
                        </div>


                        <div className=" w-full bg-white border border-[#E2E8F0] p-4 md:p-8 rounded-[8px]
                             flex flex-col items-start gap-3 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] "  >

                            <h3 className="font-inter md:text-sm font-semibold text-[#0F172A] text-xs   " >Certificate Number</h3>


                            <form
                                onSubmit={handleSubmit}
                                className="w-full flex items-center justify-between h-[50px] " >
                                <input
                                    type="text"
                                    value={certNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Cert No."
                                    className="w-full flex-1 outline-none border border-[#E2E8F0] h-full
                                         py-2 px-4 rounded-sm rounded-r-none font-poppins text-sm  "
                                />

                                <Button variant="default" className="h-full rounded-l-none bg-[#1E3A8A] text-white text-sm! hover:brightness-90! hover:bg-[#1E3A8A]! " >
                                    {loading ? <Loading /> : "Verify Certificate"}
                                </Button>
                            </form>

                            <span className=" flex items-center justify-start gap-2 mt-3 "  >
                                <CircleAlert size={12} />
                                <p className="text-xs md:text-sm text-[#64748B] font-inter  " >Ensure you include all dashes when entering the ID.</p>
                            </span>
                        </div>




                        <div className="border-t border-t-[#E2E8F0] pt-7 w-full mt-8 flex flex-col items-start gap-2 " >
                            <h4 className="font-serif text-lg text-[#000000] font-bold " >Need assistance?</h4>
                            <p className="text-sm font-inter text-[#64748B] font-normal " >If you are experiencing issues with the verification process, our
                                verification office is available to help.</p>


                            <div className="w-full flex items-center gap-7 mt-3 " >

                                <span className="flex items-center justify-start gap-2" >
                                    <Mail size={13.5} color="#1E3A8A" />
                                    <p className="text-[#0F172A] font-medium text-sm font-inter " >contact@thegreyit.org</p>
                                </span>

                                <span className="flex items-center justify-start gap-2">
                                    <Phone size={13.5} color="#1E3A8A" />
                                    <p className="text-[#0F172A] font-medium text-sm font-inter ">09066895390</p>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>


                {/* the right side */}
                <div className=" basis-[50%] bg-[#F1F5F9] flex items-center justify-center relative py-18 px-[3%] " >

                    {!result && !notFound && (
                        <div className="w-40 h-40 rounded-full shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]" >
                            <Image src={"/verify_certificate/pulse.gif"} width={500} height={500} alt="icon" className="w-full h-full rounded-full " />
                        </div>
                    )}

                    {/* if a result is found */}
                    {result && (
                        <div className="w-full max-w-2xl rounded-[12px] bg-white h-fit p-5 md:p-10
                    border border-[#E2E8F0] flex flex-col items-center gap-8 font-poppins
                     shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]" >

                            <span className="block size-20 rounded-full p-2
                        shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] " >
                                <Image src={"/verify_certificate/success.svg"} width={500} height={500} alt="icon" className="w-full h-full " />
                            </span>

                            <div className="space-y-2" >
                                <h2 className="font-semibold text-green-700 text-xl md:text-2xl mb-4 mx-auto text-center ">
                                    Verification Successful
                                </h2>
                                <p className="text-sm font-normal text-start">Thank you for using the <b>The Grey IT &
                                    Educational Consults Certificate Verification Portal.</b></p>

                                <p className="text-sm font-normal text-start ">This certificate has been <b>successfully verified.</b>
                                    The information provided corresponds accurately with our official student training and certification records.</p>
                            </div>


                            <ul className="flex flex-col gap-4 font-medium w-full  ">
                                <h4 className="text-lg font-semibold font-serif mb-4 tracking-wide " >
                                    Verified Certificate Details </h4>


                                <li className="w-full flex items-center justify-between text-sm text-[#64748B]
                                font-inter  font-normal border-b border-[#E2E8F0] pb-2 " >
                                    Student Name:
                                    <span className="font-semibold text-[#0F172A] " >{result.student_name}</span> </li>


                                <li className="w-full flex items-center justify-between text-sm text-[#64748B]
                                font-inter  font-normal border-b border-[#E2E8F0] pb-2 ">
                                    Certificate ID:
                                    <span className="font-semibold text-[#0F172A] " >{result.certifcate_number}</span> </li>



                                <li className="w-full flex items-center justify-between text-sm text-[#64748B]
                                font-inter  font-normal border-b border-[#E2E8F0] pb-2 ">
                                    Course Title:
                                    <span className="font-semibold text-[#0F172A] "> {result.course_title}</span> </li>



                                <li className="w-full flex items-center justify-between text-sm text-[#64748B]
                                font-inter  font-normal border-b border-[#E2E8F0] pb-2 ">
                                    Award Type:
                                    <span className="font-semibold text-[#0F172A] ">{result.certificate_type}</span> </li>



                                <li className="w-full flex items-center justify-between text-sm text-[#64748B]
                                font-inter  font-normal border-b border-[#E2E8F0] pb-2 " >
                                    Date of Completion:
                                    <span className="font-semibold text-[#0F172A] ">{new Date(result.date_of_completion).toLocaleDateString("en-GB")} </span>
                                </li>


                                <li className="w-full flex items-center justify-between text-sm text-[#64748B]
                                font-inter  font-normal border-b border-[#E2E8F0] pb-2 ">
                                    Verification Status:
                                    <span className="font-semibold text-[#15803D] "><i>Valid – Issued by The Grey IT & Educational Consults</i></span></li>
                            </ul>


                            <div className="w-full bg-[#F1F5F9] py-6 px-4 flex items-start justify-center text-start flex-col gap-3 text-[#64748B] border border-[#E2E8F0] rounded-[4px] " >

                                <p className="text-xs font-normal">This confirmation affirms that the certificate holder has completed the required training and demonstrated competence under our approved curriculum.</p>

                                <p className="text-xs font-normal">For further authentication or official documentation, please contact:</p>



                                <ul className="flex flex-col gap-1 font-medium  w-full " >
                                    <h4 className="text-xs font-semibold" >
                                        <b>Verification Office</b></h4>

                                    <li className="text-xs font-normal " >
                                        Email: verification@thegreyit.org</li>


                                    <li className="text-xs font-normal "> Phone: +234- 906 689 5390</li>


                                    <li className="text-xs font-normal ">Website:
                                        <a href="https://thegreyit.org"
                                            className="text-blue-600"
                                            target="_blank" > https://thegreyit.org</a></li>
                                </ul>
                            </div>

                            <p className="text-sm font-normal my-4 " >Thank you for supporting transparent and credible skills development.</p>




                        </div>
                    )}


                    {/* if no result was found  */}

                    {notFound && (
                        <div className="w-full max-w-2xl rounded-[12px] bg-white h-fit p-5 md:p-10
                    border border-[#E2E8F0] flex flex-col items-center gap-8 font-poppins
                     shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">


                            <span className="block size-20 rounded-full p-2
                        shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] " >
                                <Image src={"/verify_certificate/file.png"} width={500} height={500} alt="icon" className="w-full h-full " />
                            </span>

                            <div className="space-y-3 text-start">
                                <h2 className="font-semibold text-red-600 text-xl md:text-2xl mb-4 mx-auto text-center ">
                                    Verification Unsuccessful
                                </h2>

                                <p className="text-sm font-normal text-start">Thank you for using the <b> The Grey IT & Educational Consults Certificate Verification Portal.</b>
                                    We could not verify the certificate using the details provided. The information does <b>not match</b> any certificate recorded in our system.</p>
                            </div>


                            <ul className="flex flex-col gap-1 font-medium  w-full list-disc  ">
                                <h4 className="text-sm font-semibold mb-2">
                                    <b>Possible reasons include:</b> </h4>



                                <li className="w-full text-xs text-[#64748B]  font-inter  font-normal mb-1 ">Incorrect Certificate ID</li>


                                <li className="w-full text-xs text-[#64748B]  font-inter  font-normal mb-1 ">Expired or revoked certificate</li>


                                <li className="w-full text-xs text-[#64748B]  font-inter  font-normal mb-1 ">A document that was <b>not issued</b> by The Grey IT</li>
                            </ul>


                            <p className="text-sm font-normal text-[#64748B]">
                                Please review the details and try again. If you require assistance or wish to confirm authenticity manually, contact us:
                            </p>


                            <ul className="flex flex-col gap-1 font-medium  w-full" >
                                <h4 className="text-xs font-semibold" ><b>Verification Office</b></h4>
                                <li className="text-xs font-normal " >  Email: verification@thegreyit.org</li>
                                <li className="text-xs font-normal "> Phone: +234-906 689 5390</li>
                                <li className="text-xs font-normal ">Website: <a href="https://thegreyit.org" className="text-blue-600" target="_blank" >https://thegreyit.org</a></li>
                            </ul>


                            <p className="text-sm font-normal my-4  ">Only certificates issued directly by <b>The Grey IT </b> or authorised partners appear in this system.</p>



                        </div>
                    )}


                </div>



            </div>


        </div >

    )
}