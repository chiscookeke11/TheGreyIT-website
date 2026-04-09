import { supabase } from "@/lib/supabaseClient";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const INTRO_FEE = 1000;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await supabase
    .from("cohort_2026_courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) {
    return {
      title: "Intro course not found | TheGreyIT",
      description: "The intro course could not be found.",
      robots: { index: false },
    };
  }

  return {
    title: `${data.title} Intro | TheGreyIT`,
    description: `Quick intro for ${data.title} at ₦1,000 with easy online registration and payment.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const { data } = await supabase
    .from("cohort_2026_courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) {
    return (
      <div className="pt-28 px-[2%] md:px-[14%] min-h-[60vh] flex items-center justify-center bg-white">
        <p className="font-poppins text-xl font-semibold text-gray-900">Intro course not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white pt-24 md:pt-40 pb-16 px-[2%] md:px-[14%] font-poppins">
      <div className="w-full h-[48vh] relative overflow-hidden rounded-xl bg-gray-200">
        <Image src={data.image || ""} alt={data.title} fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 z-10 flex flex-col gap-4 text-white px-[4%] items-start justify-center">
          <p className="font-medium text-sm md:text-base tracking-wide">QUICK INTRO CLASS</p>
          <h1 className="font-bold text-2xl md:text-5xl">{data.title}</h1>
          <p className="text-sm md:text-base">One-time intro fee: ₦{INTRO_FEE.toLocaleString()}</p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">About this quick intro</h2>
          <p className="mt-4 text-sm md:text-base text-gray-700 leading-7">
            {data.description || "This intro class gives you a quick, practical overview of the course and helps you get started fast."}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 p-6 md:p-8 h-fit">
          <h3 className="text-lg font-semibold text-gray-900">Fee</h3>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
            <span>Quick intro access</span>
            <span className="font-medium text-gray-900">₦{INTRO_FEE.toLocaleString()}</span>
          </div>

          <Link
            href={`/intro/${data.slug}/register`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-700 transition"
          >
            Register & Pay
          </Link>
        </div>
      </div>
    </div>
  );
}
