import React from "react";
import { View, Dimensions, Button, StyleSheet } from "react-native";
import MapView from "react-native-maps";

class PickLocation extends React.Component {
  state = {
    focusedRegion: {
      latitude: 27.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView initialRegion={this.state.focusedRegion} style={styles.map} />
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert("Locate Me")} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
