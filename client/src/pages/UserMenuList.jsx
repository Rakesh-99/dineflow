import { Check, CircleDot, ShoppingCart, X } from "lucide-react";
import { FaCartPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

const UserMenuList = ({ menu }) => {
  const { theme } = useSelector((state) => state.themeSlice);
  const isDark = theme === "dark";
  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-3 ">
        {menu.map((item) => {
          return (
            <div
              key={item._id}
              className={`rounded-md border-2 overflow-hidden p-px ${isDark ? "border-zinc-700" : "border-zinc-200"}`}
            >
              {/* img : */}
              <div className="w-full h-32">
                <img
                  src={item?.image?.url}
                  alt="menu image"
                  className="w-full rounded-tl-md rounded-tr-md h-full! object-cover"
                />
              </div>
              <div className={`p-3 ${isDark ? "bg-zinc-800" : "bg-zinc-50"} `}>
                {/* menu name :  */}
                <div className="">
                  <h2 className={`font-semibold `}>{item?.name}</h2>
                </div>

                {/* category :  */}
                <div className="text-[10px]">
                  <p className={`text-muted-foreground`}>
                    Category : {item?.category?.categoryName}{" "}
                  </p>
                </div>

                {/* veg or non-veg :  */}
                <div className="mt-1">
                  {item?.foodType === "veg" ? (
                    <div className="flex items-center gap-1">
                      <CircleDot
                        className="text-green-200 bg-green-600 rounded-full"
                        size={12}
                      />
                      <p className={`text-xs`}>{item?.foodType}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <CircleDot
                        className="text-red-200 bg-red-600 rounded-full"
                        size={12}
                      />
                      <p className={`text-xs`}> {item?.foodType}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-1">
                  {/* menu price :  */}
                  <h4 className="font-extrabold">₹ {item?.price}</h4>

                  <div className="flex gap-5 items-center">
                    {/* Availability :  */}
                    <div className="inline-flex ">
                      {item?.status ? (
                        <div
                          className={`flex px-1 py-px rounded-full items-center gap-px ${isDark ? "bg-green-900" : "bg-green-100"}`}
                        >
                          <Check
                            size={13}
                            className={`${isDark ? "text-green-200" : "text-green-600"}`}
                          />
                          <p
                            className={`text-xs ${isDark ? "text-green-200" : "text-green-600"}`}
                          >
                            Available
                          </p>
                        </div>
                      ) : (
                        <div
                          className={`flex px-1 py-px rounded-full items-center gap-px ${isDark ? "bg-red-700" : "bg-red-200"}`}
                        >
                          <X
                            size={12}
                            className={`text-xs ${isDark ? "text-red-300" : "text-red-700"}`}
                          />
                          <p
                            className={`text-xs ${isDark ? "text-red-300" : "text-red-700"}`}
                          >
                            Out of Stock
                          </p>
                        </div>
                      )}
                    </div>

                    {/* add to cart :  */}
                    <div className="">
                      {item.status ? (
                        <div className="">
                          <FaCartPlus
                            size={20}
                            className="cursor-pointer active:scale-90 duration-100"
                          />
                        </div>
                      ) : (
                        <div className=""></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserMenuList;
