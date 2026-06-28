import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsSearch } from "react-icons/bs";
import { FaKitchenSet } from "react-icons/fa6";
import RestaurantListings from "@/components/RestaurantListings";
import { Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,} from '@/components/ui/sheet'
import { Label } from "@/components/ui/label"
import { PiCityLight } from "react-icons/pi";
import { GiModernCity } from "react-icons/gi";
import { BiBuildingHouse } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { useSelector } from "react-redux";

const OwnerRestaurant = () => {

  const {theme} = useSelector(state => state.themeSlice);


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

            {/* button for adding new restaurant :   */}
            <Sheet >
              <SheetTrigger asChild >
                <Button className={`text-orange-500 rounded flex  items-center px-2 bg-orange-50 text-[10px] font-medium hover:text-orange-600 cursor-pointer`}>Add Restaurant</Button>
              </SheetTrigger>
              <SheetContent className={`${theme === 'light' ? 'bg-gray-100' : 'bg-zinc-800 border-zinc-800 text-gray-100'}`}>
                <SheetHeader>
                  <SheetTitle className={`${theme === 'dark' && 'text-zinc-300'}`}>Create a new Restaurant</SheetTitle>
                  <SheetDescription className={`text-xs ${theme === 'dark' && 'text-zinc-500'}`}>
                    Add a new restaurant and Click save when you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-4 px-4">
                  <div className="grid gap-1"> 
                    <Label className={`text-xs`} htmlFor="sheet-demo-name">Shop Name</Label>
                    <div className="relative flex items-center">
                        <BiBuildingHouse color="gray" className="absolute ml-2" />
                        <Input  className={`rounded outline-none placeholder:text-xs px-8  ${theme === 'light' ? 'border-gray-200' : 'border-zinc-600'}`} placeholder='Enter your shop name'  id="sheet-demo-name"  />
                    </div>
              
                  </div>
                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">City</Label>
                    <div className="relative flex items-center">
                      <PiCityLight color="gray" className="absolute ml-2" />
                        <Input className={`rounded outline-none placeholder:text-xs px-8 ${theme === 'light' ? 'border-gray-200' : 'border-zinc-600'}` } placeholder='Enter City'  id="sheet-demo-username"  />
                    </div>
                 
                  </div>

                    <div className="grid gap-1">  
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">State</Label>
                    <div className="relative flex items-center">
                      <GiModernCity color="gray" className="absolute ml-2" />
                      <Input  className={`rounded outline-none placeholder:text-xs px-8 ${theme === 'light' ? 'border-gray-200' : 'border-zinc-600'}`} placeholder='Enter State' id="sheet-demo-username"  />
                    </div>
                    
                  </div>

                    <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">Address</Label> 

                    <div className="relative flex items-center">
                        <CiLocationOn color="gray" className="absolute ml-2" />
                        <Input className={`rounded outline-none placeholder:text-xs px-8 ${theme === 'light' ? 'border-gray-200 ' : 'border-zinc-600'}`} placeholder='Enter the address'  id="sheet-demo-username"  />
                    </div>
                   
                  </div>

                    <div className="grid gap-2">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">Upload your Restaurant image</Label>
                    <Input type={`file`} className={`rounded outline-none ${theme === 'light' ? 'border-gray-200' : 'border-zinc-600'}`} placeholder=''  id="sheet-demo-username"  />
                  </div>
                </div>
                <SheetFooter>
                  <Button className={`bg-orange-500 rounded py-4`} type="submit">Save changes</Button>
                  <SheetClose asChild>
                    <Button variant="outline" className={`rounded ${theme === 'dark' && 'bg-zinc-700 border-zinc-500'}`}>Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
          </Sheet>
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