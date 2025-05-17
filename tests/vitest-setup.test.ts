import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { setupVitest } from "../src/vitest-setup";
import { execSync } from "child_process";

vi.mock("child_process", () => ({
	execSync: vi.fn(),
}));

describe("setupVitest", () => {
	const originalConsoleLog = console.log;
	beforeEach(() => {
		vi.spyOn(console, "log").mockImplementation(() => {});
	});

	afterEach(() => {
		(console.log as typeof console.log) = originalConsoleLog;
		vi.resetModules();
		vi.restoreAllMocks();
		vi.clearAllMocks();
	});

	it("should log setup messages and call execSync with correct command", async () => {
		setupVitest();

		expect(console.log).toHaveBeenCalledWith("🛠️ Setting up ViTest...");
		expect(console.log).toHaveBeenCalledWith("📦 Installing Vitest...");
		expect(execSync).toHaveBeenCalledWith("npm install -D vitest", {
			stdio: "inherit",
		});
	});
});
