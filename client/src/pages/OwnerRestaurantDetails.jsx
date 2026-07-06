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
   <div className="">

            {/* breadcrumbs  */}
            <div className="mt-5">
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

            {/* img banner :  */}
            <div className="w-full">
                  <img 
                  src={restaurantData?.image} 
                  alt="restaurant image banner" 
                  className="w-full h-full object-contain"
                  />
            </div>
         
    </div> 
    </>
  )
}

export default OwnerRestaurantDetails