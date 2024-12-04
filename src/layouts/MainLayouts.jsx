import {  Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayouts(){
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </>
    )
}