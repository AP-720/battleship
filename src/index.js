// index.js

import { GameBoard } from "./game/GameBoard.js";
import { Ship } from "./game/Ship.js";
import { BoardRenderer } from "./ui/BoardRenderer.js";
import { GameController } from "./game/GameController.js";
import { UIManager } from "./ui/UIManager.js";

// DOM Elements

const humanBoardElement = document.querySelector("[data-players-board]");
const computersBoardElement = document.querySelector("[data-computers-board]");
const gameMessages = document.querySelector("[data-messages]");

// EventListeners

computersBoardElement.addEventListener("click", (event) => {
	const cell = event.target;
	const x = parseInt(cell.getAttribute("data-x"));
	const y = parseInt(cell.getAttribute("data-y"));

	gameController.handleTurn(x, y);
});

// Initialize Game Components

const humanBoard = new GameBoard();
const computersBoard = new GameBoard();

const humanRenderer = new BoardRenderer(humanBoard, humanBoardElement);
const computerRenderer = new BoardRenderer(
	computersBoard,
	computersBoardElement
);

const uiManager = new UIManager(gameMessages);

const gameController = new GameController(
	humanBoard,
	computersBoard,
	humanRenderer,
	computerRenderer,
	uiManager
);

gameController.initializeGame();
// gameController.handleTurn(0, 0);
// // gameController.handleTurn(0,0)
// gameController.handleTurn(0, 1);
// gameController.handleTurn(0, 2);
