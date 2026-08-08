import {useSelector, useDispatch} from 'react-redux';
import { MapPin, Search, SearchIcon, ShoppingCart } from 'lucide-react';
import { switchTheme } from '../redux/features/theme.slice';
import {  useState } from 'react';
import { Input } from './ui/input';
import { RxCrossCircled } from "react-icons/rx";
import { Button } from './ui/button';
import axios from 'axios';
import { setCurrentUser } from '../redux/features/currentUser.slice';
const URL = import.meta.env.VITE_BACKEND_AUTH_API_URL;
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog'; 
import { toast } from 'sonner';
import { Link } from 'react-router';
import { RiLogoutCircleRLine } from "react-icons/ri";
import {
 DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../components/ui/dropdown-menu"; 
import { TiWeatherSunny } from "react-icons/ti";
import { BsMoonStars } from "react-icons/bs";
import { setCurrentRestaurantOwnerData } from '@/redux/features/currentOwnerRestaurants.slice';
import { setCategory } from '@/redux/features/categorySlice';



 



const NavBar = () => {

  const dispatch = useDispatch() ; 
  const {theme} = useSelector(state => state.themeSlice); 
  const {userAddress, userData } = useSelector(state => state.currentuserSlice); 

  
  
  
  
  const [isShowSearchBar, setIsShowSearchBar] = useState(false); 
  const [searchFoodData , setSearchFoodData] = useState('');
  const [isLogoutBtnClicked, setIsLogoutBtnClick] = useState(false);
  
  

        const themeChangeHandle = (themePreferences) => { 
          dispatch(switchTheme(themePreferences))
        }

        const inputFoodDataHandler = (e) => { 
          const { value} = e.target
          setSearchFoodData(value)
        }

        const  formSubmitHandler = (e) => {
            e.preventDefault() ;
        }

        const logoutHandler = async() => { 
          try {
            const {data} = await axios.post(`${URL}/logout-user`, {}, 
              {
                withCredentials : true
              }
            ); 
            if(data.success) { 
              dispatch(setCurrentUser(null));
              dispatch(setCurrentRestaurantOwnerData(null))
              dispatch(setCategory(null));
              dispatch(switchTheme('light'))
              toast.success(data.message);
              setIsLogoutBtnClick(false);
            }
          } catch (error) {
            toast.error(`Could not logout your account! ${error}`);
          }
        }


     

  return (
    <>
        <div className={`md:px-5 px-1 shadow-sm`}>
          {
            userData?
            // normal navbar : 
            <div className="h-20 relative flex items-center justify-evenly w-full ">


                  {/* left section logo :  */}
               <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-customOrange shadow-[0_0_12px_rgba(249,115,22,0.6)] shrink-0"></div>

                <div className="flex flex-col">
                  <h1 className="text-lg md:text-2xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                      Dine
                    </span>
                    <span className={`${theme === 'light' ? 'text-zinc-800' : 'text-white'}`}>
                      Flow
                    </span>
                  </h1>

                  <span className="text-[10px] md:text-xs text-slate-500 tracking-widest uppercase">
                    Food Delivery
                  </span>
                </div>
              </div>

                  {/* Middle Section 1 (city and search input ):  */}
                  <div className="">
                    {
                     userData?.role === 'user' &&

                     <>
                      <div className="md:flex hidden rounded-xs gap-5  items-center">
                          {/* City location :  */}
                            <div className={`${theme === "dark" ? "border-zinc-700" : "border-zinc-100"} border rounded-md px-2 flex items-center`}>
                              <MapPin color='#F54927' className='size-4'/>
                              <input 
                              type="text" 
                              disabled
                              value={userAddress?.address2}  
                              className=' text-[10px]  outline-none p-2 rounded-md min-w-60  '
                              />
                            </div>

                            {/* Search food and restaurants :  */}
                            <div className={` border-b px-2 flex  items-center ${theme === "dark" ? "border-zinc-700" : "border-zinc-100"}`}>

                              <Search color='gray'  className='size-4 absolute md:cursor-default cursor-pointer' onClick={() => setIsShowSearchBar(!isShowSearchBar)}/>

                              <input 
                              type="text" 
                              value={searchFoodData}
                              onChange={inputFoodDataHandler} 
                              placeholder='Search food, restaurants ..'  
                              className='  text-sm placeholder:text-sm outline-none ml-5 py-1 rounded-md  w-60'/>
                            </div>
                    </div>

                    {/* only searchbar icon for mobile devices :  */}
                    <div className="h-10 w-10 md:hidden  relative flex items-center justify-center">
                        <Search size={20} color='gray' className='absolute  active:scale-95 duration-200 transition-all' onClick={()=> setIsShowSearchBar(!isShowSearchBar)}/>
                    </div>
                     </>
                    }

                   
                  </div>

                

                  {/* Right Section :  (cart , my order and account ) */}
                  <div className="flex md:gap-10 gap-4 items-center">
                      {/* cart icon  :  */}
                      {
                        userData && userData.role === "user" && 
                        <div className="w-10 h-10 flex items-center justify-center relative">
                        <ShoppingCart className='cursor-pointer' size={21}/>
                        <span className='border border-[#ff8802] absolute left-5 bottom-6 rounded-full bg-[#ff6900]  font-semibold w-1/3 p-2 h-1/3 text-white flex items-center justify-center text-[9px]'>2</span>
                      </div>
                      }    

                      {/* User account button or account button depending upon the current user  :  */}

                   {
                      userData ? (
                        <DropdownMenu >
                          <DropdownMenuTrigger asChild>
                            <Button className="w-9 h-9 cursor-pointer rounded-full border border-[#ff6900] bg-[#ff6900]">
                              {userData?.fullname?.slice(0,1).toUpperCase()}
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent className={`${theme === 'light' ? 'bg-white text-zinc-800' : 'bg-zinc-700 text-zinc-100'}`}>
                            <DropdownMenuGroup>
                              <DropdownMenuLabel>My Account</DropdownMenuLabel>
                              <DropdownMenuItem className={`cursor-pointer`}>Profile</DropdownMenuItem>
                              <DropdownMenuItem className={`cursor-pointer`}>Orders</DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuSub >
                              <DropdownMenuSubTrigger className={`cursor-pointer`}>
                                Appearance
                              </DropdownMenuSubTrigger>

                              <DropdownMenuSubContent className={`${theme === 'light' ? 'bg-white text-zinc-800' : 'bg-zinc-700 text-zinc-100'}`}>
                                <DropdownMenuItem className={`flex items-center`} onClick={()=>themeChangeHandle('light')} >
                                  <TiWeatherSunny className='size-4'/>
                                  Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>themeChangeHandle('dark')}>
                                  <BsMoonStars className='size-3 ml-1' />
                                  Dark
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                              <DropdownMenuItem onClick={()=> setIsLogoutBtnClick(true) } className={`text-red-400 cursor-pointer`}>Logout</DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Button>
                          <Link to="/account">Sign In</Link>
                        </Button>
                      )
                    }

                  </div>

                  {/* search bar toggle for mobile devices :  */}
                    {
                      isShowSearchBar && 

                          <div className={`z-10 absolute border shadow duration-200 transition-all w-[90%] p-5  rounded-sm md:hidden flex flex-col gap-5 top-30 ${theme === 'light' ? ' border-zinc-200 ' : '  border-zinc-600'} `}>

                          {/* Cross icon to cancel :  */}
                          <div className="w-full">
                          <RxCrossCircled size={20} className='cursor-pointer  float-right active:scale-90 transition-all duration-300' onClick={()=> setIsShowSearchBar(false)}/>
                          </div>
                          
                          <p className='text-xs'>Search food and restaurant nearby you</p>
                          <form action="" onSubmit={formSubmitHandler}>

                        <div className="flex flex-col gap-5 shadow-xs rounded ">

                        {/* section for showing current location :  */}
                          <div className= {`flex px-2 items-center border rounded ${theme === "dark"? "border-zinc-700": "border-zinc-100" }`}>

                          <MapPin color='red' className={`size-4`}/>
                          <Input 
                          type="text"
                          name = 'searchlocation'
                          value = {userAddress.address2}
                          placeholder='Enter your location'
                          className={` placeholder:text-sm  border-none! text-xs  `}
                          />
                          </div>
                        
                        {/* section for searching restaurants :  */}
                        <div className={`flex border-b items-center ${theme === "dark"? "border-zinc-700": "border-zinc-100" }`}>
                          <Search color='gray' className='size-4  '/>

                          <Input 
                          name = 'searchfood'
                          value = {searchFoodData}
                          onChange = {inputFoodDataHandler}
                          placeholder='Search food..'
                          className={` placeholder:text-sm border-none!  text-xs  `}
                          />
                        </div>


                        </div>
                       

                          <Button type='submit' className='rounded py-2 mt-2 float-right text-xs bg-[#0071e3]'>
                            <SearchIcon />
                            <span className='text-[9px]'>Search</span>
                          </Button>
                          </form>
                        
                          </div>
                    }

                </div>
                : 
                // Navbavr for account page 
              <div className={`w-full ${theme ==='dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-white text-zinc-800'}`}>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-customOrange" />
                  
                  <h1 className="font-outfit text-2xl font-black tracking-tight">
                    <span className="text-customOrange">Dine</span>
                    <span>Flow</span>
                  </h1>
                </div>

                <p className="ml-5">
                  Login or create an account to start ordering your favorite meals.
                </p>
              </div>
          }
        </div>


        {/* shadcn logout popup code snippet :  */}

          {
            isLogoutBtnClicked && 

            <AlertDialog  open>
                <AlertDialogTrigger  asChild >
                  <div className="flex gap-2 hover:text-red-400 cursor-pointer transition-all duration-100  items-center ">
                        <span><RiLogoutCircleRLine /></span>
                        <span className='text-xs  md:text-sm'>Logout</span>
                  </div>
                </AlertDialogTrigger>
              <AlertDialogContent className={`${theme === 'light' ? 'bg-gray-200 text-zinc-700' : 'bg-zinc-700 text-white'}`}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout ?</AlertDialogTitle>
                  <AlertDialogDescription className={`${theme === 'light' ? 'bg-gray-200 text-zinc-700' : 'bg-zinc-700 text-white'}`}>
                    After logout you will be redirected to the login page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className={` ${theme === 'light' ? ' text-zinc-700' : ' text-white bg-zinc-700'}`}>
                  <AlertDialogCancel onClick={()=>setIsLogoutBtnClick(false)} className={`h-9 border-none rounded-sm px-5 ${theme ==='light' ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-700 text-white'}`}>Cancel</AlertDialogCancel>
                  <AlertDialogAction className={`h-9 border-none rounded-sm px-5 bg-red-500`} onClick={logoutHandler}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>                  
          }
 
    </>
  )
}

export default NavBar