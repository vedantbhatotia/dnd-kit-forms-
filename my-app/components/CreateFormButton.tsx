"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
}
from "@/components/ui/dialog"
import {BsFileEarmarkPlus} from "react-icons/bs";
import {ImSpinner2} from "react-icons/im";
import { Button } from './ui/button';
function CreateFormButton() {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Create New Form</Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
                Create a new form to collect user responses
            </DialogDescription>
        </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}
export default CreateFormButton