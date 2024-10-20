import z from "zod";
const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(100),
})
export type FormSchema = z.infer<typeof formSchema>
export {formSchema}