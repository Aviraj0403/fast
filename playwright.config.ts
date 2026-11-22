import { defineConfig } from "@playwright/test";

/**
 * Smoke tests for the pages that bring in and serve students. They run against a production build and use the installed
 * Google Chrome (no browser download). The platform API is replaced with fixed answers inside each test, so nothing real is called.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 0,
  reporter: "list",
  use: { baseURL: "http://localhost:3100", channel: "chrome", headless: true },
  webServer: {
    command: "npx next build && npx next start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 240_000,
  },
});
