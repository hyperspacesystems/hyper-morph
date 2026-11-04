import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
const bin = join(dirname(require.resolve("@web/test-runner")), "bin.js");
const [browsers = "chromium", ...args] = process.argv.slice(2);
if (
  !browsers
    .split(",")
    .every((name) => ["chromium", "firefox", "webkit"].includes(name))
)
  throw new Error("Unknown browser selection");
const result = spawnSync(process.execPath, [bin, ...args], {
  stdio: "inherit",
  env: { ...process.env, HYPER_TEST_BROWSERS: browsers },
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
