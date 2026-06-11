import { Navigate,Outlet } from "react-router-dom";

const IsAuthenticated = ()=> !!localStorage.getItem('access_token');

export const PrivateRoutes = ({redirect="/login"})=>{
   return IsAuthenticated ? <Outlet /> : <Navigate to={redirect} replace/>

}