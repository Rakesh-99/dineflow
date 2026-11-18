import { TriangleAlert } from "lucide-react";
import { useSelector } from "react-redux";

const HeroContents = () => {

  const {theme} = useSelector((state) => state.themeSlice); 
  const isDark = theme === "dark" ;  
  return (
    <>
      <div className="mt-20">

        <div className="flex items-center justify-center mb-10 gap-1">
          <TriangleAlert size={16} color="orange"/>
          <p className="text-xs text-orange-300">
            This project is under development !
          </p>
        </div>

        <h1 className={`lg:text-7xl md:text-5xl sm:text-3xl text-2xl text-center md:leading-11 leading-6 lg:leading-24 font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-800'} `}>
          Discover the best restaurants, explore delicious
          meals!
        </h1>
      </div>
    </>
  );
};

export default HeroContents;
