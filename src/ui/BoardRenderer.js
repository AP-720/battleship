//  BoardRender.js

export class BoardRenderer {
	constructor(board, container) {
		this.board = board;
		this.container = container;
	}

	render() {
		this.container.replaceChildren();

		for (let x = 0; x < this.board.grid.length; x++) {
			for (let y = 0; y < this.board.grid[x].length; y++) {
				const cell = document.createElement("div");
				cell.classList.add("cell");
				cell.setAttribute("data-x-index", `${x}`);
				cell.setAttribute("data-y-index", `${y}`);
				this.container.appendChild(cell);
			}
		}
	}
}
