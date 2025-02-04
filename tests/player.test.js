//  player.test.js

const { Player, ComputerPlayer } = require("../src/game/Player.js");
const GameBoard = require("../src/game/GameBoard.js");

describe("Player", () => {
	let player1;
	let computer;

	beforeEach(() => {
		player1 = new Player("Username");
		computer = new ComputerPlayer();
	});

	it("Initialize Player with correct properties", () => {
		expect(player1.name).toBe("Username");
		expect(player1.gameBoard).toBeInstanceOf(GameBoard);
	});

	it("Initialize ComputerPlayer with correct properties", () => {
		expect(computer.name).toBe("Computer");
		expect(computer.gameBoard).toBeInstanceOf(GameBoard);
		expect(computer).toBeInstanceOf(Player);
	});

	it("It should always initialize with the name 'Computer', even when a different name is provided.", () => {
		let notComputer = new ComputerPlayer("notComputer");

		expect(notComputer.name).toBe("Computer");
	});
});
