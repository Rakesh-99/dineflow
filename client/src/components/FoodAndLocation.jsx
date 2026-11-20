import { MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FoodAndLocation = () => {
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const [searchFoodData, setSearchFoodData] = useState("");
  const { theme } = useSelector((state) => state.themeSlice);
  const isDark = theme === 'dark' ;
  const { userAddress, userData } = useSelector(
    (state) => state.currentuserSlice,
  );
  const { userCityBasedRestaurants } = useSelector(
    (state) => state.currentOwnerRestaurants,
  );
  const { sampleRestaurants } = useSelector(
    (state) => state.currentOwnerRestaurants,
  );

  const inputFoodDataHandler = (e) => {
    const { value } = e.target;
    setSearchFoodData(value);
  };

  return (
    <>
      <div className="mt-20 w-full">
        {userData?.role === "user" && (
          <>
            <div className="flex  lg:flex-row md:flex-row sm:flex-row  flex-col gap-5 px-5 lg:mx-0  rounded-xs justify-between w-full ">
              {/* City location :  */}
              <div
                className={`py-2 ${theme === "dark" ? "border-zinc-600" : "border-zinc-200"} border px-5  rounded-full pl-5  flex items-center gap-2`}
              >
                <MapPin color="#F54927" className="lg:size-7 size-4!" />
                <input
                  type="text"
                  disabled
                  value={userAddress?.address2}
                  className={`cursor-not-allowed text-xs lg:w-90 w-full ${isDark ? 'text-zinc-400' : 'text-zinc-500'} `}
                />
              </div>

              {/* Search food and restaurants :  */}
              <div className="">
                {userCityBasedRestaurants || sampleRestaurants ? (
                  <div
                    className={` border py-1.5 px-5 md:px-0 rounded-full flex relative  items-center ${theme === "dark" ? "border-zinc-600" : "border-zinc-200"}`}
                  >
                    <Search
                      color="gray"
                      className=" size-4.5! absolute  md:left-5 lg:cursor-default cursor-pointer"
                      onClick={() => setIsShowSearchBar(!isShowSearchBar)}
                    />
                    <input
                      type="text"
                      value={searchFoodData}
                      onChange={inputFoodDataHandler}
                      placeholder="Search food, restaurants .."
                      className="  text-sm  w-full outline-none ml-7 md:ml-12 rounded-md  lg:w-90 "
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FoodAndLocation;
