import { EndPoint } from '../util/endpoint';
import {storeData } from '../util/appStorage'
import {store} from '../redux/store';
import {setUser} from '../redux/reducer/loginSlice'
const RegisterService = (callback:(arg:any)=>any,res:string)=>{
    
    fetch(`${EndPoint.Register}${res !== "" ? res:""}`,{
        method:"POST",
        headers:{
           "accept":"*/*"
        }
        
    })
    .then(res=> res.json())
    .then(res=> {
        if(res && res.status !== "error") {
            res['isSuccess'] = true
            storeData("register",res)
            store.dispatch(setUser(res))
            callback(res)
        }else{
            res['isSuccess'] = false
            callback(res)
        }
    }
         )
    .catch(e=>console.log(e))
}
export {
    RegisterService
}