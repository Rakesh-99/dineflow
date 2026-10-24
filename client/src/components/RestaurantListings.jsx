import { useSelector } from "react-redux";
import { GrRestaurant } from "react-icons/gr";
import { IoIosArrowDropright } from "react-icons/io";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router";
import {
  CookingPot,
  MapPin,
  MapPinned,
  PartyPopper,
  UserRound,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import useGetShopsOfCurrentOwner from "@/hooks/useGetShopsOfCurrentOwner";
import NoRestaurantFound from "./NoRestaurantFound";
import { Separator } from "./ui/separator";

const RestaurantListings = () => {
  useGetShopsOfCurrentOwner();
  const { restaurants, userCityBasedRestaurants } = useSelector(
    (state) => state.currentOwnerRestaurants,
  );

  const { sampleResData } = useSelector(
    (state) => state.currentOwnerRestaurants.sampleRestaurants,
  );

  console.log("The dam", sampleResData?.length);
  
  const { userData } = useSelector((state) => state.currentuserSlice);
  const { theme } = useSelector((state) => state.themeSlice);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const getRestaurantName = (restaurantName) => {
    return restaurantName.toLowerCase().replaceAll(" ", "").trim();
  };

  if (userData.role === "restaurantOwner") {
    if (!restaurants || restaurants?.length < 1) {
      return <NoRestaurantFound />;
    }
  }

  const filterCategory = (data) => {
    //     console.log("Type => ", typeof data.category);
    // console.log(data.category);
  };


  return (
    <>
      {/* rendering owner restaurant :  */}

      {restaurants?.length > 0 && userData.role === "restaurantOwner" && (
        <div className="grid sm:grid-cols-2 grid-cols-1 mx-3 md:mx-5 lg:mx-10 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {restaurants?.map((restaurant, idx) => (
            <div
              key={idx}
              className={`border-2 pb-2 transition-all duration-200  rounded-md ${theme === "light" ? "border-gray-100 hover:shadow hover:shadow-customOrange/40" : "border-zinc-700 hover:shadow-2xl hover:shadow-customOrange/20"}`}
            >
              <div>
                {/* image container :  */}
                <div className=" relative">
                  <img
                    src={restaurant?.image.url}
                    alt="restaurant img"
                    className="w-full  max-h-50  object-cover  transition-all rounded-tl-md rounded-tr-md duration-300 overflow-hidden"
                  />
                </div>

                {/* restaurant glance data :  */}
                <div
                  className={`  flex flex-col justify-center items-center  rounded-md py-2 ${theme === "dark" && "bg-zinc-800"}`}
                >
                  <div className="grid grid-cols-1 gap-2 text-[10px] md:text-xs  text-gray-400">
                    {/* restaurant icon and title :  */}
                    <div className={`flex items-center gap-1`}>
                      <div
                        className={`border rounded-full py-px px-px ${theme === "light" ? "bg-orange-50 border-orange-100" : "bg-customOrange border-orange-700"}`}
                      >
                        <GrRestaurant
                          className={`${theme === "light" ? "text-customOrange" : "text-orange-200"}`}
                        />
                      </div>
                      <h2
                        className={`md:text-lg text-sm  font-semibold ${isDark ? "text-white" : "text-zinc-700"}`}
                      >
                        {restaurant?.shopName}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1">
                      <UserRound className="size-4" />
                      <span className="">
                        Owner : {restaurant?.owner.fullname}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 ">
                      <PiBuildingApartment className="size-4" />
                      <span>City : {restaurant?.city}</span>
                    </div>

                    <div className="flex items-center gap-1  ">
                      <MapPinned className="size-4" />
                      <span>Address line 1 : {restaurant?.address1}</span>
                    </div>

                    <div className="flex items-center gap-1  ">
                      <MapPin className="size-4" />
                      <span>Address line 2 : {restaurant?.address2}</span>
                    </div>

                    <div className="flex items-center gap-1 ">
                      <MdOutlinePhoneInTalk className="size-4" />
                      <span>Contact : {restaurant?.owner.contact}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground ">
                      <SlCalender className="size-3.5" />
                      <span>
                        Created :{" "}
                        {new Date(restaurant?.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Separator
                      className={`mt-2 ${isDark ? "bg-customOrange" : "bg-zinc-200"}`}
                    />
                  </div>
                </div>

                {/* div of arrow btn to navigate to the restaurant details page :  */}
                <div className="flex items-center justify-between px-5 text-[10px] md:text-xs  text-muted-foreground">
                  <div className="">
                    <div className="flex items-center gap-1 ">
                      <SlCalender className="size-3.5" />
                      <span>
                        Updated :{" "}
                        {new Date(restaurant?.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    className=" float-right mr-2 rounded bg-customOrange"
                    onClick={() =>
                      navigate(
                        `/restaurantinfo/${getRestaurantName(restaurant.shopName)}/${restaurant._id}`,
                      )
                    }
                  >
                    <span className="text-xs font-semibold">View</span>
                    <IoIosArrowDropright className="hover:cursor-pointer active:animate-ping size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* rendering user city based restaurant :  */}
      {userCityBasedRestaurants?.length > 0 && userData?.role === "user" && (
        <div className="grid grid-cols-3 gap-10">
          {userCityBasedRestaurants?.map((userRestaurants) => {
            return (
              <div className="flex flex-col border overflow-hidden rounded-lg">
                {/* image :  */}
                <div className="h-40 w-96">
                  <img
                    src={userRestaurants?.image?.url}
                    alt="Restaurant image"
                    className="w-full h-full object-cover rounded "
                  />
                </div>
                {/* glance data :  */}
                <div className="p-2">
                  <div className="flex items-center">
                    <CookingPot size={18} />
                    <div className="">
                      {/* name :  */}
                      <h2 className=" text-base font-semibold">
                        {userRestaurants?.shopName}
                      </h2>
                      {/* item available :  */}
                      <div className="">
                        {userRestaurants?.item?.length > 0 ? (
                          <div className="flex flex-wrap">
                            {userRestaurants?.item.map((data) => {
                              console.log("Res", userRestaurants);

                              return (
                                <ul className="">
                                  <li className="text-xs list-disc">
                                    {filterCategory(data)}
                                  </li>
                                </ul>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <X size={12} />
                            <p className="text-xs">No items found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* name :  */}
              </div>
            );
          })}
        </div>
      )}

      {/* user : fallback : falling back to sample restaurant  when city based restaunt not available  */}
      {sampleResData?.length > 0 &&
      userData?.role === "user"
       ? (
        <div className="grid grid-cols-3 gap-10">
          {sampleResData?.map((userRestaurants) => {
            return (
              <div className="flex flex-col border overflow-hidden rounded-lg">
                {/* image :  */}
                <div className="h-40 w-96">
                  <img
                    src={userRestaurants?.image?.url}
                    alt="Restaurant image"
                    className="w-full h-full object-cover rounded "
                  />
                </div>
                {/* glance data :  */}
                <div className="p-2">
                  <div className="flex items-center">
                    <CookingPot size={18} />
                    <div className="">
                      {/* name :  */}
                      <h2 className=" text-base font-semibold">
                        {userRestaurants?.shopName}
                      </h2>
                      {/* item available :  */}
                      <div className="">
                        {userRestaurants?.item?.length > 0 ? (
                          <div className="flex flex-wrap">
                            {userRestaurants?.item.map((data) => {
                              return (
                                <ul className="">
                                  <li className="text-xs list-disc">
                                    {filterCategory(data)}
                                  </li>
                                </ul>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <X size={12} />
                            <p className="text-xs">No items found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* name :  */}
              </div>
            );
          })}
        </div>
      ) : (
        // if  no dummy restaurant found !
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="relative mb-5">
            <UtensilsCrossed
              className="h-14 w-14 text-customOrange"
              strokeWidth={1.5}
            />
            <PartyPopper className="absolute -right-4 -top-3 h-7 w-7 text-yellow-500" />
          </div>

          <h2 className="text-2xl font-bold">Oops! No restaurants found 🍽️</h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Looks like our kitchen is empty for now. Please try again later!
          </p>
        </div>
      )}
    </>
  );
};

export default RestaurantListings;
