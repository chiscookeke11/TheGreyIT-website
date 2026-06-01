"use client"

import { supabase } from "@/lib/supabaseClient"
import { randomCode } from "@/lib/utils"
import { Copy } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"


export default function Page() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [referralCode, setReferralCode] = useState<string | null>(null)



    // input change function
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)

    }


    // This is the submit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);

        const normalizedEmail = email.trim().toLowerCase();

        //  STEP 1: Check if email exists in ambassadors_application
        const { data: ambassador, error: ambassadorError } = await supabase
            .from("ambassadors_application")
            .select("id")
            .eq("email", normalizedEmail)
            .maybeSingle();

        if (ambassadorError) {
            console.error("Error checking ambassador table:");
            toast.error("Something went wrong. Please try again.");
            setLoading(false);
            return;
        }

        if (!ambassador) {
            toast.error("You are not approved as an ambassador.");
            setLoading(false);
            return;
        }

        //  STEP 2: Check if referral already exists
        const { data: existingUser, error } = await supabase
            .from("user_data")
            .select("referral_code")
            .eq("email", normalizedEmail)
            .maybeSingle();

        if (error) {
            console.error("Error fetching user_data:");
            toast.error("Something went wrong.");
            setLoading(false);
            return;
        }

        if (existingUser?.referral_code) {
            setReferralCode(existingUser.referral_code);
            setLoading(false);
            return;
        }

        //  STEP 3: Generate unique referral code
        let generated_code;
        let exists = true;

        while (exists) {
            generated_code = randomCode(8);

            const { data: codeCheck } = await supabase
                .from("user_data")
                .select("id")
                .eq("referral_code", generated_code);

            exists = (codeCheck?.length ?? 0) > 0;
        }

        //  STEP 4: Insert new referral
        const { data: insertedData, error: insertError } = await supabase
            .from("user_data")
            .insert({
                referral_code: generated_code,
                user_id: null,
                referred_by: null,
                email: normalizedEmail,
                first_name: null,
                last_name: null
            })
            .select()
            .single();

        if (insertError) {
            console.error("Insert error:");
            toast.error("Failed to generate code");
            setLoading(false);
            return;
        }

        setReferralCode(insertedData.referral_code);
        toast.success("Referral code generated!");
        setLoading(false);
    };



    // Function to copy the referral code

    const copy_referral_code = async () => {
        if (!referralCode) return;
        try {
            await navigator.clipboard.writeText(referralCode);
            toast.success("Referral code copied!")
        }
        catch (err) {
            console.error("Failed to copy:");
            toast.error("Failed to copy referral code");
        }
    }



    return (
        <div className="w-full h-screen flex items-center justify-center py-20 px-[5%] font-poppins bg-[#f2f5fc] " >



            <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-sm shadow-xs bg-white py-7 px-4 flex items-center justify-center flex-col gap-7 " >

                <h1 className=" text-gray-800 text-2xl font-medium  " >Generate Referral Code</h1>

                <label htmlFor="email" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-base font-medium " >Enter your email</span>
                    <input type="email" id="email" name="email" onChange={handleChange} value={email} placeholder="" className="w-full py-3 px-5 border border-gray-700 outline-none focus:outline-none text-base rounded-sm " />
                </label>



                <button disabled={loading} className="font-syne bg-gray-700 w-full max-w-xs text-white  mb-5  px-6 py-2  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-sm md:text-base  border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm  " > {loading ? <Loader /> : "Generate Code"} </button>



                {
                    referralCode && (
                        <div className="flex items-center justify-center gap-3" >
                            <p className="text-red-500 font-medium text-base " >Your referral code is: </p>
                            <button
                                type="button"
                                onClick={copy_referral_code}
                                className=" cursor-pointer  text-gray-700 flex items-center justify-center gap-2 text-lg" >
                                {referralCode} <Copy size={15} />
                            </button>
                        </div>
                    )
                }

            </form>



        </div>
    )
}



const Loader = () => {
    return (
        <>
            <span className="inline-flex space-x-1 ml-1">
                <span className={`w-2 h-2  rounded-full animate-bounce [animation-delay:-0.3s] bg-white `} ></span>
                <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s] bg-white `} ></span>
                <span className={`w-2 h-2  rounded-full animate-bounce bg-[#ffffff] `} ></span>
            </span>
        </>
    )
}