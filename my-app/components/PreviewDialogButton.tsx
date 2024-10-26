import { Button } from "./ui/button";
import {MdPreview} from "react-icons/md"
function PreviewDialogButton(){
    return(
        <>
        <Button variant={"outline"} className="gap-2">
            <MdPreview className="h-6 w6"/>
            Preview
        </Button>
        </>
    )
}
export default PreviewDialogButton;