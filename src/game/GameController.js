// GameController.js

import { Ship } from "./Ship.js";
import { GameBoard, DIRECTIONS } from "./GameBoard.js";

// Define constants for attack results to avoid magic strings
export const AttackResult = {
	VALID: "valid",
	INVALID: "invalid",
};

export class GameController {
	constructor(
		humanBoard,
		computerBoard,
		humanRenderer,
		computerRenderer,
		uiManager
	) {
		// Initialize the game controller with human and computer boards and renderers and UIManager
		this.humanBoard = humanBoard;
		this.computerBoard = computerBoard;
		this.humanRenderer = humanRenderer;
		this.computerRenderer = computerRenderer;
		this.uiManager = uiManager;

		// Set the initial turn to the human player
		this.isHumanTurn = true;
	}

	// Initialize the game by placing ships and rendering the boards
	initializeGame() {
		// Place a ship on the human's board
		this.placeShipRandomly(new Ship(4), this.humanBoard);

		// Place a ship on the computer's board
		this.placeShipRandomly(new Ship(4), this.computerBoard);

		// Render both boards
		this.humanRenderer.render();
		this.computerRenderer.render();

		this.uiManager.setMessage("Place ships to start game.");
	}

	// Handle a human player's attack on the computer's board
	handleHumanAttack(x, y) {
		// If the cell has already been attacked, return "invalid"
		if (this.computerBoard.grid[x][y].isHit) {
			return AttackResult.INVALID;
		}

		// Register the attack on the computer's board
		this.computerBoard.receiveAttack(x, y);

		// Re-render the computer's board to reflect the attack
		this.computerRenderer.render();

		// Switch the turn to the computer
		this.isHumanTurn = false;

		// Return "valid" to indicate the attack was processed successfully
		return AttackResult.VALID;
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
		// Attempt to handle the human player's attack
		const attackResult = this.handleHumanAttack(x, y);

		// If the attack was invalid, stop the turn
		if (attackResult === AttackResult.INVALID) {
			this.uiManager.setMessage("Invalid attack: Cell already hit");
			return;
		}

		// If the game is over after the human's attack, stop the turn
		if (this.checkForWin()) {
			this.uiManager.setMessage("You win!");
			return;
		}

		// Handle the computer's attack
		this.handleComputerAttack();

		// If the game is over after the computer's attack, stop the turn
		if (this.checkForWin()) {
			this.uiManager.setMessage("Computer wins! You lose.");
			return;
		}
	}

	placeShipRandomly(ship, gameBoard) {
		let x, y, orientation;

		// Use a do-while loop to repeatedly generate random coordinates and orientation
		do {
			x = Math.floor(Math.random() * 10);
			y = Math.floor(Math.random() * 10);
			orientation =
				Math.random() < 0.5 ? DIRECTIONS.HORIZONTAL : DIRECTIONS.VERTICAL;

			// Continue looping if the generated coordinates and orientation are invalid
		} while (
			gameBoard.isOutOfBounds(x, y, ship.length, orientation) ||
			gameBoard.hasOverlap(x, y, ship.length, orientation)
		);

		// Once valid coordinates and orientation are found, place the ship on the game board.
		gameBoard.placeShip(ship, x, y, orientation);
	}
}
