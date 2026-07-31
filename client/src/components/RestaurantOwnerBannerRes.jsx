

const RestaurantOwnerBannerRes = ({restaurantImg}) => {
  return (
    <>
     <div className="w-full m-auto mt-5">
                  <img 
                  src={restaurantImg} 
                  alt="restaurant image banner" 
                  className="w-full h-72 rounded-xl object-cover"
                  />
            </div>
    </>
  )
}

export default RestaurantOwnerBannerRes;