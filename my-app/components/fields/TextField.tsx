"use client"

import { TbPlaceholder } from "react-icons/tb";
import { ElementsType, FormElement } from "../FormElements"
import { MdTextFields } from "react-icons/md";

const type:ElementsType = "TextField";

export const TextFieldFormElement:FormElement={
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes:{
            label:"Text Field",
            helperText:"helper Text",
            required:false,
            placeHolder:"Value Here.."

        }
    }),
    designerButtonElement:{
        icon:<MdTextFields></MdTextFields>,
        label:"Text Field"
    },
    designerComponent:()=><div>TextField</div>,
    formComponent:()=><div>TextField</div>,
    propertiesComponent:()=><div>TextField</div>,
}