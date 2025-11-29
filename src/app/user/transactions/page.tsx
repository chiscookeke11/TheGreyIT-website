import TransactionsTable from "@/components/user/TransactionsTable";





export default function Page() {
    return (
         <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 font-poppins bg-[#f2f5fc]   ">

              <div className="py-5 px-4 space-y-3" >
                  <h1 className=" text-xl md:text-2xl font-semibold text-black mr-auto  " >Transactions</h1>

                <hr className="w-full border-t border-gray-400 " />
              </div>


            <TransactionsTable/>
        </div>
    )
}