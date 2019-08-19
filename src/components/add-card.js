import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { addCardToDeck } from "./helpers";

export default class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  handleSubmit = () => {
    const deck = this.props.navigation.getParam("deck");
    const title = deck.title;
    const card = { question: this.state.question, answer: this.state.answer };
    addCardToDeck(title, card).then(deck => {
      this.setState({
        question: "",
        answer: ""
      });
      this.props.navigation.navigate("Deck", { deck });
    });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add a new card to your deck</Text>
        <View style={styles.questionContainer}>
          <TextInput
            value={question}
            placeholder={"Question"}
            onChangeText={question => this.setState({ question })}
            multiline
          />
        </View>
        <View style={styles.answerContainer}>
          <TextInput
            value={answer}
            placeholder={"Answer"}
            onChangeText={answer => this.setState({ answer })}
            multiline
          />
        </View>
        <TouchableOpacity
          style={styles.submitContainer}
          onPress={this.handleSubmit}
        >
          <Text style={styles.submit}>Submit</Text>
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
    marginTop: -200,
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: "center"
  },
  questionContainer: {
    height: 40,
    width: 240,
    backgroundColor: "white",
    margin: 20
  },
  answerContainer: {
    height: 40,
    width: 240,
    backgroundColor: "white",
    margin: 20
  },
  submitContainer: {
    height: 40,
    width: 240,
    backgroundColor: "black",
    borderWidth: 1,
    margin: 20,
    justifyContent: "center"
  },
  submit: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: "center",
    color: "white"
  }
});
