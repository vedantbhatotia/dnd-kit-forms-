"use client"
import { ElementsType, FormElement } from "../FormElements"
import { MdTextFields } from "react-icons/md";
const type:ElementsType = "TextField";
import { FormElementInstance } from "../FormElements";
import {Label} from "@/components/ui/label";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeHolder: "Value Here.."
}
import { Switch } from "../ui/switch";
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
const propertiesSchema = z.object({
    label:z.string().min(2).max(50),
    helperText:z.string().max(200),
    required:z.boolean().default(false),
    placeholder:z.string().max(50)  
})
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
    formComponent:FormComponent,
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
type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({elementInstance}:{elementInstance:FormElementInstance}){
    const element = elementInstance as CustomInstance
    const {updateElement} = useDesigner();
    const form = useForm<PropertiesFormSchemaType>({
        resolver:zodResolver(propertiesSchema),
        mode:"onBlur",
        defaultValues:{
            label:element.extraAttributes.label,
            helperText:element.extraAttributes.helperText,
            required:element.extraAttributes.required,
            placeholder:element.extraAttributes.placeHolder
        }
    })
    useEffect(()=>{
        form.reset(element.extraAttributes)
    },[element,form])

    function applyChanges(values:PropertiesFormSchemaType){
        updateElement(element.id,{
            ...element,
            extraAttributes:{
                // <label htmlFor=""></label>
                label:values.label,
                placeholder:values.placeholder,
                helperText:values.helperText,
                required:values.required
            }
        })
    }

    return(
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)} className="space-y-3" onSubmit={(e)=>e.preventDefault()}>
                <FormField control={form.control} name="label" render={({field})=>(
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input {...field} onKeyDown={(e)=>{
                                if(e.key==="Enter"){
                                    e.currentTarget.blur();
                                }
                            }}/>
                        </FormControl>
                        <FormDescription>
                            the label of the field is the text that will be displayed next to the field.
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="placeholder" render={({field})=>(
                    <FormItem>
                        <FormLabel>Placeholder</FormLabel>
                        <FormControl>
                            <Input {...field} onKeyDown={(e)=>{
                                if(e.key==="Enter"){
                                    e.currentTarget.blur();
                                }
                            }}/>
                        </FormControl>
                        <FormDescription>
                            the placeholder is the text that will be displayed when the field is empty.
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="helperText" render={({field})=>(
                    <FormItem>
                        <FormLabel>Helper Text</FormLabel>
                        <FormControl>
                            <Input {...field} onKeyDown={(e)=>{
                                if(e.key==="Enter"){
                                    e.currentTarget.blur();
                                }
                            }}/>
                        </FormControl>
                        <FormDescription>
                            the helper text is the text that will be displayed below the field.
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField control={form.control} name="required" render={({field})=>(
                    <FormItem className="flex flex-items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                        <FormLabel>Required</FormLabel>
                        <FormDescription>
                            the label of the field is the text that will be displayed next to the field.
                        </FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
            </form>
        </Form>
    )
}
function FormComponent({elementInstance}:{
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
            <Input placeholder={placeHolder}/>
            {/* {element.extraAttributes.label} */}
            {helperText && <p className="text-muted-foreground text-sm">{helperText}</p>}
        </div>,
        </>
    )
}