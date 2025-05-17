import { describe, it, vi, expect, afterEach, beforeEach } from "vitest";
import { setupBiome } from "../src/biome-setup";
import { execSync } from "child_process";

vi.mock("child_process", () => ({
	execSync: vi.fn(),
}));

describe("setupBiome", () => {
	let consoleLogSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		vi.clearAllMocks();
		consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
	});

	afterEach(() => {
		consoleLogSpy.mockRestore();
	});

	it("should log setup steps and call execSync with correct commands", () => {
		setupBiome();

		expect(consoleLogSpy).toHaveBeenCalledWith("🛠️ Setting up Biome...");
		expect(consoleLogSpy).toHaveBeenCalledWith("📦 Installing Biome...");
		expect(execSync).toHaveBeenCalledWith(
			"npm install --save-dev --save-exact @biomejs/biome",
			{ stdio: "inherit" },
		);
		expect(consoleLogSpy).toHaveBeenCalledWith("📦 Initializing Biome...");
		expect(execSync).toHaveBeenCalledWith("npx @biomejs/biome init", {
			stdio: "inherit",
		});
		expect(execSync).toHaveBeenCalledTimes(2);
	});
});
