import {Outlet} from 'react-router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import {Toaster} from '../components/ui/sonner'
import { useSelector } from 'react-redux';
import Sidebar from '@/components/Sidebar';


const Layout = () => {

    let {theme}  = useSelector(state => state.themeSlice); 
    const {userData} = useSelector(state => state.currentuserSlice);
    
 
    return (
        <>
        <div className={`flex duration-1000 transition-all flex-col min-h-screen ${theme === 'light' ? 'bg-[#ffff] text-gray-900 ' : 'bg-zinc-800 text-white'}`}>
            <NavBar/>
            <main className="flex gap-10">
                {
                    userData?.role === 'restaurantOwner' && 
                    <Sidebar/>
                }
            <Outlet/>
            </main>
            <Footer/>
            <Toaster/>
        </div>
        </>
    )
}; 

export default Layout; 