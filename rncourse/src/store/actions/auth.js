import { AsyncStorage } from "react-native";

import { AUTH_SET_TOKEN } from "./types";
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
        console.log(parsedRes);
        dispatch(uiStopLoading());
        if (!parsedRes.idToken) {
          alert(`Authentication failed: ${parsedRes.error.message}`);
        } else {
          dispatch(authStoreToken(parsedRes.idToken));
          startMainTabs();
        }
      });
  };
};

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem("places:auth:token", token);
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    payload: {
      token: token
    }
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.getItem("places:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            if (!tokenFromStorage) {
              reject();
            }
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage);
          });
      } else {
        resolve(token);
      }
    });
    return promise;
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token"));
  };
};
