import {
    LayoutDashboard,
    BookOpen,
    Receipt,
    CalendarCheck,
    Award,
    Heart,
    MessageSquare,
    User,
} from "lucide-react";

export const sideNavLinks = [
    {
        label: "Dashboard",
        route: "/user",
        icon: LayoutDashboard,
    },
    {
        label: "Courses",
        route: "/user/Courses",
        icon: BookOpen,
    },
    {
        label: "Transactions",
        route: "/user/transactions",
        icon: Receipt,
    },
    {
        label: "Attendance",
        route: "/user/attendance",
        icon: CalendarCheck,
    },
    {
        label: "Certificates",
        route: "/user/certificates",
        icon: Award,
    },
    {
        label: "Wishlist",
        route: "/user/wishlist",
        icon: Heart,
    },
    {
        label: "Reviews",
        route: "/user/reviews",
        icon: MessageSquare,
    },
    {
        label: "Profile",
        route: "/user/profile",
        icon: User,
    },
];
