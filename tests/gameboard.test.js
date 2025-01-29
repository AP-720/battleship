// gameboard.test.js

const GameBoard = require("../src/gameboard");
const Ship = require("../src/ship");

describe("GameBoard", () => {
	let gameBoard;
	let ship;

	beforeEach(() => {
		gameBoard = new GameBoard();
		ship = new Ship(3);
	});

	it("Initialize game board with correct properties", () => {
		expect(gameBoard.grid[0][0].ship).toBe(null);
		expect(gameBoard.grid[0][0].isHit).toBe(false);
		expect(gameBoard.grid[9][9].ship).toBe(null);
		expect(gameBoard.grid[9][9].isHit).toBe(false);
	});

	it("Place a ship horizontally at valid coordinates", () => {
		gameBoard.placeShip(ship, 2, 3, "horizontal");

		expect(gameBoard.grid[2][3].ship).toBe(ship);
		expect(gameBoard.grid[3][3].ship).toBe(ship);
		expect(gameBoard.grid[4][3].ship).toBe(ship);
	});

	it("Place a ship vertically at valid coordinates", () => {
		gameBoard.placeShip(ship, 2, 3, "vertical");

		expect(gameBoard.grid[2][3].ship).toBe(ship);
		expect(gameBoard.grid[2][4].ship).toBe(ship);
		expect(gameBoard.grid[2][5].ship).toBe(ship);
	});

	it("Throw error when placing ship out of bounds horizontally", () => {
		expect(() => gameBoard.placeShip(ship, 8, 8, "horizontal")).toThrow(
			"Ship placement out of bounds"
		);
	});

	it("Throw error when placing ship out of bounds vertically", () => {
		expect(() => gameBoard.placeShip(ship, 8, 8, "vertical")).toThrow(
			"Ship placement out of bounds"
		);
	});

	it("Throw error when placing ship overlaps another ship", () => {
		gameBoard.placeShip(ship, 2, 3, "horizontal");

		expect(() => gameBoard.placeShip(ship, 3, 2, "vertical")).toThrow(
			"Ships overlap"
		);
	});

	it("Records hit when attacked hits a ship", () => {
		gameBoard.placeShip(ship, 2, 3, "horizontal");
		gameBoard.receiveAttack(2, 3);

		expect(ship.hits).toBe(1);
		expect(gameBoard.grid[2][3].isHit).toBe(true);
	});

	it("Records a miss if attack misses ship", () => {
		gameBoard.placeShip(ship, 2, 3, "horizontal");
		gameBoard.receiveAttack(2, 2);

		expect(ship.hits).toBe(0);
		expect(gameBoard.grid[2][2].isHit).toBe(true);
	});
});
