import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "child_process";
import { toPascalCase } from "./helpers/toPascalCase";

export const setupCDK = (): void => {
	console.log("🛠️ Setting up AWS CDK...");

	console.log("📦 Installing AWS CDK as a project dependency...");
	execSync("npm install --save-dev aws-cdk", { stdio: "inherit" });

	const projectName = toPascalCase(path.basename(process.cwd()));
	const cdkJsonPath = path.join(process.cwd(), "cdk.json");
	const binDirPath = path.join(process.cwd(), "bin");
	const stacksDirPath = path.join(process.cwd(), "cdk/stacks");
	const templateDir = path.join(__dirname, "../templates");
	const cdkJsonTemplate = path.join(templateDir, "cdk.json");
	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "cdk-init-"));

	if (!fs.existsSync(cdkJsonPath)) {
		try {
			console.log(
				"🚀 Initializing AWS CDK project in a temporary directory...",
			);
			execSync("cdk init app --language=typescript", {
				cwd: tempDir,
				stdio: "inherit",
			});

			const tempCdkJsonPath = path.join(tempDir, "cdk.json");
			const tempBinDirPath = path.join(tempDir, "bin");
			const tempLibDirPath = path.join(tempDir, "lib");

			if (fs.existsSync(tempCdkJsonPath)) {
				const cdkJsonContent = JSON.parse(
					fs.readFileSync(tempCdkJsonPath, "utf8"),
				);
				if (cdkJsonContent.app) {
					cdkJsonContent.app = "npx ts-node --prefer-ts-exts bin/app.ts";
				}
				fs.writeFileSync(cdkJsonPath, JSON.stringify(cdkJsonContent, null, 2));
				console.log("✅ cdk.json updated to reference the correct bin file.");
			} else {
				console.error("❌ Error: cdk.json was not generated by cdk init.");
			}

			if (fs.existsSync(tempBinDirPath)) {
				fs.cpSync(tempBinDirPath, binDirPath, { recursive: true });
				console.log("✅ bin directory copied to project root.");

				const generatedBinFiles = fs
					.readdirSync(binDirPath)
					.filter((file) => file.startsWith("cdk-init-"));
				if (generatedBinFiles.length > 0) {
					const generatedBinFile = path.join(binDirPath, generatedBinFiles[0]);
					const renamedBinFile = path.join(binDirPath, "app.ts");
					fs.renameSync(generatedBinFile, renamedBinFile);
					console.log("✅ Renamed", generatedBinFile, "to app.ts");

					let content = fs.readFileSync(renamedBinFile, "utf8");
					let lines = content.split("\n");

					lines = lines.map((line) => {
						if (line.includes("import {") && line.includes("Stack } from")) {
							return `import { ${projectName}Stack } from "../cdk/stacks/${projectName}Stack";`;
						}
						if (line.includes("new ") && line.includes("Stack(")) {
							return `new ${projectName}Stack(app, "${projectName}Stack", {`;
						}
						return line;
					});

					content = lines.join("\n");
					fs.writeFileSync(renamedBinFile, content);
					console.log(
						`✅ Updated stack class name, import path, and stack ID in app.ts to ${projectName}Stack`,
					);
				} else {
					console.error("❌ Error: No cdk-init-* file found in bin directory.");
				}
			} else {
				console.error("❌ Error: bin directory was not generated by cdk init.");
			}

			if (fs.existsSync(tempLibDirPath)) {
				const stackFiles = fs
					.readdirSync(tempLibDirPath)
					.filter((file) => file.endsWith("stack.ts"));
				if (stackFiles.length > 0) {
					const tempStackFile = path.join(tempLibDirPath, stackFiles[0]);
					const newStackFilePath = path.join(
						stacksDirPath,
						`${projectName}Stack.ts`,
					);

					fs.copyFileSync(tempStackFile, newStackFilePath);
					console.log(`✅ Renamed stack file to ${projectName}Stack.ts`);

					let stackContent = fs.readFileSync(newStackFilePath, "utf8");
					stackContent = stackContent.replace(
						/class \w+Stack /,
						`class ${projectName}Stack `,
					);
					fs.writeFileSync(newStackFilePath, stackContent);
					console.log(
						`✅ Updated stack class name inside ${projectName}Stack.ts`,
					);
				} else {
					console.error("❌ Error: No stack file found in lib directory.");
				}
			} else {
				console.error("❌ Error: lib directory was not generated by cdk init.");
			}

			fs.rmSync(tempDir, { recursive: true, force: true });
			console.log("🗑️ Temporary directory removed.");

			console.log("📦 Installing aws-cdk-lib as a project dependency...");
			execSync("npm install aws-cdk-lib", { stdio: "inherit" });
		} catch (error) {
			console.error("⚠️ CDK init failed. Using template instead.");
			if (fs.existsSync(cdkJsonTemplate)) {
				fs.copyFileSync(cdkJsonTemplate, cdkJsonPath);
				console.log("✅ cdk.json created from template.");
			} else {
				console.error("❌ Error: No cdk.json template found.");
			}
		}
	} else {
		console.log("⚠️ CDK project already exists. Skipping `cdk init`.");
	}
};
