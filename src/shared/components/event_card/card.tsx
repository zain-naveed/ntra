import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonSlide, IonSlides,IonContent } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import { PageCalender } from '../../service/pages'
import CardLoader from './cardLoader';
import CardStyle from './card.module.css';
import moment from 'moment';
import {useHistory} from 'react-router-dom'
const  slideOptsOne = {
  slidesPerView: 2,
  breakpoints: {
    '@0.75': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '@1.00': {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    '@1.50': {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  }
}
function Card() {
  const history = useHistory();
  const [page708,setPage708] = useState({})
useEffect(()=>{
  PageCalender((res:any)=>{
      setPage708(res)
  })
},[])
   return (
        <div style={{marginTop:"0px",background:"rgb(228, 228, 228)"}}>

    <IonSlides options={slideOptsOne} key={Object.keys( page708).length > 0 ? Object.keys((page708 as any).content_json).map(slide => slide).join('_'):1}   >
    {
        Object.keys( page708).length > 0  ?  Object.keys((page708 as any).content_json).map((data,inx)=>{
              return  (page708 as any).content_json[data].map((res:any,subinx:any)=>{
                return <IonSlide key={subinx}  > <IonCard className={CardStyle.CardStyle} onClick={()=>{history.push(`/event-detail/${res.ID}`)}} >  <IonCardHeader>
                <IonCardTitle> 
                  <div className={CardStyle.card_title} style={{backgroundImage:`url(${res.data?.featured_image?.full})`}}></div>
                  </IonCardTitle>
               
              </IonCardHeader>
    
              <IonCardContent className={CardStyle.CardStyle} >
                <h1 className={CardStyle.heading} dangerouslySetInnerHTML={{
              __html: res?.data?.title
            }}></h1>
                <div>
                  {
                   res?.data?.labels && Object.keys(res?.data?.labels).length > 0 ? Object.keys(res?.data?.labels).map((label,lnx)=>{
                      return <span key={lnx}> <div className={CardStyle.status_Online} style={{backgroundColor:`${res?.data?.labels[label].color}`}}></div> {res?.data?.labels[label].name}</span> 
                    }):<span > <div className={CardStyle.status_Online} style={{backgroundColor:`#8e8787`}}></div> None</span> 
                   
                  }
                  <div>
                   
                    {/* <label className={CardStyle.label}>Spot Awarded:</label> */}
                    <div>
                     { res.data?.meta?.seats_awarded ? <p className={CardStyle.para}>{res.data?.meta?.seats_awarded}</p>:<span className={CardStyle.para}>No Seats Granted</span>}
                     </div>
                     <label className={CardStyle.para}>
                     {
 moment(res.data?.meta?.mec_end_date).format('Do MMMM YYYY') 
                       
                     }
                     </label>
                     </div>
                </div>
             
          </IonCardContent>
            </IonCard>
        
            </IonSlide>
              })  
               
             
            })
            :
          
            <CardLoader />
            
        }
         </IonSlides>     
    
        </div>
    );
}

export default Card;