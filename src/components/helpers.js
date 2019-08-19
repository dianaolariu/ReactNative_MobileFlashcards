import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const FLASHCARDS_STORAGE_KEY = "Flashcards:decks";
const NOTIFICATION_KEY = "Flashcards:notifications";

const defaultDecks = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  },
  ReactNative: {
    title: "ReactNative",
    questions: [
      {
        question:
          "What React Native function allows you to render the content to be displayed?",
        answer: "render()"
      }
    ]
  }
};

function setDefaultDecks() {
  return AsyncStorage.setItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify(defaultDecks)
  ).then(() => {
    return defaultDecks;
  });
}

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(result => {
    if (!result) {
      return setDefaultDecks();
    }
    return JSON.parse(result);
  });
}

export function getDeck(title) {
  return getDecks().then(decks => decks[title]);
}

export function saveDeckTitle(title) {
  const deck = {
    title: title,
    questions: []
  };

  return AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({ [title]: deck })
  ).then(() => {
    return deck;
  });
}

export function removeDeck(title) {
  console.log(title);
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    delete decks[title];
    return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function addCardToDeck(title, card) {
  return getDeck(title).then(deck => {
    deck.questions.push(card);
    return AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({ [title]: deck })
    ).then(() => {
      return deck;
    });
  });
}
function createNotification() {
  return {
    title: "Complete a quiz!",
    body: "Don't forget to complete a quiz today!",
    ios: {
      sound: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(9);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
