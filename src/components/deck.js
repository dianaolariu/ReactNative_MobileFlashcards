import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { removeDeck } from "./helpers";

export default class Deck extends Component {
  deleteDeck = () => {
    const deck = this.props.navigation.getParam("deck");
    removeDeck(deck.title).then(() => {
      this.props.navigation.navigate("DeckList");
    });
  };

  render() {
    const deck = this.props.navigation.getParam("deck");
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.titleContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.questContainer}>
            {deck.questions.length} Card(s)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizContainer}
          onPress={() => this.props.navigation.navigate("Quiz", { deck })}
        >
          <Text style={styles.quizTitle}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => this.props.navigation.navigate("AddCard", { deck })}
        >
          <Text style={styles.cardTitle}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteContainer}
          onPress={this.deleteDeck}
        >
          <Text style={styles.deleteTitle}>Delete Deck</Text>
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
  titleContainer: {
    height: 60,
    width: 240,
    margin: 20
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    alignSelf: "center",
    color: "#841584"
  },
  questContainer: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: "center"
  },
  quizContainer: {
    height: 40,
    width: 240,
    backgroundColor: "black",
    borderWidth: 1,
    margin: 20,
    justifyContent: "center"
  },
  quizTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: "center",
    color: "white"
  },
  cardContainer: {
    height: 40,
    width: 240,
    backgroundColor: "white",
    borderWidth: 1,
    margin: 20,
    justifyContent: "center"
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: "center",
    color: "black"
  },
  deleteContainer: {
    height: 40,
    width: 240,
    backgroundColor: "red",
    borderWidth: 1,
    margin: 20,
    justifyContent: "center"
  },
  deleteTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: "center",
    color: "white"
  }
});
