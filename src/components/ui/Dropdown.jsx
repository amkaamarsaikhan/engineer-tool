import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ title, items, className }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={`flex items-center gap-2 outline-none cursor-pointer ${className}`}>
        <span className="truncate">{title}</span>
        <ChevronDown size={14} className="shrink-0" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className="bg-[#111] border border-white/10 p-2 rounded-xl shadow-2xl z-[1000] min-w-[200px] animate-in fade-in zoom-in-95"
          sideOffset={8}
        >
          {items.map((item, index) => (
            <DropdownMenu.Item 
              key={index} 
              onSelect={item.onClick} 
              className="outline-none px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;