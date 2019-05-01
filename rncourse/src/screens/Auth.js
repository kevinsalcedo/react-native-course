import React from "react";
import { View, Button, StyleSheet, ImageBackground } from "react-native";
import DefaultInput from "../components/UI/DefaultInput";
import startMainTabs from "./startMainTabs";
import HeadingText from "../components/UI/HeadingText";
import MainText from "../components/UI/MainText";
import ButtonWithBackground from "../components/UI/ButtonWithBackground";
import lagoon from "../assets/lagoon.jpg";

class AuthScreen extends React.Component {
  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <ImageBackground source={lagoon} style={styles.backgroundImage}>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Please Log In</HeadingText>
          </MainText>
          <ButtonWithBackground color="#29aaf4">
            Switch to Login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your Email Address"
              style={styles.input}
            />
            <DefaultInput placeholder="Password" style={styles.input} />
            <DefaultInput placeholder="Confirm Password" style={styles.input} />
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
            Log In
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%"
  },
  textHeading: {
    fontSize: 28,
    fontWeight: "bold"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  }
});
export default AuthScreen;
