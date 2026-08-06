  import { lazy, Suspense } from "react";
  import { createBrowserRouter, RouterProvider } from "react-router";
  import Layout from "./Layouts/Layout";
  import useGetCurrentUser from "./hooks/useGetCurrentUser";
  import useGetCurrentLocation from "./hooks/useGetCurrentLocation";
  import ProtectedRoutes from "./routes/ProtectedRoutes";
  import RestaurantOwnerRoutes from "./routes/RestaurantOwnerRoutes";
import useGetFoodCategory from "./hooks/useGetFoodAndCategory";

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
            index : true,
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
              <Suspense fallback={<>Loading ..</> }>
                <RestaurantOwnerRoutes>
                  <RestaurantMenu/>
                </RestaurantOwnerRoutes>
              </Suspense>
            )
          },
          {
            path : "settings", 
            element : (
              <Suspense fallback={<>Loading ..</>  }>
              <RestaurantOwnerRoutes>
                <Settings/>
              </RestaurantOwnerRoutes>
              </Suspense>
          
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
                <Suspense fallback={<>Loading ..</>  }>
                  <RestaurantOwnerRoutes>
                    <CustomerListings/>
                  </RestaurantOwnerRoutes>
                </Suspense>
              )
          },
          {
            path : "customer-order",
            element : (
              <Suspense fallback ={<>Loading ..</> } >
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

  const App = () => {
    // custom hooks :
    useGetCurrentUser();
    useGetCurrentLocation();
    useGetFoodCategory(); 

    return (
      <>
        <RouterProvider router={routers} />
      </>
    );
  };

  export default App;
