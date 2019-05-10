import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { authLogout } from "../store/actions";

class SideDrawer extends React.Component {
  onPressHandler = () => {
    this.props.authLogout();
  };
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <TouchableOpacity onPress={this.onPressHandler}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#bbb"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

export default connect(
  null,
  { authLogout }
)(SideDrawer);
