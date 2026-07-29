import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { CirclePlus, IndianRupee, Pencil, ShieldCheck, ShieldX, SquareMenu, Trash, Utensils } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useParams } from "react-router";
const URL = import.meta.env.VITE_BACKEND_ITEM_API_URL; 
import { addMenuItemToRestaurant } from "@/redux/features/currentOwnerRestaurants.slice";
import useGetFoodAndCategory from "@/hooks/useGetFoodAndCategory";






const MenuItems = ({ restaurantData }) => {


    const { theme } = useSelector((state) => state.themeSlice);
    const {restaurantname, id} = useParams(); 
    const dispatch = useDispatch(); 
    const {foodType,foodCategory} = useGetFoodAndCategory(); 
    
    
    

    

    const [menuData, setMenuData] = useState({
        name: "",
        foodType: "",
        category: "",
        status: true,
        price: "",
        image: null
    })



    const menuInputChangeHandler = (e) => {
        const { name, value } = e.target;
        setMenuData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const foodTypeHandler = (e) => {
        setMenuData((prev) => ({
            ...prev,
            foodType: e
        }))
    };

    const foodCategoryHandler = (e) => {
        setMenuData((prev) => ({
            ...prev,
            category: e
        }))
    };

    const statusTabChangeHandler = (e) => {
        if (e === 'active') {
            setMenuData((prev) => ({
                ...prev,
                status: true
            }))
        } else {
            setMenuData((prev) => ({
                ...prev,
                status: false
            }))
        }
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setMenuData((prev) => ({
            ...prev,
            image: file
        }))
    };

    const submitHandler = (menuData) => {
        if(!menuData.name || !menuData.foodType || !menuData.category || !menuData.image || !menuData.status || !menuData.price){
            toast.error(`All fields are required!`); 
            return false; 
        }; 

        const {name, foodType, category, image, status, price} = menuData; 

        // preparing the form data : 
        let formData = new FormData();
        formData.append("name", name); 
        formData.append("foodType",foodType); 
        formData.append("category",category); 
        formData.append("image", image); 
        formData.append("price", price);
        formData.append("status", status);


        // api call : 

       (async function createMenuItem () { 
         try{ 
                const {data} = await axios.post(`${URL}/add-item/${id}`,formData,{withCredentials: true}); 
                if(data.success){ 
                    toast.success(`A menu item has been created`); 
                    dispatch(addMenuItemToRestaurant(data.data));
                }
            }catch(error){ 
                toast.error(error?.response.data.messsage);
            }
       })();   
    }


    return (
        <>
            <div className={`mt-10 p-5 rounded border ${theme === "dark" ? "border-zinc-700" : "border-zinc-100"}`}>
                <div className="flex items-center justify-between">
                    {/* header :  */}
                    <div className="">
                        <h2 className="text-xl font-medium">Menu Items</h2>
                        <p className="text-xs text-gray-400">Manage all food items for your restaurant</p>
                    </div>

                    {/* add item button :  */}

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className={`flex items-center bg-customOrange rounded gap-1 px-2 py-4`}>
                                <CirclePlus className="size-4" />
                                <span className="text-xs font-medium">Add Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className={`max-w-md! overflow-y-scroll! ${theme === "light" ? "bg-gray-100" : "bg-zinc-800 border-zinc-800 text-gray-100"}`}>
                            <SheetHeader>
                                <SheetTitle className={`${theme === "dark" && "text-zinc-300"}`}>Create new menu item</SheetTitle>
                                <SheetDescription className={`text-xs ${theme === "dark" && "text-zinc-500"}`}>Please fillup the required detials and click on "create" when you&apos;re done.</SheetDescription>
                            </SheetHeader>
                            <div className="grid flex-1 auto-rows-min gap-4 px-4">


                                {/* Menu name :  */}
                                <div className="">

                                    <div className="flex flex-col items-center gap-1">

                                        <div className="flex  gap-1 items-center" >
                                        <Label className="font-medium text-xs">Restaurant : </Label>
                                        <h1 className="text-xs font-medium bg-customOrange rounded px-1 py-px text-orange-100">{restaurantname.toUpperCase()}</h1>
                                        </div>
                                       

                                        <span className="text-[10px] text-gray-400">The menu item will be added in Restaurant mentioned above.</span>
                                    </div>
                          


                                </div>
                                <div className="grid gap-1">
                                    <Label className={`text-xs`} htmlFor="sheet-demo-name">
                                        Menu Name *
                                    </Label>
                                    <div className="relative flex items-center">
                                        <SquareMenu color="gray" className="absolute ml-2 size-4" />
                                        <Input
                                            className={`rounded outline-none placeholder:text-xs px-8  ${theme === "light" ? "border-gray-200" : "border-zinc-600"}`}
                                            placeholder="Enter your shop name"
                                            id="sheet-demo-name"
                                            name="name"
                                            value={menuData.name}
                                            onChange={menuInputChangeHandler}
                                        />
                                    </div>
                                </div>

                                {/* Food Type :  */}
                                <div className="grid gap-1">
                                    <Label className={`text-xs`} htmlFor="sheet-demo-name">
                                        Food Type *
                                    </Label>
                                    <div className={`rounded relative flex items-center gap-1 border outline-none placeholder:text-xs px-8  ${theme === "light" ? "border-gray-200" : "border-zinc-600"}`}>

                                        <Utensils color="gray" className="absolute left-2 size-4" />
                                        <Select  onValueChange={foodTypeHandler}>
                                            <SelectTrigger className="w-full  border-none">
                                                <SelectValue placeholder="Select Type"/>
                                            </SelectTrigger>
                                            <SelectContent className={` ${theme === "dark" ? "bg-zinc-700 text-zinc-300" : "bg-zinc-100 text-zinc-700"}`}>
                                                <SelectGroup>
                                                    <SelectLabel className={` ${theme === "dark" ? " text-zinc-100" : " text-zinc-800"}`}>Select Type</SelectLabel>
                                                    {
                                                        foodType && foodType.map((type, idx)=> {
                                                            return(
                                                                <SelectItem 
                                                                    className={`transition-all duration-75 ${theme === "dark" ? "hover:bg-zinc-500!" : "hover:bg-zinc-200! "}`} 
                                                                        key={idx} 
                                                                        value={type}
                                                                    >
                                                                        {type}
                                                            </SelectItem>
                                                            )
                                                          
                                                        })
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Food category  :  */}
                                <div className="grid gap-1">
                                    <Label className={`text-xs`} htmlFor="sheet-demo-name">
                                        Food Category *
                                    </Label>
                                    <div className={`rounded relative flex items-center gap-1 border outline-none placeholder:text-xs px-8  ${theme === "light" ? "border-gray-200" : "border-zinc-600"}`}>
                                        <Utensils color="gray" className="absolute left-2 size-4" />
                                        <Select  onValueChange={foodCategoryHandler}>
                                            <SelectTrigger className="w-full  border-none">
                                                <SelectValue  placeholder="Select Category"/>
                                            </SelectTrigger>
                                            <SelectContent className={` ${theme === "dark" ? "bg-zinc-700 text-zinc-300" : "bg-zinc-100 text-zinc-700"}`}>
                                                <SelectGroup>
                                                    <SelectLabel className={` ${theme === "dark" ? " text-zinc-100" : " text-zinc-800"}`}>Select Type</SelectLabel>
                                                    {foodCategory && foodCategory.map((category, idx) => (
                                                        <SelectItem className={`transition-all duration-75 ${theme === "dark" ? "hover:bg-zinc-500!" : "hover:bg-zinc-200! "}`} key={idx} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* menu status :  */}
                                <div className="grid gap-1">
                                    <Label className={`text-xs`} htmlFor="sheet-demo-username">
                                        Status *
                                    </Label>

                                    <div className="relative flex items-center">
                                        <CiLocationOn color="gray" className="absolute ml-2" />
                                        <Tabs defaultValue="active" onValueChange={statusTabChangeHandler} >
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

                                {/* Price :  */}
                                <div className="grid gap-1">
                                    <Label className={`text-xs`} htmlFor="sheet-demo-name">
                                        Price *
                                    </Label>
                                    <div className="relative flex items-center">
                                        <IndianRupee color="gray" className="absolute ml-2 size-4" />
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            className={`rounded outline-none placeholder:text-xs px-8  ${theme === "light" ? "border-gray-200" : "border-zinc-600"}`}
                                            placeholder="Price"
                                            id="sheet-demo-name"
                                            name="price"
                                            value={menuData.price}
                                            onChange={menuInputChangeHandler}
                                        />
                                    </div>
                                </div>

                                {/* image :  */}
                                <div className="grid gap-2">
                                    <Label className={`text-xs`} htmlFor="sheet-demo-username">
                                        Upload your Menu image *
                                    </Label>
                                    <Input
                                        type={`file`}
                                        className={`rounded outline-none ${theme === "light" ? "border-gray-200" : "border-zinc-600"}`}
                                        id="sheet-demo-username"
                                        name="image"
                                        onChange={fileChangeHandler}
                                    />
                                </div>
                            </div>
                            <SheetFooter className={`flex! lg:flex-row! lg:justify-end  justify-center flex-col-reverse`}>
                                <SheetClose asChild>
                                    <Button ariant="outline" className={`rounded ${theme === "dark" && "bg-zinc-700 border-zinc-500"}`}>
                                        Close
                                    </Button>
                                </SheetClose>
                                <Button
                                    type="submit"
                                    className={`bg-customOrange rounded font-medium `}
                                    onClick={() => submitHandler(menuData)}
                                >
                                    Create Menu
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* categories :  */}
                <div className={`flex text-xs gap-5 mt-5 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                    <span>All</span>
                    {restaurantData?.item.map((data, idx) => (
                        <div key={idx}>
                            <span>{data.category}</span>
                        </div>
                    ))}
                </div>

                {/* table data :  */}
                <Table className={`mt-10`}>
                    <TableCaption>{restaurantData?.item.length < 1 ? "No item found" : `${restaurantData?.item.length} items found`} </TableCaption>
                    <TableHeader>
                        <TableRow className={` transition-all duration-200 ${theme === "dark" && "hover:bg-zinc-700 border-zinc-700"}`}>
                            <TableHead className={`w-[100px] ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>Item Name</TableHead>
                            <TableHead className={`text-right ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>Category</TableHead>
                            <TableHead className={`text-right ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>Type</TableHead>
                            <TableHead className={`text-right ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>Price(₹)</TableHead>
                            <TableHead className={`text-right  ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>Status</TableHead>
                            <TableHead className={` text-right ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className={`text-xs`}>
                        {restaurantData?.item.map((data, idx) => {
                            return (
                                <TableRow key={idx} className={` transition-all duration-200 ${theme === "dark" && "hover:bg-zinc-700 border-zinc-700 shadow"}`}>
                                    <TableCell className={`flex items-center gap-2`}>
                                        <img src={data.image.url} className="w-14 rounded border-2" alt="" />
                                        <span>{data.name}</span>
                                    </TableCell>
                                    <TableCell className={`text-right`}>{data.category}</TableCell>
                                    <TableCell className={`text-right`}>{data.foodType}</TableCell>
                                    <TableCell className="text-right">{data.price}</TableCell>
                                    <TableCell className=" float-end">
                                        {data.status === true ? (
                                            <div className={`flex px-1  py-px rounded-full  items-center justify-center gap-1 ${theme === "dark" ? "bg-green-950 text-green-300 border-green-300" : "text-green-800 bg-green-100"}`}>
                                                <ShieldCheck className={`size-3`} />
                                                <span className="text-[11px]">Active</span>
                                            </div>
                                        ) : (
                                            <div className={`flex px-1 rounded-full  py-px   items-center justify-center gap-1 ${theme === "dark" ? "bg-red-950 text-red-300 border-red-300" : "text-red-800 bg-red-100"}`}>
                                                <ShieldCheck className={`size-3`} />
                                                <span className="text-[11px]">Active</span>
                                            </div>
                                        )}
                                    </TableCell>

                                    <TableCell className="">
                                        <span className="flex gap-5 justify-end">
                                            <Pencil size={13} className="cursor-pointer hover:text-customOrange transition-all duration-200" />
                                            <Trash size={13} className="cursor-pointer hover:text-customOrange transition-all duration-200" />
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default MenuItems;
