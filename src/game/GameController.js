// GameController.js

import { Ship } from "./Ship";

export class GameController {
	constructor(humanBoard, computerBoard, humanRenderer, computerRenderer) {
		// Initialize the game controller with human and computer boards and renderers
		this.humanBoard = humanBoard;
		this.computerBoard = computerBoard;
		this.humanRenderer = humanRenderer;
		this.computerRenderer = computerRenderer;

		// Set the initial turn to the human player
		this.isHumanTurn = true;
	}

	// Initialize the game by placing ships and rendering the boards
	initializeGame() {
		// Place a ship on the human's board
		this.humanBoard.placeShip(new Ship(3), 0, 0, "horizontal");

		// Place a ship on the computer's board
		this.computerBoard.placeShip(new Ship(3), 0, 0, "horizontal");

		// Render both boards
		this.humanRenderer.render();
		this.computerRenderer.render();
	}

	// Handle a human player's attack on the computer's board
	handleHumanAttack(x, y) {
		// If the cell has already been attacked, do nothing
		if (this.computerBoard.grid[x][y].isHit) {
			return;
		}

		// Register the attack on the computer's board
		this.computerBoard.receiveAttack(x, y);

		// Re-render the computer's board to reflect the attack
		this.computerRenderer.render();

		// Switch the turn to the computer
		this.isHumanTurn = false;
	}

	// Handle the computer's attack on the human's board
	handleComputerAttack() {
		let x, y;
		let attempts = 0;
		const maxAttempts = 100; // Prevent infinite loops

		// Generate random coordinates until a valid attack is found
		do {
			x = Math.floor(Math.random() * 10);
			y = Math.floor(Math.random() * 10);
			attempts++;
		} while (this.humanBoard.grid[x][y].isHit && attempts < maxAttempts);

		// If no valid coordinates are found after maxAttempts, throw an error
		if (attempts >= maxAttempts) {
			throw new Error("No valid attack coordinates found.");
		}

		// Register the attack on the human's board
		this.humanBoard.receiveAttack(x, y);

		// Re-render the human's board to reflect the attack
		this.humanRenderer.render();

		// Switch the turn back to the human player
		this.isHumanTurn = true;
	}

	// Check if the game has been won by either player
	checkForWin() {
		return this.humanBoard.allShipsSunk() || this.computerBoard.allShipsSunk();
	}

	// Handle a full turn (human attack followed by computer attack)
	handleTurn(x, y) {
		// Handle the human player's attack
		this.handleHumanAttack(x, y);

		// If the game is over after the human's attack, stop the turn
		if (this.checkForWin()) {
			return;
		}

		// Handle the computer's attack
		this.handleComputerAttack();

		// If the game is over after the computer's attack, stop the turn
		if (this.checkForWin()) {
			return;
		}
	}
}
