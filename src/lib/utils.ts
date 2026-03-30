/* eslint-disable @typescript-eslint/no-explicit-any */

import { CourseDataTypes } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// Input change function
export const handleChange = <T extends Record<string, any>>(
  e: React.ChangeEvent<HTMLInputElement>,
  setFormValues: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;

  if (name === "phoneNumber" && isNaN(Number(value))) return;

  setFormValues((prev) => ({
    ...prev,
    [name]: value,
  }));
};




// select change function
export const handleSelectChange = <T extends Record<string, any>>(
  name: keyof T,
  value: string,
  setFormValues: React.Dispatch<React.SetStateAction<T>>
) => {
  setFormValues((prev) => ({
    ...prev,
    [name]: value,
  }));
};





// checkbox function
export const handleCheckboxChange = <
  T,
  K extends keyof T
>(
  name: K,
  checked: boolean,
  setFormValues: React.Dispatch<React.SetStateAction<T>>,
  value?: string
) => {
  setFormValues((prev) => {
    const fieldValue = prev[name];
    const updated: any = { ...prev };

    if (Array.isArray(fieldValue) && value) {
      if (value === "Other") {
        // if Other is checked, replace everything
        updated[name] = checked ? ["Other"] : [];
      } else {
        // remove "Other" if another option is selected
        const filtered = (fieldValue as string[]).filter((item) => item !== "Other");
        updated[name] = checked ? [...filtered, value] : filtered;
      }
    } else {
      updated[name] = checked as T[K];
    }

    return updated;
  });
};



// Function to get course from cache
export const getCoursesFromCache = (KEY: string) => {
  const cached = localStorage.getItem(KEY)
  if (!cached) return null

  try {
    return JSON.parse(cached) as {
      data: CourseDataTypes[],
      timeStamp: number
    }
  }
  catch {
    return null
  }
}





// this function saves course data to local storage
export const saveCoursesToCache = (courses: CourseDataTypes[], KEY: string) => {
  const payload = {
    data: courses,
    timeStamp: Date.now()
  }

  localStorage.setItem(KEY, JSON.stringify(payload))
}




// This function scrolls the page to the top
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}



// function for generating a random code
export const randomCode = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result;
}



// Calculate read time
export const estimateReadTime = (content: string) => {
  const words = content?.trim().split(/\s+/).filter(Boolean).length || 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};