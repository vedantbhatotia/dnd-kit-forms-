import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react"
function DragOverlayWrapper(){
    const [draggedItem,setDraggedItem] = useState<Active|null>(null);
    useDndMonitor({
        onDragStart:(event)=>{
            setDraggedItem(event.active)
            console.log("Drag Item",event)
        },
        onDragCancel:()=>{
            setDraggedItem(null)
        },
        onDragEnd:()=>{
            setDraggedItem(null)
        }
    })
    if(!draggedItem){
        return null
    }
    const node = <div>No Drag Overlay</div>
    const isSideBarElement = draggedItem.data?.current?.isDesignerBtnElement
    return(
        <DragOverlay>
            {node}
        </DragOverlay>
    )
}
export default DragOverlayWrapper