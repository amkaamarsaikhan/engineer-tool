import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Button } from "../ui/button";
import Dropdown from "../ui/Dropdown";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate(); 

  const toolItems = [
    { 
      label: 'Budget System', 
      onClick: () => navigate('/budget') 
    },
    { 
      label: 'Engineering tools', 
      onClick: () => navigate('/calculator') 
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl z-[100]">
      <div className="max-w-7xl mx-auto px-4 h-30 flex items-center justify-between">

        <Link to="/" className="text-4xl font-black tracking-tighter text-white">
          AMKA<span className="text-green-500">.</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-bold text-slate-400 hover:text-green-400 transition-colors">
            Home
          </Link>
          <Link to="/projects" className="text-sm font-bold text-slate-400 hover:text-green-400 transition-colors">
            Projects
          </Link>

          <Dropdown title="Tools" items={toolItems} />
          
          <div className="pl-4 border-l border-white/10">
            <ThemeToggle />
          </div>
        </nav>

      </div>
    </header>
  );
};

export default Navbar;