"use client"
import React, { createContext, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContextType = {
    elements: FormElementInstance[],
    addElement: (index: number, element: FormElementInstance) => void,
    removeElement: (id: string) => void,
    setElements: React.Dispatch<React.SetStateAction<FormElementInstance[]>>,  
    selectedElement: FormElementInstance | null,
    setSelectedElement: React.Dispatch<React.SetStateAction<FormElementInstance | null>>,
    updateElement: (id: string, element: FormElementInstance) => void
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: React.ReactNode }) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);

    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            newElements.splice(index, 0, element);
            return newElements;
        });
    };

    const removeElement = (id: string) => {
        setElements((prev) => {
            return prev.filter(el => el.id !== id);
        });
    };

    const updateElement = (id: string, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            const index = newElements.findIndex(el => el.id === id);
            if (index !== -1) { // Check if the element exists
                newElements[index] = element;
            }
            return newElements;
        });
    };

    return (
        <DesignerContext.Provider value={{ elements, addElement, removeElement, selectedElement, setSelectedElement, updateElement,setElements}}>
            {children}
        </DesignerContext.Provider>
    );
}
