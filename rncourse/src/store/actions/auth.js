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
          dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
          startMainTabs();
        }
      });
  };
};

export const authStoreToken = (token, expiresIn) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    AsyncStorage.setItem("places:auth:token", token);
    AsyncStorage.setItem("places:auth:expiryDate", expiryDate.toString());
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
        let authToken;
        AsyncStorage.getItem("places:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            authToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("places:auth:expiryDate");
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(authToken));
              resolve(authToken);
            } else {
              reject();
            }
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
