"use client"

import { Checkbox } from "@/components/UI/checkbox"
import { Label } from "@/components/UI/label"


interface CustomCheckBoxProps {
    label: string;
    id: string;
    checked?: boolean
    onCheckedChange: (checked: boolean) => void
    error?: string
}

export function CustomCheckBox({ label, id, checked, onCheckedChange, error }: CustomCheckBoxProps) {
    return (
        <div className="flex flex-col gap-1">

            <div className="flex items-center  gap-3">
                <Checkbox
                    name={id}
                    checked={checked}
                    id={id}
                    onCheckedChange={onCheckedChange}
                    className="border-gray-700 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-700 text-white cursor-pointer" />
                <div className="grid gap-2">
                    <Label htmlFor={id} className="cursor-pointer text-sm  text-[#000000] " > {label} </Label>
                </div>
            </div>





        </div>
    )
}
