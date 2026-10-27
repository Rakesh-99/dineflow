import { useSelector } from "react-redux";
import { GrRestaurant } from "react-icons/gr";
import { IoIosArrowDropright } from "react-icons/io";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { NavLink, useNavigate } from "react-router";
import {
  CookingPot,
  Drumstick,
  LeafyGreen,
  MapPin,
  MapPinned,
  UserRound,
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
    const categoryName = data?.category?.categoryName;

    if (!categoryName) return null;

    return categoryName;
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
         <div className="grid lg:px-0  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 sm:px-5 px-5">
          {userCityBasedRestaurants?.map((userRestaurants, idx) => {
            return (
              <div
                key={idx}
                className={`flex flex-col border shadow  overflow-hidden rounded-lg ${isDark ? "border-zinc-500" : ""}`}
              >
                {/* image :  */}
                <div className="lg:h-40 lg:w-96 md:w-full w-full h-60">
                  <img
                    src={userRestaurants?.image?.url}
                    alt="Restaurant image"
                    className="w-full h-full object-cover rounded "
                  />
                </div>
                {/* glance data :  */}
                <div className="p-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1">
                        <CookingPot size={18} />
                        {/* name :  */}
                        <h2 className=" text-base font-semibold">
                          {userRestaurants?.shopName}
                        </h2>
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPin size={13} />
                        <p className={`text-[10px] font-medium`}>
                          {userRestaurants?.city}
                        </p>
                      </div>
                    </div>

                    {/* item available :  */}
                    <div>
                      {userRestaurants?.item?.length > 0 ? (
                        <ul className="flex gap-4">
                          {[
                            ...new Map(
                              userRestaurants.item
                                .filter((data) => data?.category?.categoryName)
                                .map((data) => [
                                  data.category.categoryName.toLowerCase(),
                                  data,
                                ]),
                            ).values(),
                          ].map((data, idx) => {
                            return (
                              <li
                                key={data._id}
                                className={`text-[10px]  font-medium  ${idx === 0 ? "list-none" : "list-disc"} ${isDark ? "text-gray-400" : "text-gray-500"} `}
                              >
                                {filterCategory(data)}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div className="flex  items-center gap-px">
                          <X
                            size={13}
                            className="font-bold text-customOrange"
                          />
                          <p
                            className={`text-[10px] ${isDark ? "text-gray-400" : "text-gray-500"} `}
                          >
                            No items found
                          </p>
                        </div>
                      )}
                    </div>

                    {/* address :  */}
                    <div
                      className={`flex text-[10px] ${isDark ? "border-gray-600 text-gray-300" : "text-gray-600"} `}
                    >
                      <span>{userRestaurants?.address1}</span>
                      <span>{userRestaurants.address2}</span>
                    </div>

                    {/* is restaurant veg ?  */}
                    <div className="">
                      <span>
                        {userRestaurants?.isVegRestaurant ? (
                          <div>
                            <LeafyGreen color="yellowgreen" />
                            <span
                              className={`text-[10px] ${isDark ? "border-gray-600 text-gray-300" : "text-gray-400"} `}
                            >
                              Pure-Veg
                            </span>
                          </div>
                        ) : (
                          <div className=" flex items-center  justify-between">
                            <div
                              className={`${isDark ? "border-gray-600 text-gray-300" : "text-gray-600"}  px-2 py-px rounded-full gap-1 border inline-flex items-center`}
                            >
                              <Drumstick size={12} />
                              <span className="text-[10px]">Non-veg</span>
                            </div>

                            <div
                              className={`${isDark ? "border-gray-600 text-gray-300" : "text-gray-600"}  text-[10px] inline-flex border px-1 py-px rounded-full items-center`}
                            >
                              <span>Cost for two : </span>
                              <span>{userRestaurants?.costForTwo}</span>
                            </div>
                          </div>
                        )}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      className={`mt-2 hover:bg-customOrange hover:text-orange-900 cursor-pointer rounded-sm text-xs ${isDark && "bg-zinc-800/50 border-gray-600"}`}
                    >
                      <NavLink
                        to={`/user-restaurant-details/${userRestaurants?.shopName}/${userRestaurants?._id}`}
                      >
                        Details
                      </NavLink>
                    </Button>
                  </div>
                </div>
                {/* name :  */}
              </div>
            );
          })}
        </div>
      )}

      {/* user : fallback : falling back to sample restaurant  when city based restaunt not available  */}
      {sampleResData?.length > 0 && userData?.role === "user" && (
        <div className="grid lg:px-0  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 sm:px-5 px-5">
          {sampleResData?.map((userRestaurants, idx) => {
            return (
              <div
                key={idx}
                className={`flex flex-col border shadow  overflow-hidden rounded-lg ${isDark ? "border-zinc-500" : ""}`}
              >
                {/* image :  */}
                <div className="lg:h-40 lg:w-96 md:w-full w-full h-60">
                  <img
                    src={userRestaurants?.image?.url}
                    alt="Restaurant image"
                    className="w-full h-full object-cover rounded "
                  />
                </div>
                {/* glance data :  */}
                <div className="p-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1">
                        <CookingPot size={18} />
                        {/* name :  */}
                        <h2 className=" text-base font-semibold">
                          {userRestaurants?.shopName}
                        </h2>
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPin size={13} />
                        <p className={`text-[10px] font-medium`}>
                          {userRestaurants?.city}
                        </p>
                      </div>
                    </div>

                    {/* item available :  */}
                    <div>
                      {userRestaurants?.item?.length > 0 ? (
                        <ul className="flex gap-4">
                          {[
                            ...new Map(
                              userRestaurants.item
                                .filter((data) => data?.category?.categoryName)
                                .map((data) => [
                                  data.category.categoryName.toLowerCase(),
                                  data,
                                ]),
                            ).values(),
                          ].map((data, idx) => {
                            return (
                              <li
                                key={data._id}
                                className={`text-[10px]  font-medium  ${idx === 0 ? "list-none" : "list-disc"} ${isDark ? "text-gray-400" : "text-gray-500"} `}
                              >
                                {filterCategory(data)}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div className="flex  items-center gap-px">
                          <X
                            size={13}
                            className="font-bold text-customOrange"
                          />
                          <p
                            className={`text-[10px] ${isDark ? "text-gray-400" : "text-gray-500"} `}
                          >
                            No items found
                          </p>
                        </div>
                      )}
                    </div>

                    {/* address :  */}
                    <div
                      className={`flex text-[10px] ${isDark ? "border-gray-600 text-gray-300" : "text-gray-600"} `}
                    >
                      <span>{userRestaurants?.address1}</span>
                      <span>{userRestaurants.address2}</span>
                    </div>

                    {/* is restaurant veg ?  */}
                    <div className="">
                      <span>
                        {userRestaurants?.isVegRestaurant ? (
                          <div>
                            <LeafyGreen color="yellowgreen" />
                            <span
                              className={`text-[10px] ${isDark ? "border-gray-600 text-gray-300" : "text-gray-400"} `}
                            >
                              Pure-Veg
                            </span>
                          </div>
                        ) : (
                          <div className=" flex items-center  justify-between">
                            <div
                              className={`${isDark ? "border-gray-600 text-gray-300" : "text-gray-600"}  px-2 py-px rounded-full gap-1 border inline-flex items-center`}
                            >
                              <Drumstick size={12} />
                              <span className="text-[10px]">Non-veg</span>
                            </div>

                            <div
                              className={`${isDark ? "border-gray-600 text-gray-300" : "text-gray-600"}  text-[10px] inline-flex border px-1 py-px rounded-full items-center`}
                            >
                              <span>Cost for two : </span>
                              <span>{userRestaurants?.costForTwo}</span>
                            </div>
                          </div>
                        )}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      className={`mt-2 hover:bg-customOrange hover:text-orange-900 cursor-pointer rounded-sm text-xs ${isDark && "bg-zinc-800/50 border-gray-600"}`}
                    >
                      <NavLink
                        to={`/user-restaurant-details/${userRestaurants?.shopName}/${userRestaurants?._id}`}
                      >
                        Details
                      </NavLink>
                    </Button>
                  </div>
                </div>
                {/* name :  */}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default RestaurantListings;
