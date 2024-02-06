import { IonContent, IonPage, IonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../header";
import { NHCPage } from "../../../../shared/service/pages";
function NHC() {
  const [nhcPage, setNhc] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    NHCPage((res: any) => {
      setShowLoading(false);
      setNhc(res);
    });
  }, []);
  return (
    <>
      <IonPage>
        <Header />
        {/* <IonContent> */}
        <div>
          {showLoading && (
            <IonLoading
              cssClass="my-custom-class"
              spinner="lines"
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={"Please wait..."}
              duration={5000}
            />
          )}

          <iframe
            id="myframe1"
            onLoad={() => {
              setShowLoading(false);
            }}
            src={`https://staging-ntra.kinsta.cloud/nhc-app-tab/`}
            style={{
              height: "83vh",
              width: "100vw",
              border: "none",
              paddingTop: "10px",
            }}
          ></iframe>
          {/* <div dangerouslySetInnerHTML={{__html:(nhcPage as any)?.content?.rendered}} ></div> */}
        </div>
        {/* </IonContent> */}
      </IonPage>
    </>
  );
}

export default NHC;
