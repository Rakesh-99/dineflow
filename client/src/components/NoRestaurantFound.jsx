import React from 'react'

const NoRestaurantFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 py-20">
      <div className="font-sans w-full max-w-md flex flex-col items-center text-center">

        {/* Eyebrow */}
        <span className="text-xs font-bold tracking-[0.2em] text-customOrange uppercase mb-6">
          Search results
        </span>

      
        <div className="relative w-40 h-40 mb-10 flex items-center justify-center">

          <div className="absolute inset-0 rounded-full bg-customOrange/10" />
    
          <svg className="absolute inset-0" width="160" height="160" viewBox="0 0 160 160" fill="none">
            <circle cx="80" cy="80" r="70" stroke="#FFD5B0" strokeWidth="1.5" strokeDasharray="4 7" />
            <circle cx="80" cy="80" r="54" stroke="#FFD5B0" strokeWidth="1.5" strokeDasharray="4 7" />
          </svg>
          {/* pin */}
          <svg width="72" height="88" viewBox="0 0 72 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
            <path
              d="M36 2C17.2 2 2 17.2 2 36c0 24.5 30 46 32.4 47.6a2.9 2.9 0 0 0 3.2 0C40 82 70 60.5 70 36 70 17.2 54.8 2 36 2Z"
              fill="var(--customOrange)"
            />
            <circle cx="36" cy="35" r="20" fill="white" />

            <path d="M27 25v9M30 25v9M33 25v9M30 34v14" stroke="var(--customOrange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            <path d="M45 25c0 5-3.5 7-3.5 11v12" stroke="var(--customOrange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        
          <div className="absolute top-1 right-0 w-8 h-8 rounded-full border-2 border-customOrange flex items-center justify-center shadow-sm">
            <span className="block w-3.5 h-0.5 bg-customOrange rotate-45 rounded-full" />
          </div>
        </div>

        <h2 className="text-3xl md:text-[2.15rem] font-bold tracking-tight leading-tight">
          No restaurants found
        </h2>

    
      </div>
    </div>
  )
}

export default NoRestaurantFound