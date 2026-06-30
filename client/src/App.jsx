import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layouts/Layout";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetCurrentLocation from "./hooks/useGetCurrentLocation";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import useGetShopsOfCurrentOwner from "./hooks/useGetShopsOfCurrentOwner";
import RestaurantOwnerRoutes from "./routes/RestaurantOwnerRoutes";
// import { useSelector } from "react-redux";

// lazy loading and code splitting :
const Account = lazy(() => import("./pages/auth/Account"));
const GuestRoutes = lazy(() => import("./routes/GuestRoutes"));
const Home = lazy (()=> import("@/pages/Home")); 

// Restaurant owner routes : 
const RestaurantMenu = lazy(()=> import("@/pages/RestaurantMenu"));
const Settings = lazy(()=> import("@/pages/Settings")); 
const CustomerOrders = lazy(()=> import("@/pages/CustomerOrders")); 
const Dashboard = lazy(()=> import("@/components/Dashboard"));
const OwnerRestaurant = lazy(()=> import("@/pages/OwnerRestaurant")); 
const CustomerOrder = lazy(()=> import("@/pages/CustomerOrder")); 
const CustomerListings = lazy(()=> import("@/pages/CustomerLIstings")); 
const OwnerRestaurantDetails = lazy(()=> import("@/pages/OwnerRestaurantDetails")); 


const App = () => {


  // some custom hooks :
  useGetCurrentUser();
  useGetCurrentLocation();
  useGetShopsOfCurrentOwner();

  
  const routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<>Loading..</>}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path : "/",
          element : ( 
            <Suspense fallback={<>Loading ..</>}>
              <ProtectedRoutes>
                <Home/>
              </ProtectedRoutes>
            </Suspense>
          )
        }, 
        {
          path : "dashboard", 
          element : (
            <Suspense fallback={<>Loading ..</>}>
            <RestaurantOwnerRoutes>
              <Dashboard/>
            </RestaurantOwnerRoutes>
            </Suspense>
          )
        }, 
        {
          path : 'restaurants', 
          element : (
            <Suspense fallback={<>Loading ..</>}>
             <RestaurantOwnerRoutes>
                  <OwnerRestaurant/>
             </RestaurantOwnerRoutes>
            </Suspense>
          )
        },
        {
          path : `restaurantinfo/:restaurantname/:id`,
          element : ( 
            <Suspense fallback={<>Loading ..</>}>
              <RestaurantOwnerRoutes>
                <OwnerRestaurantDetails/>
              </RestaurantOwnerRoutes>
            </Suspense>
          )
        }, 
        {
          path : 'restaurant-menu',
          element : ( 
            <Suspense>
              <RestaurantOwnerRoutes>
                <RestaurantMenu/>
              </RestaurantOwnerRoutes>
            </Suspense>
          )
        },
        {
          path : "settings", 
          element : (
            <RestaurantOwnerRoutes>
              <Settings/>
            </RestaurantOwnerRoutes>
          )
        }, 
        {
          path : "customer-orders", 
          element : (
            <Suspense fallback={<>Loading ..</>}>
            <RestaurantOwnerRoutes>
              <CustomerOrders/>
            </RestaurantOwnerRoutes>
            </Suspense>
          )
        }, 
        {
            path : "customers",
            element : (
              <Suspense>
                <RestaurantOwnerRoutes>
                  <CustomerListings/>
                </RestaurantOwnerRoutes>
              </Suspense>
            )
        },
        {
          path : "restaurant-menu", 
          element : ( 
            <Suspense fallback={<>Loading ..</>}>
              <RestaurantOwnerRoutes>
                <RestaurantMenu/>
              </RestaurantOwnerRoutes>
            </Suspense>
          )
        },
        {
          path : "customer-order",
          element : (
            <Suspense>
              <RestaurantOwnerRoutes>
                <CustomerOrder/>
              </RestaurantOwnerRoutes>
            </Suspense>
          )
        },
        {
          path: "account",
          element: (
            <Suspense fallback={<>Loading..</>}>
              <GuestRoutes>
                <Account />
              </GuestRoutes>
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
};

export default App;
