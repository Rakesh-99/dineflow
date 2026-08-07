import { useSelector } from "react-redux";
import { IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from "react-router";
import { MapPin, Phone, Building2, CalendarDays, UserRound, Store } from "lucide-react";
import { Button } from "./ui/button";
import useGetShopsOfCurrentOwner from "@/hooks/useGetShopsOfCurrentOwner";

const RestaurantListings = () => {

    useGetShopsOfCurrentOwner();
    const { restaurants } = useSelector(state => state.currentOwnerRestaurants);
    const { theme } = useSelector(state => state.themeSlice);
    const navigate = useNavigate();
    const isDark = theme === "dark";

    const getRestaurantSlug = (restaurantName) => {
        return restaurantName.toLowerCase().replaceAll(' ', '').trim();
    };

    // loading skeleton :
    if (!restaurants) {
        return (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-3 md:mx-5 lg:mx-10">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className={`rounded-lg overflow-hidden animate-pulse ${isDark ? "bg-zinc-800" : "bg-gray-100"}`}>
                        <div className={`h-40 ${isDark ? "bg-zinc-700" : "bg-gray-200"}`} />
                        <div className="p-4 space-y-3">
                            <div className={`h-4 w-2/3 rounded ${isDark ? "bg-zinc-700" : "bg-gray-200"}`} />
                            <div className={`h-3 w-full rounded ${isDark ? "bg-zinc-700" : "bg-gray-200"}`} />
                            <div className={`h-3 w-4/5 rounded ${isDark ? "bg-zinc-700" : "bg-gray-200"}`} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // empty state :
    if (restaurants.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center mx-3">
                <div className={`rounded-full p-4 mb-4 ${isDark ? "bg-zinc-800" : "bg-orange-50"}`}>
                    <Store className={`size-8 ${isDark ? "text-zinc-400" : "text-customOrange"}`} />
                </div>
                <h3 className="text-lg font-semibold">No restaurants yet</h3>
                <p className="text-sm text-gray-400 mt-1 max-w-xs">
                    Restaurants you add will show up here with their details and menu status.
                </p>
            </div>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-3 md:mx-5 lg:mx-10">
            {restaurants.map((restaurant) => (
                <div
                    key={restaurant._id}
                    className={`group rounded-lg overflow-hidden border transition-all duration-200 ${
                        isDark
                            ? "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 hover:shadow-xl hover:shadow-black/20"
                            : "bg-white border-gray-100 hover:shadow-lg hover:shadow-gray-200/60"
                    }`}
                >
                    {/* image :  */}
                    <div className="relative h-40 overflow-hidden">
                        <img
                            src={restaurant?.image?.url}
                            alt={restaurant?.shopName}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                        <h2 className="absolute bottom-3 left-4 right-4 text-white font-semibold text-base md:text-lg truncate">
                            {restaurant?.shopName}
                        </h2>
                    </div>

                    {/* details :  */}
                    <div className="p-4 space-y-3">

                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <UserRound className="size-3.5 shrink-0" />
                            <span className="truncate">{restaurant.owner.fullname}</span>
                            <span className="mx-0.5">·</span>
                            <Phone className="size-3.5 shrink-0" />
                            <span className="truncate">{restaurant.owner.contact}</span>
                        </div>

                        <div className="flex items-start gap-2 text-xs text-gray-400">
                            <MapPin className="size-3.5 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{restaurant?.address}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Building2 className="size-3.5 shrink-0" />
                            <span className="truncate">{restaurant?.city}</span>
                        </div>

                        <div className={`flex items-center justify-between pt-3 mt-1 border-t ${isDark ? "border-zinc-700" : "border-gray-100"}`}>
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                <CalendarDays className="size-3.5" />
                                <span>Updated {new Date(restaurant.updatedAt).toLocaleDateString()}</span>
                            </div>

                            <Button
                                size="sm"
                                className="bg-customOrange rounded gap-1 px-3"
                                onClick={() => navigate(`/restaurantinfo/${getRestaurantSlug(restaurant.shopName)}/${restaurant._id}`)}
                            >
                                <span className="text-xs font-medium">View</span>
                                <IoIosArrowDropright className="size-3.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RestaurantListings;