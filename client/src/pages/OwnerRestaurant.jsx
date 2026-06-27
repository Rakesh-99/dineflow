import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuIcon } from "lucide-react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaKitchenSet } from "react-icons/fa6";


const OwnerRestaurant = () => {

  const {restaurants} = useSelector(state => state.currentOwnerRestaurants); 
  

  return (
    <>
    <div className="w-full ">
       
        <div className="max-w-3xl flex justify-center gap-7 mt-3">

          {/* search bar :  */}
          <div className="relative flex items-center ">
            <BsSearch className="absolute left-3" size={15} color="gray"/>
            <Input className={`w-80 rounded outline-none px-10 placeholder:text-xs placeholder:font-medium `} placeholder='Search Restaurants by name'/>
          </div>

          {/* All restaurants :  */}
          <Button variant="outline" className={`text-orange-500 rounded flex items-center px-2 bg-orange-50 text-[10px] font-medium hover:text-orange-600 cursor-pointer`}>
            <FaKitchenSet size={15}/>
            <span>All Restaurants</span>
          </Button>


        </div>
    </div>
    </>
  )
}

export default OwnerRestaurant