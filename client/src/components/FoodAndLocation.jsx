import { MapPin, Search } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const FoodAndLocation = () => {

    const [isShowSearchBar, setIsShowSearchBar] = useState(false);
    const [searchFoodData, setSearchFoodData] = useState('');
    const { theme } = useSelector(state => state.themeSlice);
      const {userAddress, userData } = useSelector(state => state.currentuserSlice); 



    const inputFoodDataHandler = (e) => {
        const { value } = e.target
        setSearchFoodData(value)
    }

    return (
        <>
             
                <div className="mt-20 flex w-full">
                    {
                        userData?.role === 'user' &&

                        <>
                            <div className="flex gap-2 mx-3 lg:mx-0  rounded-xs justify-between w-full ">
                                {/* City location :  */}
                                <div className={`${theme === "dark" ? "border-zinc-700" : "border-zinc-100"} border rounded-md px-2 flex items-center`}>
                                    <MapPin color='#F54927' className='lg:size-7 size-4' />
                                    <input
                                        type="text"
                                        disabled
                                        value={userAddress?.address2}
                                        className=' text-sm p-3 rounded-sm lg:w-90 w-32  '
                                    />
                                </div>

                                {/* Search food and restaurants :  */}
                                <div className={` border p-2 rounded-sm flex relative  items-center ${theme === "dark" ? "border-zinc-700" : "border-zinc-100"}`}>  

                                    <input
                                        type="text"
                                        value={searchFoodData}
                                        onChange={inputFoodDataHandler}
                                        placeholder='Search food, restaurants ..'
                                        className='  text-sm placeholder:text-[10px] lg:placeholder:text-sm outline-none ml-5 py-1 rounded-md  lg:w-90 w-30' />


                                         <Search color='gray' className='lg:size-6 size-4 absolute  md:right-5 lg:cursor-default cursor-pointer' onClick={() => setIsShowSearchBar(!isShowSearchBar)} />
                                </div>
                            </div>
                        </>
                    }


                </div>
        </>
    )
}

export default FoodAndLocation