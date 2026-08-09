import CategorySlider from "@/components/CategorySlider"
import FoodAndLocation from "@/components/FoodAndLocation"
import HeroContents from "@/components/HeroContents"


const Home = () => {
  return (
    <>
    <div className="max-w-4xl m-auto">

      {/* hero content component :  */}
      <HeroContents/>


      {/* search food and location component :  */}
      <FoodAndLocation/>
      {/* Category Slider component :  */}
      <CategorySlider/>
    </div>
    </>
  )
}

export default Home