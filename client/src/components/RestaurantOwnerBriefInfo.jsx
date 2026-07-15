import { Blocks, Clock, ShieldCheck } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useSelector } from "react-redux"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
} from "@/components/ui/table"
import { Label } from "./ui/label"


const RestaurantOwnerBriefInfo = ({briefData}) => {


    const {theme} = useSelector(state => state.themeSlice); 


  return (
    <>
    <div className={`mt-5 rounded shadow-xs border w-sm ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-100'}`}>


                
           <Table>
      <TableCaption className={`text-[10px]`}>Brief About your restaurant.</TableCaption>
      <TableBody >
        {briefData.map((data, idx) => (

       <div className="flex flex-col px-4 text-gray-400" key={idx}>
             <div className="flex gap-1 text-xs  items-center">
                <Blocks size={15}/>
                <Label className={`text-xs`}>Restaurant ID : </Label>
                <TableCell>{data.restaurantID }</TableCell>
            </div>
            <Separator />
            <div className="flex gap-1 text-xs items-center">
                <Clock size={15} />
                <Label className={`text-xs`}>Created At : </Label>
                <TableCell>{new Date(data.createdAt).toLocaleString() }</TableCell>
            </div>
            <Separator />

            <div className="flex gap-1 text-xs items-center">
                <Clock size={15}/>
                <Label className={`text-xs`}>Updated At : </Label>
                <TableCell>{new Date(data.updatedAt).toLocaleString() }</TableCell>
            </div>
            <Separator />

             <div className="flex gap-1 text-xs items-center">
                <Blocks size={15}/>
                <Label className={`text-xs`}>Status : </Label>
                <TableCell>{data.status === true ? 
                    <span className={`text-xs text-green-500 border flex gap-1 py-1 items-center rounded-xl px-3  font-semibold  border-green-500 ${theme === 'dark' ? 'bg-green-950' : 'bg-green-50'}`}>
                        <ShieldCheck size={16}/>
                        <span className="text-xs">Active</span>
                    </span>
                    : 
                     <span className={`text-xs text-red-500 border-2 bg-red-950 rounded-xl px-3  font-semibold  border-red-500 ${theme === 'dark' ? 'bg-red-950' : 'bg-red-50'}`}>Inactive</span>
                    }
                </TableCell>
            </div>
   
       </div>
         
          
        ))}
      </TableBody>
    
    </Table>
    </div>
    </>
  )
}

export default RestaurantOwnerBriefInfo