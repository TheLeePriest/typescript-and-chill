import fs from "node:fs";
import path from "node:path";

export const setupCICD = (): void => {
	console.log("🛠️ Setting up CI/CD...");

	const templatePath = path.join(__dirname, "../templates/deploy.yml");
	const destinationPath = path.join(
		process.cwd(),
		".github/workflows/deploy.yml",
	);

	// Ensure the .github/workflows directory exists
	fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

	if (fs.existsSync(templatePath)) {
		fs.copyFileSync(templatePath, destinationPath);
		console.log("✅ CI/CD workflow file created.");
	} else {
		console.error("❌ Missing template: deploy.yml");
	}
};

module.exports = { setupCICD };
