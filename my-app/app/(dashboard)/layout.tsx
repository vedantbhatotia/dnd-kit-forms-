import { UserButton } from "@clerk/nextjs";
import  React,{Children, ReactNode} from "react";
import Logo from "../../components/Logo";
import ThemeSwitcher from "../../components/ThemeSwitcher";
function Layout({children}:{children:ReactNode}){
    return(
        <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
            <nav>
                <Logo></Logo>
                <ThemeSwitcher></ThemeSwitcher>
                <UserButton></UserButton>
            Nav</nav>
            <main className="flex w-full flex-grow">{children}</main>
        </div>
    )
}
export default Layout;