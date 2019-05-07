import { ADD_PLACE, DELETE_PLACE } from "./types";

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
    const placeData = {
      name: placeName,
      location: location
    };
    fetch("https://react-native-1556907249873.firebaseio.com/places.json", {
      method: "POST",
      body: JSON.stringify(placeData)
    })
      .catch(err => alert("Failed", err))
      .then(res => res.json())
      .then(parsedRes => {});
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    payload: key
  };
};
