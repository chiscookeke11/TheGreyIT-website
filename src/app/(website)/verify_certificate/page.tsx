import Button from "@/components/UI/Button";



export default function Page() {
    return (
        <div className="w-full min-h-screen flex flex-col bg-white " >
            <header className="h-[250px] bg-[#f2f5fc] flex flex-col items-start justify-end px-[2%] py-6 text-gray-700 font-semibold text-2xl md:text-4xl " >Students certificate Authentication</header>


            <div className="w-full h-full flex items-center justify-center px-[2%] py-40 bg-amber-900" >
                <form action="" className="w-full max-w-3xl bg-[#f2f5fc] rounded-md py-5 px-3 shadow-sm flex flex-col items-start gap-6   " >
                    <hr className="bg-gray-500 w-full border border-gray-500 " />

                    <h3> Enter Cert. No. on the input box below to check certificate authentication  </h3>


                    <div className="w-[60%] min-w-xs flex items-center gap-3 "  >
                        <input type="text" name="" id="" placeholder="Enter Cert No." className="w-full flex-1 outline-none border border-gray-700 h-full py-4 px-4 rounded-sm " />
                        <Button variant="default" >Verify</Button>
                    </div>

                </form>
            </div>
        </div>
    )
}