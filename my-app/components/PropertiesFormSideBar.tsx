import useDesigner from "./hooks/useDesigner"
import { FormElements } from "./FormElements";
import {AiOutlineClose} from "react-icons/ai"
import { Button } from "./ui/button";
function FormElementsSideBar() {
    const {selectedElement,setSelectedElement} = useDesigner();
    if(!selectedElement){
        return null;
    }
    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent
  return (
    <div className="flex flex-col p-2">
        <div className="flex justify-between items-center">
            <p className="text-sm text-foreground/70">
            Element Properties
            </p>
            <Button size = {"icon"} variant = {"ghost"} onClick={()=>setSelectedElement(null)}>
                <AiOutlineClose></AiOutlineClose>
            </Button>
        </div>
        <PropertiesForm elementInstance={selectedElement}></PropertiesForm>
    </div>
  )
}
export default FormElementsSideBar