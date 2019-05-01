import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { deletePlace } from "../store/actions";
import Icon from "react-native-vector-icons/Ionicons";
import { placesDetailStyles as styles } from "../styles/placesDetailStyles";

class PlaceDetail extends React.Component {
  itemDeletedHandler = () => {
    this.props.deletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };
  render() {
    return (
      <View style={styles.modalContainer}>
        <Image
          source={this.props.selectedPlace.image}
          style={styles.modalImage}
        />
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
    );
  }
}

export default connect(
  null,
  { deletePlace }
)(PlaceDetail);
