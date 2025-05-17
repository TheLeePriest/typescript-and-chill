import { expect, test, vi } from "vitest";
import fs from "node:fs";
import { setupCICD } from "../src/ci-cd-setup";

test("CI/CD setup should create the GitHub Actions workflow file", () => {
	vi.spyOn(fs, "copyFileSync").mockImplementation(() => {});
	setupCICD();
	expect(fs.copyFileSync).toHaveBeenCalled();
});
