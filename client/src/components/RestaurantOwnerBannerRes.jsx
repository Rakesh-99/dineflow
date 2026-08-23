

const RestaurantOwnerBannerRes = ({restaurantImg}) => {
  return (
    <>
     <div className="w-full rounded-3xl overflow-hidden m-auto mt-5">
                  <img 
                  src={restaurantImg} 
                  alt="restaurant image banner" 
                  className="w-full rounded-xl h-96 object-contain scale-200 border overflow-hidden"
                  />
            </div>
    </>
  )
}

export default RestaurantOwnerBannerRes;