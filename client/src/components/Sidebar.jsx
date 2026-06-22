import sidebarItems from "@/constants/sidebarItems"
import {  useSelector } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router";


const Sidebar = () => {

    const {theme} = useSelector(state=> state.themeSlice);
    const [showSidebarMenu, setShowSidebarMenu] = useState(false);




    

  

  return (
    <>
    <div className="relative">

    <div onMouseEnter={()=> setShowSidebarMenu(true)} onMouseLeave={()=>setShowSidebarMenu(false)} className={`w-16 hover:w-28 duration-300 ease-in-out min-h-screen border-r `}>
        {
            sidebarItems.map((item)=> { 
                const {label, icon : Icon, path } = item; 
                
                return(
                    <NavLink to={`${path}`} 
                        key={item.label} 
                        className={`flex  flex-col  py-4   cursor-pointer  duration-300 mx-2 rounded-xs  transition-all  items-center ${theme === 'light' ? 'hover:bg-orange-50 hover:text-orange-600' : 'hover:bg-zinc-700 hover:text-orange-200'}`}>

                            <Icon size={13}/>
                            <span
                            className={`text-[10px] font-semibold transition-all duration-300 ${
                                showSidebarMenu
                                ? "opacity-100"
                                : "opacity-0 overflow-hidden"
                            }`}
                            >
                            {label}
                            </span>
                    </NavLink>
                )
            })
        }
    </div>

    </div>
    </>
  )
}

export default Sidebar;