// BoardRender.js
export const BOARD_TYPE = {
	HUMAN: "human",
	COMPUTER: "computer",
};

export class BoardRenderer {
	// Constructor initializes the BoardRenderer with a game board and a container element.
	constructor(board, container, boardType) {
		this.board = board; // The game board to render (instance of GameBoard).
		this.container = container; // The DOM element where the board will be rendered.
		// Type of board being rendered to prevent ships being rendered on computer board.
		this.boardType = boardType;
	}

	// Renders the entire game board in the container.
	render() {
		// Clear the container to remove any existing cells.
		this.container.replaceChildren();

		// Loop through each cell in the game board's grid.
		for (let x = 0; x < this.board.grid.length; x++) {
			for (let y = 0; y < this.board.grid[x].length; y++) {
				// Create a DOM element for the current cell.
				// Append the cell to the container.
				this.container.appendChild(this.createCell(x, y));
			}
		}
	}

	// Helper function which creates a DOM element for a single cell at the given coordinates.
	createCell(x, y) {
		// Create a div element to represent the cell.
		const cell = document.createElement("div");
		cell.classList.add("cell"); // Add the "cell" class for styling.

		// Add data attributes to store the cell's coordinates.
		cell.setAttribute("data-x", `${x}`);
		cell.setAttribute("data-y", `${y}`);

		// Get the grid cell data from the game board.
		const gridCell = this.board.grid[x][y];

		// If the cell contains a ship, add the "ship" class.
		if (gridCell.ship && this.boardType === BOARD_TYPE.HUMAN) {
			cell.classList.add("ship");
		}

		// If the cell has been hit, add a hit or miss marker.
		if (gridCell.isHit) {
			// Determine marker type.
			const markerType = gridCell.ship ? "hit" : "miss";
			// Create the marker.
			// Append the marker to the cell.
			cell.appendChild(this.createMarker(markerType));
		}
		return cell; // Return the fully constructed html cell element.
	}

	// Helper function which creates a marker element (hit or miss) for a cell.
	createMarker(type) {
		// Create a div element to represent the marker.
		const marker = document.createElement("div");
		// Add the "marker" class for styling.
		// Add the type-specific class (hit or miss).
		marker.classList.add("marker", type);

		return marker; // Return the fully constructed html marker element.
	}
}
