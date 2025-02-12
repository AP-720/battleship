// index.js

import { GameBoard } from "./game/GameBoard.js";
import { Ship } from "./game/Ship.js";
import { BoardRenderer } from "./ui/BoardRenderer.js";
import { GameController } from "./game/GameController.js";

// DOM Elements

const humanBoardElement = document.querySelector("[data-players-board]");
const computersBoardElement = document.querySelector("[data-computers-board]");
const gameMessages = document.querySelector("[data-messages]");

// Initialize Game Components

const humanBoard = new GameBoard();
const computersBoard = new GameBoard();

const humanRenderer = new BoardRenderer(humanBoard, humanBoardElement);

const computerRenderer = new BoardRenderer(
	computersBoard,
	computersBoardElement
);

const gameController = new GameController(
	humanBoard,
	computersBoard,
	humanRenderer,
	computerRenderer
);

gameController.initializeGame();
gameController.handleTurn(0,0)
gameController.handleTurn(0,1)
gameController.handleTurn(0,2)
