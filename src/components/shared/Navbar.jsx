import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../ui/button";
import Dropdown from "../ui/Dropdown";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {

  const toolItems = [
    { label: 'Budget Tracker', path: '/budget' },
    { label: 'Calculator', path: '/calculator' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl z-[100]">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

        <Link to="/" className="text-2xl font-black tracking-tighter text-white">
          AMKA<span className="text-green-500">.</span>
        </Link>

        {/* Navigation - Одоо илүү цэвэрхэн харагдана */}
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

        {/* <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-400 font-bold hover:text-white">Log in</Button>
          <Button className="bg-white text-black font-black px-6 rounded-full hover:bg-green-400 transition-all">
            Sign up
          </Button>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;