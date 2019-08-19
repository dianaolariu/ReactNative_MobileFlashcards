import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { clearLocalNotification, setLocalNotification } from "./helpers";

export default class Quiz extends Component {
  state = {
    showQuestion: true,
    currentCardIndex: 0,
    correctAnswerCount: 0,
    wrongAnswerCount: 0
  };

  toggleQuestion = () => {
    this.setState(state => ({
      showQuestion: !state.showQuestion
    }));
  };

  init = () => {
    this.setState({
      showQuestion: true,
      currentCardIndex: 0,
      correctAnswerCount: 0,
      wrongAnswerCount: 0,
      deck: this.props.navigation.getParam("deck")
    });
  };

  restartQuiz = () => {
    this.init();
  };

  goBackToDeck = () => {
    const { deck } = this.state;
    this.props.navigation.navigate("Deck", { deck });
  };

  handleCorrect = () => {
    this.setState(state => {
      if(state.currentCardIndex == state.deck.questions.length - 1) {
        clearLocalNotification().then(setLocalNotification);
      }
      return {
        correctAnswerCount: state.correctAnswerCount + 1,
        currentCardIndex: state.currentCardIndex + 1,
        showQuestion:"true"
      };
    });
  };


  handleIncorrect = () => {
    this.setState(state => {
      if(state.currentCardIndex == state.deck.questions.length - 1) {
        clearLocalNotification().then(setLocalNotification);
      }
      return {
        wrongAnswerCount: state.wrongAnswerCount + 1,
        currentCardIndex: state.currentCardIndex + 1,
        showQuestion:"true"
      }
    });
  };

  render() {
    const {
      showQuestion,
      deck,
      correctAnswerCount,
      currentCardIndex,
      wrongAnswerCount
    } = this.state;
    let content;
    if (!deck) {
      content = <Text style={styles.title}>Loading</Text>;
    } else if (deck.questions.length == 0) {
      content = <Text style={styles.title}>No cards to show.</Text>;
    } else if (currentCardIndex >= deck.questions.length) {
      content = (
        <View>
          <Text style={styles.title}>
            You answer correct to {correctAnswerCount} card(s) from total of{" "}
            {correctAnswerCount + wrongAnswerCount}.
          </Text>
          <TouchableOpacity
            style={styles.restartBackContainer}
            onPress={this.restartQuiz}
          >
            <Text style={styles.restartBackText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.restartBackContainer}
            onPress={this.goBackToDeck}
          >
            <Text style={styles.restartBackText}>Go Back To Deck</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      const currentCard = deck.questions[currentCardIndex];
      const remaining =
      deck.questions.length - correctAnswerCount - wrongAnswerCount;
      content = (
        <View>
          {showQuestion ? (
            <Text style={styles.questionAnswer}>{currentCard.question}</Text>
          ) : (
            <Text style={styles.questionAnswer}>{currentCard.answer}</Text>
          )}

          <TouchableOpacity
            style={styles.questionAnswer}
            onPress={this.toggleQuestion}
          >
            <Text style={styles.toggle}>{`${
              showQuestion ? "Show Answer" : "Show Question"
            }`}</Text>
          </TouchableOpacity>
          <View
            style={styles.remaining}
          >
             <Text style={styles.title}>{remaining} total remaining.</Text>
             </View>
         
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleCorrect}
          >
            <Text style={styles.button}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleIncorrect}
          >
            <Text style={styles.button}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.init} />
        {content}
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
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: "center",
    textAlign: "center"
  },
  restartBackContainer: {
    height: 40,
    width: 240,
    backgroundColor: "red",
    borderWidth: 1,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  restartBackText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: "center",
    color: "white"
  },
  questionAnswer: {
    fontSize: 22,
    width: 240,
    alignSelf: "center",
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: "center"
  },
  toggle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
    color: "white",
    borderWidth: 1
  },
  buttonContainer: {
    height: 40,
    width: 240,
    backgroundColor: "red",
    borderWidth: 1,
    margin: 20,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: 'center'
  },
  remaining: {
    height: 40,
    width: 240,
    borderWidth: 1,
    margin: 20,
    justifyContent: "center",
    alignSelf: 'center'
  },
  button: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: "center",
    color: "white"
  }
});
