import { expect, Page, test } from "@playwright/test";

const windowTitled = (page: Page, title: string) =>
  page.getByRole("dialog", { name: title });

// On phones the Welcome window covers the desktop shortcuts, so close it first
const closeWelcome = async (page: Page) => {
  await page.getByRole("button", { name: "Close Welcome" }).click();
  await expect(windowTitled(page, "Welcome")).toHaveCount(0);
};

const openFromStartMenu = async (page: Page, name: string) => {
  await page.getByRole("button", { name: "Start" }).click();
  await page.getByRole("region", { name: "Start menu" }).getByRole("button", { name }).click();
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("loads with the Welcome window and no runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();

  await expect(windowTitled(page, "Welcome")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Hi! I’m Martin");
  await expect(page.locator("time")).toHaveText(/\d{1,2}:\d{2} (AM|PM)/);
  expect(errors).toEqual([]);
});

for (const [shortcut, title, heading] of [
  ["Open My Experience document", "My Experience", "My professional experience"],
  ["Open My Skills document", "My Skills", "My skills"],
  ["Open Contact document", "Contact", "Let’s get in touch"],
] as const) {
  test(`opens ${title} from the desktop`, async ({ page }) => {
    await closeWelcome(page);
    await page.getByRole("button", { name: shortcut }).click();

    const window = windowTitled(page, title);
    await expect(window).toBeVisible();
    await expect(window.getByRole("heading", { level: 1 })).toHaveText(heading);
  });
}

test("keeps several windows open and the taskbar minimizes and restores them", async ({ page }) => {
  await openFromStartMenu(page, "My Experience");

  await expect(windowTitled(page, "Welcome")).toBeAttached();
  await expect(windowTitled(page, "My Experience")).toBeVisible();

  const taskbarButton = (name: string) =>
    page.getByRole("region", { name: "Taskbar" }).getByRole("button", { name, exact: true });
  await expect(taskbarButton("My Experience")).toHaveAttribute("aria-pressed", "true");
  await expect(taskbarButton("Welcome")).toHaveAttribute("aria-pressed", "false");

  // Clicking the active window's button minimizes it and the window behind becomes active
  await taskbarButton("My Experience").click();
  await expect(windowTitled(page, "My Experience")).toHaveCount(0);
  await expect(taskbarButton("Welcome")).toHaveAttribute("aria-pressed", "true");

  await taskbarButton("My Experience").click();
  await expect(windowTitled(page, "My Experience")).toBeVisible();
  await expect(taskbarButton("My Experience")).toHaveAttribute("aria-pressed", "true");

  // Closing the top window hands focus to the one behind it
  await page.getByRole("button", { name: "Close My Experience" }).click();
  await expect(windowTitled(page, "Welcome")).toBeFocused();
});

test("Escape closes the window and returns focus to its shortcut", async ({ page }) => {
  await closeWelcome(page);
  const shortcut = page.getByRole("button", { name: "Open My Skills document" });
  await shortcut.focus();
  await page.keyboard.press("Enter");
  await expect(windowTitled(page, "My Skills")).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(windowTitled(page, "My Skills")).toHaveCount(0);
  await expect(shortcut).toBeFocused();
});

test("Start menu opens programs and closes afterwards", async ({ page }) => {
  const startButton = page.getByRole("button", { name: "Start" });
  await openFromStartMenu(page, "Contact");
  await expect(windowTitled(page, "Contact")).toBeVisible();
  await expect(startButton).toHaveAttribute("aria-expanded", "false");

  await startButton.click();
  await page.keyboard.press("Escape");
  await expect(startButton).toHaveAttribute("aria-expanded", "false");
  await expect(startButton).toBeFocused();
});

test("project previews load for every project", async ({ page }) => {
  await openFromStartMenu(page, "Projects");
  const projectsWindow = windowTitled(page, "Projects");

  for (const project of ["GlamVault", "GlamUI", "Doctor Allways", "CESPM app"]) {
    await projectsWindow.getByRole("button", { name: project, exact: true }).click();
    await expect(projectsWindow.getByRole("heading", { level: 2 })).toHaveText(project);

    const video = projectsWindow.locator("video");
    await expect(video).toHaveJSProperty("readyState", 4, { timeout: 10_000 });
  }
});

test("local links and assets resolve", async ({ page, request }) => {
  const hrefs = await page.locator("a[href^='/']").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")!)
  );
  await openFromStartMenu(page, "Contact");
  hrefs.push(...await windowTitled(page, "Contact").locator("a[href^='/']").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")!)
  ));

  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of new Set(hrefs)) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

test("exposes share previews and crawler files", async ({ page, request }) => {
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Martin Espericueta/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect((await request.get(new URL(ogImage!).pathname)).status()).toBe(200);

  for (const path of ["/robots.txt", "/sitemap.xml", "/manifest.json"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});
