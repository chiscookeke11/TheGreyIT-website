"use client"

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';

export default function Page() {
    const [attendance, setAttendance] = useState([]);


    // Fetch attendance from API
    const fetchAttendance = async () => {
        try {
            const res = await fetch("/api/markAttendance");
            const data = await res.json();
            setAttendance(data);
        } catch (error) {
            console.error("Failed to fetch attendance:", error);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    // Example local data fallback
    const fetchedAttendance = attendance.length ? attendance : [
        { "Name": "Chinedu", "Email": "chiscookeke11@gmail.com", "Present": "YES" },
        { "Name": "Mary", "Email": "mary@gmail.com", "Present": "YES" },
        { "Name": "John", "Email": "Johnpaul@gmail.com", "Present": "NO" }
    ];

    const myAttendance = fetchedAttendance.find(r => r.Email === "chiscookeke11@gmail.com");

    // Build events
    const attendanceEvents = [
        {
            start: "2025-11-01",
            end: "2025-12-02",
            display: "background",
            backgroundColor: "#374151"
        },
        // Only add date if Present is YES
        ...(myAttendance?.Present?.toUpperCase() === "YES"
            ? [{ title: "Attended", date: "2025-11-04" }]
            : []),
        { title: "Attended", date: "2025-11-11" },
        { title: "Attended", date: "2025-11-20" }
    ];

    return (
        <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 items-center justify-center font-poppins bg-[#f2f5fc] py-10 px-5">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Attendance Calendar</h2>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={attendanceEvents}
                    height="auto"
                    eventBackgroundColor="#16a34a"
                    eventBorderColor="#16a34a"
                    eventTextColor="#ffffff"
                />
            </div>
        </div>
    );
}
