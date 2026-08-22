import { Label } from "@/components/ui/label";
import { BadgeCheck, BadgeIndianRupee, ClockFading, IndianRupee, LeafyGreen, Loader, MapPinned, Phone, Plus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addToCart } from "@/redux/features/cart.slice";

const ITEM_URL = import.meta.env.VITE_BACKEND_ITEM_API_URL;


const UserRestaurantDetails = () => {
    const { restaurantId } = useParams();
    const { userCityBasedRestaurants } = useSelector(state => state.currentOwnerRestaurants)
    const getUserRestaurantDetails = userCityBasedRestaurants.filter(restaurant => restaurant._id === restaurantId)[0];
    const { theme } = useSelector(state => state.themeSlice);
    const isDark = theme === "dark";
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartSlice);

    const [menuItems, setMenuItems] = useState(null);

    useEffect(() => {
        if (!restaurantId) return;
        (async function fetchMenu() {
            try {
                const { data } = await axios.get(`${ITEM_URL}/shop-items/${restaurantId}`, { withCredentials: true });
                if (data.success) setMenuItems(data.data);
            } catch (error) {
                setMenuItems([]);
                console.log(`Could not load the menu ${error}`);
            }
        })();
    }, [restaurantId]);

    // single-restaurant cart rule : warn when replacing another shop's items
    const handleAddToCart = (item) => {
        if (!getUserRestaurantDetails) return;
        if (cart.shopId && cart.shopId !== restaurantId) {
            toast.info(`Cart updated : previous items from ${cart.shopName} were removed`);
        }
        dispatch(addToCart({
            shopId: restaurantId,
            shopName: getUserRestaurantDetails?.shopName,
            item: {
                itemId: item._id,
                name: item.name,
                price: item.price,
                image: item.image?.url
            }
        }));
        toast.success(`${item.name} added to cart`);
    };

    // breadcrumbs : 
    const data = [
        {
            label: 'Home',
            path: '/'
        }
    ]

    return (
        <>

            {/* breadcrumbs :  */}
            {/* breadcrumbs  */}
            <div className=" flex justify-center mt-5">
                <Breadcrumb className={``}>
                    <BreadcrumbList>
                        {
                            data.map((links) => {
                                const { path, label } = links;
                                return (
                                    <div className="flex items-center" key={label}>
                                        <BreadcrumbItem >
                                            <BreadcrumbLink asChild>
                                                <Link to={`${path}`}>{label}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                    </div>
                                )
                            })
                        }
                        <BreadcrumbItem>
                            <BreadcrumbPage className={`${theme === 'dark' ? 'text-white' : 'text-zinc-700'}`}>
                                {getUserRestaurantDetails?.shopName}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="lg:flex-row justify-center flex flex-col mx-5 gap-10 max-w-6xl mt-10 lg:mx-auto">
                {/* left section :  */}
                <div className="w-full">
                    {/* image container :  */}
                    <div className=" h-96 ">
                        <img className="w-full h-full object-cover rounded-lg" src={getUserRestaurantDetails?.image.url} alt="" />
                    </div>

                    {/* restaurant name & description :  */}
                    <div className="flex flex-col mt-5 gap-2">
                        {/* Name :  */}
                        <h2 className="text-2xl font-semibold">{getUserRestaurantDetails?.shopName}</h2>

                        {/* description :  */}
                        <p className="text-gray-400">{getUserRestaurantDetails?.description}</p>
                    </div>

                    {/* Badges :  */}
                    <div className="flex gap-2">


                        {/* budget badge :  */}
                        <div className="mt-5">

                            {/* Is budget friendly ?  :  */}
                            <Badge variant={`${isDark ? "outline" : "secondary"}`} className={`shadow-xs border-2 flex py-px items-center ${isDark ? "border-zinc-600" : "border-zinc-100"}`}>
                                <BadgeCheck className="size-5 text-blue-400" />
                                <Label className={`text-[11px] ${isDark ? "text-gray-400" : "text-zinc-600"}`}>{getUserRestaurantDetails?.budgetFriendly && "Budget friendly"}</Label>
                            </Badge>
                        </div>


                        {/* food type badge(restaurant) :  */}
                        <div className="mt-5">

                            {/* Is budget friendly ?  :  */}
                            <Badge variant={`${isDark ? "outline" : "secondary"}`} className={`border-2 flex py-px items-center ${isDark ? "border-zinc-600" : "border-zinc-100"}`}>

                                <LeafyGreen className="size-5 text-green-400" />
                                <Label className={`text-[11px] ${isDark ? "text-gray-400" : "text-zinc-600"}`}>{getUserRestaurantDetails?.budgetFriendly && "Veg"}</Label>
                            </Badge>
                        </div>

                    </div>


                    {/* menu items :  */}
                    <div className="mt-8">
                        <h3 className="text-lg font-medium mb-3">Menu</h3>
                        {menuItems === null ? (
                            <div className={`flex items-center gap-2 text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                                <Loader className="size-4 animate-spin" /> Loading menu...
                            </div>
                        ) : menuItems.length === 0 ? (
                            <p className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>No items on the menu yet.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {menuItems.map((item) => (
                                    <div key={item._id}
                                        className={`flex items-center justify-between gap-3 border rounded-lg p-3 ${isDark ? "border-zinc-700" : "border-zinc-100"}`}>
                                        <div className="flex items-center gap-3 min-w-0">
                                            <img src={item.image?.url} alt={item.name} className="w-14 h-14 rounded object-cover shrink-0" />
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium truncate">{item.name}</p>
                                                <p className={`text-xs flex items-center ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                                                    <IndianRupee className="size-3" /> {item.price}
                                                    {item.category?.categoryName && <span className="ml-2">• {item.category.categoryName}</span>}
                                                </p>
                                            </div>
                                        </div>
                                        <Button onClick={() => handleAddToCart(item)}
                                            className={`bg-customOrange rounded shrink-0 gap-1 text-xs`}>
                                            <Plus className="size-3.5" /> Add
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                </div>



                {/* right section :  */}
                <div className=" w-fit justify-center  items-center">
                    {/* restaurant details card :  */}

                    <div className={`w-96 border px-6 py-3 shadow-xs rounded-md  flex flex-col  ${isDark ? "border-zinc-700" : "border-zinc-100"}`}>
                        <h2 className="text-base mb-2 font-medium">Restaurant Info</h2>

                        {/* Address :  */}
                        <div className={`flex my-1 text-xs items-center gap-5 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                            <div className="flex items-center gap-1">
                                <MapPinned className="size-3" color="red" />
                                <Label className={`text-xs`}>Address</Label>
                            </div>
                            <p className="font-normal">{getUserRestaurantDetails?.address}</p>
                        </div>

                        {/* phone :  */}
                        <div className={`flex my-1 text-xs items-center gap-5 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                            <div className="flex items-center gap-1">
                                <Phone color="green" className="size-3" />
                                <Label className={`text-xs`}>Phone </Label>
                            </div>
                            <p className="font-normal">{getUserRestaurantDetails?.phone ? getUserRestaurantDetails.phone : "NA"}</p>
                        </div>

                        {/* timings  :  */}
                        <div className={`flex my-1 text-xs items-center gap-5 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                            <div className="flex items-center gap-1">
                                <ClockFading className="size-3" />
                                <Label className={`text-xs`}>Timings </Label>
                            </div>
                            <p className="font-normal">9 AM - 9PM</p>
                        </div>

                        {/* cost for two  :  */}
                        <div className={`flex my-1 text-xs items-center gap-5 ${isDark ? "text-zinc-400" : "text-zinc-500"}`} >
                            <div className="flex items-center gap-1">
                                <BadgeIndianRupee color="orange" className="size-3" />
                                <Label className={`text-xs`}>Cost for two </Label>
                            </div>
                            <p className="font-normal">₹200</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserRestaurantDetails