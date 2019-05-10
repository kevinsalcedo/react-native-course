import { AsyncStorage } from "react-native";

import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./types";
import { uiStartLoading, uiStopLoading } from "./ui";
import startMainTabs from "../../screens/startMainTabs";
import apiKey from "../apiKey";
import App from "../../../App";

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
          dispatch(
            authStoreToken(
              parsedRes.idToken,
              parsedRes.expiresIn,
              parsedRes.refreshToken
            )
          );
          startMainTabs();
        }
      });
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    AsyncStorage.setItem("places:auth:token", token);
    AsyncStorage.setItem("places:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("places:auth:refreshToken", refreshToken);
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
          // Check to see if token is expired
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
    return promise
      .catch(err => {
        // If an invalid token is found, check the reresh token
        return AsyncStorage.getItem("places:auth:refreshToken")
          .then(refreshToken => {
            fetch("https://securetoken.googleapis.com/v1/token?key=" + apiKey, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: "grant_type='refresh_token'&refresh_token=" + refreshToken
            });
          })
          .catch(err => reject())
          .then(res => res.json())
          .then(parsedRes => {
            // If successful, set the new id token and expiry date
            if (parsedRes.id_token) {
              dispatch(
                authStoreToken(
                  parsedRes.id_token,
                  parsedRes.expires_in,
                  parsedRes.refresh_token
                )
              );
              return parsedRes.id_token;
            } else {
              dispatch(authClearStorage());
            }
          });
      })
      .then(token => {
        if (!token) {
          throw new Error();
        } else {
          return token;
        }
      });
  };
};

// Check to see if a token exists in AsyncStorage
// Expects a persisted token from a prev login
export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token for auto sign-in"));
  };
};

// Remove data from AyncStorage
export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("places:auth:token");
    AsyncStorage.removeItem("places:auth:expiryDate");
    return AsyncStorage.removeItem("places:auth:refreshToken");
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage()).then(() => App());
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};
