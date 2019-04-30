import React from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { placesDetailStyles as styles } from "../styles/placesDetailStyles";

export default props => {
  return (
    <View style={styles.modalContainer}>
      <Image source={props.selectedPlace.image} style={styles.modalImage} />
      <Text style={styles.modalName}>{props.selectedPlace.placeName}</Text>
      <View>
        <TouchableOpacity>
          <View style={styles.deleteButton}>
            <Icon
              size={30}
              name="ios-trash"
              color="red"
              onPress={props.onItemDeleted}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
