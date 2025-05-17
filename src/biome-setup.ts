import { execSync } from "child_process";

export const setupBiome = (): void => {
	console.log("🛠️ Setting up Biome...");

	console.log("📦 Installing Biome...");
	execSync("npm install --save-dev --save-exact @biomejs/biome", {
		stdio: "inherit",
	});

	console.log("📦 Initializing Biome...");
	execSync("npx @biomejs/biome init", { stdio: "inherit" });
};
