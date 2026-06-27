import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsSearch } from "react-icons/bs";
import { FaKitchenSet } from "react-icons/fa6";
import RestaurantListings from "@/components/RestaurantListings";

const OwnerRestaurant = () => {

  

  return (
    <>
    <div className="w-full flex flex-col">
       
       {/* header :  */}
        <div className=" flex justify-around gap-7 mt-3">

          {/* search bar :  */}
          <div className="relative flex items-center ">
            <BsSearch className="absolute left-3" size={15} color="gray"/>
            <Input className={`w-80 rounded outline-none px-10 placeholder:text-xs placeholder:font-medium `} placeholder='Search Restaurants by name'/>
          </div>

          {/* All restaurants :  */}
          <Button variant="outline" className={`text-orange-500 rounded flex items-center px-2 bg-orange-50 text-[10px] font-medium hover:text-orange-600 cursor-pointer`}>
            <FaKitchenSet size={15}/>
            <span>Add Restaurants</span>
          </Button>
        </div>

        {/* main content :  */}

        

        <div className="mt-10">
          <RestaurantListings/>
        </div>  
    </div>
    </>
  )
}

export default OwnerRestaurant