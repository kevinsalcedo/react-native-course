import { ADD_PLACE, DELETE_PLACE } from "./types";

export const addPlace = (placeName, location, image) => {
  return {
    type: ADD_PLACE,
    payload: {
      placeName,
      location,
      image
    }
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    payload: key
  };
};
