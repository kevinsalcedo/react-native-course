import React, { Component } from "react";
import { View } from "react-native";
import ListItem from "./src/components/ListItem/ListItem";
import UserInput from "./src/components/UserInput";
import { styles } from "./src/styles";
import PlacesList from "./src/components/PlacesList";

type Props = {};
export default class App extends Component<Props> {
  state = {
    placeName: "",
    places: []
  };

  placeNameChangedHandler = text => {
    this.setState({ placeName: text });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName)
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <UserInput
          placeName={this.state.placeName}
          placeNameChangedHandler={this.placeNameChangedHandler}
          placeSubmitHandler={this.placeSubmitHandler}
        />
        <PlacesList places={this.state.places} />
      </View>
    );
  }
}
