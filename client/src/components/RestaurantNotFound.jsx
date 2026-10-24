import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
const URL = import.meta.env.VITE_BACKEND_SHOP_API_URL;
import { setSampleRestaurants } from "@/redux/features/currentOwnerRestaurants.slice";
import { useDispatch, useSelector } from "react-redux";
import RestaurantListings from "./RestaurantListings";
const RestaurantNotFound = () => {
  const [loadDummyRes, setLoadDummyRes] = useState(false);
  const { theme } = useSelector((state) => state.themeSlice);
  const isDark = theme === "dark";
  const { isDummyBtnClicked } = useSelector(
    (state) => state.currentOwnerRestaurants.sampleRestaurants,
  );
  const dispatch = useDispatch();
  const dummyResHandler = (data) => {
    console.log("btn daya ", data);

    setLoadDummyRes(data);
  };

  const showAllRes = async () => {
    try {
      const { data } = await axios.get(`${URL}/get-all-restaurants`, {
        withCredentials: true,
      });
      if (data?.success) {
        dispatch(
          setSampleRestaurants({
            restaurants: data?.data,
            isDummyBtnClicked: loadDummyRes,
          }),
        );
        toast.success("Sample restaurants have been loaded");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Could not load restaurnats!");
    }
  };

  return (
    <div className="">
      {isDummyBtnClicked ? (
        <div className="flex flex-col gap-5 mt-20 ">
          <div className="flex items-center justify-center text-muted-foreground text-xs gap-1">
            <span className="text-red-500 font-semibold">Note :</span>
            <p>You are currently you are exploring sample restaurants, cuzz we dont have nearby restaurants based on your current location!</p>
          </div>
          <RestaurantListings />
        </div>
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center  px-6 text-center">
          <div className="text-7xl mb-6">🍔</div>

          <h1 className="text-3xl font-bold text-customOrange">
            We're not there yet!
          </h1>
          <p className="mt-2 text-muted-foreground max-w-sm">
            Sorry, our services are currently unavailable at this location. We
            hope to serve you in the future.
          </p>

          <Button
            variant="outline"
            className={`mt-5 hover:text-customOrange transition-all duration-300 rounded text-[10px] font-bold cursor-pointer ${isDark && "bg-gray-800 hover:bg-zinc-700 border-zinc-600"}`}
            onClick={() => dummyResHandler(true)}
          >
            Would you like to load sample restaurants instead?
          </Button>

          {/* show popup :  */}
          <AlertDialog open={loadDummyRes}>
            <AlertDialogTrigger
              render={<Button variant="outline">Show Dialog</Button>}
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className={"text-xs"}>
                  Should we proceed with sample Restaurants ?{" "}
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={`cursor-pointer text-xs! rounded!`}
                  onClick={() => dummyResHandler(false)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={showAllRes}
                  className={`text-xs cursor-pointer bg-customOrange! rounded!`}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

export default RestaurantNotFound;
