import React from "react";
import { FlatList } from "react-native";
import { placesListStyles as styles } from "../styles/placesListStyles";
import ListItem from "./ListItem";

export default props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.places}
      renderItem={info => (
        <ListItem
          placeName={info.item.placeName}
          placeImage={info.item.image}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};
