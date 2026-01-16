import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme-provider';

const ThemeToggle = () => {

  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark';
  console.log('theme', theme)

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}

      className="p-2.5 rounded-xl transition-all active:scale-90 border
             bg-white border-black/10 text-slate-800
             dark:bg-white/5 dark:border-white/10 dark:text-slate-400
             hover:bg-green-500/10 hover:text-green-600
             dark:hover:bg-white/10 dark:hover:text-green-400"
      title={isDark ? "Light mode" : "Dark mode"}

    >
      {isDark ? <Sun size={20} className="animate-in spin-in-12 duration-500"/> : <Moon size={20} strokeWidth={2.5} className="text-slate-900 fill-slate-900/10" />}
    </button>
  );
};

export default ThemeToggle;