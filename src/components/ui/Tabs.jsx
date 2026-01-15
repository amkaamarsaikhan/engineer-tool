import React from 'react';

const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl gap-2 w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative flex-1 flex items-center justify-center gap-2 py-4 rounded-xl 
              font-bold text-sm md:text-base transition-all duration-300 group
              ${isActive ? 'text-black' : 'text-slate-400 hover:text-white hover:bg-white/5'}
            `}
          >
            {/* Идэвхтэй үеийн арын эффект */}
            {isActive && (
              <div className="absolute inset-0 bg-green-500 rounded-xl shadow-[0_0_25px_rgba(34,197,94,0.4)] animate-in fade-in zoom-in-95 duration-200" />
            )}
            
            {/* Tab-ийн икон болон нэр (Relative z-10 нь арын эффект дээр гарахад хэрэгтэй) */}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;