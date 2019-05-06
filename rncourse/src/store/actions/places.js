import { ADD_PLACE, DELETE_PLACE } from "./types";

export const addPlace = (placeName, location) => {
  return {
    type: ADD_PLACE,
    payload: {
      placeName,
      location
    }
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    payload: key
  };
};
