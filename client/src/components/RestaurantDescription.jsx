import { useSelector } from "react-redux";


const RestaurantDescription = ({description, shopName, status}) => { 

    const {theme} = useSelector(state => state.themeSlice)
    return (
        <>
            <div className="mt-5">
                <div className="flex items-center gap-5">
                {/* restaurant name :  */}
                <h2 className="text-3xl font-medium">{shopName}</h2>

                {/* status :  */}
                <span>
                    {status === true 
                    ? 
                    <span className={`text-xs text-green-500 border  rounded-xl px-3  font-semibold  border-green-500 ${theme === 'dark' ? 'bg-green-950' : 'bg-green-50'}`}>Active</span>
                    : 
                    <span className={`text-xs text-red-500 border-2 bg-red-950 rounded-xl px-3  font-semibold  border-red-500 ${theme === 'dark' ? 'bg-red-950' : 'bg-red-50'}`}>Inactive</span>
                    }
                </span>
                </div>
           
                {/* description  */}
                <p className={`max-w-2xl mt-2 text-sm leading-6  text-start text-gray-400`}>{description}</p>
            </div>
        </>
    )
}; 


export default RestaurantDescription; 