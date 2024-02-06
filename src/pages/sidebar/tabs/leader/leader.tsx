import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState, useRef } from "react";
import Header from "../header";
import { Page708, AllLeader } from "../../../../shared/service/pages";
import "./leader.css";
import { IonButton, IonLoading } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { isPlatform } from "@ionic/react";
import { Link } from "react-router-dom";
import { IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
function LeaderBoard() {
  const [page708, setPage708] = useState({});
  const [leaderList, setLeaderList] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [pagination, setPagination] = useState(0);
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false);
  const history = useHistory();
  setTimeout(() => {
    setShowLoading(false);
  }, 2000);

  useEffect(() => {
    userList();
  }, []);
  const userList = () => {
    AllLeader((res: any) => {
      if (res && res.length > 0) {
        setShowLoading(false);
        setLeaderList(res);
        setPagination(50);
      }
    }, `?offset=${pagination}`);
  };
  const LeaderList = ($event: CustomEvent<void>) => {
    AllLeader((res: any) => {
      if (res && res.length > 0) {
        let cloneLeader: any = [...leaderList];
        setShowLoading(false);
        res.forEach((element: any) => {
          cloneLeader = [...cloneLeader, element];
        });
        setLeaderList(cloneLeader);
        setPagination(pagination + 50);
        setDisableInfiniteScroll(res.length < 10);
        ($event.target as HTMLIonInfiniteScrollElement).complete();
      } else {
        setDisableInfiniteScroll(true);
      }
    }, `?offset=${pagination}`);
  };
  return (
    <>
      <IonPage>
        <Header />
        <IonContent>
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
          <iframe
            onLoad={() => {
              setShowLoading(false);
            }}
            id="ifrm"
            style={{ height: "43vh", width: "100vw", border: "none" }}
            src={"https://staging-ntra.kinsta.cloud/nhc-app-leaderboard-pdfs"}
          ></iframe>

          <IonInfiniteScroll
            threshold="100px"
            disabled={disableInfiniteScroll}
            onIonInfinite={(e: CustomEvent<void>) => LeaderList(e)}
          >
            <IonInfiniteScrollContent loadingText="Loading more Leaders"></IonInfiniteScrollContent>
          </IonInfiniteScroll>
          <table className="tablepress">
            <thead>
              <tr className="row-1 odd">
                <th className="column-1">&nbsp;</th>
                <th className="column-2">Player</th>
                <th className="column-4">Qualified</th>
                <th className="column-3">Overall Points</th>
                <th className="column-4">First Half</th>
              </tr>
            </thead>

            <tbody>
              {leaderList &&
                leaderList.length > 0 &&
                leaderList.map((data, inx) => {
                  return (
                    <tr className="row-2 even" key={inx}>
                      <td className="column-1">{(data as any).position}</td>
                      <td className="column-2">
                        {" "}
                        <a
                          href="javascript::void(0)"
                          onClick={() =>
                            history.push({
                              pathname: `/member/${(data as any).encoded}`,
                              state: data,
                            })
                          }
                        >
                          {" "}
                          {(data as any).playername}
                        </a>
                      </td>
                      <td className="column-3">
                        {(data as any).qualified == 1 ? "*" : ""}
                      </td>
                      <td className="column-3">{(data as any).points}</td>
                      <td className="column-3">{(data as any).half1_points}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </IonContent>
      </IonPage>
    </>
  );
}

export default LeaderBoard;
