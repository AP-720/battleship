import { UIManager } from "../src/ui/UIManager.js";

describe("UIManager", () => {
	let uiManager;
	let messageContainer;

	beforeEach(() => {
		messageContainer = document.createElement("div");
		uiManager = new UIManager(messageContainer);
	});

	it("Should display message", () => {
		const testMessage = "test";

		uiManager.setMessage(testMessage);

		expect(messageContainer.innerText).toBe("test");
	});

	it("Should clear element", () => {
		messageContainer.innerText = "test";

		uiManager.clearMessage();

		expect(messageContainer.innerText).toBe("");
	});
});
