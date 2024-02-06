import {
  IonButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
} from "@ionic/react";

import React from "react";
import Header from "../header";
import Card from "../../../../shared/components/event_card/card";
import Leader from "./leaders";
import News from "./news";
function Home() {
  return (
    <>
      <IonPage>
        <Header />
        <IonContent>
          <div>
            <Card />
            <Leader />
            <News />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Home;
