"use client"

import { VolunteerFormDataType } from "@/types/types"
import { CustomCheckBox } from "../UI/CustomCheckbox"
import { handleChange, handleCheckboxChange } from "@/lib/utils"
import { motion } from "framer-motion"




interface StepThreeProps {
    formValues: VolunteerFormDataType
    setFormValues: React.Dispatch<React.SetStateAction<VolunteerFormDataType>>
}


export default function StepThree({ formValues, setFormValues }: StepThreeProps) {


    const availabilityOption: VolunteerFormDataType["availability"][] = [
        "2-4 hours",
        "5-8 hours",
        "Flexible"
    ]



    const startOption: VolunteerFormDataType["startOptions"][] = [
        "Immediately",
        "Within 1-2 weeks"
    ]


    const benefitOptions = [
        "Practical experience",
        "Tech exposure & learning",
        " Portfolio building",
        "Mentorship & guidance",
        "Networking & community",
        "Certificates / recommendations",
        "Income / commission opportunities",
        "Career clarity",
        "Other"
    ]



    return (
        <div className="w-full overflow-hidden " >
            <motion.div
                initial={{ y: "200vh" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full flex flex-col items-start gap-6 ">




                {/* Availability  */}
                <div className="w-full flex flex-col items-start gap-2 " >
                    <h1 className="text-[#000000] font-medium text-sm font-lato flex items-start gap-1" >Time you can commit weekly:   <div className=" text-red-600" >*</div></h1>


                    <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-stretch  "  >
                        {availabilityOption.map((option) => {
                            const isChecked = formValues.availability === option
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
                                                availability: option,
                                            }))
                                        }
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>





                {/* How soon can you start  */}
                <div className="w-full flex flex-col items-start gap-2 " >
                    <h1 className="text-[#000000] font-medium text-sm font-lato flex items-start gap-1" >How soon can you start? <div className=" text-red-600" >*</div></h1>


                    <div className=" grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-stretch  "  >
                        {startOption.map((option) => {
                            const isChecked = formValues.startOptions === option
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
                                                startOptions: option,
                                            }))
                                        }
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>




                {/* benefits */}
                <div className="w-full flex flex-col items-start gap-2 " >
                    <h1 className="text-[#000000] font-medium text-sm font-lato " > How Do You Expect to Benefit?:  <span className=" text-red-600" >(Select all that apply)</span></h1>


                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-stretch  "  >
                        {benefitOptions.map((option) => {
                            const isChecked = formValues.benefits.includes(option)
                            return (
                                <CustomCheckBox
                                    key={option}
                                    checked={isChecked}
                                    label={option}
                                    id={option.toLowerCase()}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange<VolunteerFormDataType, "benefits">(
                                            "benefits",
                                            checked,
                                            setFormValues,
                                            option
                                        )
                                    }
                                />
                            )
                        })}
                    </div>



                    {
                        formValues.benefits.includes("Other") && (
                            <>
                                {/* Other benefit  */}
                                <label htmlFor="otherBenefit" className=" mt-2 w-full flex flex-col items-start gap-1  " >
                                    <span className="text-sm  font-medium " >Other Benefit</span>
                                    <input
                                        type="text"
                                        id="otherBenefit"
                                        name="otherBenefit"
                                        value={formValues.otherBenefit}
                                        onChange={(e) => handleChange(e, setFormValues)}
                                        className="w-full py-2 px-3 border border-gray-700 outline-none focus:outline-none text-sm rounded-sm " />
                                </label>
                            </>
                        )
                    }
                </div>



            </motion.div>
        </div>
    )
}