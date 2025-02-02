// Define constants for ship placement directions
const DIRECTIONS = {
	HORIZONTAL: "horizontal",
	VERTICAL: "vertical",
};

class GameBoard {
	constructor() {
		// Initialize a 10x10 grid where each cell is an object with:
		this.grid = Array.from({ length: 10 }, () =>
			Array.from({ length: 10 }, () => ({ ship: null, isHit: false }))
		);

		// Initialize an array to track coordinates of missed attacks
		this.missedAttacks = [];
	}

	placeShip(ship, x, y, orientation) {
		// Check if the ship placement is out of bounds
		if (this.isOutOfBounds(x, y, ship.length, orientation)) {
			throw new Error("Ship placement out of bounds");
		}

		// Check if the ship placement overlaps with another ship
		if (this.hasOverlap(x, y, ship.length, orientation)) {
			throw new Error("Ships overlap");
		}

		// Place the ship on the grid based on the specified orientation
		if (orientation === DIRECTIONS.HORIZONTAL) {
			for (let i = 0; i < ship.length; i++) {
				this.grid[x + i][y].ship = ship; // Place ship horizontally
			}
		} else if (orientation === DIRECTIONS.VERTICAL) {
			for (let i = 0; i < ship.length; i++) {
				this.grid[x][y + i].ship = ship; // Place ship vertically
			}
		}
	}

	// Helper method to check if a ship placement is out of bounds
	isOutOfBounds(x, y, shipLength, orientation) {
		// Check if the ship extends beyond the grid horizontally
		if (orientation === DIRECTIONS.HORIZONTAL && x + shipLength > 10) {
			return true;
		}
		// Check if the ship extends beyond the grid vertically
		if (orientation === DIRECTIONS.VERTICAL && y + shipLength > 10) {
			return true;
		}
		return false; // Ship placement is within bounds
	}

	// Helper method to check if a ship placement overlaps with another ship
	hasOverlap(x, y, shipLength, orientation) {
		for (let i = 0; i < shipLength; i++) {
			// Check for overlap in horizontal placement
			if (orientation === DIRECTIONS.HORIZONTAL && this.grid[x + i][y].ship) {
				return true;
			}
			// Check for overlap in vertical placement
			if (orientation === DIRECTIONS.VERTICAL && this.grid[x][y + i].ship) {
				return true;
			}
		}
		return false; // No overlap detected
	}

	// Method to handle an attack on a specific cell
	receiveAttack(x, y) {
		const cell = this.grid[x][y]; // Get the target cell

		// If the cell has already been attacked, ignore the attack
		if (cell.isHit) {
			return;
		}

		cell.isHit = true; // Mark the cell as hit

		// If the cell contains a ship, register a hit on the ship
		if (cell.ship) {
			cell.ship.hit();
		} else {
			// If the cell does not contain a ship, record the miss
			this.missedAttacks.push({ x, y });
		}
	}

	allShipsSunk() {
		// Iterate through each row (i) of the game grid
		for (let i = 0; i < this.grid.length; i++) {
			// Iterate through each column (j) in the current row
			for (let j = 0; j < this.grid[i].length; j++) {
				// Check if current cell contains a ship
				if (this.grid[i][j].ship) {
					// If ship exists in cell, check if it's NOT sunk
					if (!this.grid[i][j].ship.sunk) {
						// Early exit: Found at least one un-sunk ship
						return false;
					}
				}
			}
		}
		// All ships in all cells have been sunk
		return true;
	}
}

module.exports = GameBoard;
