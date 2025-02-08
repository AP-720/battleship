// index.js

import { GameBoard } from "./game/GameBoard.js";
import { Ship } from "./game/Ship.js";
import { BoardRenderer } from "./ui/BoardRenderer.js";

// DOM Elements

const playersBoardElement = document.querySelector("[data-players-board]");
const computersBoardElement = document.querySelector("[data-computers-board]");
const gameMessages = document.querySelector("[data-messages]");

// Initialize Game Components

const playerBoard = new GameBoard();
const computersBoard = new GameBoard();

const renderPlayersBoard = new BoardRenderer(playerBoard, playersBoardElement);

const renderComputersBoard = new BoardRenderer(
	computersBoard,
	computersBoardElement
);

const ship = new Ship(3);

renderPlayersBoard.render();
renderComputersBoard.render();

playerBoard.placeShip(ship, 0, 0, "horizontal");
playerBoard.receiveAttack(0,0)
playerBoard.receiveAttack(1,0)
// playerBoard.placeShip(ship, 3, 4, "vertical");

renderPlayersBoard.render();
