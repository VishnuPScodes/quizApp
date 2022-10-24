import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";




export const PrivateRoutes=({children})=>{
     //using useSelector hook to get the data stored inside the redux
    const auth=useSelector((state)=>state.auth);
  
    
    if(auth==false){
       return <Navigate to={'/log'} />
    }
    else{
        return( children)
    }
}