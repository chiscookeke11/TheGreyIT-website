import PasswordResetLink from "@/components/password_reset_link/password_reset_link";
import {Spinner} from "@/components/UI/Spinner";
import { Suspense } from "react";




export default function Page() {
    return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center " ><Spinner/></div>}>
      <PasswordResetLink />
    </Suspense>
    )
}