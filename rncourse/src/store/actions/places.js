import { SET_PLACES, REMOVE_PLACE } from "./types";
import { uiStartLoading, uiStopLoading } from "./index";

export const addPlace = (placeName, location, image) => {
  // return {
  //   type: ADD_PLACE,
  //   payload: {
  //     placeName,
  //     location,
  //     image
  //   }
  // };
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(
      "https://us-central1-react-native-1556907249873.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        })
      }
    )
      .catch(err => {
        alert("Failed", err);
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          placeName: placeName,
          location: location,
          image: parsedRes.imageUrl
        };

        fetch("https://react-native-1556907249873.firebaseio.com/places.json", {
          method: "POST",
          body: JSON.stringify(placeData)
        })
          .catch(err => {
            alert("Failed", err);
            dispatch(uiStopLoading());
          })
          .then(res => res.json())
          .then(parsedRes => {
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
    fetch("https://react-native-1556907249873.firebaseio.com/places.json")
      .catch(err => {
        alert("Failed to get", err);
      })
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
      });
  };
};

// export const deletePlace = key => {
//   return {
//     type: DELETE_PLACE,
//     payload: key
//   };
// };

export const deletePlace = key => {
  return dispatch => {
    dispatch(removePlace(key));
    fetch(
      `https://react-native-1556907249873.firebaseio.com/places/${key}.json`,
      {
        method: "DELETE"
      }
    )
      .catch(err => {
        alert("Failed to delete", err);
      })
      .then(res => res.json())
      .then(parsedRes => {});
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
