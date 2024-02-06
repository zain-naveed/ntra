import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
// import Home from './pages/home/dashboard/Home';
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/auth/login/login";
import Sidebar from "./pages/sidebar/sidebar";
import Tabs from "./pages/sidebar/tabs/tabs";
import { SplashScreen } from "@capacitor/splash-screen";
// import Member from './pages/sidebar/tabs/leader/member';
import UpdateMember from "./pages/sidebar/tabs/leader/updateMember";
import { getData } from "./shared/util/appStorage";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./shared/redux/reducer/loginSlice";
import { setRegister } from "./shared/redux/reducer/registerSlice";
import ResetPassword from "./pages/auth/login/reset";
import Payment from "./pages/sidebar/tabs/leader/pyament";
import { GetLoginSession } from "./shared/service/auth";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { LoginUser, RegisterUser, Guest } = useSelector(
    (state) => (state as any).root
  );

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);

    getData("user", (res) => {
      if (res) {
        GetLoginSession((data) => {
          let obj = {
            ...res,
            user: data.user,
          };
          localStorage.setItem("user", JSON.stringify(obj));
          dispatch(setUser(obj));
        }, res.cookie);
      }
    });

    getData("register", (res) => {
      console.log("res", res);
      dispatch(setRegister(res));
    });
  }, []);
  if (Guest == "Guest") {
    console.log("guest=>", Guest);
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              {/* <Route exact path="/login">
        <Login />
      </Route> */}
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>

              <Route exact path="/member/update/:id" component={UpdateMember} />
              <Route path="/payment" component={Payment} />
              <Sidebar />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  } else if (
    (LoginUser != null && Object.keys(LoginUser).length > 0) ||
    (RegisterUser != null && Object.keys(RegisterUser).length > 0)
  ) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              {/* <Route exact path="/login">
        <Login />
      </Route> */}
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              {/* <Route exact path="/member/:id" component={Member} /> */}
              <Route exact path="/member/update/:id" component={UpdateMember} />
              <Route path="/payment" component={Payment} />

              <Sidebar />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  } else if (
    !Object.keys(LoginUser).length ||
    !Object.keys(RegisterUser).length
  ) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/join">
                <Login />
              </Route>
              <Route exact path="/forgot" component={ResetPassword} />

              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              {/* <Route exact path="/member/:id" component={Member} /> */}
              <Route exact path="/member/update/:id" component={UpdateMember} />
              <Route path="/payment" component={Payment} />
              <Sidebar />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/join">
              <Login />
            </Route>
            <Route exact path="/forgot" component={ResetPassword} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
