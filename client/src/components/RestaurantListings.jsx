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

    const { restaurants } = useSelector(state => state.currentOwnerRestaurants);
    const { theme } = useSelector(state => state.themeSlice);
    const navigate = useNavigate();

    const getRestaurantName = (restaurantName) => {
        return restaurantName.toLowerCase().replaceAll(' ', '').trim();
    }



    return (
        <>
    {
        restaurants.length > 0 ?
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 py-4'>
                {
                    restaurants.map((restaurant, idx) => (
                        <div
                            key={idx}
                            className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme === 'light'
                                    ? 'bg-white border-gray-100 shadow-sm hover:shadow-orange-100'
                                    : 'bg-zinc-900 border-zinc-800 shadow-md hover:shadow-black/40'
                                }`}
                        >
                            {/* image container */}
                            <div className="relative w-full h-44 overflow-hidden">
                                <img
                                    src={restaurant?.image.url}
                                    alt={restaurant?.shopName}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />

                                {/* floating shop name over image */}
                                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3">
                                    <div className="border rounded-full p-1.5 bg-customOrange/90 border-orange-300 backdrop-blur-sm">
                                        <GrRestaurant className="text-white text-sm" />
                                    </div>
                                    <h2 className="font-semibold text-white text-sm drop-shadow-sm truncate">
                                        {restaurant?.shopName}
                                    </h2>
                                </div>
                            </div>

                            {/* body */}
                            <div className="flex flex-col gap-4 p-4 flex-1">
                                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs ${theme === 'light' ? 'text-gray-500' : 'text-zinc-400'
                                    }`}>
                                    <div className='flex items-center gap-1.5'>
                                        <UserRound className="size-4 shrink-0" />
                                        <span className='truncate'>{restaurant.owner.fullname}</span>
                                    </div>

                                    <div className='flex items-center gap-1.5'>
                                        <MapPin className="size-4 shrink-0" />
                                        <span className='truncate'>{restaurant?.address}</span>
                                    </div>

                                    <div className='flex items-center gap-1.5'>
                                        <PiBuildingApartment className="size-4 shrink-0" />
                                        <span className='truncate'>{restaurant?.city}</span>
                                    </div>

                                    <div className='flex items-center gap-1.5'>
                                        <MdOutlinePhoneInTalk className="size-4 shrink-0" />
                                        <span className='truncate'>{restaurant?.owner.contact}</span>
                                    </div>

                                    <div className='flex items-center gap-1.5'>
                                        <SlCalender className="size-3.5 shrink-0" />
                                        <span>Created {new Date(restaurant.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <div className='flex items-center gap-1.5'>
                                        <SlCalender className="size-3.5 shrink-0" />
                                        <span>Updated {new Date(restaurant.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* footer with CTA */}
                                <div className={`flex items-center justify-between pt-3 mt-auto border-t ${theme === 'light' ? 'border-gray-100' : 'border-zinc-800'
                                    }`}>
                                    <span className={`text-[11px] font-medium uppercase tracking-wide ${theme === 'light' ? 'text-gray-400' : 'text-zinc-500'
                                        }`}>
                                        Restaurant details
                                    </span>

                                    <Button
                                        className="flex bg-customOrange gap-2 border py-1.5 px-3 rounded-lg items-center hover:brightness-110 transition"
                                        onClick={() => navigate(`/restaurantinfo/${getRestaurantName(restaurant.shopName)}/${restaurant._id}`)}
                                    >
                                        <span className="text-xs font-bold text-white">View</span>
                                        <IoIosArrowDropright className="text-white hover:cursor-pointer active:animate-ping" size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            :
            <div className="w-full text-center py-16">
                <h2 className="text-base text-gray-400">No Restaurant Found</h2>
            </div>
    }
</>
    )
}

export default RestaurantListings