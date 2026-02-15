import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function PublicRoute({children}) {
    const {isAuthenticated} = useAuth();
/* me fijo si esta logueado para redirigirlo al perfil */
    if (isAuthenticated) {
        return <Navigate to="/profile"/>
    }
/* sino, le pido que se loguee */
    return children;
}