import { Label } from "@/components/ui/label";
import { BadgeCheck, BadgeIndianRupee, ClockFading, LeafyGreen, MapPinned, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


const UserRestaurantDetails = () => {
    const { restaurantId } = useParams();
    const { userCityBasedRestaurants } = useSelector(state => state.currentOwnerRestaurants)
    const getUserRestaurantDetails = userCityBasedRestaurants.filter(restaurant => restaurant._id === restaurantId)[0];
    const { theme } = useSelector(state => state.themeSlice);
    const isDark = theme === "dark";
    console.log(getUserRestaurantDetails);

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

                    <div className="">

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