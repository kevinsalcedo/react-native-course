import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../store/actions";

import UserInput from "../components/UserInput";
import MainText from "../components/UI/MainText";
import HeadingText from "../components/UI/HeadingText";
import lagoon from "../assets/lagoon.jpg";
import PickImage from "../components/PickImage";
import PickLocation from "../components/PickLocation";

class SharePlace extends React.Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  state = {
    placeName: ""
  };
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

  placeAddedHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    this.props.addPlace(this.state.placeName);
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place With Us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <UserInput
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button title="Share" onPress={this.placeAddedHandler} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});

export default connect(
  null,
  { addPlace }
)(SharePlace);
