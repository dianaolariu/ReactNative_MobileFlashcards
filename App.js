import DeckList from "./src/components/deck-list";
import Deck from "./src/components/deck";
import AddDeck from "./src/components/add-deck";
import AddCard from "./src/components/add-card";
import Quiz from "./src/components/quiz";

import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

export default createAppContainer(
  createStackNavigator(
    {
      Bottom: createBottomTabNavigator({
        DeckList: DeckList,
        AddDeck: AddDeck
      }),
      Deck: Deck,
      AddCard: AddCard,
      Quiz: Quiz
    },
    {
      initialRouteName: "Bottom"
    }
  )
);
