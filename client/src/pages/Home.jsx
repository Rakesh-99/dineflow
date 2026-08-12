import CategorySlider from "@/components/CategorySlider"
import FoodAndLocation from "@/components/FoodAndLocation"
import HeroContents from "@/components/HeroContents"
import RestaurantNotFound from "@/components/RestaurantNotFound"
import UserRestaurant from "@/components/UserRestaurants"
import { useSelector } from "react-redux"


const Home = () => {

  const { userCityBasedRestaurants } = useSelector((state) => state.currentOwnerRestaurants);




  return (
    <>
      <div className="max-w-4xl m-auto">

        {/* hero content component :  */}
        <HeroContents />


        {/* search food and location component :  */}
        <FoodAndLocation />


        {/* Category Slider component :  */}

        {
          !userCityBasedRestaurants ?

            <> 
            <RestaurantNotFound/>
            </>
            :

            <>

              <CategorySlider />
              {/* user restaurant :  */}
              <UserRestaurant/>
            </>
        }

      </div>
    </>
  )
}

export default Home