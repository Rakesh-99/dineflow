import Dashboard from "@/components/Dashboard";
import { Home } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const { userData } = useSelector((state) => state.currentuserSlice);

  if (!userData) {
    return <Navigate to={`/account`} replace />;
  }

  switch(userData.role) { 
    case 'restaurantOwner' : 
      return <Dashboard/> 
    case 'user' : 
      return <Home/>
    case 'deliveryAgent' : 
      return <Dashboard/> 
  } 

  return children;
};

export default ProtectedRoutes;
