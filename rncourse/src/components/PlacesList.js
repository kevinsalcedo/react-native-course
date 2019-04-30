import React from "react";
import { FlatList } from "react-native";
import { placesListStyles as styles } from "../styles/placesListStyles";
import ListItem from "./ListItem";

class PlacesList extends React.Component {
  render() {
    return (
      <FlatList
        style={styles.listContainer}
        data={this.props.places}
        renderItem={info => (
          <ListItem
            placeName={info.item.placeName}
            placeImage={info.item.image}
            onItemPressed={() => this.props.onItemSelected(info.item.key)}
          />
        )}
      />
    );
  }
}

export default PlacesList;
