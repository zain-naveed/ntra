import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  isPlatform,
  IonButton,
  useIonToast,
  IonToast,
  IonText,
  useIonViewDidLeave,
} from "@ionic/react";
import mentionsStyles from "./login.module.css";
import Input from "../../../shared/components/input/input";
import { LoginEnum } from "./loginenum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { LoginAuth } from "../../../shared/service/auth";
import { IonSpinner } from "@ionic/react";
import Join from "./join";
import { useSelector, useDispatch } from "react-redux";
import { setGuest } from "../../../shared/redux/reducer/guest";
import ResetPassword from "./reset";
// declare var window: any;

import { CONSTANTS } from "../../../shared/util/endpoint";
// import { Admob, AdmobOptions } from "@ionic-native/admob";
// import { AdOptions, AdSize, AdPosition } from "capacitor-admob";
// import { Plugins } from "@capacitor/core";
import { useLocation } from "react-router-dom";
export default function Login() {
  const [activeTab, setActiveTab] = useState(LoginEnum.Login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [EmailPlace, setEmailPlace] = useState("Johndoe@mail.com");
  const [PasswordPlace, setPasswordPlace] = useState(".......");
  const [showToast1, setShowToast1] = useState(false);
  const [loader, setLoader] = useState(false);
  const [Message, setMessage] = useState("");
  const [errorfor, setError] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);

  let query: string =
    email !== "" && password !== ""
      ? `?username=${email}&password=${password}`
      : "";
  const validate = () => {
    if (email == "") {
      setError("Email");
      setErrorMsg("Email is required field");
      return false;
    } else if (password == "") {
      setError("Password");
      setErrorMsg("Password is required field");
      return false;
    } else {
      return true;
    }
  };
  const resetError = () => {
    setErrorMsg("");
    setError("");
  };
  const handleSubmit = () => {
    let valid = validate();
    if (valid) {
      setLoader(true);
      LoginAuth((res) => {
        setLoader(false);
        if (res && res?.isSuccess) {
          history.push("/home");
        } else {
          setMessage(
            "Username/password not recognized. Double-check or tap JOIN NOW to register today!"
          );
          setShowToast1(true);
        }
        console.log("res", res);
      }, query);
    }
  };
  const showTabBarBanner = () => {
    console.log("handle clicked");
  };
  useEffect(() => {
    if (location.pathname == "/join") {
      setActiveTab(LoginEnum.Join);
    }
  });
  console.log(ErrorMsg);

  return (
    <div>
      <IonContent fullscreen>
        <IonHeader>
          {/* <IonToolbar> */}
          <div className={`${mentionsStyles.header_background}`}>
            <IonButtons slot="start">
              <IonBackButton defaultHref="home" />
            </IonButtons>
            <div className={`${mentionsStyles.header_font}`}>
              <div className={mentionsStyles.header_content}>
                <IonTitle>
                  <img src={`/assets/icon/NHC_Tour_logo.svg`} />
                </IonTitle>
                <p
                  className={`${
                    isPlatform("android")
                      ? mentionsStyles.headerP
                      : mentionsStyles.headerP
                  }`}
                >
                  The world’s richest and most prestigious handicapping
                  tournament.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab(LoginEnum.Join);
                history.push("/join");
              }}
              className={`${mentionsStyles.header_button} ${
                activeTab == LoginEnum.Join ? mentionsStyles.active : ""
              }`}
            >
              Join Now
            </button>
            <button
              onClick={() => {
                setActiveTab(LoginEnum.Login);
                history.push("/login");
              }}
              className={`${mentionsStyles.header_button} ${
                activeTab == LoginEnum.Login ? mentionsStyles.active : ""
              }`}
            >
              Login
            </button>
          </div>
          {/* </IonToolbar> */}
        </IonHeader>

        {activeTab === LoginEnum.Login ? (
          <div className={mentionsStyles.login_content}>
            <Input
              type="text"
              value={email ? email : EmailPlace}
              onChange={(e) => {
                setEmail(e.target.value);
                resetError();
              }}
              onFocus={() => setEmailPlace("")}
              onBlur={() => setEmailPlace("Johndoe@mail.com")}
              inputname={"Email/Username"}
            />
            <div>
              {errorfor == "Email" && ErrorMsg != "" ? (
                <p className={mentionsStyles.error}>{ErrorMsg}</p>
              ) : (
                ""
              )}
            </div>
            <Input
              type="password"
              value={password ? password : PasswordPlace}
              onChange={(e) => {
                setPassword(e.target.value);
                resetError();
              }}
              onFocus={() => setPasswordPlace("")}
              onBlur={() => setPasswordPlace(".......")}
              inputname={"Password"}
            />
            <div>
              {errorfor == "Password" && ErrorMsg != "" ? (
                <p className={mentionsStyles.error}>{ErrorMsg}</p>
              ) : (
                ""
              )}
            </div>
            <button
              className={mentionsStyles.login_button}
              disabled={loader}
              onClick={handleSubmit}
            >
              {loader ? (
                <IonSpinner color="white" name="lines" />
              ) : (
                <>
                  <label>Login</label>
                  <FontAwesomeIcon icon={faArrowRight} />
                </>
              )}
            </button>

            <div className={mentionsStyles.reset}>
              <label onClick={() => history.push("/forgot")}>
                Reset Password
              </label>

              {/* <div>
                  <input type="checkbox" />
                  <label>Enable FaceID</label>
                </div> */}
            </div>
            <div
              className={mentionsStyles.image_container}
              onClick={showTabBarBanner}
            >
              {/* {loaded ? ( */}
              {/* <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-1367360408572198"
                data-ad-slot="4929851028"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins> */}
              {/* ) : null} */}
              {/* <div
                id="banner-ad"
                style={{
                  width: "300px",
                  height: "250px",
                  position: "relative",
                  left: "0",
                  right: "0",
                  margin: "auto",
                  marginBottom: "24px",
                }}
              >
                {(window as any).googletag.cmd.push(function () {
                  (window as any).googletag.display("banner-ad");
                })}
              </div> */}
              {/* <img src="https://dummyimage.com/300x250/918c91/b4b7b8" /> */}
            </div>

            <p
              className={mentionsStyles.guest}
              onClick={() => {
                dispatch(setGuest());
                setTimeout(() => {
                  history.push("/home");
                }, 10);
              }}
            >
              Continue as a Guest <FontAwesomeIcon icon={faGreaterThan} />
            </p>
          </div>
        ) : (
          <div>
            <Join />
          </div>
        )}

        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message={Message}
          duration={3000}
          color="dark"
        />
      </IonContent>
    </div>
  );
}
