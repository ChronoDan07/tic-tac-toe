# Tic-Tac-Toe Game

## Overview

This project is a simple implementation of the classic Tic-Tac-Toe game, built with HTML, CSS, and JavaScript. The game allows two players to compete against each other by taking turns placing their marks (X or O) on a 3x3 grid. The game checks for a winner after each move and declares the result when a player achieves a winning combination or the game ends in a tie.

## Features

- **Gameboard Management**: The gameboard is stored as an array within a Gameboard object, ensuring that the state of the game is easily managed and accessible.
- **Player Management**: Players are stored as objects, each containing their name and marker (X or O).
- **Game Flow Control**: The game logic is encapsulated in a game controller object, which handles the flow of the game, including turns, checking for wins, and determining ties.
- **Modular Code Structure**: The project utilizes a modular code structure with minimal global code. Factories are used to create objects, and modules are employed to limit the creation of single-instance objects like the gameboard and game controller.
- **Console-Based Development**: The game logic is initially developed to run in the console, ensuring that the core functionality works before integrating it with the DOM.
- **DOM Interaction**: Once the console version is functional, the game is connected to the DOM, allowing players to interact with the gameboard on the webpage. Players can click on board squares to place their marks.
- **Player Input and Game Control**: The interface allows players to input their names, start or restart the game, and see the results displayed at the end of each game.


## How to Play

1. **Start the Game**:
   - Enter the player's name.
   - Click the "Start Game" button to begin. The CPU will be your opponent.

2. **Gameplay**:
   - The game alternates turns between you and the CPU.
   - On your turn, click on an empty square on the gameboard to place your marker (X or O).
   - The CPU will automatically place its marker after your turn.
   - The game checks for a winner or a tie after each move.