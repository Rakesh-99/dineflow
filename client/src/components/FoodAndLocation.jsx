import { MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FoodAndLocation = () => {
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const [searchFoodData, setSearchFoodData] = useState("");
  const { theme } = useSelector((state) => state.themeSlice);
  const { userAddress, userData } = useSelector(
    (state) => state.currentuserSlice,
  );
  const { userCityBasedRestaurants } = useSelector(
    (state) => state.currentOwnerRestaurants,
  );
  const { sampleRestaurants } = useSelector(
    (state) => state.currentOwnerRestaurants,
  );

  console.log({
    "city based res ": userCityBasedRestaurants,
    "sample res ": sampleRestaurants,
  });

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
                className={`${theme === "dark" ? "border-zinc-700" : "border-zinc-100"} border rounded-md p-2  flex items-center gap-2`}
              >
                <MapPin color="#F54927" className="lg:size-7 size-4!" />
                <input
                  type="text"
                  disabled
                  value={userAddress?.address2}
                  className="cursor-not-allowed text-xs lg:w-90 w-full  "
                />
              </div>

              {/* Search food and restaurants :  */}
              <div className="">
                {userCityBasedRestaurants ||
                  (sampleRestaurants?.sampleResData && (
                    <div
                      className={` border p-2 rounded-sm flex relative  items-center ${theme === "dark" ? "border-zinc-700" : "border-zinc-100"}`}
                    >
                      <input
                        type="text"
                        value={searchFoodData}
                        onChange={inputFoodDataHandler}
                        placeholder="Search food, restaurants .."
                        className="  text-sm placeholder:text-sm! w-full lg:placeholder:text-sm outline-none ml-7  rounded-md  lg:w-90 "
                      />

                      <Search
                        color="gray"
                        className=" size-4! absolute  md:right-5 lg:cursor-default cursor-pointer"
                        onClick={() => setIsShowSearchBar(!isShowSearchBar)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FoodAndLocation;
