import { execSync } from "child_process";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setupCDK } from "../src/cdk-setup";

vi.mock("child_process", () => ({
	execSync: vi.fn(),
}));

describe("CDK setup", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should install dependencies", () => {
		setupCDK();
		expect(execSync).toHaveBeenCalledWith("npm install --save-dev aws-cdk", {
			stdio: "inherit",
		});
	});
});
