// player.js

const GameBoard = require("../src/gameboard");

class Player {
	constructor(name) {
		this.name = name;
		this.gameBoard = new GameBoard();
	}
}

class ComputerPlayer extends Player {
    constructor(){
        super("Computer")
    }
}

module.exports = { Player, ComputerPlayer };
