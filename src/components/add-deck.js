import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { saveDeckTitle } from "./helpers";

export default class AddDeck extends Component {
  state = { title: "" };

  addDeck = () => {
    saveDeckTitle(this.state.title).then(deck => {
      if(!this.state.title) { 
        return alert("Add the Deck Name")
   }
      this.setState({ title: "" });
      this.props.navigation.navigate("Deck", { deck });
    });
  };

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <View style={styles.name}>
          <TextInput
            onChangeText={title => this.setState({ title })}
            value={title}
            placeholder={"Title"}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.addDeck}>
          <Text style={styles.button}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#425AE1",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: "center"
  },
  name: {
    height: 40,
    width: 240,
    backgroundColor: "white",
    margin: 20
  },
  buttonContainer: {
    height: 40,
    width: 240,
    backgroundColor: "black",
    borderWidth: 1,
    margin: 20,
    justifyContent: "center"
  },
  button: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: "center",
    color: "white"
  }
});
