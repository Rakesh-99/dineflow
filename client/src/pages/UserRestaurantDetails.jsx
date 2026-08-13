import { useParams } from "react-router"

const UserRestaurantDetails = () => {
    const {restaurantName, restaurantId} = useParams() ; 
    console.log(restaurantId, restaurantName);
    
    return (
        <>
            <div className="">
                <h1>Restaurnt Details of user </h1>
            </div>
        </>
    )
}

export default UserRestaurantDetails