"use client"
import React, { createContext,useState} from "react"
import { FormElementInstance } from "../FormElements"
import { add } from "date-fns";
import { Dispatch } from "react";
import { SetStateAction } from "react";
type DesignerContextType = {
    elements: FormElementInstance[],
    addElement:(index:number,element:FormElementInstance)=>void,
    removeElement:(id:string)=>void,
    selectedElement:FormElementInstance|null,
    setSelectedElement: React.Dispatch<React.SetStateAction<FormElementInstance | null>>
}
export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({children}:{children:React.ReactNode}){
    const [elements,setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement,setSelectedElement] = useState<FormElementInstance | null>(null);
    const addElement = (index:number,element:FormElementInstance)=>{
        setElements((prev)=>{
            const newElements = [...prev];
            newElements.splice(index,0,element);
            return newElements;
        })
    }
    const removeElement=(id:string)=>{
        setElements((prev)=>{
            return prev.filter(el=>el.id !== id);
        })
    }
    return(
        <DesignerContext.Provider value={{elements,addElement,removeElement,selectedElement,setSelectedElement}}>
            {children}
        </DesignerContext.Provider>
    )
}