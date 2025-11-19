"use client"

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';





const attendanceEvents = [

    {
        start: "2025-11-01",
        end: "2025-12-02",
        display: "background",
        backgroundColor: "#374151"
    },


    // Actual days the user attended
    { title: "Attended", date: "2025-11-04" },
    { title: "Attended", date: "2025-11-11" },
    { title: "Attended", date: "2025-11-20" }
];

export default function Page() {


      const [attendance, setAttendance] = useState([]);

  const fetchAttendance = async () => {
    const res = await fetch("/api/markAttendance");
    const data = await res.json();
    setAttendance(data);
  };



    return (
        <div className="w-full h-full min-h-[60vh] flex flex-col gap-7 items-center justify-center font-poppins bg-[#f2f5fc] py-10 px-5   ">




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


             <div className="p-6">
      <button
        onClick={fetchAttendance}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Load Attendance
      </button>

      {attendance.length > 0 && (
        <table className="mt-4 border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Present</th>
            </tr>
          </thead>
          <tbody>
            {/* {attendance.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{row.Name}</td>
                <td className="border px-2 py-1">{row.Email}</td>
                <td className="border px-2 py-1">{row.Present}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      )}
    </div>
        </div>
    )
}