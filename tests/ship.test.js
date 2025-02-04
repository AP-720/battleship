// ship.test.js

const Ship = require("../src/game/Ship.js");

describe("Ship", () => {
	let ship;

	beforeEach(() => {
		ship = new Ship(3);
	});

	it("Initializes with the correct properties", () => {
		expect(ship.length).toBe(3);
		expect(ship.hits).toBe(0);
		expect(ship.sunk).toBe(false);
	});

	it("hit() increments hit", () => {
		ship.hit();
		expect(ship.hits).toBe(1);
	});

	it("isSunk() returns false when hits < length", () => {
		ship.hit();
		ship.hit();
		expect(ship.sunk).toBe(false);
	});

	it("isSunk() returns true when hits >= length", () => {
		ship.hit();
		ship.hit();
		ship.hit();
		expect(ship.isSunk()).toBe(true);
	});
});
