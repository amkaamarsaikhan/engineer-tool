import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // LocalStorage-оос өмнөх сонголтыг шалгах
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
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