"use client"
import React from "react";

function DesignerSideBar() {
    return (
        <aside className="w-[300px] max-w-[300px] flex flex-col gap-4 border-l-2 border-muted p-6 bg-background overflow-y-auto h-full shadow-md">
            <h3 className="text-lg font-medium text-muted-foreground mb-4">Elements</h3>
            {/* Sidebar Content */}
            <ul className="space-y-4">
                <li className="bg-accent rounded-lg p-4 text-sm">Element 1</li>
                <li className="bg-accent rounded-lg p-4 text-sm">Element 2</li>
                <li className="bg-accent rounded-lg p-4 text-sm">Element 3</li>
            </ul>
        </aside>
    )
}

export default DesignerSideBar;
