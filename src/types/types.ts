


export interface CourseDataTypes {
  title: string,
  description: string,
  shorter_Description?: string,
  imageUrl: string,
  bgColor: string,
  duration?: string[],
  price: number,
  rating: number,
  id?: string,
  pdfName?: string,
  skills?: string[],
  what_you_will_learn?: string[],
  Who_Should_Enrol?: string[],
  courseFormat?: string[],
  projects?: string[],
  post_graduation?: string[],
  learning_mode?: string,
  onlineFee?: number,
  inhouseFee?: number,
  is_active?: boolean,
  skill_level?: string,
  total_reviews?: number,
  slug?: string
}





export interface ResearchBlogType {
  id: number;
  image: string;
  category: string;
  title: string;
  author: string;
  createdAt: Date;
  content: string
  publicationDate: Date;
  slug: string;
};


export interface ProfileDataType {
  id: number,
  name: string,
  position: string,
  linkedInUrl: string,
  imageUrl: string,
  about: string,
  slug: string
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
  courseId: number;
  userEmail: string;
  user_id: string;
  slug?: string
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
  certifications?: string[];
  motivation?: string;
  slug: string;
}



export interface VolunteerFormDataType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
  school: string;
  department: string;
  levelOfStudy: string;
  educationStatus: "Student" | "Graduate" | "";
  preferredRole: "Student Volunteer" | "Graduate Ambassador" | "";
  interests: string[];
  howCanYouHelp: "Social media posting"
  | "Sharing opportunities in groups (WhatsApp, Telegram, campus)"
  | "Content writing or captions"
  | "Event promotion (online/offline)"
  | "Referrals & word-of-mouth"
  | "";
  availability: "2-4 hours" | "5-8 hours" | "Flexible" | "",
  startOptions: "Immediately" | "Within 1-2 weeks" | "",
  benefits: string[],
  otherBenefit: string,
  motivation: string,
  socialMedia: "LinkedIn" | "Instagram" | "X" | "Tiktok" | "",
  consent:
  " I agree to represent TheGreyIT professionally"
  | "I consent to my information being used for programme coordination"
  | "I confirm the information provided is correct"
  | ""
}



export interface customSelectTypes {
  label: string;
  value: string
}