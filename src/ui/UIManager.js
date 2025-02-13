// UIManager.js

export class UIManager {
	constructor(messageElement) {
		this.messageElement = messageElement;
	}

	setMessage(messageContent) {
		this.clearMessage();
		this.messageElement.innerText = messageContent;
	}

	clearMessage() {
		this.messageElement.innerText = "";
	}
}
