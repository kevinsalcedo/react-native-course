import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../store/actions";

import UserInput from "../components/UserInput";

class SharePlace extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.setOnNavigatorEvent);
  }

  setOnNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

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
