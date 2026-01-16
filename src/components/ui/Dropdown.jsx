import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ title, items, className }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={`flex items-center gap-2 outline-none cursor-pointer text-sm font-bold transition-colors 
        text-slate-500 hover:text-green-500 dark:text-slate-400 dark:hover:text-green-400 ${className}`}
      >
        <span className="truncate">{title}</span>
        <ChevronDown size={14} className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-card/90 backdrop-blur-xl border border-border p-2 rounded-2xl shadow-2xl z-[1000] min-w-[220px] 
          animate-in fade-in zoom-in-95 slide-in-from-top-2"
          sideOffset={12}
        >
          {items.map((item, index) => (
            <DropdownMenu.Item
              key={index}
              onSelect={item.onClick}
              className="outline-none px-4 py-3 text-sm font-medium rounded-xl cursor-pointer transition-all
              text-slate-600 hover:bg-green-500/10 hover:text-green-600
              dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {item.label}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Arrow className="fill-border" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;