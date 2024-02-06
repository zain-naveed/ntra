import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
  IonPage,
  IonButtons,
  IonButton,
  isPlatform,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router";
import Tabs from "./tabs/tabs";
import { menuController } from "@ionic/core";
import sidebarStyle from "./sidebar.module.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../shared/redux/reducer/loginSlice";
import { resetRegister } from "../../shared/redux/reducer/registerSlice";
import { resetGuest } from "../../shared/redux/reducer/guest";
import { platform } from "os";

function Sidebar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { Guest, LoginUser } = useSelector((state) => (state as any).root);
  const openMenu = async () => {
    console.log("should toggle");
    await menuController.close();
  };
  function DefaultBrowser() {
    window.open("https://staging-ntra.kinsta.cloud/nhc/nhc-mentoring-program/");
  }
  function AboutNhc() {
    window.open("https://staging-ntra.kinsta.cloud/nhc/about-the-nhc/");
  }
  console.log("Login User", LoginUser);
  return (
    <>
      <IonMenu
        className="menu_main"
        side="start"
        menuId="first"
        contentId="menuContent"
      >
        <IonContent>
          <div className={sidebarStyle.background_one}>
            {isPlatform("ios") ? (
              <img
                src="/assets/icon/sidebar.png"
                style={{ width: "80px", marginLeft: "22px", marginTop: "21px" }}
              />
            ) : (
              <img src="/assets/NHC-Tour-4C-2.svg" />
            )}

            <div className={sidebarStyle.left_Content}>
              <div>
                {Guest == "Guest" ? (
                  <Link
                    className={sidebarStyle.hyper_link}
                    to="/join"
                    onClick={() => {
                      dispatch(resetGuest());
                      history.push("/join");
                    }}
                  >
                    JOIN NOW
                    {/* <button style={{background:"none"}} className={sidebarStyle.hyper_link}  ></button> */}
                  </Link>
                ) : !LoginUser ? (
                  <Link
                    className={sidebarStyle.hyper_link}
                    to="/join"
                    onClick={() => {
                      history.push("/join");
                      dispatch(resetGuest());
                    }}
                  >
                    JOIN NOW
                    {/* <button style={{background:"none"}} className={sidebarStyle.hyper_link}  ></button> */}
                  </Link>
                ) : Object.keys(LoginUser).length ? (
                  <Link
                    className={sidebarStyle.hyper_link}
                    to="/login"
                    onClick={() => {
                      history.push("/login");
                      localStorage.removeItem("user");
                      localStorage.removeItem("register");
                      dispatch(resetUser());
                      dispatch(resetRegister());
                    }}
                  >
                    Logout
                    {/* <button style={{background:"none"}} className={sidebarStyle.hyper_link}  ></button> */}
                  </Link>
                ) : (
                  <Link
                    className={sidebarStyle.hyper_link}
                    to="/join"
                    onClick={() => {
                      history.push("/join");
                      dispatch(resetGuest());
                    }}
                  >
                    JOIN NOW
                    {/* <button style={{background:"none"}} className={sidebarStyle.hyper_link}  ></button> */}
                  </Link>
                )}

                <Link
                  className={sidebarStyle.hyper_link}
                  to="#"
                  onClick={AboutNhc}
                >
                  ABOUT NHC
                </Link>
                <Link
                  className={sidebarStyle.hyper_link}
                  to="#"
                  onClick={DefaultBrowser}
                >
                  MENTORING PROGRAM
                </Link>
              </div>
            </div>
          </div>
          <div className={sidebarStyle.background_two}>
            <img
              src="/assets/icon/Close.png"
              style={{
                position: "absolute",
                left: "0",
                right: "0",
                margin: "auto",
                paddingTop: "11px",
              }}
              onClick={openMenu}
            />
          </div>
        </IonContent>
      </IonMenu>

      <IonPage id="menuContent">
        <Tabs />
      </IonPage>
    </>
  );
}

export default Sidebar;
