import { VolunteerFormDataType } from "@/types/types"
import { CustomCheckBox } from "../UI/CustomCheckbox"
import { handleCheckboxChange } from "@/lib/utils"
import { motion } from "framer-motion"



interface StepTwoProps {
    formValues: VolunteerFormDataType
    setFormValues: React.Dispatch<React.SetStateAction<VolunteerFormDataType>>
}

export default function StepTwo({ formValues, setFormValues }: StepTwoProps) {

    const educationOptions: VolunteerFormDataType["educationStatus"][] = [
        "Student",
        "Graduate",
    ]


    const preferredRoleOptions: VolunteerFormDataType["preferredRole"][] = [
        "Student Ambassador",
        "Graduate Ambassador"
    ]



    const helpOptions: VolunteerFormDataType["howCanYouHelp"][] = [
        "Content writing or captions",
        "Event promotion (online/offline)",
        "Referrals & word-of-mouth",
        "Sharing opportunities in groups (WhatsApp, Telegram, campus)",
        "Social media posting"
    ]


    const interestOptions = [
        "AI Engineering",
        "Software Development",
        "Cybersecurity",
        "Data Analytics",
        "Product / UI-UX Design",
        "Research & Academic Support",
        "General Tech Promotion"
    ]


    return (

        <div className="w-full overflow-hidden   " >
            <motion.div
                initial={{ y: "200vh" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full flex flex-col items-start gap-6 "
            >


                {/* Education Status  */}
                <div className="w-full flex flex-col items-start gap-2 " >
                    <h1 className="text-[#000000] font-medium text-sm font-lato flex items-start gap-1" >I am a:  <div className=" text-red-600" >*</div></h1>


                    <div className=" grid grid-cols-2 gap-4 justify-items-stretch  "  >
                        {educationOptions.map((option) => {
                            const isChecked = formValues.educationStatus === option
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
                                                educationStatus: option,
                                            }))
                                        }
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>




                {/* Preferred role  */}
                <div className="w-full flex flex-col items-start gap-2 " >
                    <h1 className="text-[#000000] font-medium text-sm font-lato flex items-start gap-1" >Preferred Role:  <div className=" text-red-600" >*</div></h1>


                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-stretch  "  >
                        {preferredRoleOptions.map((option) => {
                            const isChecked = formValues.preferredRole === option
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
                                                preferredRole: option,
                                            }))
                                        }
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>



                {/* Interests */}
                <div className="w-full flex flex-col items-start gap-2 " >
                    <h1 className="text-[#000000] font-medium text-sm font-lato flex items-start gap-1" >Interests:  <div className=" text-red-600" >(Select all that apply)</div></h1>


                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-stretch  "  >
                        {interestOptions.map((option) => {
                            const isChecked = formValues.interests.includes(option)
                            return (
                                <CustomCheckBox
                                    key={option}
                                    checked={isChecked}
                                    label={option}
                                    id={option.toLowerCase()}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange<VolunteerFormDataType, "interests">(
                                            "interests",
                                            checked,
                                            setFormValues,
                                            option
                                        )
                                    }
                                />
                            )
                        })}
                    </div>
                </div>





                {/* How you can help */}
                <div className="w-full flex flex-col items-start gap-2 " >
                    <h1 className="text-[#000000] font-medium text-sm font-lato flex items-start gap-1" >Which activities can you support?:  <div className=" text-red-600" >*</div></h1>


                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-stretch  "  >
                        {helpOptions.map((option) => {
                            const isChecked = formValues.howCanYouHelp === option
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
                                                howCanYouHelp: option,
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