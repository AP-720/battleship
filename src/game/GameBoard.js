// GameBoard.js

// Define constants for ship placement directions
const DIRECTIONS = {
	HORIZONTAL: "horizontal",
	VERTICAL: "vertical",
};

export class GameBoard {
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
				this.grid[x][y + i].ship = ship; // Place ship horizontally
			}
		} else if (orientation === DIRECTIONS.VERTICAL) {
			for (let i = 0; i < ship.length; i++) {
				this.grid[x + i][y].ship = ship; // Place ship vertically
			}
		}
	}

	// Helper method to check if a ship placement is out of bounds
	isOutOfBounds(x, y, shipLength, orientation) {
		// Check if the ship extends beyond the grid horizontally
		if (orientation === DIRECTIONS.HORIZONTAL && y + shipLength > 10) {
			return true;
		}
		// Check if the ship extends beyond the grid vertically
		if (orientation === DIRECTIONS.VERTICAL && x + shipLength > 10) {
			return true;
		}
		return false; // Ship placement is within bounds
	}

	// Helper method to check if a ship placement overlaps with another ship
	hasOverlap(x, y, shipLength, orientation) {
		for (let i = 0; i < shipLength; i++) {
			// Check for overlap in horizontal placement
			if (orientation === DIRECTIONS.HORIZONTAL && this.grid[x][y + i].ship) {
				return true;
			}
			// Check for overlap in vertical placement
			if (orientation === DIRECTIONS.VERTICAL && this.grid[x + i][y].ship) {
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
		// Create a Set to track unique ships that have already been checked
		const checkedShips = new Set();

		for (const row of this.grid) {
			for (const cell of row) {
				// Check if the cell contains a ship and if the ship hasn't been checked yet
				if (cell.ship && !checkedShips.has(cell.ship)) {
					// Add the ship to the Set of checked ships to avoid redundant checks
					checkedShips.add(cell.ship);

					// Check if the ship is NOT sunk using its isSunk() method
					if (!cell.ship.isSunk()) {
						// If any ship is not sunk, return false immediately
						return false;
					}
				}
			}
		}

		// If all ships have been checked and are sunk, return true
		return true;
	}
}

// module.exports = GameBoard;
