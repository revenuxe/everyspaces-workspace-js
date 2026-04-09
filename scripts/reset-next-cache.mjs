import fs from "fs";
import path from "path";

const root = process.cwd();
const targets = [".next", "tsconfig.tsbuildinfo"];

for (const target of targets) {
  const fullPath = path.join(root, target);
  fs.rmSync(fullPath, { recursive: true, force: true });
}
