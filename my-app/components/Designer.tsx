"use client"
import React from "react";
import DesignerSideBar from "./DesignerSideBar";

function Designer() {
    return (
        <div className="flex w-full h-full gap-6">
            {/* Main Design Area */}
            <div className="p-4 w-full">
                <div className="bg-background w-ful h-full m-auto rounded-xl flex flex-col items-center justify-center p-8 shadow-lg border border-muted">
                    <p className="text-3xl text-muted-foreground font-bold">
                        Drop Here
                    </p>
                </div>
            </div>

            {/* Sidebar */}
            <DesignerSideBar />
        </div>
    )
}

export default Designer;
