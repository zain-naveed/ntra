import React, { useState, useEffect } from "react";

import LeaderStyle from "./home.module.css";
import { IonSpinner, IonImg, IonThumbnail } from "@ionic/react";
import { LeaderList } from "../../../../shared/service/pages";
import "./ripple.css";
import { Link, useHistory } from "react-router-dom";
import leaderStyle from "./home.module.css";
import { LazyImage } from "../lazyImage";
function Leaders() {
  const [listLeaders, setLeaders] = useState([]);
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const newsHelper = () => {
    setLoader(true);
    LeaderList((data) => {
      if (data) {
        setLoader(false);
        setLeaders(data);
      }
    });
  };
  useEffect(() => {
    newsHelper();
  }, []);

  return (
    <div className={LeaderStyle.wrapper}>
      <h1>Tour Leaders</h1>
      {loader ? (
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          {" "}
          <IonSpinner name="lines" />{" "}
        </div>
      ) : (
        <div className={LeaderStyle.anchor}>
          {/* <div className={LeaderStyle.leader_img} dangerouslySetInnerHTML={{__html:(listLeaders as any)?.content?.rendered}} ></div> */}
          {listLeaders.length > 0 &&
            listLeaders.map((ldr: any, linx: any) => {
              return (
                <div
                  className={leaderStyle.leader_list}
                  key={linx}
                  onClick={() => {
                    history.push({
                      pathname: `/member/${ldr.encoded}`,
                      state: ldr,
                    });
                  }}
                >
                  <div className={leaderStyle.section_one}>
                    <span className={leaderStyle.number}>{ldr.position}</span>
                    {/* <LazyImage className={leaderStyle.img_top} src={ldr.user_pic} alt="Placheadsf" /> */}
                    {/* <IonThumbnail className={leaderStyle.img_top} slot="start">
                                     <IonImg src={ldr.user_pic} la  />
                                     </IonThumbnail> */}
                    {
                      <img
                        className={leaderStyle.img_top}
                        onError={(e) => {
                          //@ts-ignore
                          e.target.src = "/assets/icon/default-avatar.png";
                        }}
                        loading="lazy"
                        src={ldr.user_pic}
                      />
                    }
                  </div>
                  <div className={leaderStyle.section_two}>
                    <p>{ldr.playername}</p>
                    <label className={leaderStyle.price}>{ldr.points}</label>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Leaders;
