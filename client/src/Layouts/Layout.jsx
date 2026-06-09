import {Outlet} from 'react-router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import {Toaster} from '../components/ui/sonner'
import { useSelector } from 'react-redux';



const Layout = () => {

    let {theme}  = useSelector(state => state.themeSlice)
    
 
    return (
        <>
        <div className={`flex duration-1000 transition-all flex-col min-h-screen ${theme === 'light' ? 'bg-[#ffff] text-gray-900 ' : 'bg-zinc-900 text-white'}`}>
            <NavBar/>
            <div className="flex-1">
            <Outlet/>
            </div>
            <Footer/>
            <Toaster/>
        </div>
        </>
    )
}; 

export default Layout; 