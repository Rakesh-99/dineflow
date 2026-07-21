import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { CirclePlus, Pencil, ShieldCheck, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



const MenuItems = ({restaurantData}) => { 


    const {theme} = useSelector(state => state.themeSlice);

    console.log(restaurantData?.item)
    



    return ( 
        <>
        <div className={`mt-10 p-5 rounded border ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-100'}`}>

            <div className="flex items-center justify-between">
            {/* header :  */}
            <div className="">
                <h2 className="text-xl font-medium">Menu Items</h2>
                <p className="text-xs text-gray-400">Manage all food items for your restaurant</p>
            </div>

            {/* add item button :  */}
                <Button className={`flex py-4 items-center gap-1 bg-customOrange rounded font-medium cursor-pointer`}>
                    <CirclePlus className="size-4"/>
                    <span className="text-xs mt-px">Add Item</span>
                </Button>
            </div>
     
       

            {/* categories :  */}
            <div className={`flex text-xs gap-5 mt-5 ${theme === 'dark' ? "text-zinc-400" : "text-zinc-500"}`}>
                
                <span>All</span>
                {
                    restaurantData?.item.map((data, idx)=>(
                        <div  key={idx}>
                            <span >{data.category}</span>
                        </div>
                    ))
                }
            </div>



            {/* table data :  */}
             <Table className={`mt-10`}>
                <TableCaption>{restaurantData?.item.length < 1 ? "No item found" : `${restaurantData?.item.length} items found`} </TableCaption>
                <TableHeader >
                    <TableRow className={` transition-all duration-200 ${theme === 'dark' && 'hover:bg-zinc-700 border-zinc-700'}`}>
                    <TableHead className={`w-[100px] ${theme === 'dark' ? "text-zinc-300" : "text-zinc-700" }`}>Item Name</TableHead>
                    <TableHead className={`text-right ${theme === 'dark' ? "text-zinc-300" : "text-zinc-700" }`}>Category</TableHead>
                    <TableHead className={`text-right ${theme === 'dark' ? "text-zinc-300" : "text-zinc-700" }`}>Type</TableHead>
                    <TableHead className={`text-right ${theme === 'dark' ? "text-zinc-300" : "text-zinc-700" }`}>Price(₹)</TableHead>
                    <TableHead className={`text-right  ${theme === 'dark' ? "text-zinc-300" : "text-zinc-700" }`}>Status</TableHead>
                    <TableHead className={` text-right ${theme === 'dark' ? "text-zinc-300" : "text-zinc-700" }`}>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={`text-xs`}>
                    {restaurantData?.item.map((data, idx)=> { 
                        return(
                            <TableRow key={idx} className={` transition-all duration-200 ${theme === 'dark' && 'hover:bg-zinc-700 border-zinc-700 shadow'}`}>
                            <TableCell >{data.name}</TableCell>
                            <TableCell className={`text-right`}>{data.category}</TableCell>
                            <TableCell className={`text-right`}>{data.foodType}</TableCell>
                            <TableCell className="text-right">{data.price}</TableCell>
                            <TableCell className=" flex justify-end">
                                {data.status === true ? 
                            <div className={`flex px-1  py-px rounded-full  items-center justify-center gap-1 ${theme === 'dark' ? 'bg-green-950 text-green-300 border-green-300' : 'text-green-800 bg-green-100'}`}>
                                <ShieldCheck className={`size-3`}/>
                                <span className="text-[11px]">Active</span>
                            </div>
                            : 
                            <div className={`flex px-1 rounded-full  py-px   items-center justify-center gap-1 ${theme === 'dark' ? 'bg-red-950 text-red-300 border-red-300' : 'text-red-800 bg-red-100'}`}>
                                <ShieldCheck className={`size-3`}/>
                                <span className="text-[11px]">Active</span>
                            </div>
                            }
                            </TableCell>

                            <TableCell className="">
                                <span className="flex gap-5 justify-end">
                                     <Pencil size={13} className="cursor-pointer hover:text-customOrange transition-all duration-200"/>
                                    <Trash size={13} className="cursor-pointer hover:text-customOrange transition-all duration-200"/>
                                </span>
                               
                            </TableCell>


                    </TableRow>
                        )
                  
                    })}
                </TableBody>
               
            </Table>
        </div>
        </>
    )
}; 

export default MenuItems; 