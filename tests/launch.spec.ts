import { test, expect } from "@playwright/test";

test("homepage navigation, card details, and mobile width", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.numunix.com");
  const button = page.getByRole("button", { name: "Explore Workspace Consulting", exact: true });
  await button.scrollIntoViewIfNeeded();
  await button.click();
  await expect(page.getByRole("button", { name: "Close Workspace Consulting", exact: true })).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Key Deliverables", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close service details", exact: true }).click();
  await expect(page.getByRole("button", { name: "Explore Workspace Consulting", exact: true })).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.screenshot({ path: test.info().outputPath("homepage.png"), fullPage: true });
  expect(errors).toEqual([]);
});

test("public pages metadata, status, and no horizontal overflow", async ({ page }) => {
  for (const path of ["/about", "/contact", "/listings", "/areas-we-serve", "/blog", "/certification", "/we-help", "/office-space/bangalore", "/office-space/bangalore/whitefield", "/services/workspace-consulting"]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("main, [role=main]").first()).toBeVisible();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBeTruthy();
  }
});

test("private routes, missing pages, redirects, robots and API validation", async ({ page, request }) => {
  await page.goto("/admin/dashboard");
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.locator('head meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  await page.goto("/listings/does-not-exist");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  await expect(page.locator('head meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
  const redirect = await request.get("/blog/best-workspace-consultant-everyspaces", { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe("/blog/best-workspace-consultant-numunix");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("https://www.numunix.com/sitemap.xml");
  expect(robots).not.toContain("User-Agent: Googlebot");
  expect((await request.post("/api/contact", { data: {} })).status()).toBe(400);
  expect((await request.post("/api/contact", { data: "{", headers: { "Content-Type": "application/json" } })).status()).toBe(400);
  expect((await request.post("/api/contact", { data: "plain text", headers: { "Content-Type": "text/plain" } })).status()).toBe(415);
});

test("contact form recovers after a failed network request", async ({ page }) => {
  await page.goto("/contact");
  const form = page.locator("form").first();
  await form.locator('input[type="text"]').nth(0).fill("Test User");
  await form.locator('input[type="email"]').fill("test@example.invalid");
  await form.locator('input[type="tel"]').fill("9999999999");
  await form.locator("select").nth(0).selectOption("6-15");
  await form.locator('input[type="text"]').nth(1).fill("Whitefield");
  await form.locator("select").nth(1).selectOption("Within 1 Month");
  await page.route("**/api/contact", route => route.abort());
  const button = form.getByRole("button", { name: "Start My Office Search" });
  await button.click();
  await expect(page.getByText("We couldn't send your request. Check your connection and try again.")).toBeVisible();
  await expect(button).toBeEnabled();
});
