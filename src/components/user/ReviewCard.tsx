import Image from "next/image";



export default function ReviewCard() {
    return (
        <div className=" w-full max-w-2xl flex flex-col   gap-3 bg-white px-4 py-9 rounded-sm " >
            {/* the card header  */}
            <div className="w-full  flex flex-col md:flex-row items-start md:items-end md:justify-between gap-4 " >

                <div className="flex gap-4 items-center " >
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-950 overflow-hidden " >
                        <Image src={"/basketball.png"} alt="user image" height={500} width={500} className="w-full h-full object-center" />
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold" >Joan Perkins</h4>
                        <div>
                            stars 5.0
                        </div>
                    </div>
                </div>

                <p className="text-xs font-semibold text-gray-600 " >1 days ago</p>

            </div>

            {/* card body  */}
            <p className="text-sm font-normal text-gray-600 " >
                Download 15,000+ Design Resources.
                Download thousands of free & premium web design, illustration, bootstrap template, flutter app, icon, 3d illustration, and graphic assets for your UI, UX design project from UI Design
            </p>


        </div>
    )
}