import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";
import { ReactNode } from 'react'

interface ChildrenType {
    children: ReactNode
}

export const PublicRoute = ({ children} : ChildrenType) => {
    const { token } = useAuth();
//   console.log("token: " + token);
    if (token === "") {
      return children
    } else {
      return <Navigate to="/home" />
    }
  }
