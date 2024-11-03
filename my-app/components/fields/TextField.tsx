"use client"
import { ElementsType, FormElement } from "../FormElements"
import { MdTextFields } from "react-icons/md";
const type:ElementsType = "TextField";
import { FormElementInstance } from "../FormElements";
import {Label} from "@/components/ui/label";
import { Input } from "../ui/input";
const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value Here.."
}
export const TextFieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes,
    }),
    designerButtonElement:{
        icon:MdTextFields,
        label:"Text Field"
    },
    designerComponent:DesignerComponent,
    formComponent:()=><div>TextField</div>,
    propertiesComponent:PropertiesComponent,
}
type CustomInstance = FormElementInstance & {
    extraAttributes:typeof extraAttributes
}

function DesignerComponent({elementInstance}:{
    elementInstance:FormElementInstance
}){
    const element = elementInstance as CustomInstance;
    const {label,required,placeHolder,helperText} = element.extraAttributes;
    return(
        <>
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeHolder}/>
            {/* {element.extraAttributes.label} */}
            {helperText && <p className="text-muted-foreground text-sm">{helperText}</p>}
        </div>,
        </>
    )
}
function PropertiesComponent({elementInstance}:{elementInstance:FormElementInstance}){
    const element = elementInstance as CustomInstance
    return(
        <>
        Form propeties form {element.extraAttributes.label}
        </>
    )
}