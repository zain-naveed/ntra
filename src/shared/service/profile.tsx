import { EndPoint } from '../util/endpoint';
const ProfileDetailService = (callback:(arg:any)=>any,query:string)=>{
    fetch(EndPoint.profile_Detail + query,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const UpdateProfileService = (callback:(arg:any)=>any,query:string)=>{
    fetch(EndPoint.update_Profile + query,{
        method:"POST",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const ResetPasswordService = (callback:(arg:any)=>any,query:string)=>{
    fetch(EndPoint.resetPassword + query,{
        method:"POST",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
export {
    
    ProfileDetailService,
    UpdateProfileService,
    ResetPasswordService
}