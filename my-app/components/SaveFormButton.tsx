import { Button } from "./ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";
function SaveFormButton({id}:{id:number} ) {
  const { elements} = useDesigner();
  const [loading,startTransition] = useTransition();
  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
    } catch (e) {
      console.error("Error saving form content:", e);
    }
  };

  return (
    <Button variant={"outline"} className="gap-2" disabled={loading} onClick={()=>{
      startTransition(updateFormContent) 
    }}>
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin "></FaSpinner>}
    </Button>
  );
}

export default SaveFormButton;
