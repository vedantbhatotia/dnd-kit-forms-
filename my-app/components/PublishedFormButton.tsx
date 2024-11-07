import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";
import { AlertDialog } from "./ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { FaIcons } from "react-icons/fa";
import { useTransition } from "react";
import { PublishForm } from "@/actions/form";
 // Adjust the import path as needed
 import { useToast } from "@/hooks/use-toast";
 import {useRouter} from "next/navigation";
function PublishedFormButton({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const { toast } = useToast();

  const Router = useRouter();
  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Success",
        description: "Form published successfully!",
      });
      Router.refresh();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to publish form. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
            <br /><br />
            <span className="font-medium">
              Make it available by publishing this form and collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <FaIcons className="animate-spinner" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishedFormButton;
