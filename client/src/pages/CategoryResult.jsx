import { useSelector } from "react-redux";
import { useParams } from "react-router";
import categoryBannerImg from "../assets/user/categoryPageBanner.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Search } from "lucide-react";
import { IoWarningOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
const CategoryResult = () => {
  const { sampleRestaurants, userCityBasedRestaurants } = useSelector(
    (state) => state.currentOwnerRestaurants,
  );

  const { theme } = useSelector((state) => state.themeSlice);
  const isDark = theme === "dark";

  const { categoryname, categoryid } = useParams();

  const items = [
    { label: "Low to High", value: "lowToHigh" },
    { label: "High to Low", value: "highToLow" },
  ];

  return (
    <>
      <div className=" max-w-7xl mx-auto">
        {/* image banner :  */}
        <div className="mt-5 xl:mx-0 mx-3 relative">
          <img
            className="rounded-md sm:brightness-100 brightness-60 h-20 md:h-32 w-full object-cover "
            src={categoryBannerImg}
            alt="banner"
          />
          <div
            className={`absolute flex flex-col z-10 md:top-10 top-2 left-2 md:left-10 sm:text-zinc-800 text-white`}
          >
            <h1 className=" text-sm md:text-2xl font-extrabold">
              {categoryname.toUpperCase().replaceAll("-", " ")}
            </h1>
            <p className="text-[10px] font-semibold">
              Start your day with delicious food
            </p>
          </div>
        </div>

        <hr
          className={`mt-5 xl:mx-0 mx-3 border-0 border-t ${
            isDark ? "border-zinc-700" : "border-zinc-200"
          }`}
        />

        {/* Filter section :  */}
        <div className="flex md:flex-row xl:mx-0 mx-3  py-5 flex-col gap-2  ">
          {/* Search input filed :  */}
          <div className="relative md:w-96 sm:px-0 px-5  w-full  flex items-center  ">
            <Input
              className={`md:w-96  w-full pl-8 rounded-full ${theme === "dark" ? "border-zinc-500" : "border-zinc-00"}`}
              placeholder={`Search ${categoryname.replaceAll("-", " ")} items`}
            />
            <Search
              className={`absolute size-4 sm:left-2 left-8 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}
            />
          </div>

          <div className="flex w-full sm:px-0 px-5 items-center gap-10">
            {/* veg / non-veg btns:  */}
            <div className="flex gap-2">
              <Button
                className={`cursor-pointer border rounded-full flex items-center h-7 gap-1 ${isDark ? "bg-zinc-800 border-zinc-500" : "bg-gray-50 text-zinc-800 border-zinc-200"} `}
              >
                <Leaf className="size-4" color="yellowGreen" />
                <p className="text-[10px]">Veg</p>
              </Button>
              <Button
                className={`cursor-pointer border rounded-full flex items-center h-7 gap-1 ${isDark ? "bg-zinc-800 border-zinc-500" : "bg-gray-50 text-zinc-800 border-zinc-200"} `}
              >
                <IoWarningOutline color="red" className="size-4" />
                <p className="text-[10px]">Non-Veg</p>
              </Button>
            </div>

            {/* price sorting :  */}
            <div className="w-40">
              <Select items={items}>
                <SelectTrigger
                  className={` w-full rounded-full text-xs ${isDark ? " border-zinc-500 " : " border-zinc-200"} `}
                >
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent
                  className={`${isDark ? "bg-zinc-700   text-white" : ""} `}
                >
                  <SelectGroup>
                    <SelectLabel className={` ${isDark && "text-zinc-400"}`}>
                      Price
                    </SelectLabel>
                    {items.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className={`text-xs`}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <hr
          className={`xl:mx-0 mx-3 border-0 border-t ${
            isDark ? "border-zinc-700" : "border-zinc-200"
          }`}
        />
      </div>
    </>
  );
};

export default CategoryResult;
