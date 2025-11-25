import { reviewDataType } from "@/types/types";

export const mockReviews: reviewDataType[] = [
  {
    rating: 4.5,
    courseName: "Introduction to Blockchain",
    userReview: {
      userName: "Chinedu Okeke",
      userImage: "https://randomuser.me/api/portraits/men/32.jpg",
      review: "This course was insightful and well-structured. Highly recommend!",
      userRating: 4,
      userReviewDate: new Date("2025-11-12")
    }
  },
  {
    rating: 5,
    courseName: "Advanced Chemistry",
    userReview: {
      userName: "Amaka Uche",
      userImage: "https://randomuser.me/api/portraits/women/45.jpg",
      review: "Excellent explanations and hands-on examples. Loved it!",
      userRating: 3,
      userReviewDate: new Date("2025-12-12")
    }
  },
  {
    rating: 3.5,
    courseName: "Web Development Bootcamp",
    userReview: {
      userName: "Ifeanyi Obi",
      userImage: "https://randomuser.me/api/portraits/men/22.jpg",
      review: "Good course, but could use more real-world projects.",
      userRating: 2,
      userReviewDate: new Date("2025-12-12")
    }
  },
  {
    rating: 4,
    courseName: "Sustainable Materials",
    userReview: {
      userName: "Adaeze Nwosu",
      userImage: "https://randomuser.me/api/portraits/women/10.jpg",
      review: "Learned a lot about biodegradable polymers. Very useful!",
      userRating: 5,
      userReviewDate: new Date("2025-11-12")
    }
  },
  {
    rating: 5,
    courseName: "React for Beginners",
    userReview: {
      userName: "Tunde Balogun",
      userImage: "https://randomuser.me/api/portraits/men/50.jpg",
      review: "Perfect for starting React development. Clear and practical!",
      userRating: 5,
      userReviewDate: new Date("2025-12-12")
    }
  }
];
