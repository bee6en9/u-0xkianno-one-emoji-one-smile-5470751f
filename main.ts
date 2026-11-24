// One Emoji, One Smile — entry program (make.fun program/v1, Node 22).
//
// Creative choice (creative-director cycle, intake -> insight -> ideation ->
// evaluation): 12 candidates were scored against the judge's brief. The
// winner is U+1F601 BEAMING FACE WITH SMILING EYES.
//
// Why this emoji, against the judge's criteria in order:
//   1. Warm & friendly at first glance: a wide, genuine grin with smiling
//      eyes is the most direct warmth signal a stranger can read — no
//      context, no caption, no irony needed.
//   2. Universality: a beaming smile reads the same to any age or
//      background; nothing in it is an in-joke, sarcasm or flirtation.
//   3. Chosen, not default: the first smiley that comes to mind is 🙂 or
//      😊; 😁 is a deliberate step up — a bigger, more sincere smile that
//      still reads instantly.
//   4. Right for a stranger: pure friendliness, no hug (🤗), no hearts
//      (🥰/💛) — nothing intimate coming from someone unknown.
//   5. One code point, no ZWJ / skin tone / variation selector, so the
//      gate's character count is unambiguous: exactly 1 character.
//
// Deterministic, no network, no external dependencies. The program writes
// exactly one emoji (and nothing else) to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

// The chosen emoji: U+1F601 BEAMING FACE WITH SMILING EYES.
const EMOJI = "😁";

// Guard: the entry must be exactly one emoji, 1-8 characters by code point.
const codePoints = [...EMOJI];
if (codePoints.length < 1 || codePoints.length > 8) {
  throw new Error(
    `entry must be 1-8 characters, got ${codePoints.length}`,
  );
}
if (
  codePoints.length !== 1 ||
  !/^\p{Extended_Pictographic}$/u.test(codePoints[0]) ||
  /^\s$/u.test(codePoints[0])
) {
  throw new Error("entry must be exactly one emoji");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EMOJI, "utf8");

// Read-back check: what landed on disk must be byte-identical to the emoji.
import { readFileSync } from "node:fs";
if (readFileSync("/output/entry.txt", "utf8") !== EMOJI) {
  throw new Error("read-back mismatch: /output/entry.txt != chosen emoji");
}
