"use client"
import {Form} from "@prisma/client"
import PreviewDialogButton from "./PreviewDialogButton"
import SaveFormButton from "./SaveFormButton";
// import PublishFormButton from "./PublishFormButton";
import PublishedFormButton from "./PublishedFormButton";
function FormBuilder({form}:{
    form:Form
}){
    return(
        <main className="flex flex-col w-full">
            <nav className="flex justify-betwen border b-2 p-4 gap-3 items-center">
                <h2 className="truncate font-medium">
                    <span className="text-muted-foreground mr-2">
                        Form:
                    </span>
                    {form.name}
                </h2>
                <div className="flex-items-center gap-2">
                    <PreviewDialogButton></PreviewDialogButton>
                    {!form.published &&
                        <>
                            <SaveFormButton></SaveFormButton>
                            <PublishedFormButton></PublishedFormButton>
                        </>
                    }
                </div>
            </nav>
            <div className="flex w-full flex-grow itmes-center justify-center relative overflow-y-auto h-[200px] bg-accent
            bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
            </div>
        </main>
    )

}
export default FormBuilder