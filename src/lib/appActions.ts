import { supabase } from "./supabaseClient"





// Function to fetch all courses
export const fetchAllCourses = async () => {

    const { data, error } = await supabase.from("course").select("*")

    if (error) {
        console.error("Failed to fetch courses:", error)
        return null
    }
    return data
}




// function to fetch user data
export const fetchUserData = async () => {

    const { data, error } = await supabase.from("user_data").select("*")

    if (error) {
        console.error("Error fetching user data:", error)
        return null;
    }

    return data[0] || null
}



// Function to fetch user transactions
export const fetchUserTransactions = async () => {
    const { data, error } = await supabase.from("transactions").select("*");

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
        .in("course_id", certifiedCourses);

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