import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const { userData } = useSelector(
    (state) => state.currentuserSlice
  );

  if (!userData) {
    return <Navigate to="/account" replace />;
  }

  if(userData.role !== "user") { 
    return <Navigate to={'/dashboard'} replace />
  }

  return children;
};

export default ProtectedRoutes;