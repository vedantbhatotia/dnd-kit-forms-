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
async function GetForm(){
    const user = await currentUser();
    if(!user){
        return {
            error:"User not found"
        }
    }
    else{
        return await prisma.form.findMany({
            where:{
                userId:user.id
            },
            orderBy:{
                createdAt:"desc"
            }
        })
    }
}
async function GetFormById(id:number){
    const user = await currentUser();
    if(!user){
        return {
            error:"User not found"
        }
    }
    else{
        return await prisma.form.findFirst({
            where:{
                id:id,
                userId:user.id
            }
        })
    }
}
async function UpdateFormContent(id:number,jsonContent:string){
    const user = await currentUser();
    if(!user){
        return {
            error:"User not found"
        }
    }
    else{
        return prisma.form.update({
            where:{
                id:id,
                userId:user.id
            },
            data:{
                content:jsonContent
            }
        })
    }

}
async function PublishForm(id:number){
    const user = await currentUser();
    if(!user){
        return {
            error:"User notfound"
            }
    }else{
        return prisma.form.update({
            where:{
                id:id,
                userId:user.id
            },
            data:{
                published:true
            }
        })
    }
}
export {PublishForm}
export {UpdateFormContent}
export {GetFormById}
export {GetForm}
export {CreateForm}
export {GetFormStats}