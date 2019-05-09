import { SET_PLACES, REMOVE_PLACE } from "./types";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token");
      })
      .then(token => {
        authToken = token;
        return fetch(
          "https://us-central1-react-native-1556907249873.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: "Bearer " + authToken
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          placeName: placeName,
          location: location,
          image: parsedRes.imageUrl
        };

        return fetch(
          "https://react-native-1556907249873.firebaseio.com/places.json?auth=" +
            authToken,
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        )
          .then(res => res.json())
          .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
          })
          .catch(err => {
            alert("Something went wrong");
            console.log(err);
            dispatch(uiStopLoading());
          });
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    payload: {
      places: places
    }
  };
};
export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token =>
        fetch(
          "https://react-native-1556907249873.firebaseio.com/places.json?auth=" +
            token
        )
      )
      .catch(() => alert("No token found"))
      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            key: key,
            image: { uri: parsedRes[key].image }
          });
        }

        dispatch(setPlaces(places));
      })
      .catch(err => {
        alert("Something went wrong");
      });
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          `https://react-native-1556907249873.firebaseio.com/places/${key}.json?auth=${token}`,
          {
            method: "DELETE"
          }
        );
      })
      .catch(() => alert("No token found"))
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
      })
      .catch(err => {
        alert("Failed to delete", err);
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    payload: {
      key: key
    }
  };
};
