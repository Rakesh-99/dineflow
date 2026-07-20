import { Building, Building2, Mail, MapPin, Phone, RotateCcw, ShieldUser, User, UserStar } from "lucide-react"
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";


const RestaurantAndOwnerInfo = ({restaurantData}) => {
  
  const {theme} = useSelector(state => state.themeSlice)
  
  

  return (
    <>
    <div className=" text-zinc-400 flex md:gap-5 gap-10 md:flex-row flex-col justify-between">
      {/* Restaurant Information  */}
        <div className={`md:w-lg md:mx-0 mx-4 border flex flex-col gap-4  p-5 rounded ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-100'}`}>
          <h1 className={`text-lg font-medium`}>Restaurant Information</h1>

          <div className="flex flex-col gap-1">
             <div className="flex gap-2 items-center">
              <MapPin className={`size-8 rounded text-customOrange  p-1 border   ${theme === 'dark' ? ' bg-gray-800 border-orange-800' : 'border-zinc-200  bg-orange-50'}`}/>
            <div className="">
              <h2 className={`text-xs font-medium`}>Address</h2>
              <span className={`text-[10px]`}>{restaurantData?.address}</span>
            </div>
          </div>
          <Separator className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'}`}/>

            <div className="flex gap-2 items-center">
              <Building2 className={`size-8 rounded text-customOrange  p-1 border   ${theme === 'dark' ? ' bg-gray-800 border-orange-800' : 'border-zinc-200  bg-orange-50'}`}/>
            <div className="">
              <h2 className={`text-xs font-medium`}>City</h2>
              <span className={`text-[10px]`}>{restaurantData?.city}</span>
            </div>
          </div>
          <Separator className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'}`}/>

          <div className="flex gap-2 items-center">
              <Building className={`size-8 rounded text-customOrange  p-1 border   ${theme === 'dark' ? ' bg-gray-800 border-orange-800' : 'border-zinc-200  bg-orange-50'}`}/> 
            <div className="">
              <h2 className={`text-xs font-medium`}>State</h2>
              <span className={`text-[10px]`}>{restaurantData?.state}</span>
            </div>
          </div>
          </div>
         

        </div>

        {/* Owner Information :  */}
        <div className={`md:w-xl md:mx-0 mx-4  border flex flex-col gap-4  p-5 rounded ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-100'}`}>
            <h1 className={`text-lg  font-medium`}>Owner Information</h1>

            <div className={`flex md:flex-row flex-col justify-between gap-10`}>
                  {/* group 1 :  */}
                  <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                              <User className={`size-8 rounded text-customBlueViolet  p-1 border   ${theme === 'dark' ? ' bg-gray-800 border-violet-900' : 'border-zinc-200  bg-violet-50'}`}/>
                              <div className="">
                                <h2 className={`text-xs font-medium`}>Owner Name</h2>
                                <span className={`text-[10px]`}>{restaurantData?.owner?.fullname}</span>
                              </div>
                            </div>
                            <Separator className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'}`}/>

                              <div className="flex gap-2 items-center">
                                <Mail className={`size-8 rounded text-customBlueViolet  p-1 border   ${theme === 'dark' ? ' bg-gray-800 border-violet-900' : 'border-zinc-200  bg-violet-50'}`}/>
                              <div className="">
                                <h2 className={`text-xs font-medium`}>Email</h2>
                                <span className={`text-[10px]`}>{restaurantData?.owner?.email}</span>
                              </div>
                            </div>
                            <Separator className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'}`}/>

                            <div className="flex gap-2 items-center">
                            <Phone  className={`size-8 rounded text-customBlueViolet  p-1 border   ${theme === 'dark' ? ' bg-gray-800 border-violet-900' : 'border-zinc-200  bg-violet-50'}`}/>
                              <div className="">
                                <h2 className={`text-xs font-medium`}>Contact</h2>
                                <span className={`text-[10px]`}>{restaurantData?.owner ? restaurantData.owner.contact : "NA"}</span>
                              </div>
                            </div>
                  </div>

                  {/* group 2 :  */}
                  <div className={`flex flex-col gap-1 `}>
                            <div className="flex gap-2 items-center">
                              <ShieldUser className={`size-8 rounded text-customBlueViolet  p-1 border   ${theme === 'dark' ? ' bg-gray-800 border-violet-900' : 'border-zinc-200  bg-violet-50'}`}/>
                              <div className="">
                                <h2 className={`text-xs font-medium`}>Role</h2>
                                <span className={`text-[10px]`}>{String(restaurantData?.owner?.role).replace("r","R")}</span>
                              </div>
                            </div>
                            <Separator className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'}`}/>

                              <div className="flex gap-2 items-center">
                              
                                <UserStar className={`size-8 rounded text-customBlueViolet  p-1 border   ${theme === 'dark' ? ' bg-gray-800 border-violet-900' : 'border-zinc-200  bg-violet-50'}`}/>
                              <div className="">
                                <h2 className={`text-xs font-medium`}>Member Since</h2>
                                <span className={`text-[10px]`}>{new Date(restaurantData?.owner?.createdAt).toLocaleDateString().replaceAll("/", "-") }</span>
                              </div>
                            </div>
                            <Separator className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-50'}`}/>

                            <div className="flex gap-2 items-center">
                          <RotateCcw className={`size-8 rounded text-customBlueViolet  p-1 border   ${theme === 'dark' ? ' bg-gray-800 border-violet-900' : 'border-zinc-200  bg-violet-50'}`}/>
                              <div className="">
                                <h4 className={`text-xs font-medium`}>Last Updated</h4>
                                <span className={`text-[10px]`}>{new Date(restaurantData?.owner?.updatedAt).toLocaleString().replaceAll("/", "-")}</span>
                              </div>
                            </div>
                  </div>
            </div>
      </div>
         
    </div>
    </>
  )
}

export default RestaurantAndOwnerInfo