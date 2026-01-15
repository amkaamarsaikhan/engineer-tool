import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ title, items }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="group flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-green-400 outline-none py-2 bg-transparent border-none cursor-pointer transition-colors">
        {title}
        <ChevronDown size={14} className="group-data-[state=open]:rotate-180 transition-transform" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className="min-w-[200px] bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-2 z-[200] animate-in fade-in zoom-in-95 duration-200"
          sideOffset={8}
        >
          {items.map((item, index) => (
            <DropdownMenu.Item key={index} asChild>
              <Link 
                to={item.path} 
                className="block p-3 text-sm font-medium text-slate-400 hover:bg-green-500/10 hover:text-green-400 rounded-xl outline-none transition-all"
              >
                {item.label}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;