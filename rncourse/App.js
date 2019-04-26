import React, { Component } from "react";
import { View } from "react-native";
import UserInput from "./src/components/UserInput";
import { appStyles as styles } from "./src/styles/appStyles";
import PlacesList from "./src/components/PlacesList";
import PlaceDetail from "./src/components/PlaceDetail";
import lagoon from "./src/assets/lagoon.jpg";

type Props = {};
export default class App extends Component<Props> {
  state = {
    places: [],
    place: null
  };

  placeNameChangedHandler = text => {
    this.setState({ placeName: text });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }

    this.placeAddedhandler(this.state.placeName);
  };

  placeAddedhandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: {
            uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303.jpg"
          }
        })
      };
    });
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        place: prevState.places.find(place => place.key === key)
      };
    });
  };

  onItemDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(
          place => place.key !== prevState.place.key
        ),
        place: null
      };
    });
  };

  onModalClosedHandler = () => {
    this.setState({ place: null });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.place}
          onItemDeleted={this.onItemDeletedHandler}
          onModalClosed={this.onModalClosedHandler}
        />
        <UserInput
          placeName={this.state.placeName}
          placeNameChangedHandler={this.placeNameChangedHandler}
          placeSubmitHandler={this.placeSubmitHandler}
        />
        <PlacesList
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}
