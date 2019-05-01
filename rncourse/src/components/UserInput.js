import React from "react";
import DefaultInput from "../components/UI/DefaultInput";

const UserInput = props => {
  return (
    <DefaultInput
      placeholder="Place Name"
      value={props.placeName}
      onChangeText={props.onChangeText}
    />
  );
};

export default UserInput;
