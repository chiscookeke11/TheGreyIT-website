import Spinner from "@/components/UI/Spinner";
import VerifyEmail from "@/components/verify-email-component/verify-email";
import { Suspense } from "react";




export default function Page() {
    return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center " ><Spinner/></div>}>
      <VerifyEmail />
    </Suspense>
    )
}