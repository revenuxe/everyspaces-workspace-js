import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests", timeout: 45000, workers: 1,
  use: { baseURL: "http://127.0.0.1:3100", launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || "C:/Program Files/Google/Chrome/Application/chrome.exe" }, trace: "retain-on-failure" },
  projects: [{ name: "desktop", use: { viewport: { width: 1440, height: 900 } } }, { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } }],
  webServer: { command: "npm run start -- -p 3100", env: { NEXT_BUILD_DIR: ".next-audit" }, url: "http://127.0.0.1:3100", reuseExistingServer: false, timeout: 60000 },
});
