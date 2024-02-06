import React, { useState, useEffect } from "react";
import LeaderStyle from "./home.module.css";
import { NewsPost } from "../../../../shared/service/pages";
import { IonRippleEffect, IonSpinner } from "@ionic/react";
import "./ripple.css";
import { useHistory } from "react-router-dom";
function News() {
  const [listNews, setNews] = useState([]);
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const newsHelper = () => {
    setLoader(true);
    NewsPost((data) => {
      if (data) {
        setLoader(false);
        setNews(data);
      }
    });
  };
  useEffect(() => {
    newsHelper();
  }, []);
  console.log(listNews);
  return (
    <div className={LeaderStyle.wrapper}>
      <h1>latest news</h1>
      {loader ? (
        <div style={{ textAlign: "center", margin: "50px 0" }}>
          {" "}
          <IonSpinner name="lines" />{" "}
        </div>
      ) : (
        <>
          {listNews && (listNews as any)?.posts?.length > 0
            ? (listNews as any).posts.map((newres: any, inx: any) => {
                return (
                  <div
                    className={`${LeaderStyle.news_section} ion-activatable ripple-parent`}
                    key={inx}
                  >
                    <div
                      className={`${LeaderStyle.news_section_one} `}
                      onClick={() => {
                        history.push(`/news-detail/${(newres as any).id}`);
                      }}
                    >
                      {(newres as any).title}
                      {/* <p>
                           {
                              ( newres as any).title.rendered
                           } 
                        </p> */}
                    </div>
                    <div className={`${LeaderStyle.news_section_two} `}>
                      <img src={(newres as any).thumbnail} />
                    </div>

                    <IonRippleEffect type="bounded"></IonRippleEffect>
                  </div>
                );
              })
            : ""}
        </>
      )}
    </div>
  );
}

export default News;
