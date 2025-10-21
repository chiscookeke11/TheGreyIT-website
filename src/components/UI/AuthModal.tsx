"use client"

import { supabase } from "@/lib/supabaseClient"




export default function AuthModal() {

const handleGoogleLogin = async () => {
    const {error} = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/admin`
        }
    });


    if (error) console.error("Google login failed:", error.message)
}





    return (
        <div>
            <div className="p-8 rounded-lg h-screen bg-white flex flex-col items-center justify-center gap-6">
                <h2 className="text-2xl font-semibold text-gray-700">Admin Login</h2>
                <button
                    onClick={handleGoogleLogin}
                    className="bg-gray-700 text-white py-3 px-6 cursor-pointer rounded-md hover:bg-gray-500 transition-all font-poppins "
                >
                    Continue with Google
                </button>
            </div>
        </div>
    )
}