// index.js

import { GameBoard } from "./game/GameBoard.js";
import { BoardRenderer, BOARDTYPE } from "./ui/BoardRenderer.js";
import { GameController } from "./game/GameController.js";
import { UIManager } from "./ui/UIManager.js";

// DOM Elements

const humanBoardElement = document.querySelector("[data-players-board]");
const computersBoardElement = document.querySelector("[data-computers-board]");
const gameMessages = document.querySelector("[data-messages]");
const placeShipsButton = document.querySelector("[data-place-ships-button]");

// EventListeners

computersBoardElement.addEventListener("click", (event) => {
	// Updated to use closest which those attributes as once a cell was hit and a marker was inserted it meant the coordinates weren't being passed correctly.
	const cell = event.target.closest("[data-x][data-y]");
	const x = parseInt(cell.getAttribute("data-x"));
	const y = parseInt(cell.getAttribute("data-y"));

	gameController.handleTurn(x, y);
});

placeShipsButton.addEventListener("click", () => {
	gameController.initializeGame();
});

// Initialize Game Components

const humanBoard = new GameBoard();
const computersBoard = new GameBoard();

const humanRenderer = new BoardRenderer(
	humanBoard,
	humanBoardElement,
	BOARDTYPE.HUMAN
);
const computerRenderer = new BoardRenderer(
	computersBoard,
	computersBoardElement,
	BOARDTYPE.COMPUTER
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
