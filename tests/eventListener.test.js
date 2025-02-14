// eventListener.test.js
import jest from "jest-mock";
import { GameController } from "../src/game/GameController.js";
import { GameBoard } from "../src/game/GameBoard.js";
import { BoardRenderer } from "../src/ui/BoardRenderer.js";
import { UIManager } from "../src/ui/UIManager.js";

describe("EventListener", () => {
	let gameController;
	let humanBoard;
	let humanRenderer;
	let computerBoard;
	let computerRenderer;
	let computerBoardElement;
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

		computerBoardElement = document.createElement("div");
		computerBoardElement.innerHTML = `
        <div data-x="0" data-y="0" class="cell"></div>
        <div data-x="0" data-y="1" class="cell"></div>
        `;

		computerBoardElement.addEventListener("click", (event) => {
			const cell = event.target;
			const x = parseInt(cell.getAttribute("data-x"));
			const y = parseInt(cell.getAttribute("data-y"));

			gameController.handleTurn(x, y);
		});
	});

	it("should handle attack when cell clicked", () => {
		const handleTurnSpy = jest.spyOn(gameController, "handleTurn");

		const cell = computerBoardElement.querySelector(`[data-x="0"][data-y="0"]`);
		cell.click();

		expect(handleTurnSpy).toHaveBeenCalledWith(0, 0);

		expect(computerBoard.grid[0][0].isHit).toBe(true);
	});

	it("should re-render after attack", () => {
		const humanRenderSpy = jest.spyOn(humanRenderer, "render");
		const computerRenderSpy = jest.spyOn(computerRenderer, "render");

		const cell = computerBoardElement.querySelector(`[data-x="0"][data-y="0"]`);

		cell.click();

		gameController.handleComputerAttack();

		expect(humanRenderSpy).toHaveBeenCalled();
		expect(computerRenderSpy).toHaveBeenCalled();
	});
});
