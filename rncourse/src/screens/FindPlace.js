import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import PlacesList from "../components/PlacesList";

class FindPlace extends React.Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
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
    return (
      <View>
        <PlacesList
          places={this.props.places}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};
export default connect(mapStateToProps)(FindPlace);
