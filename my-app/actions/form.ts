"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { FormSchema } from "@/schemas/form"
 import { formSchema } from "@/schemas/form";
async function GetFormStats(){
    const user = await currentUser();
    if(!user){
        return {
            error:"User not found"
        }
    }else{
        const stats = await prisma.form.aggregate({
            where:{
                userId:user.id,
            },
            _sum:{
                visits:true,
                submission_count:true,
            }
        })
        const visits = stats._sum.visits || 0;
        const submission_count = stats._sum.submission_count || 0;
        let submissionRate = 0;
        if(visits>0){
            submissionRate = (submission_count/visits)*100;
        }
        let bounceRate = 100-submissionRate;
        return {
            visits,
            submission_count,
            submissionRate,
            bounceRate
        }
    }
}
async function CreateForm(data:FormSchema){
    const validatedData = formSchema.safeParse(data);
    if(!validatedData.success){
        return {
            error:"Invalid data"
        }
    }else{
        const user = await currentUser();
        if(!user){
            return {
                error:"User not found"
            }
        }else{
            const form = await prisma.form.create({
                data:{
                    name:data.name,
                    description:data.description,
                    userId:user.id,
                }
            })
            if(!form){
                return {
                    error:"Form not created"
                }
            }
            return form.id
        }
    }
}
export {CreateForm}
export {GetFormStats}