import { TriangleAlert } from "lucide-react";

const HeroContents = () => {
  return (
    <>
      <div className="mt-20">

        <div className="flex items-center justify-center mb-10 gap-1">
          <TriangleAlert size={16} color="orange"/>
          <p className="text-xs text-orange-300">
            This project is under development !
          </p>
        </div>

        <h1 className="lg:text-5xl md:text-3xl sm:text-xl text-lg text-center md:leading-11 leading-6 lg:leading-14 font-medium">
          Order food with ease. Discover the best restaurants, explore delicious
          meals!
        </h1>
      </div>
    </>
  );
};

export default HeroContents;
