import { principles } from "@/data/PrinciplesData";




export default function Principles() {
    return (
            <section className="bg-gray-50 py-20 px-6 md:px-12 font-poppins">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
        Our Operating Principles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center justify-items-center  ">
        {principles.map((item, index) => (
          <div
            key={index}
            className="bg-white px-5 py-8 rounded-2xl shadow-sm border border-gray-200"
          >
            <h3 className=" text-xl font-semibold mb-3">{item.title}</h3>
            <p className="font-semibold text-base  mb-3">{item.subtitle}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
    )
}