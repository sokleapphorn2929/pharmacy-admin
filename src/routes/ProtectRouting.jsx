import { Navigate } from "react-router-dom";

export default function ProtectRouting({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}