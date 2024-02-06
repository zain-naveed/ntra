import React, { useEffect, useState } from "react";
import Header from "../header";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
} from "@ionic/react";
import EventHeader from "../eventHeader";
import { useParams } from "react-router-dom";
import { SingleEventService } from "../../../../shared/service/pages";
import moment from "moment";
import "./schedule.css";
function EventDetail() {
  const params = useParams();
  console.log(params);
  const [SingleEvent, setEventDetail] = useState({});

  const newsDetail = () => {
    if (Object.keys(params).length > 0) {
      SingleEventService((res) => {
        setEventDetail(res);
      }, `${(params as any).id}`);
    }
  };
  useEffect(() => {
    newsDetail();
  }, [params]);
  return (
    <IonPage>
      <IonContent>
        <EventHeader />
        <div className="event-center">
          <img src={(SingleEvent as any)?.featured_image?.full} />
          <h1
            className="heading"
            dangerouslySetInnerHTML={{
              __html: (SingleEvent as any)?.title,
            }}
          ></h1>
          <IonCard className="card-event">
            <IonCardContent>
              {SingleEvent &&
                (SingleEvent as any)?.meta &&
                SingleEvent &&
                (SingleEvent as any)?.meta?.mec_more_info && (
                  <>
                    <div
                      className="card-header-event"
                      onClick={() =>
                        window.open((SingleEvent as any)?.meta?.mec_more_info)
                      }
                    >
                      Register
                    </div>
                    <div className="item">
                      <div className="icon">
                        <img src="/assets/icon/info.png" />
                      </div>

                      <div className="desc">
                        <h1 className="headOne">More Info</h1>
                        {/* <h5>Tile</h5> */}
                        <button
                          className="info-button"
                          onClick={() =>
                            window.open(
                              (SingleEvent as any)?.meta?.mec_more_info
                            )
                          }
                        >
                          More Info
                        </button>
                      </div>
                    </div>
                  </>
                )}

              <div className="item">
                <div className="icon">
                  <img src="/assets/icon/calend.png" />
                </div>

                <div className="desc">
                  <h1 className="headOne">Date</h1>
                  <h5>
                    {SingleEvent && (SingleEvent as any)?.mec ? (
                      <div>
                        {(SingleEvent as any)?.mec?.start
                          ? moment((SingleEvent as any)?.mec?.start).format(
                              "LL"
                            )
                          : "-"}
                      </div>
                    ) : (
                      "-"
                    )}
                  </h5>
                </div>
              </div>
              <div className="item">
                <div className="icon">
                  <img src="/assets/icon/wallet.png" />
                </div>

                <div className="desc">
                  <h1 className="headOne">Entry Fee</h1>
                  <h5>
                    {SingleEvent && (SingleEvent as any)?.meta ? (
                      <div>
                        {(SingleEvent as any)?.meta?.mec_cost != ""
                          ? "$" + (SingleEvent as any)?.meta?.mec_cost
                          : "$0"}
                      </div>
                    ) : (
                      "$0"
                    )}
                  </h5>
                </div>
              </div>
              <div className="item">
                <div className="icon">
                  <img src="/assets/icon/ribbon.png" />
                </div>

                <div className="desc">
                  <h1 className="headOne">Type</h1>
                  <h5>
                    {(SingleEvent as any)?.labels &&
                    Object.keys((SingleEvent as any)?.labels).length > 0 ? (
                      Object.keys((SingleEvent as any)?.labels).map(
                        (label, lnx) => {
                          return (
                            <span key={lnx}>
                              {" "}
                              <div
                                className="status_Online"
                                style={{
                                  backgroundColor: `${
                                    (SingleEvent as any)?.labels[label].color
                                  }`,
                                }}
                              ></div>{" "}
                              {(SingleEvent as any)?.labels[label].name}
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
                  </h5>
                </div>
              </div>
              <div className="item">
                <div className="icon">
                  <img src="/assets/icon/trophy3.png" />
                </div>

                <div className="desc">
                  <h1 className="headOne">Spots Awarded</h1>
                  <h5>
                    {(SingleEvent as any)?.meta?.seats_awarded
                      ? (SingleEvent as any)?.meta?.seats_awarded
                      : "No Seats Granted"}
                  </h5>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default EventDetail;
