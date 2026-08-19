import { Link, useLocation, useNavigate, useParams } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { Loader, Pencil, ShieldCheck, ShieldX, Trash2 } from "lucide-react"
import RestaurantOwnerBannerRes from "@/components/RestaurantOwnerBannerRes"
import RestaurantDescription from "@/components/RestaurantDescription"
import RestaurantOwnerBriefInfo from "@/components/RestaurantOwnerBriefInfo"
import RestaurantAndOwnerInfo from "@/components/RestaurantAndOwnerInfo"
import MenuItems from "@/components/MenuItems"
import { toast } from "sonner"
const URL = import.meta.env.VITE_BACKEND_SHOP_API_URL;
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { removeRestaurant, updateRestaurant } from "@/redux/features/currentOwnerRestaurants.slice"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CiLocationOn } from "react-icons/ci"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { GiModernCity } from "react-icons/gi"
import { PiCityLight } from "react-icons/pi"
import { BiBuildingHouse } from "react-icons/bi"
import {  useState } from "react"





const OwnerRestaurantDetails = () => {


  const { id } = useParams();
  const { theme } = useSelector(state => state.themeSlice);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurants } = useSelector(state => state.currentOwnerRestaurants);
  const restaurantDetails = restaurants.filter(restaurant => restaurant._id === id);
  const restaurantData = restaurantDetails[0];


  
  const [loading , setLoading] = useState(false);

  const [shopData, setShopData] = useState({
    shopName: "",
    city: "",
    state: "",
    address: "",
    description: "",
    status: true,
    image: null,
  } )
  // breadcrumbs : 
  const data = [
    {
      label: 'Home',
      path: '/'
    },
    {
      label: 'Restaurants',
      path: '/restaurants'
    }
  ]



  const deleteRestaurant = async (shopId) => {
    try {
      const { data } = await axios.delete(`${URL}/delete-shop/${shopId}`, { withCredentials: true });
      if (data.success) {
        toast.success(`Restaurant along with its menu have been deleted`, data);
        dispatch(removeRestaurant(data.deletedRestaurant._id));
        navigate('/restaurants')
      }
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  }


  const inputChangeHandler = (e) => { 
       const { name, value } = e.target;
    setShopData((prev)=> ({
      ...prev, 
      [name] : value
    }))
  }

  const statusTabChangeHandler = (e) => { 
 if (e === "active") {
      setShopData((prev)=>({
        ...prev, 
        status : true
      }))
    } else {
      setShopData((prev)=> ({
        ...prev, 
        status : false
      }))
    }
  }; 

  const fileChangeHandler = (e) => { 
  const file = e.target.files[0];

    if (!file) {
      return false;
    }
    setShopData((prev)=> ({
      ...prev, 
      image : file
    }))
  }

  const formSubmitHandler = async(shopData) => { 
      const {shopName,city,address,state,description,status,image} = shopData; 

      const formData = new FormData();

      shopName && formData.append("shopName", shopName);
      city && formData.append("city", city);
      address && formData.append("address", address);
      state && formData.append("state", state);
      description && formData.append("description", description);
      formData.append("status", status);
      image && formData.append("image", image);


      // api call : 
        try {
          console.log(formData);
          
          setLoading(true)
          const {data} = await axios.put(`${URL}/update-shop/${id}`, formData, {withCredentials : true}); 
          if(data.success) { 
            dispatch(updateRestaurant(data.data));
            toast.success(data.message);
          }
        } catch (error) {
          console.log(`Could not update restaurant ${error}`);
        }finally{
          setLoading(false);
        }
  }

  const sheetOpenHandler = () => { 
    if(!restaurantData) return; 

    setShopData((prev)=>({
        ...prev, 
        shopName : restaurantData?.shopName, 
        city : restaurantData?.city,
        state : restaurantData?.state,
        address : restaurantData?.address,
        description : restaurantData?.description,
        status : restaurantData?.status, 
        image: null
    }))
  }


  

  return (
    <>
      <div className="max-w-7xl m-auto ">

        <div className="flex lg:flex-row flex-col items-center justify-around">
          {/* breadcrumbs  */}
          <div className=" flex justify-center mt-5">
            <Breadcrumb className={``}>
              <BreadcrumbList>
                {
                  data.map((links) => {
                    const { path, label } = links;
                    return (
                      <div className="flex items-center" key={label}>
                        <BreadcrumbItem >
                          <BreadcrumbLink asChild>
                            <Link to={`${path}`}>{label}</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </div>
                    )
                  })
                }
                <BreadcrumbItem>
                  <BreadcrumbPage className={`${theme === 'dark' ? 'text-white' : 'text-zinc-700'}`}>
                    {/* {location.pathname.split("/")[1]} */}
                    {restaurantData?.shopName}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* restaurant edit and delete buttons :  */}

          <div className="flex  items-center mt-5 gap-5">
            {/* restaurant edit button :  */}
             <Sheet>
            <SheetTrigger asChild>
                <Button onClick={sheetOpenHandler} className={`text-orange-100 rounded-sm flex  items-center px-2 bg-customOrange text-xs font-bold cursor-pointer`}>
                  <Pencil className="size-3"/>
                  <span>Edit</span>
                </Button>
            </SheetTrigger>
              <SheetContent className={`max-w-xl! overflow-y-scroll! ${theme === "light" ? "bg-gray-100" : "bg-zinc-800 border-zinc-800 text-gray-100"}`}>
                <SheetHeader>
                  <SheetTitle className={`${theme === "dark" && "text-zinc-300"}`}>Edit Restaurant</SheetTitle>
                  <SheetDescription className={`text-xs ${theme === "dark" && "text-zinc-500"}`}>
                    Make changes to your restaurant  here. Click save when you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
               <div className="grid flex-1 auto-rows-min gap-4 px-4">
                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-name">
                      Shop Name *
                    </Label>
                    <div className="relative flex items-center">
                      <BiBuildingHouse color="gray" className="absolute ml-2" />
                      <Input className={`rounded outline-none placeholder:text-xs px-8  ${theme === "light" ? "border-gray-200" : "border-zinc-600"}`} placeholder="Enter your shop name" id="sheet-demo-name" name="shopName" value={shopData.shopName} onChange={inputChangeHandler} />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">
                      City *
                    </Label>
                    <div className="relative flex items-center">
                      <PiCityLight color="gray" className="absolute ml-2" />
                      <Input className={`rounded outline-none placeholder:text-xs px-8 ${theme === "light" ? "border-gray-200" : "border-zinc-600"}`} placeholder="Enter City" id="sheet-demo-username" name="city" value={shopData.city} onChange={inputChangeHandler} />
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">
                      State *
                    </Label>
                    <div className="relative flex items-center">
                      <GiModernCity color="gray" className="absolute ml-2" />
                      <Input className={`rounded outline-none placeholder:text-xs px-8 ${theme === "light" ? "border-gray-200" : "border-zinc-600"}`} placeholder="Enter State" id="sheet-demo-username" name="state" value={shopData.state} onChange={inputChangeHandler} />
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">
                      Address *
                    </Label>

                    <div className="relative flex items-center">
                      <CiLocationOn color="gray" className="absolute ml-2" />
                      <Input className={`rounded outline-none placeholder:text-xs px-8 ${theme === "light" ? "border-gray-200 " : "border-zinc-600"}`} placeholder="Enter the address" id="sheet-demo-username" name="address" value={shopData.address} onChange={inputChangeHandler} />
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">
                      About Your Resturant *
                    </Label>

                    <div className="relative flex">
                      <Textarea placeholder="Write about your restaurant" className={`rounded outline-none placeholder:text-xs px- ${theme === "light" ? "border-gray-200 " : "border-zinc-600"}`} name="description" value={shopData.description} onChange={inputChangeHandler} />
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">
                      Status *
                    </Label>

                    <div className="relative flex items-center">
                      <CiLocationOn color="gray" className="absolute ml-2" />
                      <Tabs defaultValue="active" onValueChange={statusTabChangeHandler}>
                        <TabsList className={`${theme === "dark" ? "bg-zinc-700" : "bg-zinc-200"}`}>
                          <TabsTrigger value="active">
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
                    <Label className={`text-xs`} htmlFor="sheet-demo-username">
                      Upload your Restaurant image *
                    </Label>
                    <Input type={`file`} className={`rounded outline-none ${theme === "light" ? "border-gray-200" : "border-zinc-600"}`} id="sheet-demo-username" name="image" onChange={fileChangeHandler}   
                    />
                  </div>
                </div>
                <SheetFooter className={`flex! lg:flex-row! lg:justify-end  justify-center flex-col-reverse`}>
                  <SheetClose asChild>
                    <Button ariant="outline" className={`rounded ${theme === "dark" && "bg-zinc-700 border-zinc-500"}`}>
                      Close
                    </Button>
                  </SheetClose>

                  <Button disabled={loading} onClick={() => formSubmitHandler(shopData)} className={`bg-customOrange rounded transition-all duration-200 py-4`} type="submit">
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <Loader className="animate-spin" />
                        <span className="text-xs">Please wait!</span>
                      </div>
                    ) : (
                      "save"
                    )}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            {/* restaurant delete button :  */}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-customOrange flex items-center rounded-sm">
                  <Trash2 className="size-3" />
                  <span className="text-xs">Delete</span>
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent
                className={`${theme === "dark"
                    ? "bg-zinc-800 text-zinc-300"
                    : "bg-zinc-100 text-zinc-700/50"
                  }`}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure?
                  </AlertDialogTitle>

                  <AlertDialogDescription
                    className={`${theme === "dark"
                        ? "text-zinc-400/95 bg-zinc-800"
                        : "text-zinc-700 bg-zinc-100"
                      }`}
                  >
                    This action cannot be undone. This will permanently delete your
                    restaurant along with all associated menu items.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter
                  className={`${theme === "dark"
                      ? "bg-zinc-800"
                      : "bg-zinc-100"
                    }`}
                >
                  <AlertDialogCancel className={`rounded! ${theme === 'dark' ?  'bg-zinc-700 border-none text-white hover:text-customOrange! hover:bg-zinc-600' : ''}`}>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => deleteRestaurant(id)}
                    className={`bg-customOrange! border-none hover:text-orange-200 rounded!`}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>


        </div>

        {/* img banner comp  :  */}
        <RestaurantOwnerBannerRes restaurantImg={restaurantData?.image.url} />

        <div className="flex md:flex-row flex-col justify-between">

          {/* restaurant description componenent :  */}
          <RestaurantDescription
            description={restaurantData?.description}
            shopName={restaurantData?.shopName}
            status={restaurantData?.status}
          />

          {/* restaurant brief info :  */}
          <RestaurantOwnerBriefInfo
            briefData={[{ "restaurantID": restaurantData?._id, "createdAt": restaurantData?.createdAt, "updatedAt": restaurantData?.updatedAt, "status": restaurantData?.status }]}
          />
        </div>

        {/* Restaurant address & owner data componenent :  */}
        <RestaurantAndOwnerInfo restaurantData={restaurantData} />


        {/* menu items component :  */}
        <MenuItems restaurantData={restaurantData} />
      </div>
    </>
  )
}

export default OwnerRestaurantDetails