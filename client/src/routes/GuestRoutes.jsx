import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const GuestRoutes = ({ children }) => {
  const { userData } = useSelector((state) => state.currentuserSlice);

  if (!userData) {
    return children;
  }

  return <Navigate to={`/overview`} replace />;
};

export default GuestRoutes;
