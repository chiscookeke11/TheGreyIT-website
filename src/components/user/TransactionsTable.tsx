import { transactionData } from "@/data/TransactionData";


export default function TransactionsTable() {
  return (
    <table className="w-full">
      <caption className="sr-only">
        Payment Stream Management Table - Showing current streams with details and actions
      </caption>

      <thead>
        <tr>
          <th className="min-w-[80px] w-[80px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
            S/N
          </th>
          <th className="min-w-[110px] w-[150px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
            Course
          </th>
          <th className="min-w-[102px] w-[132px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
            Reference
          </th>
          <th className="min-w-[80px] w-[120px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
            Status
          </th>
          <th className="min-w-[80px] w-[120px] h-[72px] text-center bg-gray-700 p-[10px] text-xs md:text-base font-bold text-[#E1E1E1]">
            Date
          </th>
        </tr>
      </thead>

      <tbody>
        {transactionData.map((t, index) => (
          <tr key={t.id} className="border-b border-gray-600">
            <td className="text-center p-3 text-sm md:text-base">{index + 1}</td>
            <td className="text-center p-3 text-sm md:text-base">{t.course}</td>
            <td className="text-center p-3 text-sm md:text-base">{t.reference}</td>
            <td
              className={`text-center p-3 text-sm md:text-base font-semibold ${
                t.status === "successful"
                  ? "text-green-500"
                  : t.status === "pending"
                  ? "text-yellow-400"
                  : "text-red-500"
              }`}
            >
              {t.status}
            </td>
            <td className="text-center p-3 text-sm md:text-base">{t.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
