import { useSelector } from "react-redux";
import { GrRestaurant } from "react-icons/gr";
import { IoIosArrowDropright } from "react-icons/io";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router";
import { MapPin, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import useGetShopsOfCurrentOwner from "@/hooks/useGetShopsOfCurrentOwner";



const RestaurantListings = () => {

    useGetShopsOfCurrentOwner(); 
    const { restaurants } = useSelector(state => state.currentOwnerRestaurants);
    const { theme } = useSelector(state => state.themeSlice);
    const navigate = useNavigate();

    const getRestaurantName = (restaurantName) => {
        return restaurantName.toLowerCase().replaceAll(' ', '').trim();
    }



    return (
        <>
            {
                restaurants ?
                    <div className='grid sm:grid-cols-2 grid-cols-1 mx-3 md:mx-5 lg:mx-10 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                        {
                            restaurants.map((restaurant, idx) => (
                                <div
                                    key={idx}
                                    className={`border-2 py-4 transition-all duration-200  rounded-md ${theme === 'light' ? 'border-gray-100 hover:shadow hover:shadow-customOrange/40' : 'border-zinc-700 hover:shadow-2xl hover:shadow-customOrange/20'}`}
                                >

                                    <div>

                                        {/* image container :  */}
                                        <div className="mx-3">
                                            <img src={restaurant?.image.url} alt="restaurant img" className="w-fit max-h-50  object-cover  transition-all rounded-md duration-300 overflow-hidden" />
                                        </div>

                                        {/* restaurant glance data :  */}
                                        <div className={` mt-5  mx-2 p-3 rounded-md border py-4 ${theme === 'dark' ? 'bg-mauve-800 border-mauve-700' : 'bg-mauve-50 border-mauve-50'}`}>

                                            {/* restaurant icon and title :  */}
                                            <div className={`flex items-center gap-1`}>
                                                <div className={`border rounded-full py-2 px-2 ${theme === 'light' ? 'bg-orange-50 border-orange-100' : 'bg-customOrange border-orange-700'}`}>
                                                    <GrRestaurant className={`${theme === 'light' ? 'text-customOrange' : 'text-orange-200'}`} />
                                                </div>
                                                <h2 className='md:text-xl text-sm  font-semibold'>{restaurant?.shopName}</h2>
                                            </div>

                                           

                                           
                                                <div className="grid grid-cols-1 gap-2 text-[10px] md:text-xs mt-5 text-gray-400">

                                                    <div className='flex items-center gap-1'>
                                                        <UserRound className="size-4" />
                                                        <span className=''>Owner : {restaurant.owner.fullname}</span>
                                                    </div>

                                                    <div className='flex items-center gap-1 '>
                                                        <PiBuildingApartment className="size-4" />
                                                        <span>City : {restaurant?.city}</span>
                                                    </div>

                                                
                                                    <div className='flex items-center gap-1  '>
                                                        <MapPin className="size-4" />
                                                        <span >Address : {restaurant?.address}</span>
                                                    </div>

                                                    <div className='flex items-center gap-1 '>
                                                        <MdOutlinePhoneInTalk className="size-4" />
                                                        <span>Contact : {restaurant?.owner.contact}</span>
                                                    </div>

                                                    <div className='flex items-center gap-1  '>
                                                        <SlCalender className="size-3.5" />
                                                        <span>Created : {new Date(restaurant.createdAt).toLocaleDateString()}</span>
                                                    </div>

                                                        <div className='flex items-center gap-1 '>
                                                        <SlCalender className="size-3.5" />
                                                        <span>Updated : {new Date(restaurant.updatedAt).toLocaleDateString()}</span>
                                                    </div>
                                            </div>
                                        </div>


                                        {/* div of arrow btn to navigate to the restaurant details page :  */}

                                        <Button
                                            className="mt-5 float-right mx-5 rounded bg-customOrange"
                                            onClick={() => navigate(`/restaurantinfo/${getRestaurantName(restaurant.shopName)}/${restaurant._id}`)}
                                        >
                                            <span className="text-xs font-semibold">View</span>
                                            <IoIosArrowDropright className="hover:cursor-pointer active:animate-ping size-4" />
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