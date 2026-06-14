import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineSettings,MdDashboard } from "react-icons/md";
import { FaShop } from "react-icons/fa6";


const sidebarItems = [
    {
        name : '',
        label : 'Dashboard', 
        path: '/', 
        icon : MdDashboard,
    },
    {
        name : '',
        label : 'Restaurants', 
        path : '/restaurants',
        icon :FaShop,
    },
    {
        name : '',
        label : 'Menu', 
        path : '/restaurant-menu', 
        icon :MdOutlineRestaurantMenu,
    },
    {
        name : '',
        label : 'Orders', 
        path : '/customer-orders', 
        icon :TiShoppingCart,
    }, 
    {
        name : '',
        label : 'Customers', 
        path :'customers' ,
        icon :FaUsers,
    },
    {
        name : '',
        label : 'Settings', 
        path : '/setting',
        icon :MdOutlineSettings,
    }
]; 

export default sidebarItems;