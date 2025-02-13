// UIManager.js

export class UIManager {
	constructor(messageElement) {
		this.messageElement = messageElement;
	}

    setMessage(content) {
        this.messageElement.innerText = content
    }

    clearMessage() {
        this.messageElement.innerText = ""
    }
}
