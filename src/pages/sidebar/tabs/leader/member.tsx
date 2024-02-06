import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  IonBackButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonPage,
  IonLoading,
  IonButton,
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import { getData } from "../../../../shared/util/appStorage";
import headerStyle from "../header.module.css";
import { isPlatform } from "@ionic/react";
import { menuController } from "@ionic/core";
import { useSelector, useDispatch } from "react-redux";
import { resetGuest } from "../../../../shared/redux/reducer/guest";
import "./member.css";
function Member() {
  const location = useLocation();
  const userState = location.state;
  const params = useParams();
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(true);
  const [userPin, setUserPin] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const { Guest } = useSelector((state) => (state as any).root);
  const dispatch = useDispatch();
  console.log(params);
  console.log(location.state);
  useEffect(() => {
    navigate();
  }, []);
  const elem = window.document.getElementsByClassName("fusion-header");
  console.log("element", elem);
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
    getData("register", (res) => {
      if (res && res.encodedpin) {
        console.log("called");
        pin = res.encodedpin;
        setUserPin(pin);
        setUserId(res.user_id);
        console.log(res);
      }
    });
  };
  const openMenu = async () => {
    await menuController.open();
  };

  return (
    <div>
      <IonPage>
        {/* <Header /> */}

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
                {(params as any).id === userPin ? (
                  <IonButtons slot="end" className="edit-button">
                    <img
                      src="./assets/icon/edit.png"
                      onClick={() => {
                        history.push(`/member/update/${userId}`);
                      }}
                    />
                  </IonButtons>
                ) : Guest == "Guest" ? (
                  <IonButton
                    size={"small"}
                    onClick={() => {
                      dispatch(resetGuest());
                      history.push("/login");
                    }}
                    color={"danger"}
                    // fill={"clear"}
                    fill="outline"
                  >
                    Login
                  </IonButton>
                ) : (
                  ""
                )}
              </div>
            </IonToolbar>
            <img
              className={`${
                isPlatform("android") ? headerStyle.logo_full : headerStyle.ios
              }`}
              src="/assets/icon/NHC_Tour_logo.svg"
            />
          </IonHeader>
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
          {!showLoading &&
            (user as any)?.member_status &&
            (user as any)?.encodedpin == (params as any)?.id && (
              <>
                <div className="status">
                  <label className="lable">TOURNAMENT ID:</label>
                  <label className="lable">
                    {(user as any)?.tournament_id}
                  </label>
                </div>
                <div className="status">
                  <label className="lable">MEMBERSHIP STATUS:</label>
                  <label className="lable">
                    {(user as any)?.member_status}
                  </label>
                </div>
                {console.log((user as any)?.member_status)}
                {(user as any)?.member_status == "Expired" && (
                  <div style={{ textAlign: "center", marginTop: "5px" }}>
                    <IonButton
                      color="danger"
                      onClick={() => history.push("/payment")}
                    >
                      Renew
                    </IonButton>
                  </div>
                )}
              </>
            )}

          <iframe
            id="myframe1"
            onLoad={() => {
              setShowLoading(false);
            }}
            src={`https://staging-ntra.kinsta.cloud/ntra-member-profile/?ntraid=${
              (params as any).id
            }&noheader=yes`}
            style={{
              height: "75vh",

              width: "100vw",
              border: "none",
            }}
          ></iframe>
        </IonContent>
      </IonPage>
    </div>
  );
}

export default Member;
