import { GetFormById } from "@/actions/form";
async function BuilderPage({params}:{params:{id:string}}){
    const {id} = params;
    const form:any = await GetFormById(Number(id));
    if(!form){
        return(
            <div className="flex items-center justify-center w-full h-full">
                <h2 className="text-4xl font-bold">Form not found</h2>
            </div>
        )
    }
    return(
        <>
        {form.name}
        </>
    )
}
export default BuilderPage;