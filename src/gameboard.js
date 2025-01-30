// gameboard.js

class GameBoard {
	constructor() {
		this.grid = Array.from({ length: 10 }, () =>
			Array.from({ length: 10 }, () => ({ ship: null, isHit: false }))
		);

		this.missedAttacks = [];
	}

	placeShip(ship, x, y, orientation) {
		// Bounds check
		if (x + ship.length > 10 && orientation === "horizontal") {
			throw new Error("Ship placement out of bounds");
		}

		if (y + ship.length > 10 && orientation === "vertical") {
			throw new Error("Ship placement out of bounds");
		}

		// Overlap check

		for (let i = 0; i < ship.length; i++) {
			if (orientation === "horizontal" && this.grid[x + i][y].ship) {
				throw new Error("Ships overlap");
			}
			if (orientation === "vertical" && this.grid[x][y + i].ship) {
				throw new Error("Ships overlap");
			}
		}

		if (orientation === "horizontal") {
			for (let i = 0; i < ship.length; i++) {
				this.grid[x + i][y].ship = ship;
			}
		} else if (orientation === "vertical") {
			for (let i = 0; i < ship.length; i++) {
				this.grid[x][y + i].ship = ship;
			}
		}
	}

	receiveAttack(x, y) {
		const cell = this.grid[x][y];
		
		if (cell.isHit) {
			return;
		}

		cell.isHit = true;

		if (cell.ship) {
			cell.ship.hit();
		} else {
			this.missedAttacks.push({ x, y });
		}
	}
}

module.exports = GameBoard;
