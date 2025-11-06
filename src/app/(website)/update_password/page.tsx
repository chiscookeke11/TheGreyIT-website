"use client"

import { supabase } from "@/lib/supabaseClient"
import { Eye, EyeOff } from "lucide-react"
import type React from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { PasswordValidatorManager } from "@password-validator/core"

const Spinner = () => {
  return (
    <div className="h-10 w-10 rounded-full border-4 border-gray-700 border-t-transparent animate-spin duration-150 ease-in-out transition-all " />
  )
}

export default function Page() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getPasswordValidationErrors = (result: any): string[] => {
    const errors: string[] = []
    if (!result.hasMinLength) errors.push("Password must be at least 8 characters")
    if (!result.hasDigit) errors.push("Password must contain at least 1 digit")
    if (!result.hasSpecialCharacter) errors.push("Password must contain at least 1 special character")
    if (!result.hasUpperCase) errors.push("Password must contain at least 1 uppercase letter")
    if (!result.hasLowerCase) errors.push("Password must contain at least 1 lowercase letter")
    return errors
  }

  const updatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formValues.password || !formValues.confirmPassword) {
      toast.error("Please provide the required credentials")
      return
    }

    if (formValues.password !== formValues.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const result = PasswordValidatorManager.fluent()
      .min(8)
      .digit(1)
      .specialCharacter(1)
      .upper(1)
      .lower(1)
      .validate(formValues.password)

    if (!result.isValid) {
      const errors = getPasswordValidationErrors(result)
      errors.forEach((error) => toast.error(error))
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: formValues.password,
      })

      if (error) {
        toast.error(`Failed: ${error.message}`)
        console.error(error)
      } else {
        toast.success("Password updated successfully!")
        setFormValues({
          password: "",
          confirmPassword: "",
        })
      }
    } catch (err) {
      toast.error("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center px-[5%] ">
      <form
        onSubmit={updatePassword}
        className=" w-full max-w-2xl bg-white flex items-center justify-center flex-col gap-7 px-6 py-10 rounded-lg font-poppins "
      >
        <h1 className="text-gray-700 font-bold font-poppins text-2xl md:text-4xl  "> Enter a new password</h1>

        {/* Password Input  */}
        <label htmlFor="password" className=" w-full flex flex-col items-start gap-1  ">
          <span className="text-xl font-medium ">Password</span>
          <div className=" w-full flex gap-1 rounded-sm  py-4 px-5 border border-gray-700">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              value={formValues.password}
              placeholder="Enter Password"
              className="w-full  outline-none focus:outline-none text-base  "
            />
            <button type="button" className="cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
              {" "}
              {showPassword ? <EyeOff /> : <Eye />}{" "}
            </button>
          </div>
        </label>

        {/* confirm password Input  */}
        <label htmlFor="confirmPassword" className=" w-full flex flex-col items-start gap-1  ">
          <span className="text-xl font-medium ">Confirm Password</span>
          <div className=" w-full flex gap-1 rounded-sm  py-4 px-5 border border-gray-700">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              value={formValues.confirmPassword}
              placeholder="Enter Password"
              className="w-full  outline-none focus:outline-none text-base  "
            />
          </div>
        </label>

        <button
          className="font-syne bg-gray-700 w-full max-w-xs text-white hover:bg-transparent hover:text-gray-700 mb-5  px-6 py-3  flex items-center justify-center font-medium  focus:outline-none cursor-pointer text-base md:text-lg  border-[1px]  transition-all duration-300 ease-in-out border-gray-700 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed "
          disabled={loading}
        >
          {" "}
          {loading ? <Spinner /> : "Update password"}{" "}
        </button>
      </form>
    </div>
  )
}
