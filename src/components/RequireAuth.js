import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const RequireAuth=({children})=>{
    debugger;
    const user = localStorage.getItem('userName');    

    if(!user){
        return <Navigate to={"/"}></Navigate> 
    }
    return children
    //const snackbarOpen = useSelector(state => state.snackbar.snackbarOpen);
}