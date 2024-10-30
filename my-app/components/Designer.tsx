"use client"
import React from "react"
import DesignerSideBar from "./DesignerSideBar"
import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

function Designer() {
    const { isOver, setNodeRef } = useDroppable({
        id: "designer-drop-area",
        data: { isDesignerDropArea: true },
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
                    {!isOver ? (
                        <p className="text-3xl text-muted-foreground font-bold">
                            Drop Here
                        </p>
                    ) : (
                        <div className="absolute top-0 p-4 w-full">
                            {/* Overlay or other content can appear here */}
                            <div className="h-[120px] rounded-md bg-primary/20"></div>
                        </div>
                    )}
                </div>
            </div>
            <DesignerSideBar />
        </div>
    )
}

export default Designer
