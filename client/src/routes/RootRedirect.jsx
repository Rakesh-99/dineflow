import { useSelector } from "react-redux";
import Home from "../pages/Home";
import { Navigate } from "react-router";
import Dashboard from "../components/Dashboard";

const RootRedirect = () => {
  const { userData } = useSelector((state) => state.currentuserSlice);

  if (!userData) {
    return <Navigate to={`/account`} replace />;
  }

  switch (userData.role) {
    case "restaurantOwner":
      return <Dashboard />;
    case "deliveryAgent":
      return <Dashboard />;
    default:
      return <Home />;
  }
};

export default RootRedirect;
