import fs from "fs";
import path from "path";

function readDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const parsed = {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    parsed[key] = value;
  }
  return parsed;
}

const requiredVars = ["NEXT_PUBLIC_API_BASE_URL"];
const localEnv = readDotEnvFile(path.resolve(process.cwd(), ".env.local"));
const mergedEnv = { ...localEnv, ...process.env };

const missing = requiredVars.filter((key) => {
  const value = mergedEnv[key];
  return !value || !value.trim();
});

if (missing.length > 0) {
  console.error("Missing required environment variables:");
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  console.error("Set these in Vercel Project Settings > Environment Variables.");
  process.exit(1);
}

console.log("Environment check passed.");
