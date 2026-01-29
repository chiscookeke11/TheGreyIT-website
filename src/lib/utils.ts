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
    let updated: any = { ...prev };

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






