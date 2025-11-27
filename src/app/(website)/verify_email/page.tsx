import Button from "../../../components/UI/Button";




export default function Page() {
    return (
        <div className="w-full h-screen flex items-center justify-center py-5 px-[4%] bg-[#f2f5fc] flex-col gap-5 font-poppins " >

            <h1 className=" text-2xl font-bold text-gray-700 text-center ">Sign Up successful!<br /> Please confirm your email</h1>

            <a href="https://mail.google.com/" target="_blank">
                <Button variant="default" className="font-syne !bg-gray-700 text-white ">Go to Gmail</Button>
            </a>

        </div>
    )
}