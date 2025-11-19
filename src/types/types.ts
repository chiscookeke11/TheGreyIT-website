


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
  skills?: string[]
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
  status: "successful" | "pending" | "failed";
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
}

export interface CertificatesDataType {
  user_id: string;
  course_id: string;
  doc_link: string;
  certificate_name: string;
  id: number;
  pdfName: string;
}
