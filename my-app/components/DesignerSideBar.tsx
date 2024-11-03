"use client"
import React from "react"
import { FormElements } from "./FormElements"
import SideBarButtonElement from "./SideBarButtonElement"
import useDesigner from "./hooks/useDesigner"
import FormElementsSideBar from "./FormElementsSideBar"
import PropertiesFormSideBar from "./PropertiesFormSideBar"

function DesignerSideBar() {
    const {selectedElement} = useDesigner();

    return (
        <aside className="w-full max-w-[300px] flex flex-col gap-4 border-l p-4 bg-background overflow-y-auto h-full shadow-md">
            {/* <SideBarButtonElement formElement={FormElements.TextField} />  */}
            {!selectedElement && (
                <>
                <h3 className="text-lg font-medium text-muted-foreground mb-4">Elements</h3>
                <FormElementsSideBar></FormElementsSideBar>
                </>
            )}
            {selectedElement && <PropertiesFormSideBar></PropertiesFormSideBar>}
        </aside>
    )
}

export default DesignerSideBar
