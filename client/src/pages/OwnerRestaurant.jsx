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
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
const URL = import.meta.env.VITE_BACKEND_SHOP_API_URL ; 
import { addNewRestaurant } from "@/redux/features/currentOwnerRestaurants.slice";
import { ShieldCheck, ShieldX } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"



const OwnerRestaurant = () => {

  const {theme} = useSelector(state => state.themeSlice);
  const dispatch = useDispatch() ; 
  const [loading, setLoading] = useState(false); 

  const [restaurantData, setRestaurantData] = useState({
    shopName : "", 
    city : "", 
    state : "", 
    address : "", 
    description : "",
    status : true,
    image : null
  }); 

  


  const inputChangeHandler = (e) => { 
    const {name, value} = e.target; 
   
    setRestaurantData({
      ...restaurantData, 
      [name] : value
    })
  }

  const fileChangeHandler = (e) => { 
    const file = e.target.files[0]; 

    if(!file){ 
      return false ; 
    }    
    setRestaurantData({
      ...restaurantData , 
      image : file
    })
  }


  // status tab change handler : 
  const statusTabChangeHandler = (e) => {     
   if(e === 'active'){   
    setRestaurantData({
      ...restaurantData,
      status : true
    })
   }else {     
    setRestaurantData({
      ...restaurantData, 
      status : false
    })
   }
  }

  const formSubmitHandler = (restaurantData) => { 
    
    if(!restaurantData.shopName || !restaurantData.city || !restaurantData.address || !restaurantData.state || !restaurantData.image) {
      toast.error('All fields are required!'); 
      return false;
    }
    
    const formData = new FormData(); 

    // preparing the formdata : 
    formData.append("shopName", restaurantData.shopName); 
    formData.append("city", restaurantData.city); 
    formData.append("address", restaurantData.address); 
    formData.append("state", restaurantData.state); 
    formData.append("description", restaurantData.description);
    formData.append("status", restaurantData.status);
    formData.append("image", restaurantData.image);
 

    // api call :   
    (async function createNewRestaurant () { 
        try {
          const {data} = await axios.post(`${URL}/create-shop`, formData, {withCredentials : true});
          setLoading(true);
          if(data.success) { 
            setLoading(false);
            dispatch(addNewRestaurant(data.shop));
            toast.success('Restaurant has been created'); 
          }
        } catch (error) {
          setLoading(false);
          console.log(`Could not create restaurant ${error}`);
        }finally { 
          setLoading(false);
        }
    })(); 
  }


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
          <span className={`text-orange-500 rounded flex items-center px-2 bg-orange-50 text-[10px] font-medium hover:text-orange-600 cursor-pointer`}>
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
                    <Label className={`text-xs`} htmlFor="sheet-demo-name">Shop Name *</Label>
                    <div className="relative flex items-center">
                        <BiBuildingHouse color="gray" className="absolute ml-2" />
                        <Input  
                        className={`rounded outline-none placeholder:text-xs px-8  ${theme === 'light' ? 'border-gray-200' : 'border-zinc-600'}`} 
                        placeholder='Enter your shop name'  
                        id="sheet-demo-name"  
                        name='shopName'
                        value={restaurantData.shopName}
                        onChange={inputChangeHandler}
                        />

                    </div>
              
                  </div>
                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">City *</Label>
                    <div className="relative flex items-center">
                      <PiCityLight color="gray" className="absolute ml-2" />
                        <Input 
                        className={`rounded outline-none placeholder:text-xs px-8 ${theme === 'light' ? 'border-gray-200' : 'border-zinc-600'}` } 
                        placeholder='Enter City'  
                        id="sheet-demo-username"  
                        name='city'
                        value={restaurantData.city}
                        onChange = {inputChangeHandler}
                        />
                    </div>
                 
                  </div>

                    <div className="grid gap-1">  
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">State *</Label>
                    <div className="relative flex items-center">
                      <GiModernCity color="gray" className="absolute ml-2" />
                      <Input  
                      className={`rounded outline-none placeholder:text-xs px-8 ${theme === 'light' ? 'border-gray-200' : 'border-zinc-600'}`} 
                      placeholder='Enter State' 
                      id="sheet-demo-username"  
                      name='state'
                      value={restaurantData.state}
                      onChange = {inputChangeHandler}
                      />
                    </div>
                    
                  </div>

                    <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">Address *</Label> 

                    <div className="relative flex items-center">
                        <CiLocationOn color="gray" className="absolute ml-2" />
                        <Input 
                        className={`rounded outline-none placeholder:text-xs px-8 ${theme === 'light' ? 'border-gray-200 ' : 'border-zinc-600'}`} 
                        placeholder='Enter the address'  
                        id="sheet-demo-username"  
                        name='address'
                        value={restaurantData.address}
                        onChange={inputChangeHandler}
                        />
                    </div>
                   
                  </div>

                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">About Your Resturant *</Label> 

                    <div className="relative flex">
                   
                        <Textarea placeholder="Write about your restaurant" 
                         className={`rounded outline-none placeholder:text-xs px- ${theme === 'light' ? 'border-gray-200 ' : 'border-zinc-600'}`} 
                          name='description'
                          value={restaurantData.description}
                          onChange={inputChangeHandler}
                        />
                    </div>
                   
                  </div>

                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">Status *</Label> 

                    <div className="relative flex items-center">
                        <CiLocationOn color="gray" className="absolute ml-2" />
                        <Tabs defaultValue="active" onValueChange={statusTabChangeHandler} >
                            <TabsList className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
                              <TabsTrigger value= "active">
                                <ShieldCheck />
                                Active
                              </TabsTrigger>
                              <TabsTrigger value="inactive">
                                <ShieldX />
                                InActive
                              </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                   
                  </div>

                    <div className="grid gap-2">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">Upload your Restaurant image *</Label>
                    <Input 
                    type={`file`} 
                    className={`rounded outline-none ${theme === 'light' ? 'border-gray-200' : 'border-zinc-600'}`} 
                     id="sheet-demo-username"  
                     name='image'
                     onChange={fileChangeHandler}
                     />
                  </div>
                </div>
                <SheetFooter>
                  <Button 
                    onClick={()=>formSubmitHandler(restaurantData)}
                    className={`bg-orange-500 rounded py-4`} 
                    type="submit">
                    {loading ? 'Loading ..' : 'Create Restaurant'}
                  </Button>
                  <SheetClose asChild>
                    <Button
                    ariant="outline" 
                    className={`rounded ${theme === 'dark' && 'bg-zinc-700 border-zinc-500'}`}>
                      Close
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
          </Sheet>
          </span>
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