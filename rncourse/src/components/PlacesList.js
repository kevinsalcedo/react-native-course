import React from "react";
import { View } from "react-native";
import { styles } from "../styles";
import ListItem from "./ListItem/ListItem";

export default props => {
  const renderList = props.places.map((place, i) => {
    return <ListItem key={i} placeName={place} />;
  });

  return <View style={styles.listContainer}>{renderList}</View>;
};
