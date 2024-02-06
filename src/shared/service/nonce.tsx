import { EndPoint } from '../util/endpoint';
const NonceService = (callback:(arg:any)=>any)=>{
    
    fetch(`${EndPoint.Nonce}`,{
        method:"GET",
        headers:{
           "accept":"*/*"
        }
        
    })
    .then(res=> res.json())
    .then(res=> {
        if(res && res.data !== null) {
            res['isSuccess'] = true
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
    NonceService
}