import { BoardRenderer } from "../src/ui/BoardRenderer.js";
import { GameBoard } from "../src/game/GameBoard.js";

describe("BoardRenderer", () => {
	let gameBoard;
	let playersBoardContainer;
	let boardRenderer;

	beforeEach(() => {
		gameBoard = new GameBoard();
		playersBoardContainer = document.createElement("div");
		boardRenderer = new BoardRenderer(gameBoard, playersBoardContainer);
	});

	it("Initialize BoardRenderer with correct properties.", () => {
		expect(boardRenderer.board).toBe(gameBoard);
		expect(boardRenderer.container).toBe(playersBoardContainer);
	});

	it("Should render the correct amount of cells in a board.", () => {
		boardRenderer.render();
		expect(playersBoardContainer.children.length).toBe(100);
	});
});
