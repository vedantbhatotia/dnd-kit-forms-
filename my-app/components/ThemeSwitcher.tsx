"use client"
import { useTheme } from "next-themes"
import {useEffect, useState} from "react"
import { Tabs } from "./ui/tabs";
import { TabsList, TabsTrigger } from "./ui/tabs";
import { SunIcon } from "@radix-ui/react-icons";
function ThemeSwitcher(){
    const {theme,setTheme} = useTheme();
    const [mounted,setmounted] = useState<Boolean>(false);
    useEffect(()=>{
        setmounted(true);
    },[])
    return (
        <Tabs defaultValue={theme}>
            <TabsList className="border">
                <TabsTrigger value="light" onClick={()=>setTheme("light")}>
                    <SunIcon className="h-[1.2rem] w-[1.2rem]"></SunIcon>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
export default ThemeSwitcher