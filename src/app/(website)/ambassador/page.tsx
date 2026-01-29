import VolunteerPageComponent from "@/components/volunteer/VolunteerPageComponent"
import { Metadata } from "next"



export const metadata: Metadata = {
    title: "Ambassador | TheGreyIT",
    description: "Join TheGreyIT as a volunteer and contribute to our mission of empowering individuals through technology. Explore various volunteer opportunities and make a difference today!",
}


export default function Page() {
    return (
        <div>
            <VolunteerPageComponent />
        </div>
    )
}