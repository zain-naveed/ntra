import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  isPlatform,
  IonPage,
  useIonModal,
  IonToolbar,
  IonSpinner,
  IonToast,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import Input from "../../../shared/components/input/input";
import mentionsStyles from "./login.module.css";
import { ResetPasswordService } from "../../../shared/service/profile";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const [EmailPlace, setEmailPlace] = useState("Johndoe@mail.com");
  const [showToast1, setShowToast1] = useState(false);
  const [loader, setLoader] = useState(false);
  const [Usermessage, setUserMessage] = useState("");
  const handleSubmit = () => {
    //    LoginAuth((res)=>{
    //   setLoader(false)
    //      if(res && res?.isSuccess){
    //        history.push("/home")
    //      }else{
    //
    //      }
    //     console.log("res",res)
    //    },query)
  };
  const resetPassword = () => {
    setLoader(true);
    ResetPasswordService((res) => {
      setShowToast1(true);
      console.log(res);
      if (res && res?.error != "") {
        setUserMessage(res?.error);

        setLoader(false);
      }
      if (res && res?.status == "ok") {
        setUserMessage(res?.msg);
      }

      setShowToast1(true);
    }, `?user_login=${email}`);
  };
  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <IonHeader>
            <IonToolbar>
              <div className={`${mentionsStyles.header_background}`}>
                <IonButtons
                  slot="start"
                  style={{ paddingTop: "var(--ion-safe-area-top)" }}
                >
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
              </div>
            </IonToolbar>
          </IonHeader>

          {
            <div className={mentionsStyles.login_content}>
              <Input
                type="text"
                value={email ? email : EmailPlace}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailPlace("")}
                onBlur={() => setEmailPlace("Johndoe@mail.com")}
                inputname={"Email/Username"}
              />

              <button
                className={mentionsStyles.login_button}
                disabled={loader}
                onClick={resetPassword}
              >
                {loader ? (
                  <IonSpinner color="white" name="lines" />
                ) : (
                  <>
                    <label>Reset Password</label>
                  </>
                )}
              </button>
            </div>
          }
          {Usermessage && (
            <IonToast
              message={Usermessage}
              isOpen={showToast1}
              color="dark"
              onDidDismiss={() => setShowToast1(false)}
              duration={3000}
            />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};
export default ResetPassword;
