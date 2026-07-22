import { useSelector } from "react-redux";
import { GrRestaurant } from "react-icons/gr";
import { IoIosArrowDropright } from "react-icons/io";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router";
import { MapPin, UserRound } from "lucide-react";
import { Button } from "./ui/button";




const RestaurantListings = () => {

      const {restaurants} = useSelector(state => state.currentOwnerRestaurants); 
      const {theme} = useSelector(state=> state.themeSlice); 
      const navigate = useNavigate(); 

      const getRestaurantName = (restaurantName) => { 
        return restaurantName.toLowerCase().replaceAll(' ','').trim();
      }
      
      console.log(restaurants);
      
        
  return (
    <>
    {
        restaurants ? 
        <div className=' grid grid-cols-1 xl:grid-cols-2 gap-5 mx-5'>
        {
        restaurants.map((restaurant, idx)=> (
        <div 
        key={idx}
        className={` shadow-xs p-2 border-2 rounded-md  m-auto ${theme === 'light' ? 'border-gray-100' : 'border-zinc-700'}`}>

        <div className="flex md:flex-row flex-col md:items-center items-start gap-2 md:gap-5 ">

            {/* image container :  */}
            <div className="max-w-60 border md:max-h-52 rounded-md overflow-hidden ">
                <img src={restaurant?.image} alt="restaurant img" className=" object-cover"/>
            </div>

            {/* restaurant glance data :  */}
            <div className={`flex flex-col  gap-5`}>
                {/* restaurant icon and title :  */}
                <div className={`flex gap-2  w-full  rounded-md border-zinc-700 items-center`}>
                    <div className={`border rounded-full py-2 px-2 ${theme === 'light' ? 'bg-orange-50 border-orange-100' : 'bg-customOrange border-orange-700'}`}>
                        <GrRestaurant className={`${theme === 'light' ? 'text-customOrange' : 'text-orange-200'}`}/>
                    </div>
                    <h2 className='font-semibold'>{restaurant?.shopName}</h2>
                </div>

                <div className={`grid md:grid-cols-2 gap-4 ${theme === 'light' ? 'text-gray-500' : 'text-zinc-400'}`}>

                    {/* group 1 :  */}
                    <div className="text-xs flex flex-col justify-start gap-2 md:gap-4">

                        <div className='flex items-center gap-1'>
                        <UserRound className="size-4"/>
                        <span className=''>Owner : {restaurant.owner.fullname}</span>
                        </div>

                        <div className='flex items-center gap-1 '>
                            <PiBuildingApartment className="size-4"/>
                            <span>{restaurant?.city}</span>
                        </div>
                    
                        <div className='flex items-center gap-1 '>
                            <SlCalender className="size-3.5"/>
                            <span>Updated : {new Date(restaurant.updatedAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* group 2 :  */}
                    <div className="text-xs flex flex-col justify-start gap-2  md:gap-4">

                        <div className='flex items-center gap-1  '>
                                <MapPin className="size-4" />
                                <span >{restaurant?.address}</span>
                        </div>

                        <div className='flex items-center gap-1 '>
                                <MdOutlinePhoneInTalk className="size-4"/>
                                <span>{restaurant?.owner.contact}</span>
                            </div>

                            <div className='flex items-center gap-1  '>
                                <SlCalender className="size-3.5"/>
                                <span>Created : {new Date(restaurant.createdAt).toLocaleDateString()}</span>
                            </div>
                    </div>
                </div>
            </div>


            {/* div of arrow btn to navigate to the restaurant details page :  */}
            <Button  
                
                className="flex bg-customOrange gap-2 border py-1 px-2 rounded items-center mr-10 "
                onClick={() => navigate(`/restaurantinfo/${getRestaurantName(restaurant.shopName)}/${restaurant._id}`)}
                >
                <span className="text-xs font-bold">View</span>
                <IoIosArrowDropright className="hover:cursor-pointer active:animate-ping" size={18} />
                
            </Button>
        </div>

       
        </div>
            ))
        }
        </div>
        : 
        <>Loading ..</>
    }
    </>
  )
}

export default RestaurantListings