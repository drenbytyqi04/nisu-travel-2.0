/**
 * Verifies every photo URL in src/data/images.ts actually resolves.
 *
 * Run this from a machine with normal internet access:
 *   npm run photos:check
 *
 * Any entry reported below needs its Unsplash ID corrected in
 * src/data/images.ts. Until then that entry falls back to generated art,
 * so the site still looks complete — but the photo is missing.
 */
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/data/images.ts", import.meta.url), "utf8");

const entries = [...source.matchAll(/"([\w-]+)":\s*\{[\s\S]*?src:\s*unsplash\("([^"]+)"\)/g)]
  .map(([, key, id]) => ({
    key,
    id,
    url: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=60`,
  }));

if (entries.length === 0) {
  console.log("No unsplash() entries found — nothing to check.");
  process.exit(0);
}

console.log(`Checking ${entries.length} photos…\n`);

const results = await Promise.all(
  entries.map(async (e) => {
    try {
      const res = await fetch(e.url, { method: "HEAD", redirect: "follow" });
      return { ...e, status: res.status, ok: res.ok };
    } catch (err) {
      return { ...e, status: 0, ok: false, error: String(err) };
    }
  }),
);

const bad = results.filter((r) => !r.ok);

for (const r of results.filter((r) => r.ok)) {
  console.log(`  ok   ${r.key}`);
}
for (const r of bad) {
  console.log(`  FAIL ${r.key}  (${r.status || r.error})  photo-${r.id}`);
}

console.log(`\n${results.length - bad.length}/${results.length} resolved.`);

if (bad.length) {
  console.log(
    `\n${bad.length} need a corrected Unsplash ID in src/data/images.ts.\n` +
      `They currently fall back to generated art.`,
  );
  process.exit(1);
}
