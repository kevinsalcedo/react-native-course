import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../store/actions";

import UserInput from "../components/UserInput";

class SharePlace extends React.Component {
  placeAddedHandler = name => {
    this.props.addPlace(name);
  };
  render() {
    return (
      <View>
        <UserInput onPlaceAdded={this.placeAddedHandler} />
      </View>
    );
  }
}
export default connect(
  null,
  { addPlace }
)(SharePlace);
