import { TRY_AUTH } from "./types";
import { uiStartLoading, uiStopLoading } from "./ui";
import startMainTabs from "../../screens/startMainTabs";
import apiKey from "../apiKey";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=";

    if (authMode === "login") {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=";
    }

    fetch(url + apiKey, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Authentication failed");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        if (parsedRes.error) {
          alert(`Authentication failed: ${parsedRes.error.message}`);
        } else {
          startMainTabs();
        }
      });
  };
};
