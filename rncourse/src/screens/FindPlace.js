import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated
} from "react-native";
import { connect } from "react-redux";
import PlacesList from "../components/PlacesList";

class FindPlace extends React.Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    addAnim: new Animated.Value(0)
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

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  placesLoadedHandler = () => {
    Animated.timing(this.state.addAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  itemSelectedHandler = key => {
    const selected = this.props.places.find(place => place.key === key);
    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selected.name,
      passProps: {
        selectedPlace: selected
      }
    });
  };
  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity
          style={styles.searchButton}
          onPress={this.placesSearchHandler}
        >
          <View>
            <Text style={styles.searchButtonText}>Show List</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );

    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.addAnim
          }}
        >
          <PlacesList
            places={this.props.places}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 26
  }
});
export default connect(mapStateToProps)(FindPlace);
