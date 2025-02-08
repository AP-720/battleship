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
				const cell = this.createCell(x, y);

				this.container.appendChild(cell);
			}
		}
	}

	createCell(x, y) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.setAttribute("data-x", `${x}`);
		cell.setAttribute("data-y", `${y}`);

		const gridCell = this.board.grid[x][y];

		if (gridCell.ship) {
			cell.classList.add("ship");
		}

		if (gridCell.isHit) {
			const markerType = gridCell.ship ? "hit" : "miss";
			const marker = this.createMarker(markerType);
			cell.appendChild(marker);
		}

		return cell;
	}

	createMarker(type) {
		const marker = document.createElement("div");
		marker.classList.add("marker");
		marker.classList.add(type);

		return marker;
	}
}
