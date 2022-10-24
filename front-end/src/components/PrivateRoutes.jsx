import { Navigate, useNavigate } from "react-router-dom";





export const PrivateRoutes=({children})=>{
    const navigate=useNavigate();
    let auth=false;
    if(auth==false){
       return <Navigate to={'/log'} />
    }
    else{
        return( children)
    }
}