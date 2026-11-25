import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const review =
  "Gravity: perfect uptime, zero maintenance, and the one time you need it to fail — dropping your keys down a drain — it works flawlessly.";

const chars = [...review].length;
if (chars < 1 || chars > 160) {
  throw new Error(`review must be 1-160 characters, got ${chars}`);
}
if (review.trim().length === 0) {
  throw new Error("review must not be only whitespace");
}
if (/[\r\n]/.test(review)) {
  throw new Error("review must be a single line");
}
if (review !== review.trim()) {
  throw new Error("review must not start or end with whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, review, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== review) {
  throw new Error("entry.txt does not match the review byte for byte");
}
console.log(`wrote ${chars} characters to ${outPath}`);
