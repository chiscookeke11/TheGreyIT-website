"use client"

import { handleChange, handleSelectChange } from "@/lib/utils"
import { VolunteerFormDataType } from "@/types/types"
import { CustomSelect } from "../UI/CustomSelect"
import { levelsOfStudy } from "@/data/LevelsOfStudy"
import { motion } from "framer-motion"



interface StepOneProps {
    formValues: VolunteerFormDataType
    setFormValues: React.Dispatch<React.SetStateAction<VolunteerFormDataType>>
}







export default function StepOne({ formValues, setFormValues }: StepOneProps) {





    return (
        <div className="w-full space-y-3 overflow-hidden" >
            <motion.div
                initial={{ y: "200vh" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full grid grid-cols-2 gap-x-4 gap-y-5 place-items-center justify-between " >

                {/* first name */}
                <label htmlFor="firstName" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >First Name*</span>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={(e) => handleChange(e, setFormValues)}
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>




                {/* last name  */}
                <label htmlFor="lastName" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >Last Name*</span>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={(e) => handleChange(e, setFormValues)}
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>



                {/* Email */}
                <label htmlFor="email" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >Email*</span>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={(e) => handleChange(e, setFormValues)}
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>




                {/* Phone number */}
                <label htmlFor="phoneNumber" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >Phone Number*</span>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formValues.phoneNumber}
                        onChange={(e) => handleChange(e, setFormValues)}
                        required
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>


                {/* City  */}
                <label htmlFor="city" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >City*</span>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formValues.city}
                        onChange={(e) => handleChange(e, setFormValues)}
                        required
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>



                {/* State  */}
                <label htmlFor="state" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs font-medium " >State*</span>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formValues.state}
                        onChange={(e) => handleChange(e, setFormValues)}
                        required
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>




                {/* School  */}
                <label htmlFor="school" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >School*</span>
                    <input
                        type="text"
                        id="school"
                        name="school"
                        value={formValues.school}
                        onChange={(e) => handleChange(e, setFormValues)}
                        required
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>



                {/* Department  */}
                <label htmlFor="department" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-xs  font-medium " >Department*</span>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={formValues.department}
                        onChange={(e) => handleChange(e, setFormValues)}
                        required
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>




                {/* Current level of study  */}
                <div className="w-full col-span-2 " >
                    <CustomSelect
                        name="levelOfStudy"
                        value={formValues.levelOfStudy}
                        options={levelsOfStudy}
                        placeholder="Please select an option"
                        isRequired
                        onChange={(name, value) =>
                            handleSelectChange<VolunteerFormDataType>(
                                "levelOfStudy",
                                value,
                                setFormValues
                            )
                        }
                        label="Current Level of Study"
                    />
                </div>




            </motion.div>
        </div>
    )
}