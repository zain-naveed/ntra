import { EndPoint } from '../util/endpoint';
const PageCalender = (callback:(arg:any)=>any)=>{
    fetch(EndPoint.Calender,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const PageEvent = (callback:(arg:any)=>any)=>{
    fetch(EndPoint.EventOne,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const SingleEventService = (callback:(arg:any)=>any,id:any)=>{
    fetch(EndPoint.Event + id,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const Page708 = (callback:(arg:any)=>any)=>{
    fetch(EndPoint.Page708,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const NewsPost = (callback:(arg:any)=>any)=>{
    fetch(EndPoint.Post,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const LeaderList = (callback:(arg:any)=>any)=>{
    fetch(EndPoint.Leader,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const AllLeader = (callback:(arg:any)=>any,pagination:any)=>{
    fetch(`${EndPoint.AllLeaders + pagination }`,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const NHCPage = (callback:(arg:any)=>any)=>{
    fetch(EndPoint.NHC,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
const PageDetailService = (callback:(arg:any)=>any,id:string)=>{
    fetch(EndPoint.PostDetail + id,{
        method:"GET",
        headers:{
            // 'Content-Type': 'application/json'

        }
    })
    .then(res=> res.json())
    .then(res=> callback(res) )
    .catch(e=>console.log(e))
}
export {
    PageCalender,
    Page708,
    NewsPost,
    LeaderList,
    NHCPage,
    PageDetailService,
    PageEvent,
    AllLeader,
    SingleEventService
}