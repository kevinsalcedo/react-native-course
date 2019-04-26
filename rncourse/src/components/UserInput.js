import React from "react";
import { View, TextInput, Button } from "react-native";
import { styles } from "../styles";

export default props => {
  return (
    <View style={styles.inline}>
      <TextInput
        style={styles.placeInput}
        value={props.placeName}
        placeholder="Add text here"
        onChangeText={props.placeNameChangedHandler}
        underlineColorAndroid="black"
      />
      <Button
        title="Add"
        styles={styles.placeButton}
        onPress={props.placeSubmitHandler}
      />
    </View>
  );
};
