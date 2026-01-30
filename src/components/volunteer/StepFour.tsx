"use client"

import { handleChange } from "@/lib/utils"
import { VolunteerFormDataType } from "@/types/types"
import { CustomCheckBox } from "../UI/CustomCheckbox"
import { motion } from "framer-motion"



interface StepFourProps {
    formValues: VolunteerFormDataType
    setFormValues: React.Dispatch<React.SetStateAction<VolunteerFormDataType>>
}

export default function StepFour({ formValues, setFormValues }: StepFourProps) {





    const consentOptions: VolunteerFormDataType["consent"][] = [
        " I agree to represent TheGreyIT professionally",
        "I confirm the information provided is correct",
        "I consent to my information being used for programme coordination"
    ]



    return (
        <div className="w-full overflow-hidden" >


            <motion.div
                initial={{ y: "200vh" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full flex flex-col items-start gap-6 " >


                {/* motivation  */}
                <label htmlFor="motivation" className=" w-full flex flex-col items-start gap-1  " >
                    <span className="text-sm  font-medium " >Why do you want to join TheGreyIT as an Ambassador?*</span>
                    <input
                        type="text"
                        id="motivation"
                        name="motivation"
                        value={formValues.motivation}
                        onChange={(e) => handleChange(e, setFormValues)}
                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                </label>





                {/* Consent & declaration   */}
                <div className="w-full flex flex-col items-start gap-2 " >
                    <h1 className="text-[#000000] font-medium text-sm font-lato flex items-start gap-1" >Consent & Declaration   <div className=" text-red-600" >*</div></h1>


                    <div className=" grid grid-cols-1 gap-2 justify-items-stretch  "  >
                        {consentOptions.map((option) => {
                            const isChecked = formValues.consent === option
                            return (
                                <CustomCheckBox
                                    key={option}
                                    checked={isChecked}
                                    label={option}
                                    id={option.toLowerCase()}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setFormValues((prev) => ({
                                                ...prev,
                                                consent: option,
                                            }))
                                        }
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>


            </motion.div>
        </div>
    )
}