// gameController.test.js
import jest from "jest-mock";
import { GameController, AttackResult } from "../src/game/GameController.js";
import { GameBoard } from "../src/game/GameBoard.js";
import { BoardRenderer } from "../src/ui/BoardRenderer.js";

describe("GameController", () => {
	let gameController;
	let humanBoard;
	let computerBoard;
	let humanRenderer;
	let computerRenderer;

	beforeEach(() => {
		humanBoard = new GameBoard();
		computerBoard = new GameBoard();
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
			computerRenderer
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
		gameController.initializeGame();
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
		gameController.initializeGame();

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
});
