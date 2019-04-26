import React from "react";
import { View, Text, TouchableNativeFeedback, Image } from "react-native";
import { listItemStyles as styles } from "../styles/listItemStyles";

export default props => (
  <TouchableNativeFeedback onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image
        resizeMode="cover"
        source={props.placeImage}
        style={styles.placeImage}
      />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableNativeFeedback>
);
