import React from "react";
import DefaultInput from "../components/UI/DefaultInput";

const UserInput = props => {
  return (
    <DefaultInput
      placeholder="Place Name"
      value={props.placeName.value}
      valid={props.placeName.valid}
      touched={props.placeData.touched}
      onChangeText={props.onChangeText}
    />
  );
};

export default UserInput;
