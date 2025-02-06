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

renderPlayersBoard.render();
renderComputersBoard.render();
