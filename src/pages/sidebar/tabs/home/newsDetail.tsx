import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom'
import Header from '../header';
import "./ripple.css"
import { IonButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar,IonContent, IonBackButton } from '@ionic/react';
import { PageDetailService } from '../../../../shared/service/pages'
function NewsDetail() {
    const [Singlenews,setNewsDetail] = useState({})
    const params = useParams();
    const newsDetail = ()=>{
        if(Object.keys(params).length > 0){
            PageDetailService((res)=>{
             setNewsDetail(res.post) 
            },`?id=${(params as any).id}`)
        }
    }
    useEffect(()=>{
newsDetail()
    },[params])
    useEffect(()=>{
        var all = window.document.getElementsByTagName("a")
     
        Array.from(all).forEach(function(element,inx) {
        (element as any).href = 'javascript:void(0)';
        // (element as any).style.textDecoration = "none";
        // (element as any).style.color = "black"
        });
    })
    console.log(Singlenews)
    return (
        <IonPage>
     
        <IonContent>
        <div className="header_image" style={{backgroundImage:`url(${(Singlenews as any)?.thumbnail_images?.full?.url})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"}} >
        <IonButtons slot="start" style={{paddingTop: "var(--ion-safe-area-top)"}}>
          <IonBackButton defaultHref="home"  />
        </IonButtons>
      </div>
      <h1 style={{padding:"0 30px",fontWeight:"bolder"}}>{(Singlenews as any)?.title}</h1>
        <div style={{padding:"0 30px"}}  dangerouslySetInnerHTML={{__html:(Singlenews as any)?.content}} ></div>
      
      </IonContent>
    </IonPage>
    );
}

export default NewsDetail;