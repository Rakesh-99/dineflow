

const RestaurantOwnerBannerRes = ({restaurantImg}) => {
  return (
    <>
     <div className="w-full rounded-lg overflow-hidden m-auto mt-5">
                  <img 
                  src={restaurantImg} 
                  alt="restaurant image banner" 
                  className="w-full rounded-xl h-96 object-cover overflow-hidden"
                  />
            </div>
    </>
  )
}

export default RestaurantOwnerBannerRes;