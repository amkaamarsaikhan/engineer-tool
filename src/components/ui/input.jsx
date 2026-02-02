import React from 'react';
import { cn } from '../utils/cn'; 

export const EngineerInput = ({ label, unit, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          {label} {unit && <span className="text-slate-400">({unit})</span>}
        </label>
        {error && <span className="text-[10px] text-red-500 font-medium animate-pulse">⚠️ {error}</span>}
      </div>
      
      <input
        {...props}
        className={cn(
          "w-full px-3 py-2 bg-white border rounded-sm text-sm transition-all outline-none",
          "border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200",
          error ? "border-red-400 bg-red-50" : "hover:border-slate-300"
        )}
      />
    </div>
  );
};