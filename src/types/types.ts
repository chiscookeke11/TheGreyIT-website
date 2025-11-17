


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
  date: string;
}


export interface Bookmark {
  course_id: number;
  course: CourseDataTypes;
};