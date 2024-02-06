import { CONSTANTS, EndPoint } from "../util/endpoint";
import { storeData } from "../util/appStorage";
import { store } from "../redux/store";
import { setUser } from "../redux/reducer/loginSlice";

const LoginAuth = (callback: (arg: any) => any, res: string) => {
  fetch(`${EndPoint.Login}${res !== "" ? res : ""}`, {
    method: "POST",
    headers: {
      accept: "*/*",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res && res.status !== "error") {
        res["isSuccess"] = true;
        storeData("user", res);
        store.dispatch(setUser(res.user));
        callback(res);
      } else {
        res["isSuccess"] = false;
        callback(res);
      }
    })
    .catch((e) => console.log(e));
};
const GetLoginSession = (callback: (arg: any) => any, session: string) => {
  fetch(
    `${EndPoint.LoginSession}${session !== "" ? "?cookie=" + session : ""}`,
    {
      method: "POST",
      headers: {
        accept: "*/*",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res && res.status !== "error") {
        res["isSuccess"] = true;

        callback(res);
      } else {
        res["isSuccess"] = false;
        callback(res);
      }
    })
    .catch((e) => console.log(e));
};

export { LoginAuth, GetLoginSession };
