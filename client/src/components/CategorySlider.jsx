import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Label } from "./ui/label";

const CategorySlider = () => {

  const { theme } = useSelector((state) => state.themeSlice);
  const { categories } = useSelector((state) => state.categorySlice);
  let isDark = theme === "dark";

  console.log("The categories => ", categories);

  const sliderRef = useRef(null);


  const sliderBtnHandler = (val) => {
    if (!val) {
      return
    };
    sliderRef.current.scrollBy({ left: val * 150, behavior: "smooth" })
  };

  return (
    <>

      <div className="w-full m-auto mt-14">
        <h1 className="text-base md:mx-2 mx-5 md:text-2xl font-bold">What are you craving ? </h1>

        <div className="w-full px-1  m-auto flex items-center mt-10  justify-center">


          {/* right scroll bar btn :  */}
          <div className="mr-5">
            <CircleChevronRight className={`cursor-pointer md:size-7 size-6 ${isDark ? "text-zinc-600" : "text-zinc-400"}`} onClick={() => sliderBtnHandler(-1)} />
          </div>

          {/* category section :  */}
          <div ref={sliderRef} className="hide-scrollbar   flex gap-5 overflow-auto">
            {

              categories && categories.map((category) => {
                return (
                  <div key={category?._id} className="flex flex-col gap-1 ">

                    <div
                      className="md:w-28 md:h-28 w-24 h-24  shrink-0 rounded-full overflow-hidden">
                      <img
                        src={category?.image?.url}
                        alt="categoryImg"
                        className="overflow-hidden w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Label className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>{category?.categoryName}</Label>
                    </div>
                  </div>

                )
              })
            }
          </div>

          {/* right slider btn :  */}
          <div className="ml-5 ">
            <CircleChevronLeft className={` cursor-pointer md:size-7 size-6 ${isDark ? "text-zinc-600" : "text-zinc-400"}`} onClick={() => sliderBtnHandler(1)} />
          </div>
        </div>
      </div>


    </>
  )
};


export default CategorySlider; 