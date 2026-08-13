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
    const { restaurants, userCityBasedRestaurants } = useSelector(state => state.currentOwnerRestaurants);
    const { userData } = useSelector(state => state.currentuserSlice);
    const { theme } = useSelector(state => state.themeSlice);
    const navigate = useNavigate();



    const getRestaurantName = (restaurantName) => {
        return restaurantName.toLowerCase().replaceAll(' ', '').trim();
    }


    if (userData.role === "restaurantOwner") {
        if (!restaurants || restaurants?.length < 1) {
            return (
                <h1>No restaurant found!</h1>
            )
        }
    }



    return (
        <>
            {/* rendering owner restaurant :  */}

            {restaurants?.length > 0 && userData.role === "restaurantOwner" &&

                <div className='grid sm:grid-cols-2 grid-cols-1 mx-3 md:mx-5 lg:mx-10 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                    {
                        restaurants?.map((restaurant, idx) => (
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
            }

            {/* rendering user city based restaurant :  */}
            {userData.role === "user" && userCityBasedRestaurants?.length > 0 &&


                <div className="mt-10 grid grid-cols-3 gap-4">
                    {
                        userCityBasedRestaurants?.map((restaurant) => {

                            return (

                                <div
                                    key={restaurant?._id}
                                    className={`group overflow-hidden rounded-xl border transition-all duration-200 ${theme === 'light' ? 'border-gray-100 bg-white hover:shadow-lg hover:shadow-gray-200/60' : 'border-zinc-800 bg-zinc-900 hover:shadow-2xl hover:shadow-customOrange/10'}`}
                                >

                                    {/* image container : */}
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={restaurant?.image.url}
                                            alt="restaurant img"
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

                                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-gray-700">
                                            <PiBuildingApartment className="size-3.5" />
                                            {restaurant?.city}
                                        </span>

                                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                                            <div className={`border rounded-full py-1.5 px-1.5 shrink-0 ${theme === 'light' ? 'bg-orange-50 border-orange-100' : 'bg-customOrange border-orange-700'}`}>
                                                <GrRestaurant className={`size-3.5 ${theme === 'light' ? 'text-customOrange' : 'text-orange-200'}`} />
                                            </div>
                                            <h2 className="text-white text-sm font-semibold truncate drop-shadow">{restaurant?.shopName}</h2>
                                        </div>
                                    </div>

                                    {/* restaurant glance data : */}
                                    <div className="px-4 pt-3 pb-4">

                                        <div className="grid grid-cols-1 gap-2 text-[11px] md:text-xs text-gray-400">

                                            <div className='flex items-center gap-2'>
                                                <UserRound className="size-3.5 shrink-0" />
                                                <span className="truncate">Owner : {restaurant.owner.fullname}</span>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <MapPin className="size-3.5 shrink-0" />
                                                <span className="truncate">Address : {restaurant?.address}</span>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <MdOutlinePhoneInTalk className="size-3.5 shrink-0" />
                                                <span className="truncate">Contact : {restaurant?.owner.contact}</span>
                                            </div>

                                        </div>

                                        {/* footer : created/updated + view btn */}
                                        <div className={`mt-3 pt-3 flex items-center justify-between border-t ${theme === 'light' ? 'border-gray-100' : 'border-zinc-800'}`}>
                                            <div className="flex flex-col gap-0.5 text-[10px] text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <SlCalender className="size-3" />
                                                    Updated {new Date(restaurant.updatedAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <Button
                                                className="rounded-full bg-customOrange h-7 px-3 gap-1"
                                                onClick={() => navigate(`/user-restaurant-details/${getRestaurantName(restaurant.shopName)}/${restaurant._id}`)}
                                            >
                                                <span className="text-xs font-semibold">View</span>
                                                <IoIosArrowDropright className="size-4 transition-transform group-hover:translate-x-0.5" />
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            )

                        })
                    }
                </div>

            }
        </>
    )
}

export default RestaurantListings