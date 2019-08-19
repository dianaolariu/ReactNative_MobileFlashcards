MobileFlashcards
MobileFlashcards is a mobile application developed using React Native.
This project is built using the Create React Native App, Expo and React Navigation.

Requirements
To run this project, you must first have an iPhone with the Expo App installed or have a computer running macOS with Xcode installed.

Dependencies
In a terminal window, navigate to the project and execute the following commands: yarn install and yarn start.
After the server has started, hit i to run it through the iOS emulator.
Mobile Flashcards should work on all iOS and Android devices. It has been tested on iPhone X during development.

Getting Started
The Mobile Flashcards application is a basic digital flashcard system. You can create decks and cards. Decks are a collection of cards. A card consists of a single question and answer.

When you launch the app for the first time, mock data will appear on the screen.

Create Deck
When the app first loads you will be presented with the Decks screen which will display a list of all of your Decks. If there are no Decks, you should see the message "No decks".
To create a new deck, click the "AddDeck" tab from the main page.
After creating a deck, you will be taken to the Deck view. It is also possible to get to the Deck view from clicking on the desired deck from the Decks view.
Deck page displays buttons for Start Quiz, Add Card and Delete Deck.

Create Card
To create a new card you will be taken to the Add Card view fron the Deck page. Here you will be able to provide a question and an answer. Clicking the Submit button will save the card to the specific deck.

Start Quiz
A quiz is the process of reviewing each card in a specific deck. To take a quiz, click the "Start Quiz" button from the Deck view.
Each question is displayed one at a time.The answer to each question can be displayed using the "Question/ Answer" tab at the top of the page. After a guess at the answer has been made, you can indicate whether or not your guess was correct using the correct, or incorrect buttons. Clicking either the correct or incorrect button will display the next question.
After all the cards have been presented, your final score will be displayed. From there you will be able to return back to the Deck view or Restart the Quiz.

Notifications
If notifications permissions are granted, a daily reminder will be set to alert you everyday at 9:00 AM if you have not completed a quiz.

License
The MobileFlashcards is Copyright © 2019.
