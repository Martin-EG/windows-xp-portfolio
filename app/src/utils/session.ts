// Remembers that the visitor already logged in this tab, so reloads go straight to the desktop.
// Lives outside the store because the server-rendered layout reads it too.
export const LOGGED_IN_STORAGE_KEY = "xp-portfolio-logged-in";
