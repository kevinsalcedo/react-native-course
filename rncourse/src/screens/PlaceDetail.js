import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { deletePlace } from "../store/actions";
import Icon from "react-native-vector-icons/Ionicons";

class PlaceDetail extends React.Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  };

  constructor(props) {
    super(props);

    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };
  itemDeletedHandler = () => {
    this.props.deletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };
  render() {
    return (
      <View
        style={[
          this.state.viewMode === "portrait"
            ? styles.portraitWindow
            : styles.landscapeWindow
        ]}
      >
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitContainer
              : styles.landscapeContainer
          }
        >
          <Image
            source={this.props.selectedPlace.image}
            style={styles.modalImage}
          />
        </View>
        <View
          styles={
            this.state.viewMode === "portrait"
              ? styles.portraitContainer
              : styles.landscapeContainer
          }
        >
          <Text style={styles.modalName}>
            {this.props.selectedPlace.placeName}
          </Text>
          <View>
            <TouchableOpacity onPress={this.itemDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="red"
                  onPress={this.props.onItemDeleted}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalImage: {
    width: "100%",
    height: 200
  },
  modalName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  },
  portraitWindow: {
    margin: 22,
    flexDirection: "column"
  },
  landscapeWindow: {
    margin: 22,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  portraitContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start"
  },
  landscapeContainer: {
    flexDirection: "row",
    width: "45%"
  }
});

export default connect(
  null,
  { deletePlace }
)(PlaceDetail);
