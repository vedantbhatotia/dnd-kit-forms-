"use client"
import { Form } from "@prisma/client"
import PreviewDialogButton from "./PreviewDialogButton"
import SaveFormButton from "./SaveFormButton"
import PublishedFormButton from "./PublishedFormButton"
import Designer from "./Designer"
import { DndContext, MouseSensor,TouchSensor,useSensor, useSensors } from "@dnd-kit/core"
import DragOverlayWrapper from "./DragOverlayWrapper"
import useDesigner  from "./hooks/useDesigner"
import { useEffect, useState } from "react"
function FormBuilder({ form }: { form: Form }) {
    const {setElements,setSelectedElement} = useDesigner();
    const [isReady,setIsReady] = useState(false);
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    })
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5,
        },
    })

    const sensors = useSensors(mouseSensor,touchSensor);
    useEffect(()=>{
        if(isReady){
            return;
        }
        const elements = JSON.parse(form.content);
        setElements(elements);
        const readyTimeout = setTimeout(()=>setIsReady(true),500)
        return ()=>clearTimeout(readyTimeout)
    },[form,setElements])
    if(!isReady){
        return
        <div>
        </div>
    }
    return (
        <DndContext sensors={sensors}>
            <main className="flex flex-col w-full h-full">
                <nav className="flex justify-between border-b p-6 items-center">
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
                                <SaveFormButton id = {form.id} />
                                <PublishedFormButton />
                            </>
                        )}
                    </div>
                </nav>
                <div className="flex w-full flex-grow relative overflow-y-auto h-full bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] p-6">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    )
}

export default FormBuilder
