import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSlide } from '@ionic/react';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function CardLoader() {
    return (
        <>
                  <IonSlide>
              <IonCard  style={{margin:"8px 2px",height:"171px"}} >  <IonCardHeader>
                
                    <IonCardTitle>
                      <Skeleton circle={true} height={50} width={50} /></IonCardTitle>
                  </IonCardHeader>
        
                  <IonCardContent>
                  {/* Keep close to Nature's heart... and break clear away, once in awhile,
                  */}
             
                  <SkeletonTheme  color="#f5f5f5" highlightColor="#efe9e9">
  <p style={{width:"150px"}}>
    <Skeleton count={3} />
  </p>
</SkeletonTheme>
                 
              </IonCardContent>
                </IonCard>
                
            
</IonSlide>
<IonSlide>
              <IonCard  style={{margin:"8px 2px",height:"171px"}} >  <IonCardHeader>
                
                    <IonCardTitle>
                      <Skeleton circle={true} height={50} width={50} /></IonCardTitle>
                  </IonCardHeader>
        
                  <IonCardContent>
                  
             
                  <SkeletonTheme  color="#f5f5f5" highlightColor="#efe9e9">
  <p style={{width:"150px"}}>
    <Skeleton count={3} />
  </p>
</SkeletonTheme>
                 
              </IonCardContent>
                </IonCard>
                
            
</IonSlide>
      
        </>
    );
}

export default CardLoader;