import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  isPlatform,
  IonButton,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import headerStyle from "../header.module.css";
import { useHistory } from "react-router-dom";
import { getData } from "../../../../shared/util/appStorage";

function Pyament() {
  const history = useHistory();
  const [userPin, setUserPin] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const navigate = () => {
    let pin = "";
    getData("user", (res) => {
      if (res) {
        pin = res.user.encodedpin;
        setUserId(res.user.id);
        setUser(res.user);
        console.log("user", res.user);
        setUserPin(pin);
      }
    });
  };
  useEffect(() => {
    navigate();
  }, []);
  console.log(userId);
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <div className={headerStyle.header}>
              <div className={headerStyle.header_width}>
                <IonButtons slot="start">
                  <IonBackButton defaultHref="home" />
                </IonButtons>
                {/* <IonButtons slot="start">
            <IonButton onClick={openMenu}>
              <img src="/assets/icon/Menu.png" />
            </IonButton>
          </IonButtons> */}
              </div>
              <IonButtons slot="end" className="edit-button">
                <img
                  src="./assets/icon/edit.png"
                  onClick={() => {
                    history.push(`/member/update/${userId}`);
                  }}
                />
              </IonButtons>
            </div>
          </IonToolbar>
          <img
            className={`${
              isPlatform("android") ? headerStyle.logo_full : headerStyle.ios
            }`}
            src="/assets/icon/NHC_Tour_logo.svg"
          />
        </IonHeader>
        <div className="payment-container">
          <h1>CHOOSE YOUR LEVEL</h1>
          <IonButton
            color="light"
            className="payment"
            onClick={() =>
              window.open(
                `https://staging-ntra.kinsta.cloud/nhc-app-member-renewal/?memlev=hzqFdQutzfcM9A79&user_id=${userId}`
              )
            }
          >
            $50/Yr
          </IonButton>
          <IonButton
            color="light"
            className="payment"
            onClick={() =>
              window.open(
                `https://staging-ntra.kinsta.cloud/nhc-app-member-renewal/?memlev=znEUS7tksFtW7Rh5&user_id=${userId}`
              )
            }
          >
            $75/Yr
          </IonButton>
          <IonButton
            color="light"
            className="payment"
            onClick={() =>
              window.open(
                `https://staging-ntra.kinsta.cloud/nhc-app-member-renewal/?memlev=HpfTTvMmfgzm2F7q&user_id=${userId}`
              )
            }
          >
            $95/Yr
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Pyament;
