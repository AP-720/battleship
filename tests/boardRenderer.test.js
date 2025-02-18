import { BoardRenderer, BOARD_TYPE } from "../src/ui/BoardRenderer.js";
import { GameBoard } from "../src/game/GameBoard.js";
import { Ship } from "../src/game/Ship.js";

describe("BoardRenderer", () => {
	let gameBoard;
	let playersBoardContainer;
	let humanBoardRenderer;
	let computerBoardRenderer

	beforeEach(() => {
		gameBoard = new GameBoard();
		playersBoardContainer = document.createElement("div");
		humanBoardRenderer = new BoardRenderer(
			gameBoard,
			playersBoardContainer,
			BOARD_TYPE.HUMAN
		);
		computerBoardRenderer = new BoardRenderer(
			gameBoard,
			playersBoardContainer,
			BOARD_TYPE.COMPUTER
		);
	});

	it("Initialize BoardRenderer with correct properties.", () => {
		expect(humanBoardRenderer.board).toBe(gameBoard);
		expect(humanBoardRenderer.container).toBe(playersBoardContainer);
		expect(humanBoardRenderer.boardType).toBe(BOARD_TYPE.HUMAN);
	});

	it("Should render the correct amount of cells in a board.", () => {
		humanBoardRenderer.render();
		expect(playersBoardContainer.children.length).toBe(100);
	});

	it("Should render ships on the human board", () => {
		const ship = new Ship(3);
		gameBoard.placeShip(ship, 0, 0, "horizontal");
		humanBoardRenderer.render();

		const cells = playersBoardContainer.querySelectorAll(".cell");
		expect(cells[0].classList.contains("ship")).toBe(true);
		expect(cells[1].classList.contains("ship")).toBe(true);
		expect(cells[2].classList.contains("ship")).toBe(true);
	});

	it("Should not render ships on the computer board", () => {
		const ship = new Ship(3);
		gameBoard.placeShip(ship, 0, 0, "horizontal");
		computerBoardRenderer.render();

		const cells = playersBoardContainer.querySelectorAll(".cell");
		expect(cells[0].classList.contains("ship")).toBe(false);
		expect(cells[1].classList.contains("ship")).toBe(false);
		expect(cells[2].classList.contains("ship")).toBe(false);
	});

	it("Should render hits on ships", () => {
		const ship = new Ship(3);
		gameBoard.placeShip(ship, 0, 0, "horizontal");
		gameBoard.receiveAttack(0, 0);
		humanBoardRenderer.render();

		const cells = playersBoardContainer.querySelectorAll(".cell");
		expect(cells[0].classList.contains("ship")).toBe(true);

		const marker = cells[0].querySelector(".marker");
		expect(marker).not.toBeNull();
		expect(marker.classList.contains("hit")).toBe(true);
	});

	it("Should render miss on the board", () => {
		gameBoard.receiveAttack(0, 0);
		humanBoardRenderer.render();

		const cells = playersBoardContainer.querySelectorAll(".cell");

		const marker = cells[0].querySelector(".marker");
		expect(marker).not.toBeNull();
		expect(marker.classList.contains("miss")).toBe(true);
	});

	it("Should render cells with correct coordinates", () => {
		humanBoardRenderer.render();

		const cells = playersBoardContainer.querySelectorAll(".cell");
		expect(cells[0].getAttribute("data-x")).toBe("0");
		expect(cells[0].getAttribute("data-y")).toBe("0");
		expect(cells[11].getAttribute("data-x")).toBe("1"); // (1 * 10) + 1 = 11
		expect(cells[11].getAttribute("data-y")).toBe("1");
	});
});
