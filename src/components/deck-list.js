import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { getDecks, setLocalNotification } from "./helpers";
import { NavigationEvents } from "react-navigation";

export default class Decks extends Component {
  state = { decks: {} };

  loadDecks = () => {
    getDecks().then(decks => {
      this.setState({ decks });
    });
  };

  componentWillMount() {
    setLocalNotification();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.loadDecks} />
        <Text style={styles.title}>Decks list</Text>
        {this.state.decks && Object.keys(this.state.decks).length ? (
          <ScrollView>
            {Object.keys(this.state.decks).map(key => {
              return (
                <TouchableOpacity
                  style={styles.deckContainer}
                  onPress={() =>
                    this.props.navigation.navigate("Deck", {
                      deck: this.state.decks[key]
                    })
                  }
                  key={key}
                >
                  <Text style={styles.deckTitle}>
                    {this.state.decks[key].title}
                  </Text>
                  <Text style={styles.cardNumber}>
                    {this.state.decks[key].questions.length} Card(s)
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View>
            <Text>No Decks</Text>
          </View>
        )}
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
    marginTop: 80,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  deckContainer: {
    height: 60,
    width: 240,
    backgroundColor: "grey",
    margin: 20
  },
  deckTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: "center",
    color: "#841584"
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: "center"
  }
});
