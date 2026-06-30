import { useParams } from "react-router"


const OwnerRestaurantDetails = () => {


  const {restaurantname, id} = useParams() ; 
  console.log( restaurantname, id);
  

  return (
    <> 
   <div className="">
        <h1>Owner Restaurant Details Page</h1>        
    </div> 
    </>
  )
}

export default OwnerRestaurantDetails