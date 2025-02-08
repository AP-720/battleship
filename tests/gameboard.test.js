// gameboard.test.js

import { GameBoard } from "../src/game/GameBoard.js";
import { Ship } from "../src/game/Ship.js";

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
		expect(gameBoard.grid[2][4].ship).toBe(ship);
		expect(gameBoard.grid[2][5].ship).toBe(ship);
	});

	it("Place a ship vertically at valid coordinates", () => {
		gameBoard.placeShip(ship, 2, 3, "vertical");

		expect(gameBoard.grid[2][3].ship).toBe(ship);
		expect(gameBoard.grid[3][3].ship).toBe(ship);
		expect(gameBoard.grid[4][3].ship).toBe(ship);
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

		expect(() => gameBoard.placeShip(ship, 1, 4, "vertical")).toThrow(
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

	it("Records misses in missedAttacks array", () => {
		gameBoard.receiveAttack(2, 2);

		expect(gameBoard.missedAttacks).toContainEqual({ x: 2, y: 2 });
	});

	it("Hits are not recorded in missedAttacks", () => {
		gameBoard.placeShip(ship, 2, 3, "horizontal");
		gameBoard.receiveAttack(2, 3);

		expect(gameBoard.missedAttacks).not.toContainEqual({ x: 2, y: 3 });
	});

	it("Records multiple attacks in missedAttacks", () => {
		gameBoard.receiveAttack(2, 2);
		gameBoard.receiveAttack(2, 3);

		expect(gameBoard.missedAttacks).toContainEqual({ x: 2, y: 2 });
		expect(gameBoard.missedAttacks).toContainEqual({ x: 2, y: 3 });
	});

	it("Ignores attacks on already-hit cells", () => {
		gameBoard.receiveAttack(2, 2);
		gameBoard.receiveAttack(2, 2);

		expect(gameBoard.missedAttacks.length).toBe(1);
	});

	it("Reports all ships sunk when all are destroyed", () => {
		gameBoard.placeShip(ship, 2, 3, "horizontal");
		gameBoard.receiveAttack(2, 3);
		gameBoard.receiveAttack(2, 4);
		gameBoard.receiveAttack(2, 5);

		expect(gameBoard.allShipsSunk()).toBe(true);
	});

	it("Reports not all ships sunk when at one is still afloat", () => {
		gameBoard.placeShip(ship, 2, 3, "horizontal");
		gameBoard.receiveAttack(2, 3);
		gameBoard.receiveAttack(3, 3);

		expect(gameBoard.allShipsSunk()).toBe(false);
	});

	it("Reports not all ships sunk when at least one of many is still afloat", () => {
		const ship2 = new Ship(3);

		gameBoard.placeShip(ship, 2, 3, "horizontal");
		gameBoard.placeShip(ship2, 0, 5, "horizontal");

		gameBoard.receiveAttack(2, 3);
		gameBoard.receiveAttack(3, 3);
		gameBoard.receiveAttack(4, 3);

		expect(gameBoard.allShipsSunk()).toBe(false);
	});

	it("Reports all ships sunk when there are no ships on the board", () => {
		expect(gameBoard.allShipsSunk()).toBe(true);
	});
});
