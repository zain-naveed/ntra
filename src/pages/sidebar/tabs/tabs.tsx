import React, { useState } from "react";
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
  IonContent,
  IonTab,
} from "@ionic/react";
import {
  calendar,
  personCircle,
  map,
  informationCircle,
  calendarClear,
  calendarClearOutline,
  calendarClearSharp,
  calendarSharp,
  calendarNumberSharp,
  trophyOutline,
  trophy,
  home,
  desktop,
  bandage,
  starHalf,
} from "ionicons/icons";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import Home from "./home/home";
import LeaderBoard from "./leader/leader";
import NHC from "./nhc/nhc";
import Schedule from "./schedule/schedule";
import Member from "./leader/member";
import NewsDetail from "./home/newsDetail";
import EventDetail from "./schedule/eventDetail";
import "./tab.css";
import { useLocation } from "react-router-dom";
const Tabs = () => {
  const location = useLocation();
  const [selectedTab, setSelectTab] = useState(
    location.pathname.replace("/", "")
  );

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/leader" component={LeaderBoard} exact={true} />
          <Route path="/nhc" component={NHC} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/news-detail/:id" component={NewsDetail} />
          <Route path="/member/:id" component={Member} />
          <Route path="/event-detail/:id" component={EventDetail} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href={"/home"}>
            <div onClick={() => setSelectTab("home")}>
              <div>
                {selectedTab == "home" ? (
                  <img src="/assets/icon/Path_Dar.png" />
                ) : (
                  <img src="/assets/icon/Path_102.png" />
                )}
              </div>
              <span
                className={selectedTab == "home" ? "select-color " : "color"}
              >
                Home
              </span>
            </div>
          </IonTabButton>

          <IonTabButton tab="schedule" href={"/schedule"}>
            <div onClick={() => setSelectTab("schedule")}>
              <div>
                {selectedTab == "schedule" ? (
                  <img src="/assets/icon/Calendar_Dark.png" />
                ) : (
                  <img src="/assets/icon/Calendar.png" />
                )}
              </div>

              <span
                className={
                  selectedTab == "schedule" ? "select-color " : "color"
                }
              >
                Schedule
              </span>
            </div>
          </IonTabButton>

          <IonTabButton tab="leader" href={"/leader"}>
            <div onClick={() => setSelectTab("leader")}>
              {selectedTab == "leader" ? (
                <img src="/assets/icon/Trophy_Dark.png" />
              ) : (
                <img src="/assets/icon/Trophy.png" />
              )}

              <div>
                <span
                  className={
                    selectedTab == "leader" ? "select-color " : "color"
                  }
                >
                  LeaderBoard
                </span>
              </div>
            </div>
          </IonTabButton>
          <IonTabButton tab="nhc" href="/nhc">
            <div onClick={() => setSelectTab("nhc")}>
              <div>
                {selectedTab == "nhc" ? (
                  <img src="/assets/icon/NHC-icon_Dark.png" />
                ) : (
                  <img src="/assets/icon/NHC-icon.png" />
                )}
              </div>
              <span
                className={selectedTab == "nhc" ? "select-color " : "color"}
              >
                NHC
              </span>
              {/* <IonLabel>NHC</IonLabel> */}
            </div>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default Tabs;
