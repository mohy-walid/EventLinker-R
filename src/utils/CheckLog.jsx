import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function CheckLogin(){
    const [isLogged , setIsLogged] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const logCheck = ()=> {
            const token = localStorage.getItem('token');
            if (!token){
                setIsLogged(false);
                navigate('/');
            }
            else{
                setIsLogged(true);
            }
        };
    logCheck()
    },[navigate])
return isLogged
}
export default CheckLogin