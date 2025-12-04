import { number } from "framer-motion";



export interface CourseDataTypes {
  title: string,
  description: string,
  imageUrl: string,
  bgColor: string,
  duration: string,
  price: number,
  rating: number,
  id?: string,
  pdfName?: string,
  skills?: string[],
  tutor: string,
  enrolled_students: string[] | null
}





export interface ResearchBlogType {
  id: number;
  image: string;
  category: string;
  title: string;
  author: string;
  createdAt: Date;
  content: string
  publicationDate: Date
};


export interface ProfileDataType {
  id: number,
  name: string,
  position: string,
  linkedInUrl: string,
  imageUrl: string,
  about: string
}




export interface Results {
  hasMinLength: boolean
  hasDigit: boolean
  hasSpecialCharacter: boolean
  hasUpperCase: boolean
  hasLowerCase: boolean
}



export interface TransactionType {
  id: number;
  course: string;
  reference: string;
  status: "success" | "pending" | "failed";
  date: Date;
}


export interface Bookmark {
  course_id: number;
  course: CourseDataTypes;
};


export interface UserData {
  id: number;
  user_id: string;
  active_courses: number;
  referral_code: string;
  created_at: string;
  list_enrolled_courses: number[]
  list_completed_courses: number[]
  bookmarks: number[];
  user_image: string;
}

export interface CertificatesDataType {
  user_id: string;
  course_id: string;
  doc_link: string;
  certificate_name: string;
  id: number;
  pdfName: string;
  certifcate_number: number;
  student_name: string;
  course_title: string;
  certificate_type: string;
  date_of_completion: Date;
}




export interface reviewDataType {
  id: number;
  userName: string;
  userImage: string;
  review: string;
  userRating: number;
  userReviewDate: Date;
  courseId: number
}



export type PaystackReference = {
  message: string;
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
};



export interface TeamMemberDataType {
  id: number;
  name: string;
  title: string;
  image: string;
  socials: {
    linkedIn: string;
    twitter: string
  };
  description: string;
  coreSkills?: string[];
  tools?: string[];
  certifications?: string[]

}
