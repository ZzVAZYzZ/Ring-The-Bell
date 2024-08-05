import { Outlet } from "react-router-dom";
import "./scss/layout.css";

export function Layout(){
    return(
        <div className="layout">
            <Outlet />
        </div>
    )
}