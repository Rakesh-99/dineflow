import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineSettings,MdDashboard } from "react-icons/md";
import { FaShop } from "react-icons/fa6";


const sidebarItems = [
    {
        name : '',
        label : 'Dashboard', 
        component : '',
        icon : MdDashboard,
    },
    {
        name : '',
        label : 'Restaurants', 
        component : '',
        icon :FaShop,
    },
    {
        name : '',
        label : 'Menu', 
        component : '',
        icon :MdOutlineRestaurantMenu,
    },
    {
        name : '',
        label : 'Orders', 
        component : '',
        icon :TiShoppingCart,
    }, 
    {
        name : '',
        label : 'Customers', 
        component :'' ,
        icon :FaUsers,
    },
    {
        name : '',
        label : 'Settings', 
        component : '',
        icon :MdOutlineSettings,
    }
]; 

export default sidebarItems;