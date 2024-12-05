import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
// import {VisitBt}
import VisitBtn from "@/components/VisitBtn";
async function FormDetailPage({params}:{params:{id:string}}){
    const {id} = params;
    const form:any = await GetFormById(Number(id));
    if(!form){
        return(
            <div className="flex items-center justify-center w-full h-full">
                <h2 className="text-4xl font-bold">Form not found</h2>
            </div>
        )
    }
    const {visits,submissions} = form;
    let submissionRate = 0;
    if(visits>0){
        submissionRate = (submissions/visits)*100;
    }
    let bounceRate = 100-submissionRate;
    return (
        <div className="py-10 border-b border-muted">
            <div className="flex justify-between container">
                <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                <VisitBtn shareUrl={form.shareUrl}></VisitBtn>
            </div>
        </div>
    )
}
export default FormDetailPage;