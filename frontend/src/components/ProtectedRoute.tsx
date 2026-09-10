import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const explorerName = localStorage.getItem("explorerName");
  if (!explorerName) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
