const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const packageJsonPath = path.join(__dirname, "../package.json");
const changelogPath = path.join(__dirname, "../CHANGELOG.md");

// Get the release type from command-line arguments (default to 'patch')
const args = process.argv.slice(2);
const releaseType = args[0] || process.env.npm_config_type || "patch";

if (!["major", "minor", "patch"].includes(releaseType)) {
  console.error("❌ Invalid release type. Use 'major', 'minor', or 'patch'.");
  process.exit(1);
}

// Read package.json version
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Determine new version based on the specified release type
const newVersion = execSync(`npm version ${releaseType} --no-git-tag-version`).toString().trim();
packageJson.version = newVersion.replace("v", "");
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

const date = new Date().toISOString().split("T")[0];

// Fetch the latest commit messages since the last version
const changes = execSync(`git log --oneline $(git describe --tags --abbrev=0)..HEAD`).toString().trim();
const newEntry = `\n## [${newVersion}] - ${date} (${releaseType.toUpperCase()} RELEASE)\n\n${changes}\n\n`;

// Update or create CHANGELOG.md
if (fs.existsSync(changelogPath)) {
  fs.appendFileSync(changelogPath, newEntry);
} else {
  fs.writeFileSync(changelogPath, `# Changelog\n${newEntry}`);
}

console.log("✅ Version updated to", newVersion);
console.log("✅ Changelog updated!");

// Commit changes and push
execSync("git add package.json CHANGELOG.md", { stdio: "inherit" });
execSync(`git commit -m "chore(release): ${newVersion}"`, { stdio: "inherit" });
execSync("git push --follow-tags", { stdio: "inherit" });

// Publish to NPM
console.log("🚀 Publishing to NPM...");
execSync("npm publish", { stdio: "inherit" });
console.log("🎉 Successfully published to NPM!");