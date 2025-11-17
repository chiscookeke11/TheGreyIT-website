import TransactionsTable from "@/components/user/TransactionsTable";





export default function Page() {
    return (
         <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 font-poppins bg-[#f2f5fc]   ">
            <TransactionsTable/>
        </div>
    )
}