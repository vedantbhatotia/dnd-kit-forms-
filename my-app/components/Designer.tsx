"use client"
import React from "react"
import DesignerSideBar from "./DesignerSideBar"
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import useDesigner  from "./hooks/useDesigner"
import { ElementsType, FormElementInstance, FormElements } from "./FormElements"
import {idGenerator}  from "@/lib/idGenerator"
import { Button } from "./ui/button"
import { BiSolidTrash } from "react-icons/bi"
function Designer() {
    const {elements, addElement} = useDesigner();
    const { isOver, setNodeRef } = useDroppable({
        id: "designer-drop-area",
        data: { isDesignerDropArea: true },
    })
    useDndMonitor({
        onDragEnd: (event:DragEndEvent) => {
            const {active,over} = event;
            if(!active || !over){
                return;
            }
            const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;
            if(isDesignerBtnElement){
                const type = active.data.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    idGenerator()
                )
                addElement(0,newElement)
            }
        }
    })
    return (
        <div className="flex w-full h-full gap-4">
            <div className="p-4 w-full">
                <div
                    ref={setNodeRef}
                    className={cn(
                        "relative bg-background max-w-[920px] h-full m-auto rounded-xl flex items-center justify-center flex-1 overflow-auto border-2 border-dashed border-muted", // Center text, allow absolute positioning for the overlay
                        isOver && "ring-2 ring-primary/20"
                    )}
                >
                    {!isOver && elements.length === 0 ? (
                        <p className="text-3xl text-muted-foreground font-bold flex flex-grow items-center">
                            Drop Here
                        </p>
                    ) : (
                        <div className="absolute top-0 p-4 w-full">
                            {/* Overlay or other content can appear here */}
                            <div className="h-[120px] rounded-md bg-primary/20"></div>
                        </div>
                    )}
                    {elements.length>0 && (
                        <div className="flex flex-col w-full gap-2 p-4">
                            {/* <div className="h-[120px] rounded-md bg-primary/20"></div> */}
                            {elements.map((element, index) => {
                                return(
                                    <DesignerWrapperElement key={element.id} element={element}></DesignerWrapperElement>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
            <DesignerSideBar />
        </div>
    )
}
const DesignerWrapperElement = ({ element }: { element: FormElementInstance }) => {
    const { removeElement } = useDesigner(); 
    const [mouseIsOver,setMouseIsOver] = React.useState<boolean>(false);

    const DesignerComponent = FormElements[element.type].designerComponent;
    const topHalf = useDroppable({
        id:element.id + "-top",
        data:{
            type:element.type,
            elementId:element.id,
            isTopHalfDesignerElement:true,

        }
    })
    const bottomHalf = useDroppable({
        id:element.id + "-bottom",
        data:{
            type:element.type,
            elementId:element.id,
            isBottomHalfDesignerElement:true,

        }
    })
    const draggable = useDraggable({
        id:element.id+"-drag-handler",
        data:{
            type:element.type,
            elementId:element.id,
            isDesignerElement:true,
        }
    })
    if(draggable.isDragging){
        return null;
    }
    
    return(
        <div  ref={draggable.setNodeRef} {...draggable.listeners} {...draggable.attributes} className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset" onMouseEnter={()=>setMouseIsOver(true)} onMouseLeave={()=>setMouseIsOver(false)}>
        <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md"></div>
        <div  ref={bottomHalf.setNodeRef} className="absolute  bottom-0 w-full h-1/2 rounded-b-md"></div>
        {
            mouseIsOver && (
                <>
                <div className="absolute right-0 h-full">
                    <Button className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500" variant={"outline"}
                    onClick={()=>{
                        removeElement(element.id);
                        console.log("Delete element");
                    }}
                    >
                        <BiSolidTrash className="h-6 w-6">

                        </BiSolidTrash>
                    </Button>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                    <p className="text-muted-foreground text-sm">
                        Drag and drop to reorder
                    </p>
                </div>
                </>
            )
        }
        {
            topHalf.isOver && (
                <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary
                rounded-b-none"></div>
            )
        }
        <div className={cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
            mouseIsOver && "opacity-30"
        )}>
        <DesignerComponent elementInstance={element}/>
        </div>
        {
            bottomHalf.isOver && (
                <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary
                rounded-t-none"></div>
            )
        }
        </div>
    ) 
};
export default Designer