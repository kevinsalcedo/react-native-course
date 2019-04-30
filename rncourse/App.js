import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
import SharePlace from "./src/screens/SharePlace";
import FindPlace from "./src/screens/FindPlace";
import AuthScreen from "./src/screens/Auth";
import PlaceDetail from "./src/screens/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer";

const store = configureStore();

// Register Screens
Navigation.registerComponent(
  "awesome-places.AuthScreen",
  () => AuthScreen,
  store,
  Provider
); // Start a App
Navigation.registerComponent(
  "awesome-places.SharePlaceScreen",
  () => SharePlace,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.FindPlaceScreen",
  () => FindPlace,
  store,
  Provider
);
Navigation.registerComponent(
  "awesome-places.PlaceDetailScreen",
  () => PlaceDetail,
  store,
  Provider
);
Navigation.registerComponent("awesome-places.SideDrawer", () => SideDrawer);
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});

// import React, { Component } from "react";
// import { View } from "react-native";
// import { connect } from "react-redux";

// import UserInput from "./src/components/UserInput";
// import PlacesList from "./src/components/PlacesList";
// import PlaceDetail from "./src/components/PlaceDetail";

// import { appStyles as styles } from "./src/styles/appStyles";
// import lagoon from "./src/assets/lagoon.jpg";

// import {
//   addPlace,
//   deletePlace,
//   selectPlace,
//   deselectPlace
// } from "./src/store/actions";

// class App extends Component {
//   state = {
//     placeName: ""
//   };

//   placeNameChangedHandler = text => {
//     this.setState({ placeName: text });
//   };

//   placeSubmitHandler = () => {
//     if (this.state.placeName.trim() === "") {
//       return;
//     }
//     this.placeAddedhandler(this.state.placeName);
//   };

//   placeAddedhandler = placeName => {
//     this.props.addPlace(placeName);
//   };

//   placeSelectedHandler = key => {
//     this.props.selectPlace(key);
//   };

//   onItemDeletedHandler = () => {
//     this.props.deletePlace();
//   };

//   onModalClosedHandler = () => {
//     this.props.deselectPlace();
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <PlaceDetail
//           selectedPlace={this.props.place}
//           onItemDeleted={this.onItemDeletedHandler}
//           onModalClosed={this.onModalClosedHandler}
//         />
//         <UserInput
//           placeName={this.state.placeName}
//           placeNameChangedHandler={this.placeNameChangedHandler}
//           placeSubmitHandler={this.placeSubmitHandler}
//         />
//         <PlacesList
//           places={this.props.places}
//           onItemSelected={this.placeSelectedHandler}
//         />
//       </View>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     places: state.places.places,
//     place: state.places.place
//   };
// };

// export default connect(
//   mapStateToProps,
//   { addPlace, deletePlace, selectPlace, deselectPlace }
// )(App);
