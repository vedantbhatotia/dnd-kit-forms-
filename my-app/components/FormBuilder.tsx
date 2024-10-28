"use client"
import { Form } from "@prisma/client"
import PreviewDialogButton from "./PreviewDialogButton"
import SaveFormButton from "./SaveFormButton";
import PublishedFormButton from "./PublishedFormButton";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";
function FormBuilder({ form }: { form: Form }) {
    return (
        <DndContext>
        <main className="flex flex-col w-full">
            <nav className="flex justify-between border-b-2 p-6 items-center">
                <h2 className="truncate font-medium text-xl">
                    <span className="text-muted-foreground mr-2">
                        Form:
                    </span>
                    {form.name}
                </h2>
                <div className="flex items-center gap-3 ml-auto">
                    <PreviewDialogButton />
                    {!form.published && (
                        <>
                            <SaveFormButton />
                            <PublishedFormButton />
                        </>
                    )}
                </div>
            </nav>
            <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[500px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] p-6">
                <Designer />
            </div>
        </main>
        </DndContext>
    )
}

export default FormBuilder;
