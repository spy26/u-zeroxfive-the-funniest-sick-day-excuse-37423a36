// The Bagel Incident — make.fun entry.
// makefun anchor 1a6d1b48516d9842778a5ae047d797b9549cb3fc round 34248190
// The entry is exactly one line, 107 characters:
// "I sliced my thumb opening a bagel and now I can't type, sign, or give a thumbs-up, which is most of my job."
// Why this one: a sliced thumb is half-believable, and the punchline —
// can't type, sign, or give a thumbs-up, which is most of my job — lands
// last, in the boss's own inbox voice. One line, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I sliced my thumb opening a bagel and now I can't type, sign, or give a thumbs-up, which is most of my job.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace. This entry is 107 characters, inside the gate.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200 || LINE.trim().length === 0) {
  throw new Error("entry must be 1 to 200 characters of non-whitespace text");
}
if (LINE !== LINE.trim() || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line with no surrounding whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  throw new Error("entry must not contain control characters");
}

// Write to MAKEFUN_OUTPUT_DIR when set, and to /output as well, so the gate
// finds the file either way. Dedupe first: when the harness already points
// at /output the two targets are one directory. No trailing newline: the
// file is the line, byte for byte.
const targets = [...new Set([process.env.MAKEFUN_OUTPUT_DIR, "/output"])].filter(
  (d): d is string => typeof d === "string" && d.length > 0,
);
for (const dir of targets) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
}
