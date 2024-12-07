import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import VisitBtn from "@/components/VisitBtn";
import { Input } from "@/components/ui/input";
import { ImShare } from "react-icons/im";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import {HiCursorClick} from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb"; 
import { toast } from "sonner";
import { StatsCard } from "../../page";
import { Sub } from "@radix-ui/react-context-menu";
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
        <>
        <div className="py-10 border-b border-muted">
            <div className="flex justify-between container">
                <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                <VisitBtn shareUrl={form.shareUrl}></VisitBtn>
            </div>
        </div>
        <div className="py-4 border-b border-muted">
            <div className="container flex gap-2 items-center justify-between">
                <FormLinkShare shareUrl = {form.shareLink}></FormLinkShare>
            </div>
        </div>
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatsCard
        title="Total Visits"
        icon={<LuView className="text-blue-500" />}
        helperText="All time Form Visits"
        value={visits?.toLocaleString()}
        loading={false}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total Submissions"
        icon={<FaWpforms className="text-yellow-500" />}
        helperText="All time Form Submissions"
        value={submissions?.toLocaleString()}
        loading={false}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submission Rate"
        icon={<HiCursorClick className="text-green-500" />}
        helperText="Visits that convert to form submission"
        value={submissionRate?.toLocaleString()}
        loading={false}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-red-500" />}
        helperText="Visits that don't convert to form submission"
        value={bounceRate?.toLocaleString()}
        loading={false}
        className="shadow-md shadow-red-600"
      />
    </div>
    <div className="container pt-10">
        <SubmissionTable id={form.id}></SubmissionTable>
    </div>
    </>
    )
}
function FormLinkShare({shareUrl}:{shareUrl:string}){
    const [mounted,setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted){
        return null;
    }
    const shareLink = `${window.location.origin}/submit/${shareUrl}`
  return (
    <div className="flex flex-grow gap-4 items-center">
        <Input value={shareLink} readOnly>
        </Input>
        <Button className="w-[250px]" onClick={()=>{
            navigator.clipboard.writeText(shareLink)
            toast.success("Link Copied to Clipboard")
        }}>
            <ImShare className="mr-2 h-4 w-4">
                Share Link
            </ImShare>
        </Button>
    </div>
  );
}
function SubmissionTable({id}:{id:number}){
    return(
        <>
            <h1 className="text-2xl font-bold my-4 ">Submissions</h1>
        </>
    )
}
export default FormDetailPage;