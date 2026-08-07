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
import { ChevronRight, Loader, Pencil, ShieldCheck, ShieldX, Trash2 } from "lucide-react"
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
import { useState } from "react"


const OwnerRestaurantDetails = () => {

  const { id } = useParams();
  const { theme } = useSelector(state => state.themeSlice);
  const isDark = theme === "dark";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurants } = useSelector(state => state.currentOwnerRestaurants);
  const restaurantData = restaurants?.find(restaurant => restaurant._id === id);

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [shopData, setShopData] = useState({
    shopName: "",
    city: "",
    state: "",
    address: "",
    description: "",
    status: true,
    image: null,
  })

  const deleteRestaurant = async (shopId) => {
    try {
      setDeleting(true);
      const { data } = await axios.delete(`${URL}/delete-shop/${shopId}`, { withCredentials: true });
      if (data.success) {
        toast.success("Restaurant and its menu have been deleted");
        dispatch(removeRestaurant(data.deletedRestaurant._id));
        navigate('/restaurants');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not delete restaurant");
    } finally {
      setDeleting(false);
    }
  }

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const statusTabChangeHandler = (e) => {
    setShopData((prev) => ({
      ...prev,
      status: e === "active"
    }))
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setShopData((prev) => ({
      ...prev,
      image: file
    }))
  }

  const formSubmitHandler = async (shopData) => {
    const { shopName, city, address, state, description, status, image } = shopData;

    const formData = new FormData();
    shopName && formData.append("shopName", shopName);
    city && formData.append("city", city);
    address && formData.append("address", address);
    state && formData.append("state", state);
    description && formData.append("description", description);
    formData.append("status", status);
    image && formData.append("image", image);

    try {
      setLoading(true)
      const { data } = await axios.put(`${URL}/update-shop/${id}`, formData, { withCredentials: true });
      if (data.success) {
        dispatch(updateRestaurant(data.data));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not update restaurant");
    } finally {
      setLoading(false);
    }
  }

  const sheetOpenHandler = () => {
    if (!restaurantData) return;

    setShopData((prev) => ({
      ...prev,
      shopName: restaurantData?.shopName,
      city: restaurantData?.city,
      state: restaurantData?.state,
      address: restaurantData?.address,
      description: restaurantData?.description,
      status: restaurantData?.status,
      image: null
    }))
  }

  // restaurant not found / still loading :
  if (!restaurantData) {
    return (
      <div className="max-w-7xl m-auto flex flex-col items-center justify-center py-24 gap-2">
        <Loader className="animate-spin size-5 text-customOrange" />
        <span className="text-sm text-gray-400">Loading restaurant details…</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl m-auto">

      {/* header : breadcrumb + actions */}
      <div className={`flex md:flex-row flex-col md:items-center items-start justify-between gap-4 py-5 border-b ${isDark ? "border-zinc-800" : "border-gray-100"}`}>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/restaurants">Restaurants</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="size-3.5" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className={`font-medium ${isDark ? "text-white" : "text-zinc-800"}`}>
                {restaurantData?.shopName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                onClick={sheetOpenHandler}
                variant="outline"
                size="sm"
                className={`rounded bg-transparent hover:text-green-500 gap-1.5 ${isDark ? "border-zinc-700 hover:bg-zinc-800" : ""}`}
              >
                <Pencil className="size-3.5" />
                <span className="text-xs font-medium">Edit</span>
              </Button>
            </SheetTrigger>
            <SheetContent className={`max-w-xl! overflow-y-scroll! ${isDark ? "bg-zinc-800 border-zinc-800 text-gray-100" : "bg-gray-100"}`}>
              <SheetHeader>
                <SheetTitle className={`${isDark && "text-zinc-300"}`}>Edit Restaurant</SheetTitle>
                <SheetDescription className={`text-xs ${isDark && "text-zinc-500"}`}>
                  Make changes to your restaurant here. Click save when you&apos;re done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-4 px-4">
                <div className="grid gap-1">
                  <Label className="text-xs" htmlFor="shop-name">Shop Name *</Label>
                  <div className="relative flex items-center">
                    <BiBuildingHouse color="gray" className="absolute ml-2" />
                    <Input className={`rounded outline-none placeholder:text-xs px-8 ${isDark ? "border-zinc-600" : "border-gray-200"}`} placeholder="Enter your shop name" id="shop-name" name="shopName" value={shopData.shopName} onChange={inputChangeHandler} />
                  </div>
                </div>

                <div className="grid gap-1">
                  <Label className="text-xs" htmlFor="shop-city">City *</Label>
                  <div className="relative flex items-center">
                    <PiCityLight color="gray" className="absolute ml-2" />
                    <Input className={`rounded outline-none placeholder:text-xs px-8 ${isDark ? "border-zinc-600" : "border-gray-200"}`} placeholder="Enter city" id="shop-city" name="city" value={shopData.city} onChange={inputChangeHandler} />
                  </div>
                </div>

                <div className="grid gap-1">
                  <Label className="text-xs" htmlFor="shop-state">State *</Label>
                  <div className="relative flex items-center">
                    <GiModernCity color="gray" className="absolute ml-2" />
                    <Input className={`rounded outline-none placeholder:text-xs px-8 ${isDark ? "border-zinc-600" : "border-gray-200"}`} placeholder="Enter state" id="shop-state" name="state" value={shopData.state} onChange={inputChangeHandler} />
                  </div>
                </div>

                <div className="grid gap-1">
                  <Label className="text-xs" htmlFor="shop-address">Address *</Label>
                  <div className="relative flex items-center">
                    <CiLocationOn color="gray" className="absolute ml-2" />
                    <Input className={`rounded outline-none placeholder:text-xs px-8 ${isDark ? "border-zinc-600" : "border-gray-200"}`} placeholder="Enter the address" id="shop-address" name="address" value={shopData.address} onChange={inputChangeHandler} />
                  </div>
                </div>

                <div className="grid gap-1">
                  <Label className="text-xs" htmlFor="shop-description">About Your Restaurant *</Label>
                  <Textarea className={`rounded outline-none placeholder:text-xs ${isDark ? "border-zinc-600" : "border-gray-200"}`} placeholder="Write about your restaurant" id="shop-description" name="description" value={shopData.description} onChange={inputChangeHandler} />
                </div>

                <div className="grid gap-1">
                  <Label className="text-xs">Status *</Label>
                  <Tabs value={shopData.status ? "active" : "inactive"} onValueChange={statusTabChangeHandler}>
                    <TabsList className={`${isDark ? "bg-zinc-700" : "bg-zinc-200"}`}>
                      <TabsTrigger value="active">
                        <ShieldCheck className="size-3.5" />
                        Active
                      </TabsTrigger>
                      <TabsTrigger value="inactive">
                        <ShieldX className="size-3.5" />
                        Inactive
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs" htmlFor="shop-image">Upload Restaurant Image *</Label>
                  <Input type="file" className={`rounded outline-none ${isDark ? "border-zinc-600" : "border-gray-200"}`} id="shop-image" name="image" onChange={fileChangeHandler} />
                </div>
              </div>
              <SheetFooter className="flex! lg:flex-row! lg:justify-end justify-center flex-col-reverse">
                <SheetClose asChild>
                  <Button variant="outline" className={`rounded ${isDark && "bg-zinc-700 border-zinc-500"}`}>
                    Close
                  </Button>
                </SheetClose>
                <Button disabled={loading} onClick={() => formSubmitHandler(shopData)} className="bg-customOrange rounded py-4" type="submit">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin size-3.5" />
                      <span className="text-xs">Saving…</span>
                    </div>
                  ) : (
                    <span className="text-xs font-medium">Save changes</span>
                  )}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="rounded gap-1.5">
                <Trash2 className="size-3.5" />
                <span className="text-xs font-medium">Delete</span>
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className={`${isDark ? "bg-zinc-800 text-zinc-300" : "bg-white text-zinc-700"}`}>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this restaurant?</AlertDialogTitle>
                <AlertDialogDescription className={isDark ? "text-zinc-400" : "text-zinc-500"}>
                  This will permanently delete <strong>{restaurantData?.shopName}</strong> along with all its menu items. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className={`rounded! ${isDark ? 'bg-zinc-700 border-none text-white hover:text-customOrange! hover:bg-zinc-600' : ''}`}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={deleting}
                  onClick={() => deleteRestaurant(id)}
                  className="bg-red-600! hover:bg-red-700! border-none rounded!"
                >
                  {deleting ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin size-3.5" />
                      <span>Deleting…</span>
                    </div>
                  ) : "Delete restaurant"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* img banner comp :  */}
      <RestaurantOwnerBannerRes restaurantImg={restaurantData?.image?.url} />

      <div className="flex md:flex-row flex-col justify-between">
        <RestaurantDescription
          description={restaurantData?.description}
          shopName={restaurantData?.shopName}
          status={restaurantData?.status}
        />
        <RestaurantOwnerBriefInfo
          briefData={[{
            restaurantID: restaurantData?._id,
            createdAt: restaurantData?.createdAt,
            updatedAt: restaurantData?.updatedAt,
            status: restaurantData?.status
          }]}
        />
      </div>

      <RestaurantAndOwnerInfo restaurantData={restaurantData} />

      <MenuItems restaurantData={restaurantData} />
    </div>
  )
}

export default OwnerRestaurantDetails