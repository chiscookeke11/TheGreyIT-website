import Link from "next/link";





export default function IntroCourseCTASection() {
    return (
        <section className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center overflow-hidden rounded-2xl py-28 px-[4%] text-center mt-40 font-poppins ">

            {/* Background video */}
            <video
                src="/intro-courses-images/Far_4K_Motion_Background_Loop.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Dark overlay (optional but recommended) */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Content */}
            <div className="relative z-20 text-white space-y-3 ">
                <h2 className="text-3xl font-bold">Not sure you&apos;re ready yet?</h2>
                <p className="mt-4">Explore our intro courses and build your confidence before diving in.</p>
                <Link
                    className="mt-6 inline-flex w-full max-w-[200px] items-center justify-center rounded-lg bg-white px-4 py-3 text-base font-medium text-gray-900  transition hover:scale-90 "
                    href={"/intro"} >View intro courses </Link>
            </div>

        </section>
    )
}