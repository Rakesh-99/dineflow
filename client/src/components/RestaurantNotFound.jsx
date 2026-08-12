

const RestaurantNotFound = () => {


  return (
    <div className="mt-20 flex flex-col items-center justify-center  px-6 text-center">
      <div className="text-7xl mb-6">🍔</div>

      <h1 className="text-3xl font-bold">We're not there yet!</h1>
      <p className="mt-2 text-gray-500 max-w-sm">
        Sorry, our services are currently unavailable at this location. We
        hope to serve you in the future.
      </p>

      <button className="mt-6 px-6 py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition">
        Try another address
      </button>
    </div>
  )
}

export default RestaurantNotFound