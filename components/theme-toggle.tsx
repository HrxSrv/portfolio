"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "./icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {mounted ? isDark ? <Sun /> : <Moon /> : <span className="h-4 w-4" />}
    </button>
  );
}
