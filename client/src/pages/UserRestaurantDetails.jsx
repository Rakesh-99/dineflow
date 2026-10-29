import { Label } from "@/components/ui/label";
import {
  BadgeCheck,
  BadgeIndianRupee,
  CalendarDays,
  ClockFading,
  LeafyGreen,
  Mail,
  MapPinned,
  Phone,
  PhoneCall,
  ShieldAlert,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import UserRestaurantMenu from "./UserRestaurantMenu";

const UserRestaurantDetails = () => {
  const { restaurantId } = useParams();
  const { userCityBasedRestaurants } = useSelector(
    (state) => state.currentOwnerRestaurants,
  );
  const getUserRestaurantCityBased = userCityBasedRestaurants?.filter(
    (restaurant) => restaurant._id === restaurantId,
  )[0];

  const { sampleResData } = useSelector(
    (state) => state.currentOwnerRestaurants.sampleRestaurants,
  );
  const filterSampleRes = sampleResData?.filter(
    (restaurant) => restaurant._id === restaurantId,
  )[0];

  const { theme } = useSelector((state) => state.themeSlice);
  const isDark = theme === "dark";

  // breadcrumbs :
  const data = [
    {
      label: "Home",
      path: "/",
    },
  ];

  return (
    <>
      {/* breadcrumbs  */}
      <div className=" flex justify-center mt-5">
        <Breadcrumb className={``}>
          <BreadcrumbList>
            {data.map((links) => {
              const { path, label } = links;
              return (
                <div className="flex items-center" key={label}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`${path}`}>{label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </div>
              );
            })}
            <BreadcrumbItem>
              <BreadcrumbPage
                className={`${theme === "dark" ? "text-white" : "text-zinc-700"}`}
              >
                {getUserRestaurantCityBased?.shopName ||
                  filterSampleRes.shopName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {getUserRestaurantCityBased && (
        <div className="flex flex-col gap-10 ">
          <div className="lg:flex-row justify-center flex flex-col mx-5 gap-10 max-w-6xl mt-10 lg:mx-auto">
            {/* left section :  */}
            <div className="w-full">
              {/* image container :  */}
              <div className=" h-96 ">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={getUserRestaurantCityBased?.image.url}
                  alt=""
                />
              </div>

              {/* restaurant name & description :  */}
              <div className="flex flex-col mt-5 gap-2">
                {/* Name :  */}
                <h2 className="text-2xl font-semibold">
                  {getUserRestaurantCityBased?.shopName}
                </h2>

                {/* description :  */}
                <p className="text-gray-400 sm:text-base sm:leading-7 leading-5  text-xs">
                  {getUserRestaurantCityBased?.description}
                </p>
              </div>

              {/* Badges :  */}
              <div className="flex gap-2">
                {/* budget badge :  */}
                <div className="mt-5">
                  {/* Is budget friendly ?  :  */}
                  <Badge
                    variant={`${isDark ? "outline" : "secondary"}`}
                    className={`shadow-xs border-2 flex py-px items-center ${isDark ? "border-zinc-600" : "border-zinc-100"}`}
                  >
                    <BadgeCheck className="size-5 text-blue-400" />
                    <Label
                      className={`text-[11px] ${isDark ? "text-gray-400" : "text-zinc-600"}`}
                    >
                      {getUserRestaurantCityBased?.budgetFriendly &&
                        "Budget friendly"}
                    </Label>
                  </Badge>
                </div>

                {/* food type badge(restaurant) :  */}
                <div className="mt-5">
                  {/* Is budget friendly ?  :  */}
                  <Badge
                    variant={`${isDark ? "outline" : "secondary"}`}
                    className={`border-2 flex py-px items-center ${isDark ? "border-zinc-600" : "border-zinc-100"}`}
                  >
                    <LeafyGreen className="size-5 text-green-400" />
                    <Label
                      className={`text-[11px] ${isDark ? "text-gray-400" : "text-zinc-600"}`}
                    >
                      {getUserRestaurantCityBased?.budgetFriendly && "Veg"}
                    </Label>
                  </Badge>
                </div>
              </div>
            </div>

            {/* right section :  */}
            <div className="flex lg:flex-col  gap-5 sm:flex-row flex-col">
              {/* restaurant details card :  */}

              <div
                className={`sm:w-96 w-full border px-6 py-3 shadow-xs rounded-md flex flex-col   ${isDark ? "border-zinc-700 text-zinc-400" : "border-zinc-100 text-zinc-500"}`}
              >
                <h2
                  className={`text-base mb-2 font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                >
                  Restaurant Information
                </h2>
                <Separator
                  className={`my-1 ${isDark ? "bg-customOrange" : "bg-zinc-200"}`}
                />

                {/* Address :  */}
                <div className={`flex my-1 text-xs items-center `}>
                  <div className="flex items-start gap-2">
                    <MapPinned size={15} />
                    <Label className={`text-xs`}>
                      {" "}
                      Location : {getUserRestaurantCityBased?.address1},{" "}
                      {getUserRestaurantCityBased?.address2}
                    </Label>
                  </div>
                  <p className="font-normal">
                    {getUserRestaurantCityBased?.address}
                  </p>
                </div>

                {/* phone :  */}
                <div className={`flex my-1 text-xs items-center gap-1 `}>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3" />
                    <Label className={`text-xs`}>Phone : </Label>
                  </div>
                  <p className="font-normal">
                    {getUserRestaurantCityBased?.shopContact
                      ? getUserRestaurantCityBased.shopContact
                      : "NA"}
                  </p>
                </div>

                {/* timings  :  */}
                <div className={`flex my-1 text-xs items-center gap-1`}>
                  <div className="flex items-center gap-2">
                    <ClockFading className="size-3" />
                    <Label className={`text-xs`}>Time : </Label>
                  </div>
                  <p className="font-normal">9 AM - 9PM</p>
                </div>

                {/* cost for two  :  */}
                <div className={`flex my-1 text-xs items-center gap-1`}>
                  <div className="flex items-center gap-2">
                    <BadgeIndianRupee className="size-3" />
                    <Label className={`text-xs`}>Cost for two :</Label>
                  </div>
                  <p className="text-xs">
                    ₹ {getUserRestaurantCityBased?.costForTwo}
                  </p>
                </div>

                {/* restaurant last update :  */}

                <div className={`flex my-1 text-xs items-center gap-1`}>
                  <div className="flex items-center gap-2">
                    <BadgeIndianRupee className="size-3" />
                    <Label className={`text-xs`}>Restaurant updated on :</Label>
                  </div>
                  <p className="text-xs">
                    {new Date(
                      getUserRestaurantCityBased?.updatedAt,
                    ).toDateString()}
                  </p>
                </div>
              </div>

              {/* owener card details :  */}
              <div
                className={`sm:w-96 w-full  border px-6 py-3 shadow-xs rounded-md  flex flex-col  ${isDark ? "border-zinc-700 text-zinc-400" : "border-zinc-100 text-zinc-500"}`}
              >
                <div className="">
                  <h2
                    className={`text-base mb-2 font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    Owner infomration
                  </h2>
                </div>
                <Separator
                  className={`my-1 ${isDark ? "bg-customOrange" : "bg-zinc-200"}`}
                />

                <div className="flex flex-col gap-3 mt-2">
                  {/* name :  */}
                  <div className="flex items-center gap-2">
                    <User size={15} />
                    <span className="text-xs">
                      {getUserRestaurantCityBased?.owner?.fullname}
                    </span>
                  </div>

                  {/* email :  */}
                  <div className="flex items-center gap-2">
                    <Mail size={15} />
                    <span className="text-xs">
                      {getUserRestaurantCityBased?.owner?.email}
                    </span>
                  </div>

                  {/* contact :  */}

                  <div className="flex items-center gap-2">
                    <PhoneCall size={15} />
                    <span className="text-xs">
                      {getUserRestaurantCityBased?.owner?.contact}
                    </span>
                  </div>

                  {/* user verified or not :  */}
                  <div className="">
                    {getUserRestaurantCityBased?.owner?.isProfileVerified ? (
                      <div className="flex items-center gap-2">
                        <BadgeCheck size={16} color="yellowGreen" />
                        <span className="text-xs">Veified : True</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ShieldAlert size={16} color="red" />
                        <span className="text-xs">Veified : False</span>
                      </div>
                    )}
                  </div>

                  {/* profile update date :  */}
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    <span className="text-xs">
                      Profile updated on :{" "}
                      {new Date(
                        getUserRestaurantCityBased?.owner?.updatedAt,
                      ).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* restaurant menu :  */}
          <div className="mt-10">
            <UserRestaurantMenu data={getUserRestaurantCityBased} />
          </div>
        </div>
      )}

      {filterSampleRes && (
        <div className="flex flex-col gap-10">
          <div className="lg:flex-row justify-center flex flex-col mx-5 gap-10 max-w-6xl mt-10 lg:mx-auto">
            {/* left section :  */}
            <div className="w-full">
              {/* image container :  */}
              <div className=" h-96 ">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={filterSampleRes?.image.url}
                  alt=""
                />
              </div>

              {/* restaurant name & description :  */}
              <div className="flex flex-col mt-5 gap-2">
                {/* Name :  */}
                <h2 className="text-2xl font-semibold">
                  {filterSampleRes?.shopName}
                </h2>

                {/* description :  */}
                <p className="text-gray-400">{filterSampleRes?.description}</p>
              </div>

              {/* Badges :  */}
              <div className="flex gap-2">
                {/* budget badge :  */}
                <div className="mt-5">
                  {/* Is budget friendly ?  :  */}
                  <Badge
                    variant={`${isDark ? "outline" : "secondary"}`}
                    className={`shadow-xs border-2 flex py-px items-center ${isDark ? "border-zinc-600" : "border-zinc-100"}`}
                  >
                    <BadgeCheck className="size-5 text-blue-400" />
                    <Label
                      className={`text-[11px] ${isDark ? "text-gray-400" : "text-zinc-600"}`}
                    >
                      {filterSampleRes?.budgetFriendly && "Budget friendly"}
                    </Label>
                  </Badge>
                </div>

                {/* food type badge(restaurant) :  */}
                <div className="mt-5">
                  {/* Is budget friendly ?  :  */}
                  <Badge
                    variant={`${isDark ? "outline" : "secondary"}`}
                    className={`border-2 flex py-px items-center ${isDark ? "border-zinc-600" : "border-zinc-100"}`}
                  >
                    <LeafyGreen className="size-5 text-green-400" />
                    <Label
                      className={`text-[11px] ${isDark ? "text-gray-400" : "text-zinc-600"}`}
                    >
                      {filterSampleRes?.budgetFriendly && "Veg"}
                    </Label>
                  </Badge>
                </div>
              </div>

              {/* menu items :  */}

              <div className=""></div>
            </div>

            {/* right section :  */}
            <div className=" w-fit flex flex-col gap-5">
              {/* restaurant details card :  */}

              <div
                className={`w-96 border px-6 py-3 shadow-xs rounded-md flex flex-col  ${isDark ? "border-zinc-700 text-zinc-400" : "border-zinc-100 text-zinc-500"}`}
              >
                <h2
                  className={`text-base mb-2 font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                >
                  Restaurant Information
                </h2>
                <Separator className={`my-1 bg-customOrange/50`} />

                {/* Address :  */}
                <div className={`flex my-1 text-xs items-center `}>
                  <div className="flex items-start gap-2">
                    <MapPinned size={15} />
                    <Label className={`text-xs`}>
                      {" "}
                      Location : {filterSampleRes?.address1},{" "}
                      {filterSampleRes?.address2}
                    </Label>
                  </div>
                  <p className="font-normal">{filterSampleRes?.address}</p>
                </div>

                {/* phone :  */}
                <div className={`flex my-1 text-xs items-center gap-1 `}>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3" />
                    <Label className={`text-xs`}>Phone : </Label>
                  </div>
                  <p className="font-normal">
                    {filterSampleRes?.shopContact
                      ? filterSampleRes.shopContact
                      : "NA"}
                  </p>
                </div>

                {/* timings  :  */}
                <div className={`flex my-1 text-xs items-center gap-1`}>
                  <div className="flex items-center gap-2">
                    <ClockFading className="size-3" />
                    <Label className={`text-xs`}>Time : </Label>
                  </div>
                  <p className="font-normal">9 AM - 9PM</p>
                </div>

                {/* cost for two  :  */}
                <div className={`flex my-1 text-xs items-center gap-1`}>
                  <div className="flex items-center gap-2">
                    <BadgeIndianRupee className="size-3" />
                    <Label className={`text-xs`}>Cost for two :</Label>
                  </div>
                  <p className="text-xs">₹ {filterSampleRes?.costForTwo}</p>
                </div>

                {/* restaurant last update :  */}

                <div className={`flex my-1 text-xs items-center gap-1`}>
                  <div className="flex items-center gap-2">
                    <BadgeIndianRupee className="size-3" />
                    <Label className={`text-xs`}>Restaurant updated on :</Label>
                  </div>
                  <p className="text-xs">
                    {new Date(filterSampleRes?.updatedAt).toDateString()}
                  </p>
                </div>
              </div>

              {/* owener card details :  */}
              <div
                className={`w-96  border px-6 py-3 shadow-xs rounded-md  flex flex-col  ${isDark ? "border-zinc-700 text-zinc-400" : "border-zinc-100 text-zinc-500"}`}
              >
                <div className="">
                  <h2
                    className={`text-base mb-2 font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                  >
                    Owner infomration
                  </h2>
                </div>
                <Separator className={`my-1 bg-customOrange/50`} />

                <div className="flex flex-col gap-3 mt-2">
                  {/* name :  */}
                  <div className="flex items-center gap-2">
                    <User size={15} />
                    <span className="text-xs">
                      {filterSampleRes?.owner?.fullname}
                    </span>
                  </div>

                  {/* email :  */}
                  <div className="flex items-center gap-2">
                    <Mail size={15} />
                    <span className="text-xs">
                      {filterSampleRes?.owner?.email}
                    </span>
                  </div>

                  {/* contact :  */}

                  <div className="flex items-center gap-2">
                    <PhoneCall size={15} />
                    <span className="text-xs">
                      {filterSampleRes?.owner?.contact}
                    </span>
                  </div>

                  {/* user verified or not :  */}
                  <div className="">
                    {filterSampleRes?.owner?.isProfileVerified ? (
                      <div className="flex items-center gap-2">
                        <BadgeCheck size={16} color="yellowGreen" />
                        <span className="text-xs">Veified : True</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ShieldAlert size={16} color="red" />
                        <span className="text-xs">Veified : False</span>
                      </div>
                    )}
                  </div>

                  {/* profile update date :  */}
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    <span className="text-xs">
                      Profile updated on :{" "}
                      {new Date(
                        filterSampleRes?.owner?.updatedAt,
                      ).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <UserRestaurantMenu data={filterSampleRes} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserRestaurantDetails;
