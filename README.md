# Windows XP Portfolio

My personal portfolio, built as a Windows XP desktop. Open documents to read about my experience and skills, browse the Projects folder for demos, and use the Start menu for quick links.

**Live site:** https://martin-espericueta.vercel.app/

## Features

- Boot, login and shutdown screens (shown once per browser tab session; press any key to skip the boot)
- Desktop icons that select on click and open on double-click (single tap on touch screens, Enter on the keyboard)
- Start menu with All Programs, Log Off and Turn Off Computer, and a taskbar with tray icons and a live clock
- Multiple windows that cascade, drag by the title bar, maximize (button or title bar double-click), minimize to the taskbar and come to the front on click
- Projects folder with video previews of each project
- Keyboard and screen reader support: windows are labelled dialogs, Escape closes windows and the Start menu, and focus returns to where you were
- Respects `prefers-reduced-motion`

## Tech stack

- [Next.js](https://nextjs.org) (App Router) and React
- TypeScript
- [styled-components](https://styled-components.com) for styling (Tailwind is only used for its CSS reset)
- [Zustand](https://zustand.docs.pmnd.rs) for window and Start menu state
- [Playwright](https://playwright.dev) for end-to-end tests
- Deployed on [Vercel](https://vercel.com) with Vercel Analytics

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run the Playwright tests against the production build (run `npm run build` first) |

The first time you run the tests, install the browser with `npx playwright install chromium`.

## Project structure

```
app/
  page.tsx              Desktop + taskbar
  src/
    components/         Window (DocumentViewer), FolderViewer, Shortcut, StartMenu, Taskbar
    sections/           Desktop and the document contents (Welcome, Experience, Skills, Contact)
    data/               Content: experience, skills, projects, programs and links
    store/              Zustand stores for open windows, the Start menu, the session screens and the selected project
    types/              Shared TypeScript types
public/
  images/               Icons, wallpaper and profile photo
  videos/               Project preview videos and posters
  files/                CV
tests/                  Playwright smoke tests
```

Most content changes only touch `app/src/data/`. To add a new document, add a program to `data/Programs.ts`, create its component in `sections/Documents/`, and register it in `documentBodies` in `components/DocumentViewer/DocumentViewer.tsx`.

## CI

GitHub Actions runs lint, type checking, the production build and the Playwright tests on every pull request and on pushes to `main`.
