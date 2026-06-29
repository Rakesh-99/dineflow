import { useSelector } from "react-redux";
import { GrRestaurant } from "react-icons/gr";
import { IoIosArrowDropright } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";




const RestaurantListings = () => {

      const {restaurants} = useSelector(state => state.currentOwnerRestaurants); 
        const {theme} = useSelector(state=> state.themeSlice); 
        
  return (
    <>
    {
        restaurants ? 
        <div className='grid grid-cols-2 gap-5'>
        {
        restaurants.map((restaurant, idx)=> (
        
        <div 
        key={idx}
        className={`max-w-5xl flex shadow-xs justify-between border rounded-md  m-auto ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>

        <div className="flex gap-10">
        {/* image container :  */}
        <div className="w-80 h-48 rounded-md overflow-hidden ">
            <img src={restaurant?.image} alt="" />
        </div>

        {/* restaurant glance data :  */}
        <div className={`flex  flex-col justify-center gap-y-5`}>
            {/* restaurant icon and title :  */}
            <div className="flex gap-4 items-center">
                <div className={`border rounded-full py-2 px-2 ${theme === 'light' ? 'bg-orange-50 border-orange-100' : 'bg-orange-500 border-orange-700'}`}>
                    <GrRestaurant className={`${theme === 'light' ? 'text-orange-500' : 'text-orange-200'}`}/>
                </div>
            <h2 className='font-semibold'>{restaurant?.shopName}</h2>
            </div>

            <div className={`grid grid-cols-2 text-[10px] gap-x-7 gap-y-4 ${theme === 'light' ? 'text-gray-500' : 'text-zinc-400'}`}>

                <ul className='flex items-center gap-1  border-r'>
                    <CiLocationOn size={17}/>
                    <span>{restaurant?.address}</span>
                </ul>

                <ul className='flex items-center gap-1 '>
                    <PiBuildingApartment/>
                    <span>{restaurant?.city}</span>
                </ul>
                <ul className='flex items-center gap-1  border-r'>
                    <FiUser/>
                    <span className='mr-2'>Owner : {restaurant.owner.fullname}</span>
                </ul>

                <ul className='flex items-center gap-1 '>
                    <MdOutlinePhoneInTalk/>
                    <span>{restaurant?.owner.contact}</span>
                </ul>
                <ul className='flex items-center gap-1  border-r'>
                    <SlCalender/>
                    <span>Created : {new Date(restaurant.createdAt).toLocaleDateString()}</span>
                </ul>
                <ul className='flex items-center gap-1 '>
                    <SlCalender/>
                    <span>Updated : {new Date(restaurant.updatedAt).toLocaleDateString()}</span>
                </ul>
            </div>
        </div>
        </div>
        {/* div for arrow btn :  */}
        <div className="flex items-center mr-10">
            <IoIosArrowDropright size={25} color='orange'/>
        </div>
        </div>
            ))
        }
        </div>
        : 
        <>Loading ..</>
    }
    </>
  )
}

export default RestaurantListings