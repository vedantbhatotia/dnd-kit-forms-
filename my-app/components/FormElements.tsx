import { TextFieldFormElement } from "./fields/TextField";
export type ElementsType = "TextField";
export type FormElement = {
    type:ElementsType,
    construct:(id:string)=>FormElementInstance,
    designerButtonElement:{
        icon:React.ElementType,
        label:string,
    },
    designerComponent:React.FC<{
        elementInstance:FormElementInstance,
        // updateElement:(id:string,update:Partial<FormElementInstance>)=>void,
        // dragOverHandler:(e:React.DragEvent<HTMLDivElement>)=>void,
        // dragLeaveHandler:(e:React.DragEvent<HTMLDivElement>)=>void,
        // dragEndHandler:(e:React.DragEvent<HTMLDivElement>)=>void,
        // dropHandler:(e:React.DragEvent<HTMLDivElement>)=>void,
    }>,
    formComponent:React.FC,
    propertiesComponent:React.FC<{
        elementInstance:FormElementInstance
    }>,
}
export type FormElementInstance = {
    id:string,
    type:ElementsType,
    extraAttributes?:Record<string,any>,
}
type FormElementsType = {
    [key in ElementsType]:FormElement
}
export const FormElements:FormElementsType = {
    TextField:TextFieldFormElement
}