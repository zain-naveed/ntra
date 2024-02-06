import {
  IonButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { menuController } from "@ionic/core";
import headerStyle from "./header.module.css";
import { isPlatform } from "@ionic/react";
import { getData } from "../../../shared/util/appStorage";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetGuest } from "../../../shared/redux/reducer/guest";
export default function Header() {
  const history = useHistory();
  const { Guest, LoginUser } = useSelector((state) => (state as any).root);
  console.log("login user", LoginUser);
  const dispatch = useDispatch();
  const openMenu = async () => {
    await menuController.open();
  };
  let style = {
    position: "absoloute",
    top: "20%",
  };
  const navigate = () => {
    let pin = "";
    getData("user", (res) => {
      if (res) {
        pin = res.user.encodedpin;
        console.log("user", res.user);
        console.log(res);
        history.push(`/member/${pin}`);
      }
    });
    getData("register", (res) => {
      if (res && res.encodedpin) {
        console.log("called");
        pin = res.encodedpin;
        history.push(`/member/${pin}`);
        console.log(res);
      }
    });
  };
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <div className={headerStyle.header}>
            <div className={headerStyle.header_width}>
              <IonButtons slot="start" style={{ paddingTop: "3px" }}>
                <IonButton onClick={openMenu}>
                  <img src="/assets/icon/Menu.png" />
                </IonButton>
              </IonButtons>
            </div>
            {Guest == "Guest" ? (
              <IonButton
                size={"small"}
                onClick={() => {
                  dispatch(resetGuest());
                  history.push("/login");
                }}
                color={"danger"}
                fill="outline"
              >
                Login
              </IonButton>
            ) : !LoginUser ? (
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
            ) : Object.keys(LoginUser).length ? (
              <div
                className={`${headerStyle.header_width} ${headerStyle.center}`}
              >
                <img src="/assets/icon/Component_1.png" onClick={navigate} />
              </div>
            ) : (
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
    </>
  );
}
