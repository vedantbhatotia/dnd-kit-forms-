"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
}
from "@/components/ui/dialog"
import {BsFileEarmarkPlus} from "react-icons/bs";
import {ImSpinner2} from "react-icons/im";
import { Button } from './ui/button';
import{
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {useForm} from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Toast } from "./ui/toast";
import { toast } from "@/hooks/use-toast";
import { CreateForm } from "@/actions/form";
const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(100),
})
type FormSchema = z.infer<typeof formSchema>
function CreateFormButton() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            description:"",
        }
    })
    async function handleSubbmit(values:FormSchema){
        try{
            const CreatedFormId = await CreateForm(values);
            toast({
                title:"Form Created",
                description:"Your form has been created",
            })
            console.log(CreatedFormId);
        }
        catch(error){
            toast({
                title:"Something went wrong",
                description:"Please try again later",
                variant:"destructive"
            })
        };
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button  variant={"outline"} className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4">
            <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary"/>
            <p className="font-bold text-xl text-muted-foreground group hover:text-primary">Create New Form</p>
            </Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
                Create a new form to collect user responses
            </DialogDescription>
        </DialogHeader>
        <Form {...form}> 
            <form onSubmit={form.handleSubmit(handleSubbmit)} className="space-y-2">
                <FormField control={form.control} name="name" render={({field})=> (
                    <FormItem>
                        <FormLabel>Form Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Form Name" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}>
                </FormField>
                <FormField control={form.control} name="description" render={({field})=> (
                    <FormItem>
                        <FormLabel>Form Description</FormLabel>
                        <FormControl>
                            <Textarea rows={5} placeholder="Form Description" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}>
                </FormField>
            </form>
        </Form>
        <DialogFooter>
            <Button onClick={form.handleSubmit(handleSubbmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
                {!form.formState.isSubmitting && <span>Save</span>}
                {form.formState.isSubmitting && <ImSpinner2 className="animate-spin"></ImSpinner2>}
            </Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
export default CreateFormButton