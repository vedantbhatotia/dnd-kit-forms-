"use client"
import React from "react";
import { FormElements } from "./FormElements";
import SideBarButtonElement from "./SideBarButtonElement"
function DesignerSideBar() {
    return (
        <aside className="w-[300px] max-w-[300px] flex flex-col gap-4 border-l-2 border-muted p-6 bg-background overflow-y-auto h-full shadow-md">
            <h3 className="text-lg font-medium text-muted-foreground mb-4">Elements</h3>
            <SideBarButtonElement formElement={FormElements.TextField}></SideBarButtonElement>
        </aside>
    )
}

export default DesignerSideBar;
