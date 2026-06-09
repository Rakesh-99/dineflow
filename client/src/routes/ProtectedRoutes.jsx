import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const { userData } = useSelector((state) => state.currentuserSlice);

  if (!userData) {
    return <Navigate to={`/account`} replace />;
  }

  return children;
};

export default ProtectedRoutes;
