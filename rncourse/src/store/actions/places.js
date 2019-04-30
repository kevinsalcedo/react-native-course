import { ADD_PLACE, DELETE_PLACE } from "./types";

export const addPlace = placeName => {
  return {
    type: ADD_PLACE,
    payload: placeName
  };
};

export const deletePlace = () => {
  return {
    type: DELETE_PLACE
  };
};
