import { Link, useLocation, useParams } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import {  Pen, Trash2 } from "lucide-react"
import RestaurantOwnerBannerRes from "@/components/RestaurantOwnerBannerRes"
import RestaurantDescription from "@/components/RestaurantDescription"
import RestaurantOwnerBriefInfo from "@/components/RestaurantOwnerBriefInfo"
import RestaurantAndOwnerInfo from "@/components/RestaurantAndOwnerInfo"
import MenuItems from "@/components/MenuItems"
const URL = import.meta.env.VITE_BACKEND_SHOP_API_URL;







const OwnerRestaurantDetails = () => {


  const {restaurantname, id} = useParams() ; 
  const {theme} = useSelector(state => state.themeSlice);
  const location = useLocation(); 
  const [restaurantData, setRestaurantData] = useState(null); 

  
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
  
  console.log(restaurantData);

  
  
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

          <div className="flex items-center justify-around">
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

            <div className="flex items-center mt-5 gap-5">
            {/* restaurant edit button :  */}

                <Button className={`bg-customOrange flex hover:bg-amber-600 items-center rounded-sm `}>
                  <Pen className="size-3"/>
                  <span className="text-xs">Edit</span>
                </Button>
             {/* restaurant delete button :  */}
                 <Button className={`bg-customOrange flex hover:bg-amber-600 items-center rounded-sm `}>
                  <Trash2 className="size-3"/>
                  <span className="text-xs">Delete</span>
                </Button>
            </div>
      
             
          </div>   

            {/* img banner comp  :  */}
           <RestaurantOwnerBannerRes restaurantImg = { restaurantData?.image}/>

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