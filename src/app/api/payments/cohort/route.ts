import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

const parseReferenceTimestamp = (reference: string) => {
  const timestamp = Number(reference);
  return Number.isFinite(timestamp) ? timestamp : Date.now();
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      reference,
      status,
      course,
      amount,
      user_email,
      payment_plan,
    } = body;

    if (!reference || !status || !course || !amount || !user_email || !payment_plan) {
      return NextResponse.json(
        { error: "Missing required payment payload" },
        { status: 400 }
      );
    }

    const paymentTimestamp = parseReferenceTimestamp(reference);

    const { error } = await supabaseServer.from("cohort_enrollments").insert({
      reference,
      status,
      date: new Date(paymentTimestamp).toISOString(),
      course,
      amount,
      user_email,
      payment_plan,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, paymentTimestamp });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
