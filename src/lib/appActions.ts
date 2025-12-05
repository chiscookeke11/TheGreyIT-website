import { supabase } from "./supabaseClient"
import emailjs from 'emailjs-com';





// Function to fetch all courses
export const fetchAllCourses = async () => {

    const { data, error } = await supabase.from("course").select("*")

    if (error) {
        console.error("Failed to fetch courses:", error)
        return null
    }
    return data
}



// getting a user Id
const { data: { user }, error,} = await supabase.auth.getUser();


// function to fetch user data
export const fetchUserData = async () => {

    const { data, error } = await supabase.from("user_data").select("*").eq('user_id', user?.id)

    if (error) {
        console.error("Error fetching user data:", error)
        return null;
    }

    return data[0] || null
}



// Function to fetch user transactions
export const fetchUserTransactions = async () => {
    const { data, error } = await supabase.from("transactions").select("*").eq('user_id', user?.id);

    if (error) {
        console.error("Error fetching transactions:", error);
        return null;
    }

    return data;
};



// Function fetch user certificates
export const fetchUserCertificates = async (certifiedCourses: number[]) => {
    const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .in("course_id", certifiedCourses).eq("user_id", user?.id);

    if (error) {
        console.error("Error fetching certificates:", error);
        return null;
    }

    return data;
};




// Function to add or remove bookmarks
export const toggleBookmark = async (userId: string, course_id: string) => {

    // Fetching the current bookmarks
    const { data: bookmarksData, error: fetchError } = await supabase.from("user_data").select("bookmarks").eq("user_id", userId).maybeSingle()


    if (fetchError) {
        console.error(fetchError)
        return;
    }

    let bookmarks = bookmarksData?.bookmarks || []

    // The toggle logic
    if (bookmarks.includes(course_id)) {
        bookmarks = bookmarks.filter((id: string) => id !== course_id)
    }

    else {
        bookmarks.push(course_id)
    }

    // update supabase array column
    const { error: updateError } = await supabase.from("user_data").update({ bookmarks: bookmarks }).eq("user_id", userId)

    if (updateError) {
        console.error(updateError)
        return;
    }


    return bookmarks;
}



export const sendPaymentConfirmationEmail = (data: {
  name: string;
  email: string;
  course_title: string;
  reference: string;
  status: string;
  date: string;
  dashboard_link: string;
}) => {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_PAYMENT_CONFIRMATION_TEMPLATE_ID!,
    {
      name: data.name,
      email: data.email,
      course_title: data.course_title,
      reference: data.reference,
      status: data.status,
      date: data.date,
      dashboard_link: data.dashboard_link,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
};
