// player.js

import { GameBoard } from "./GameBoard.js";

export class Player {
	constructor(name) {
		this.name = name;
		this.gameBoard = new GameBoard();
	}
}

export class ComputerPlayer extends Player {
	constructor() {
		super("Computer");
	}
}

// module.exports = { Player, ComputerPlayer };
