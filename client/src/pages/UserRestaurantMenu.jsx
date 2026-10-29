import { Input } from "@/components/ui/input";
import { Funnel, Search, Utensils } from "lucide-react";
import { useSelector } from "react-redux";
import UserMenuList from "./UserMenuList";
const UserRestaurantMenu = ({ data }) => {
  const { theme } = useSelector((state) => state.themeSlice);
  const isDark = theme === "dark";

  const categoryName = data?.item;

  return (
    <>
      <div className="max-w-6xl  mx-auto">
        {/* menu nav :  */}
        <div className="flex sm:flex-row flex-col justify-between items-center lg:px-0  sm:px-5 px-5 md:gap-0 sm:gap-5 gap-5">
          {/*left content : */}
          <div className="flex items-center gap-1">
            <Utensils size={20} className="text-customOrange " />
            <h2 className="text-xl font-bold">Menu Items</h2>
          </div>

          {/* right content  :  */}
          <div className="flex items-center gap-5 ">
            {/* input : */}
            <div className="relative flex">
              <Search
                size={15}
                color="gray"
                className="absolute left-5 top-2"
              />
              <Input
                className={`sm:w-80 w-60 rounded-sm  pl-10 ${isDark ? "border-zinc-500" : "border-zinc-200"}`}
                placeholder="Search menu items .."
              />
            </div>

            {/* filter :  */}
            <Funnel
              color="gray"
              className={`border rounded-sm cursor-pointer  p-1 ${isDark ? "border-zinc-500" : "border-zinc-200"}`}
              size={30}
            />
          </div>
        </div>

        {/* cat list :  */}
        <div className="flex items-center gap-5 mt-10">
          <li className="text-xs list-none">All</li>
          {categoryName?.map((data, idx) => {
            const { categoryName } = data.category;

            return (
              <div key={idx} className="">
                <ul className="text-xs">
                  {/* <li className="text-xs font-semibold">{categoryName}</li> */}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <UserMenuList menu={categoryName} />
        </div>
      </div>
    </>
  );
};

export default UserRestaurantMenu;
