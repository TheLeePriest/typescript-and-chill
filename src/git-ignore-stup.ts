import fs from "node:fs";
import path from "node:path";

export const setupGitIgnore = (): void => {
	console.log("🛠️ Setting up Gitignore...");
	fs.copyFileSync(path.join(__dirname, "../templates/gitignore"), ".gitignore");
};
