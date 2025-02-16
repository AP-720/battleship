// gameController.test.js
import jest from "jest-mock";
import { GameController, AttackResult } from "../src/game/GameController.js";
import { GameBoard } from "../src/game/GameBoard.js";
import { BoardRenderer } from "../src/ui/BoardRenderer.js";
import { UIManager } from "../src/ui/UIManager.js";
import { Ship } from "../src/game/Ship.js";

describe("GameController", () => {
	let gameController;
	let humanBoard;
	let computerBoard;
	let humanRenderer;
	let computerRenderer;
	let messageContainer;
	let uiManager;

	beforeEach(() => {
		humanBoard = new GameBoard();
		computerBoard = new GameBoard();
		messageContainer = document.createElement("div");
		uiManager = new UIManager(messageContainer);
		humanRenderer = new BoardRenderer(
			humanBoard,
			document.createElement("div")
		);
		computerRenderer = new BoardRenderer(
			computerBoard,
			document.createElement("div")
		);
		gameController = new GameController(
			humanBoard,
			computerBoard,
			humanRenderer,
			computerRenderer,
			uiManager
		);
	});

	it("Initialize GameController with correct properties.", () => {
		gameController.initializeGame();

		expect(gameController.humanBoard).toBeInstanceOf(GameBoard);
		expect(gameController.humanRenderer).toBeInstanceOf(BoardRenderer);
		expect(gameController.computerBoard).toBeInstanceOf(GameBoard);
		expect(gameController.computerRenderer).toBeInstanceOf(BoardRenderer);
		expect(gameController.isHumanTurn).toBe(true);
	});

	it("Player can attack valid coordinate", () => {
		gameController.initializeGame();
		gameController.handleHumanAttack(0, 0);

		expect(computerBoard.grid[0][0].isHit).toBe(true);
		expect(gameController.isHumanTurn).toBe(false);
	});

	it("Player can't attack same coordinates twice", () => {
		const spy = jest.spyOn(computerBoard, "receiveAttack");

		gameController.initializeGame();
		gameController.handleHumanAttack(0, 0);
		gameController.handleHumanAttack(0, 0);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(gameController.isHumanTurn).toBe(false);
	});

	it("should return INVALID when attacking the same cell twice", () => {
		gameController.initializeGame();

		// First attack (should return VALID)
		const firstAttackResult = gameController.handleHumanAttack(0, 0);
		expect(firstAttackResult).toBe(AttackResult.VALID); // Verify the first attack is valid

		// Second attack on the same cell (should return INVALID)
		const secondAttackResult = gameController.handleHumanAttack(0, 0);
		expect(secondAttackResult).toBe(AttackResult.INVALID); // Verify the second attack is invalid
	});

	it("Computer can attack valid coordinate", () => {
		gameController.initializeGame();
		gameController.handleComputerAttack();

		// Ensure at least one cell in humanBoard is hit
		const hasHitCell = humanBoard.grid.some((row) =>
			row.some((cell) => cell.isHit)
		);
		expect(hasHitCell).toBe(true);

		expect(gameController.isHumanTurn).toBe(true);
	});

	it("should throw an error if no valid attack coordinates are found", () => {
		humanBoard.grid.forEach((row) => {
			row.forEach((cell) => {
				cell.isHit = true;
			});
		});
		expect(() => gameController.handleComputerAttack()).toThrow(
			"No valid attack coordinates found."
		);
	});

	it("Reports a win when all ships are sunk", () => {
		computerBoard.placeShip(new Ship(3), 0, 0, "horizontal");
		gameController.handleHumanAttack(0, 0);
		gameController.handleHumanAttack(0, 1);
		gameController.handleHumanAttack(0, 2);

		expect(gameController.checkForWin()).toBe(true);
	});

	it("Reports no win if not all ships are sunk", () => {
		gameController.initializeGame();
		gameController.handleHumanAttack(0, 0);
		gameController.handleHumanAttack(0, 1);

		expect(gameController.checkForWin()).toBe(false);
	});

	it("handleTurn stops game when player wins", () => {
		computerBoard.placeShip(new Ship(3), 0, 0, "horizontal");

		const spy = jest.spyOn(gameController, "handleTurn");

		gameController.handleTurn(0, 0);
		gameController.handleTurn(0, 1);
		gameController.handleTurn(0, 2);

		expect(gameController.checkForWin()).toBe(true);

		gameController.handleTurn(1, 0);

		expect(spy).not.toHaveBeenCalledTimes(3);
	});

	it("handleTurn doesn't stop game unless there is a winner", () => {
		gameController.initializeGame();

		const winSpy = jest.spyOn(gameController, "checkForWin");

		gameController.handleTurn(0, 0);
		expect(winSpy).toHaveBeenCalled();

		expect(gameController.checkForWin()).toBe(false);
	});

	it("should display invalid attack message", () => {
		gameController.initializeGame();

		gameController.handleTurn(0, 0);
		gameController.handleTurn(0, 0);

		expect(messageContainer.innerText).toBe("Invalid attack: Cell already hit");
	});

	it("Should display winner when all ships sunk", () => {
		computerBoard.placeShip(new Ship(3), 0, 0, "horizontal");
		gameController.handleTurn(0, 0);
		gameController.handleTurn(0, 1);
		gameController.handleTurn(0, 2);

		expect(messageContainer.innerText).toBe("You win!");
	});

	it("Should place single ship randomly", () => {
		const ship = new Ship(3);
		gameController.placeShipRandomly(ship, humanBoard);

		// Check if the ship is placed on the board
		const hasShip = humanBoard.grid.some((row) =>
			row.some((cell) => cell.ship !== null)
		);
		expect(hasShip).toBe(true);
	});

	it("Should place multiple ships randomly", () => {
		const ship = new Ship(2);
		const ship1 = new Ship(3);
		const ship2 = new Ship(4);

		// Place all ships randomly
		gameController.placeShipRandomly(ship, humanBoard);
		gameController.placeShipRandomly(ship1, humanBoard);
		gameController.placeShipRandomly(ship2, humanBoard);

		// Check if all ships are placed on the board
		const hasShips = humanBoard.grid.some((row) =>
			row.some((cell) => cell.ship !== null)
		);
		expect(hasShips).toBe(true);

		// Verify the total number of cells occupied by ships matches the sum of all ship lengths
		const allShipCells = humanBoard.grid
			.flat()
			.filter((cell) => cell.ship !== null);
		expect(allShipCells.length).toBe(ship.length + ship1.length + ship2.length);
	});

	it("Should place all 5 ships on board", () => {
		gameController.placeAllShips(humanBoard);

		const placedShips = new Set();

		humanBoard.grid.forEach((row) =>
			row.forEach((cell) => {
				if (cell.ship) placedShips.add(cell.ship);
			})
		);

		expect(placedShips.size).toBe(5);
	});

	it("should reset and place ships", () => {
		gameController.initializeGame();

		const initialGameBoard = GameController.humanBoard;

		const placeAllShipsSpy = jest.spyOn(gameController, "placeAllShips");

		const renderSpy = jest.spyOn(humanRenderer, "render");

		gameController.resetAndPlaceShips();

		expect(gameController.humanBoard).not.toBe(initialGameBoard);
		expect(placeAllShipsSpy).toHaveBeenCalled();
		expect(renderSpy).toHaveBeenCalled();
	});
});
