import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { placesDetailStyles as styles } from "../styles/placesDetailStyles";

export default props => {
  let modalContent = null;

  if (props.selectedPlace) {
    modalContent = (
      <View>
        <Image source={props.selectedPlace.image} style={styles.modalImage} />
        <Text style={styles.modalName}>{props.selectedPlace.placeName}</Text>
      </View>
    );
  }

  return (
    <Modal
      onRequestClose={props.onModalClosed}
      visible={props.selectedPlace !== null}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        {modalContent}
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
          <Button title="Close" onPress={props.onModalClosed} />
        </View>
      </View>
    </Modal>
  );
};
