import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { SideBarButtonElementDragoverlay } from "./SideBarButtonElement";
import { ElementsType, FormElements } from "./FormElements";

function DragOverlayWrapper() {
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);

    useDndMonitor({
        onDragStart: (event) => setDraggedItem(event.active),
        onDragCancel: () => setDraggedItem(null),
        onDragEnd: () => setDraggedItem(null),
    });

    if (!draggedItem) return null;  // Make sure this only renders when there's a dragged item

    const isSideBarElement = draggedItem.data?.current?.isDesignerBtnElement;
    let node = <div>No Drag Overlay</div>;

    if (isSideBarElement) {
        const type = draggedItem.data?.current?.type as ElementsType;
        node = (
            <SideBarButtonElementDragoverlay formElement={FormElements[type]} />
        );
    }

    return (
        <DragOverlay>
            {node}
        </DragOverlay>
    );
}

export default DragOverlayWrapper;
