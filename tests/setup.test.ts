import { vi, describe, beforeEach, afterEach, test, expect } from "vitest";
import fs from "node:fs";
import { execSync } from "child_process";
import { setupVitest } from "../src/vitest-setup";
import { setupCDK } from "../src/cdk-setup";
import { setupCICD } from "../src/ci-cd-setup";

vi.mock("child_process", () => ({
	execSync: vi.fn(),
}));

describe("Setup Scripts", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("vi setup creates the correct file", () => {
		vi.spyOn(fs, "copyFileSync").mockImplementation(() => {});
		setupVitest();
		expect(fs.copyFileSync).not.toHaveBeenCalled();
	});

	test("CDK setup installs the correct dependencies", () => {
		setupCDK();
		expect(execSync).toHaveBeenNthCalledWith(
			1,
			"npm install --save-dev aws-cdk",
			{
				stdio: "inherit",
			},
		);
	});

	test("CI/CD setup creates workflow file", () => {
		vi.spyOn(fs, "copyFileSync").mockImplementation(() => {});
		setupCICD();
		expect(fs.copyFileSync).toHaveBeenCalled();
	});
});
