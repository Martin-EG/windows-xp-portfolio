import { expect, Page, test } from "@playwright/test";

const windowTitled = (page: Page, title: string) =>
  page.getByRole("dialog", { name: title, exact: true });

// Mouse users double-click desktop icons; touch users tap them
const openShortcut = async (page: Page, name: string, isMobile: boolean) => {
  const shortcut = page.getByRole("button", { name });
  if (isMobile) {
    await shortcut.tap();
  } else {
    await shortcut.dblclick();
  }
};

// On phones the Welcome window covers the desktop shortcuts, so close it first
const closeWelcome = async (page: Page) => {
  await page.getByRole("button", { name: "Close Welcome" }).click();
  await expect(windowTitled(page, "Welcome")).toHaveCount(0);
};

const openFromStartMenu = async (page: Page, name: string) => {
  await page.getByRole("button", { name: "Start" }).click();
  await page.getByRole("region", { name: "Start menu" }).getByRole("button", { name }).click();
};

test.describe("logged in", () => {
  test.beforeEach(async ({ page }) => {
    // Skip the boot and login screens; they have their own tests below
    await page.addInitScript(() => sessionStorage.setItem("xp-portfolio-logged-in", "1"));
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
    test(`opens ${title} from the desktop`, async ({ page, isMobile }) => {
      await closeWelcome(page);
      await openShortcut(page, shortcut, isMobile);

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

  test("a single click only selects a desktop icon", async ({ page, isMobile }) => {
    test.skip(isMobile, "Taps open icons directly");
    await closeWelcome(page);

    await page.getByRole("button", { name: "Open My Skills document" }).click();
    await expect(windowTitled(page, "My Skills")).toHaveCount(0);

    await page.getByRole("button", { name: "Open My Skills document" }).dblclick();
    await expect(windowTitled(page, "My Skills")).toBeVisible();
  });

  test("windows can be dragged by the title bar and maximized", async ({ page, isMobile }) => {
    test.skip(isMobile, "Windows are always maximized on phones");
    const welcome = windowTitled(page, "Welcome");
    const titleBar = welcome.locator("#window-title-welcome");
    await welcome.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
    const before = (await welcome.boundingBox())!;

    const grab = (await titleBar.boundingBox())!;
    await page.mouse.move(grab.x + 40, grab.y + 10);
    await page.mouse.down();
    await page.mouse.move(grab.x + 140, grab.y + 60, { steps: 5 });
    await page.mouse.up();

    const afterDrag = (await welcome.boundingBox())!;
    expect(afterDrag.x - before.x).toBeCloseTo(100, 0);
    expect(afterDrag.y - before.y).toBeCloseTo(50, 0);

    await page.getByRole("button", { name: "Maximize Welcome" }).click();
    const viewport = page.viewportSize()!;
    const maximized = (await welcome.boundingBox())!;
    expect(maximized.x).toBe(0);
    expect(maximized.width).toBe(viewport.width);

    // Restoring puts the window back where it was dragged to
    await page.getByRole("button", { name: "Restore Welcome" }).click();
    expect((await welcome.boundingBox())!.x).toBeCloseTo(afterDrag.x, 0);
  });
});

test.describe("session screens", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("boots, logs in and skips the boot screen on reload", async ({ page }) => {
    await expect(page.getByRole("status", { name: "Starting up" })).toBeVisible();

    // After booting, the login screen continues by itself
    await expect(page.getByRole("dialog", { name: "welcome", exact: true })).toBeVisible({ timeout: 5_000 });
    await expect(windowTitled(page, "Welcome")).toBeVisible({ timeout: 5_000 });

    await page.reload();
    await expect(page.getByRole("status", { name: "Starting up" })).toBeHidden();
    await expect(windowTitled(page, "Welcome")).toBeVisible();
  });

  test("log off and turn off from the Start menu", async ({ page }) => {
    await page.keyboard.press("Enter");
    await page.getByRole("button", { name: /Martin Espericueta/ }).click();
    await expect(windowTitled(page, "Welcome")).toBeVisible();

    await page.getByRole("button", { name: "Start" }).click();
    await page.getByRole("button", { name: "Log Off" }).click();
    const loginScreen = page.getByRole("dialog", { name: "welcome", exact: true });
    await expect(loginScreen).toBeVisible();

    // After logging off, the login screen waits for the visitor instead of logging back in
    await page.waitForTimeout(2_500);
    await expect(loginScreen).toBeVisible();
    await expect(loginScreen.getByText("To begin, click your user name")).toBeVisible();

    await loginScreen.getByRole("button", { name: "Turn off computer" }).click();
    const restartButton = page.getByRole("button", { name: "Restart" });
    await expect(restartButton).toBeFocused({ timeout: 5_000 });

    await restartButton.click();
    await expect(page.getByRole("status", { name: "Starting up" })).toBeVisible();
  });
});
