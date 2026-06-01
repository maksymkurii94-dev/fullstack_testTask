import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeMongo } from "./mongoNormalize.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JSON_DIR = path.resolve(__dirname, "../../../JSON");

const cache = new Map();

export function loadCollection(name) {
  if (!cache.has(name)) {
    const filePath = path.join(JSON_DIR, `${name}.json`);
    const raw = readFileSync(filePath, "utf8");
    cache.set(name, normalizeMongo(JSON.parse(raw)));
  }
  return cache.get(name);
}

export function clearJsonCache() {
  cache.clear();
}
