import Image from "next/image";



export default function OurMission() {
    return (
        <section className="bg-white overflow-hidden w-full">
            {/* Container */}
            <div className="mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-10 place-items-center justify-items-center  ">
                    {/* Text */}
                    <div className="space-y-7 text-gray-800 font-poppins max-w-6xl ">
                        <h1 className="text-2xl md:text-4xl font-extrabold ">
                            Our Mission
                        </h1>

                        <p className="text-base lg:text-lg leading-relaxed">
                            Riskified aims to empower your business to unleash ecommerce growth by <span className="font-semibold">outsmarting risk.</span> Ecommerce fraud teams play a crucial role in enabling their company’s growth and profitability. To do so, you require an enterprise-grade fraud and risk intelligence solution that can efficiently combat fraud, curb policy abuse, and boost revenue to the max. The problem is, the speed, scale, and sophistication of fraud and abuse can stretch the team and profit margins thin.
                        </p>

                        <p className="text-base lg:text-lg font-medium">
                            We believe risk should never keep you from growing your business
                            with confidence.
                        </p>

                        <p className="text-base lg:text-lg leading-relaxed">
                            That’s why we don’t just promise great business outcomes — we are{" "}
                            <span className="font-semibold">accountable</span> for them. As
                            part of the strongest network of merchant brands that rely on our
                            accurate machine learning approach, you can shift fraud chargeback
                            liability and optimize performance according to your risk
                            tolerance and business goals. Take risk off the table with
                            Riskified, and put your business on the sure path to growth and
                            profitability.
                        </p>
                    </div>



                        {/* Sharp rectangle with soft shadow */}
                        <div className="overflow-hidden shadow-2xl rounded-xl w-full aspect-[16/9] min-h-[350px] ">
                            <Image
                                src="/community-page/test.jpg"
                                alt="Riskified team collaborating"
                                width={500}
                                height={500}
                                className="w-full h-full object-cover rounded-xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
        </section>
    );
}