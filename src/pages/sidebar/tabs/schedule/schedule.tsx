import {
  IonContent,
  IonPage,
  IonCard,
  IonRow,
  IonCol,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonTitle,
  IonText,
  IonDatetime,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Header from "../header";
import { useSelector, useDispatch } from "react-redux";
import { PageCalender, PageEvent } from "../../../../shared/service/pages";
import { setCalender } from "../../../../shared/redux/reducer/calenderSlice";
import "./schedule.css";
import { useHistory } from "react-router-dom";
import { isPlatform } from "@ionic/react";
import moment from "moment";
const getToday = () => {
  var today: any = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return (today = yyyy + "-" + mm + "-" + dd);
};
const getnext7DayDate = () => {
  var today: any = new Date();
  var dd = String(today.getDate() + 14).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return (today = yyyy + "-" + mm + "-" + dd);
};
function Schedule() {
  const dispatch = useDispatch();
  const history = useHistory();
  var today = getToday();
  var next7day = getnext7DayDate();
  console.log("get next 7days date", getnext7DayDate());
  const [selectedDay, setselectedDay] = useState(today);
  const [eventArr, setEventArr] = useState({});
  const [eventOneArr, setEvenOnetArr] = useState({});
  const { calendar } = useSelector((state) => (state as any).root);
  console.log(calendar);
  const calenderHelper = () => {
    PageCalender((res) => {
      if (res && Object.keys(res).length > 0) {
        setEventArr(res);
        dispatch(setCalender(res));
        if (
          res &&
          Object.keys(res).length > 0 &&
          Object.keys(res.content_json).length > 0
        ) {
          // console.log("res",res)
          let cloneEvent = { ...eventOneArr };
          Object.keys(res.content_json).forEach((date: any) => {
            if (
              new Date(date) > new Date(today) &&
              Object.keys(cloneEvent).length < 9
            ) {
              (cloneEvent as any)[date] = res.content_json[date];

              // Object.keys(calendar.content_json).forEach((key)=>{
              //     if(val === key  ){
              //       (cloneEventArr as any).content_json = {[val] : calendar.content_json[val]}
              //     }
              //   })
            }
          });
          setEvenOnetArr(cloneEvent);
        }
      }
    });
  };
  useEffect(() => {
    calenderHelper();
  }, []);
  console.log(eventOneArr);
  const selectEventDate = (val: any) => {
    let cloneEventArr = { ...eventArr };
    if (
      calendar &&
      Object.keys(calendar).length > 0 &&
      Object.keys(calendar.content_json).length > 0
    ) {
      if (Object.keys(calendar.content_json).includes(val)) {
        Object.keys(calendar.content_json).forEach((key) => {
          if (val === key) {
            (cloneEventArr as any).content_json = {
              [val]: calendar.content_json[val],
            };
          }
        });
      } else {
        (cloneEventArr as any).content_json = {};
      }
    }
    setEventArr(cloneEventArr);

    setselectedDay(val);
  };
  return (
    <>
      <IonPage>
        <Header />
        <IonContent>
          <div>
            <IonDatetime
              value={selectedDay}
              onIonChange={(e) => {
                setselectedDay(moment(e.detail.value).format("YYYY-MM-D"));
              }}
              onIonCancel={() => setselectedDay(getToday())}
              className={`${isPlatform("ios") ? "input_ios" : "input"}`}
              cancelText="Reset"
            ></IonDatetime>

            {/* <input
              type="date"
              className={`${isPlatform("ios") ? "input_ios" : "input"}`}
              value={selectedDay}
              onChange={(e) => {
                console.log(e.target.value);
                setselectedDay(e.target.value);
              }}
              onReset={() => alert("adfa")}
            /> */}
            <h1 style={{ marginLeft: "5%" }}>Schedule</h1>

            {eventArr &&
            Object.keys(eventArr).length > 0 &&
            Object.keys((eventArr as any).content_json).length > 0 &&
            Object.keys((eventArr as any).content_json).includes(
              selectedDay
            ) ? (
              Object.keys((eventArr as any).content_json).map((key, inx) => {
                if (selectedDay === key) {
                  return (eventArr as any).content_json[selectedDay].map(
                    (res: any, subinx: any) => {
                      return (
                        <IonCard
                          key={subinx}
                          className="card"
                          onClick={() => {
                            history.push(`/event-detail/${res.ID}`);
                          }}
                        >
                          <IonCardContent className="content">
                            <IonRow className="center">
                              <IonCol className="topSpace">
                                <img
                                  className="imga"
                                  src={res?.data?.featured_image?.full}
                                />
                              </IonCol>
                              <IonCol>
                                <h5 className="head">{res?.data?.title}</h5>
                                <div>
                                  {res?.data?.labels &&
                                  Object.keys(res?.data?.labels).length > 0 ? (
                                    Object.keys(res?.data?.labels).map(
                                      (label, lnx) => {
                                        return (
                                          <span key={lnx}>
                                            {" "}
                                            <div
                                              className="status_Online"
                                              style={{
                                                backgroundColor: `${res?.data?.labels[label].color}`,
                                              }}
                                            ></div>{" "}
                                            {res?.data?.labels[label].name}
                                          </span>
                                        );
                                      }
                                    )
                                  ) : (
                                    <span>
                                      {" "}
                                      <div
                                        className="status_Online"
                                        style={{ backgroundColor: `#8e8787` }}
                                      ></div>{" "}
                                      None
                                    </span>
                                  )}
                                </div>
                                <h5 className="spot">
                                  {res?.data?.meta?.seats_awarded
                                    ? res?.data?.meta?.seats_awarded
                                    : "No Seats Guaranteed"}
                                </h5>
                              </IonCol>
                            </IonRow>
                          </IonCardContent>
                        </IonCard>
                      );
                    }
                  );
                }
              })
            ) : (
              <IonCard className="card">
                <IonCardContent className="content">
                  <IonRow>
                    <IonCol>
                      <h5>No Events Found Today</h5>
                    </IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
            )}
            <h1 style={{ marginLeft: "5%" }}>Upcoming Events</h1>
            {eventOneArr && Object.keys(eventOneArr).length > 0
              ? Object.keys(eventOneArr).map((key, inx) => {
                  return (
                    <>
                      <h3 key={inx} style={{ marginLeft: "5%" }}>
                        {" "}
                        {moment(key).format("Do MMMM")}
                      </h3>

                      {(eventOneArr as any)[key].map(
                        (res: any, subinx: any) => {
                          return (
                            <IonCard
                              key={subinx}
                              className="card"
                              onClick={() => {
                                history.push(`/event-detail/${res.ID}`);
                              }}
                            >
                              <IonCardContent className="content">
                                <IonRow className="center">
                                  <IonCol className="topSpace">
                                    <img
                                      className="imga"
                                      src={res?.data?.featured_image?.full}
                                    />
                                  </IonCol>
                                  <IonCol>
                                    <h5
                                      className="head"
                                      dangerouslySetInnerHTML={{
                                        __html: res?.data?.title,
                                      }}
                                    ></h5>
                                    <div>
                                      {res?.data?.labels &&
                                      Object.keys(res?.data?.labels).length >
                                        0 ? (
                                        Object.keys(res?.data?.labels).map(
                                          (label, lnx) => {
                                            return (
                                              <span key={lnx}>
                                                {" "}
                                                <div
                                                  className="status_Online"
                                                  style={{
                                                    backgroundColor: `${res?.data?.labels[label].color}`,
                                                  }}
                                                ></div>{" "}
                                                {res?.data?.labels[label].name}
                                              </span>
                                            );
                                          }
                                        )
                                      ) : (
                                        <span>
                                          {" "}
                                          <div
                                            className="status_Online"
                                            style={{
                                              backgroundColor: `#8e8787`,
                                            }}
                                          ></div>{" "}
                                          None
                                        </span>
                                      )}
                                    </div>
                                    <h5 className="spot">
                                      {res?.data?.meta?.seats_awarded
                                        ? res?.data?.meta?.seats_awarded
                                        : "No Seats Guaranteed"}
                                    </h5>
                                  </IonCol>
                                </IonRow>
                              </IonCardContent>
                            </IonCard>
                          );
                        }
                      )}
                    </>
                  );
                })
              : ""}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Schedule;
