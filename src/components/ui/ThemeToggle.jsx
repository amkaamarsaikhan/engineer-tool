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
      className="p-2.5 rounded-xl bg-white/5 border border-white/10 dark:border-white/5 
                 text-slate-500 hover:text-green-500 hover:bg-white/10 
                 transition-all active:scale-90"
      title={isDark ? "Гэрэлт горим" : "Харанхуй горим"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} className="text-slate-700" />}
    </button>
  );
};

export default ThemeToggle;