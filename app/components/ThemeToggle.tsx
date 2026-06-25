"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * 다크모드 토글.
 * 기본 테마는 CSS(prefers-color-scheme)가 첫 페인트부터 처리 → no-flash, 무스크립트.
 * 사용자가 토글하면 <html>에 .dark/.light 클래스를 붙여 시스템 설정을 override하고 localStorage에 저장.
 * 아이콘은 CSS(dark: variant)로 전환하므로 JS 상태가 없어 hydration 불일치가 없다.
 */
export default function ThemeToggle() {
  // 마운트 후 저장된 명시적 선호를 클래스로 재적용 (없으면 시스템 설정 유지)
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("theme");
    } catch {
      /* localStorage 비활성 환경 무시 */
    }
    const root = document.documentElement;
    if (stored === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (stored === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, []);

  function toggle() {
    const root = document.documentElement;
    // 현재 유효 테마: 명시 클래스 우선, 없으면 시스템 설정
    const isDark = root.classList.contains("dark")
      ? true
      : root.classList.contains("light")
        ? false
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = !isDark;
    root.classList.toggle("dark", next);
    root.classList.toggle("light", !next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* localStorage 비활성 환경 무시 */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="다크/라이트 모드 전환"
      title="다크/라이트 모드 전환"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {/* 라이트일 때 달, 다크일 때 해 표시 */}
      <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
    </button>
  );
}
