import RestaurantListings from "./RestaurantListings";



const UserRestaurant = () => {

    return (
        <>
            <div className="mt-14">
                <h1 className="text-base md:mx-2 mx-5 md:text-2xl font-bold">Restaurants in your City </h1>

                <RestaurantListings />
            </div>
        </>
    )
};


export default UserRestaurant;