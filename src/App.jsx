// src/App.jsx
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/shared/Navbar';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Projects from './pages/Projects';
import BudgetSystem from './pages/BudgetSystem';

function App() {
  return (

    <div className="min-h-screen bg-[#050505] flex flex-col w-full">

      <Navbar />
      
      <main className="flex-grow w-full max-w-7xl mx-auto m-0 px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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
  );
}

export default App;