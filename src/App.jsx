// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Projects from './pages/Projects';
import BudgetSystem from './pages/BudgetSystem';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background flex flex-col w-full">

        <Navbar />

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/budget" element={<BudgetSystem />} />
          </Routes>
        </main>

        <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5 bg-[#050505]">
          © 2026 Amka Engineering. Built with React & Tailwind.
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;