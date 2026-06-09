import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layouts/Layout";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetCurrentLocation from "./hooks/useGetCurrentLocation";
import ProtectedRoutes from "./routes/ProtectedRoutes";

// lazy loading and code splitting :
const Account = lazy(() => import("./pages/auth/Account"));
const GuestRoutes = lazy(() => import("./routes/GuestRoutes"));
const RootRedirect = lazy(() => import("./routes/RootRedirect"));

const App = () => {
  // some custom hooks :
  useGetCurrentUser();
  useGetCurrentLocation();

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
          path: "/",
          element: (
            <Suspense fallback={<>Loading..</>}>
              <ProtectedRoutes>
                <RootRedirect />
              </ProtectedRoutes>
            </Suspense>
          ),
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
