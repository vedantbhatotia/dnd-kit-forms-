// SideBarButtonElement.tsx
"use client"
import { useDraggable } from "@dnd-kit/core"
import { FormElement } from "./FormElements"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

function SideBarButtonElement({ formElement }: { formElement: FormElement }) {
    const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: { type: formElement.type, isDesignerBtnElement: true },
    })

    const { label, icon: Icon } = formElement.designerButtonElement

    return (
        <Button
            ref={setNodeRef}
            variant="outline"
            className={cn(
                "flex flex-col gap-2 h-[70px] w-[70px] cursor-grab",
                isDragging && "ring-2 ring-primary"
            )}
            {...listeners}
            {...attributes}
        >
            <Icon className="h-8 w-8 text-primary" />
            <p className="text-xs">{label}</p>
        </Button>
    )
}

export function SideBarButtonElementDragoverlay({ formElement }: { formElement: FormElement }) {
    const { label, icon: Icon } = formElement.designerButtonElement

    return (
        <Button variant="outline" className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
            <Icon className="h-8 w-8 text-primary" />
            <p className="text-xs">{label}</p>
        </Button>
    )
}

export default SideBarButtonElement
