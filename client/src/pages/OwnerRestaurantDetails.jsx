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
import { useEffect, useState } from "react"
import axios from "axios"
import {  Pen, Trash2 } from "lucide-react"
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
import { removeRestaurant } from "@/redux/features/currentOwnerRestaurants.slice"






const OwnerRestaurantDetails = () => {


  const {restaurantname, id} = useParams() ; 
  const {theme} = useSelector(state => state.themeSlice);
  const location = useLocation(); 
  const [restaurantData, setRestaurantData] = useState(null); 
  const [isDeleteRestaurantBtnClick] = useState(false);
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  
  const data = [
    {
      label : 'Home',
      path : '/'
    }, 
    {
      label : 'Restaurants', 
      path : '/restaurants'
    }
  ]
  
  

  const deleteRestaurant = async(shopId) => { 
    try {
      const {data} = await axios.delete(`${URL}/delete-shop/${shopId}`, {withCredentials : true}); 
      if(data.success) { 
        toast.success(`Restaurant along with its menu have been deleted`,data); 
        dispatch(removeRestaurant(data.deletedRestaurant._id));
        navigate('/restaurants')
      }
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  }

  
  
  // to load the restaurant details page data on chnage of id : 
  useEffect(()=> { 
  const getRestaurantInfo = async() => { 
       try {
      const {data} = await axios.get(`${URL}/get-owner-restaurant/${id}`, {withCredentials : true}); 
        
      if(data.success) { 
        setRestaurantData(data.data); 
      }
    } catch (error) {
      console.log(error);
    }
  }
  getRestaurantInfo(); 
  },[id]);
  

  return (
    <> 
   <div className="max-w-7xl m-auto ">

          <div className="flex lg:flex-row flex-col items-center justify-around">
            {/* breadcrumbs  */}
                      <div className=" flex justify-center mt-5">
                        <Breadcrumb className={``}>
                          <BreadcrumbList>
                            {
                              data.map((links)=> {
                                const {path, label} = links ; 
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
                              {location.pathname.split("/")[1]}
                              </BreadcrumbPage>
                            </BreadcrumbItem>
                          </BreadcrumbList>
                        </Breadcrumb>
                      </div>

            {/* restaurant edit and delete buttons :  */}

            <div className="flex  items-center mt-5 gap-5">
            {/* restaurant edit button :  */}

                <Button className={`bg-customOrange flex  items-center rounded-sm `}>
                  <Pen className="size-3"/>
                  <span className="text-xs">Edit</span>
                </Button>
             {/* restaurant delete button :  */}
             
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-customOrange flex items-center rounded-sm">
                  <Trash2 className="size-3" />
                  <span className="text-xs">Delete</span>
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent
                className={`${
                  theme === "dark"
                    ? "bg-zinc-800 text-zinc-300"
                    : "bg-zinc-100 text-zinc-700/50"
                }`}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure?
                  </AlertDialogTitle>

                  <AlertDialogDescription
                    className={`${
                      theme === "dark"
                        ? "text-zinc-400/95 bg-zinc-800"
                        : "text-zinc-700 bg-zinc-100"
                    }`}
                  >
                    This action cannot be undone. This will permanently delete your
                    restaurant along with all associated menu items.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter
                  className={`${
                    theme === "dark"
                      ? "bg-zinc-800"
                      : "bg-zinc-100"
                  }`}
                >
                  <AlertDialogCancel className="rounded-sm">
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => deleteRestaurant(id)}
                    className="bg-customOrange rounded-sm"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
  
            </div>
      
             
          </div>   

            {/* img banner comp  :  */}
           <RestaurantOwnerBannerRes restaurantImg = { restaurantData?.image.url}/>

          <div className="flex md:flex-row flex-col justify-between">

           {/* restaurant description componenent :  */}
           <RestaurantDescription 
           description={restaurantData?.description}
           shopName = {restaurantData?.shopName}
           status = {restaurantData?.status}
           />
         
         {/* restaurant brief info :  */}
         <RestaurantOwnerBriefInfo
            briefData = {[{"restaurantID" : restaurantData?._id, "createdAt" : restaurantData?.createdAt, "updatedAt" : restaurantData?.updatedAt, "status" : restaurantData?.status}]}
         />
      </div>

      {/* Restaurant address & owner data componenent :  */} 
        <RestaurantAndOwnerInfo restaurantData = {restaurantData}/>
    

      {/* menu items component :  */}
        <MenuItems restaurantData={restaurantData}/>
      
        
    </div> 
    </>
  )
}

export default OwnerRestaurantDetails