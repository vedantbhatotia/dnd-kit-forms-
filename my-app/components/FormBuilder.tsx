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
import { ImSpinner2 } from "react-icons/im"
import { Input } from "./ui/input"
import Confetti from "react-confetti"
import { Button } from "./ui/button"
import { link } from "fs"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import Link from "next/link"
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
        return(
            <div>
            <ImSpinner2 className="animate-spin h-12 w-12"></ImSpinner2>
            </div>
        )
    }
    const shareUrl = `${window.location.protocol}/submit/${form.shareUrl}`

    if(form.published){
        return(
            <>
            <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000}></Confetti>
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="max-w-md">
                        <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
                            Form Published
                        </h1>
                        <h2 className="text-2xl">
                            Share this form 
                        </h2>
                        <h3 className="text-xl text-muted-foreground border-b pb-10">
                            Anyone can view this form by visiting this link:
                        </h3>
                        <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
                            <Input className="w-full" readOnly value={shareUrl}>
                            </Input>
                            <Button className="mt-2 w-full " onClick={()=>{
                                navigator.clipboard.writeText(shareUrl)
                            }}>
                                Copy Link
                            </Button>
                        </div>
                        <div className="flex justify-between">
                            <Button variant={"link"} asChild>
                                {/* Back to Forms */}
                                <Link href={'/'} className="gap-2">
                                {/* <span clas */}
                                    <BsArrowLeft></BsArrowLeft>
                                    Back to Forms
                                </Link>
                            </Button>
                            <Button variant={"link"} asChild>
                                {/* Back to Forms */}
                                <Link href={`/forms/${form.id}`} className="gap-2">
                                {/* <span clas */}
                                    {/* <BsArrowLeft></BsArrowLeft> */}
                                    Form Details
                                    <BsArrowRight></BsArrowRight>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )
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
                                <PublishedFormButton id = {form.id}/>
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
