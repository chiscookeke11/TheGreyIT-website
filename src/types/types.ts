


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
  tagline?: string
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
  amount: number;
  payment_plan?: string;
  user_email: string;
}


export interface Bookmark {
  course_id: number;
  course: CourseDataTypes;
};


export interface UserData {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  active_courses: number;
  referral_code: string;
  created_at: string;
  list_enrolled_courses: number[]
  list_completed_courses: number[]
  bookmarks: number[];
  user_image: string;
  email: string;
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
  id?: string;
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
  preferredRole: "Student Ambassador" | "Graduate Ambassador" | "";
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
  consent:
  "Yes, I consent"
  | ""
}



export interface customSelectTypes {
  label: string;
  value: string
}



export interface courseEnrollmentsDataType {
  id: string,
  user_id: string,
  course_id: number,
  created_at: Date,
  transaction_id: number,
  payment_Method: string,
  learning_Mode: string,
  amount: number
}


export interface UpdateBlogProps {
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIndex: string
  updateBlogInUI: (blog: ResearchBlogType) => void
}

export interface updateBlogType {
  title: string,
  content: string,
  author: string,
  image: string,
  tagline: string,
  publicationDate: string
}


export interface CohortCourseTypes {
  title: string;
  id: string;
  online_fee: number;
  inhouse_fee: number;
  image: string;
  slug?: string;
  duration: string;
  description?: string;
}



export interface CohortStudentRegistrationTypes {
  fullname: string;
  email: string;
  gender: "male" | "female" | "";
  phone_number: string;
  whatsapp_number: string;
  city: string;
  state: string;
  country: string;
  learning_mode: "Online" | "Inhouse",
  course: string;
  priceToPay: Number;
  payment_plan: "full" | "part" | ""
}


export interface CountryDataType {
  label: string;
  value: string;
  iso: string
}
