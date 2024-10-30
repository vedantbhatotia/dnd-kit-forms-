"use client"
import React from "react"
import DesignerSideBar from "./DesignerSideBar"
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import useDesigner  from "./hooks/useDesigner"
import { ElementsType, FormElementInstance, FormElements } from "./FormElements"
import {idGenerator}  from "@/lib/idGenerator"
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
                        <p className="text-3xl text-muted-foreground font-bold">
                            Drop Here
                        </p>
                    ) : (
                        <div className="absolute top-0 p-4 w-full">
                            {/* Overlay or other content can appear here */}
                            <div className="h-[120px] rounded-md bg-primary/20"></div>
                        </div>
                    )}
                    {elements.length>0 && (
                        <div className="flex flex-col text-background w-full gap-2 p-4">
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
    const DesignerComponent = FormElements[element.type].designerComponent;
    return <DesignerComponent />;
};

export default Designer