import { Blocks, Clock, ShieldCheck, ShieldOff } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useSelector } from "react-redux"
import { Label } from "./ui/label"


const RestaurantOwnerBriefInfo = ({briefData}) => {


    const {theme} = useSelector(state => state.themeSlice); 


  return (
    <>
    <div className={`mt-5 md:mx-2 mx-4 rounded flex items-center justify-center shadow-xs border  h-fit p-5 ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-100'}`}>
 
        {briefData.map((data, idx) => (

       <div className="flex flex-col px-4 text-gray-400 gap-2" key={idx}>
             <div className="flex gap-1 text-xs  items-center">
                <Blocks size={15} className="text-customBlueViolet"/>
                <Label className={`text-xs`}>Restaurant ID : </Label>
                <span>{data.restaurantID }</span>
            </div>
            <Separator className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}/>
            <div className="flex gap-1 text-xs items-center">
                <Clock size={15} className="text-customBlueViolet"/>
                <Label className={`text-xs`}>Created At : </Label>
                <span>{new Date(data.createdAt).toLocaleString() }</span>
            </div>
            <Separator className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}/>


            <div className="flex gap-1 text-xs items-center">
                <Clock size={15} className="text-customBlueViolet"/>
                <Label className={`text-xs`}>Updated At : </Label>
                <span>{new Date(data.updatedAt).toLocaleString() }</span>
            </div>
            <Separator className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-200'}`}/>


             <div className="flex gap-1 text-xs items-center">
                <Blocks size={15} className="text-customBlueViolet"/>
                <Label className={`text-xs`}>Status : </Label>
                {data.status === true ? 
                    <span className={`text-xs text-green-500 border flex gap-1 py-1 items-center rounded-xl px-3  font-semibold  border-green-500 ${theme === 'dark' ? 'bg-green-950' : 'bg-green-50'}`}>
                        <ShieldCheck size={12}/>
                        <span className="text-[8px]">Active</span>
                    </span>
                    : 
                     <span className={`text-xs text-red-100 flex gap-1 p-1 items-center  rounded-xl px-3  font-semibold  border-red-500 ${theme === 'dark' ? 'bg-red-950' : 'bg-red-50 text-red-700'}`}>
                      <ShieldOff size={12}/>
                      <span className="text-[8px]">Inactive</span>
                     </span>
                    }
              
            </div>
   
       </div>
         
          
        ))}
   
    </div>
    </>
  )
}

export default RestaurantOwnerBriefInfo