import React, { useState, useEffect } from 'react';
import { 
  getBudget, getRebarWeight, 
  getMaxMoment, checkDeflection, getBearingPressure,
  getPower, getTorsionalStress, getGearRatio,
  getBasicElectrical, getThreePhasePower, getCableSizing 
} from '../utils'; 
import { Card } from '../components/ui/Card';
import { Button } from "../components/ui/button";
import Tabs from '../components/ui/Tabs';
import Dropdown from '../components/ui/Dropdown';
import { cn } from '../utils/cn';
import { TOOL_EXAMPLES, FORMULAS } from '../utils/constants';
import { 
  HardHat, Component, Settings, Zap, Info, 
  AlertCircle, CheckCircle2, AlertTriangle, 
  XCircle, RotateCcw, HelpCircle 
} from 'lucide-react';

const Calculator = () => {
    const [activeTab, setActiveTab] = useState('construction');
    const [subType, setSubType] = useState('getBudget');
    const [inputs, setInputs] = useState({ v1: '', v2: '', v3: '', v4: '' });
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);
    const [showFormula, setShowFormula] = useState(false);

    // Функц: Жишээ утга ачаалах
    const loadExample = () => {
        const example = TOOL_EXAMPLES[subType] || { v1: '', v2: '', v3: '', v4: '' };
        setInputs({ v1: '', v2: '', v3: '', v4: '', ...example });
        setErrors({});
        setResult(null);
    };

    // Функц: Reset
    const handleReset = () => {
        setInputs({ v1: '', v2: '', v3: '', v4: '' });
        setErrors({});
        setResult(null);
    };

    const validate = (value) => {
        if (value === "") return null;
        const num = parseFloat(value);
        if (isNaN(num)) return "Тоо байх ёстой";
        if (num < 0) return "Сөрөг утга болохгүй";
        return null;
    };

    const handleInputChange = (key, value) => {
        setInputs(prev => ({ ...prev, [key]: value }));
        setErrors(prev => ({ ...prev, [key]: validate(value) }));
    };

    const tabs = [
        {
            id: 'construction',
            label: 'Төсөв',
            icon: <HardHat size={18} />,
            description: "Материалын зарцуулалт болон төсөв тооцох модуль.",
            tools: [
                { label: 'Бетон төсөв', value: 'getBudget', fields: ['Эзлэхүүн м³', 'Нэгж үнэ ₮'], func: (v1, v2) => getBudget(v1, 'concrete', v2) },
                { label: 'Арматурын жин', value: 'getRebarWeight', fields: ['Диаметр мм', 'Урт м'], func: getRebarWeight }
            ]
        },
        {
            id: 'structural',
            label: 'Бүтээц',
            icon: <Component size={18} />,
            description: "Дам нурууны хүчлэл, хазайлтын тооцоо.",
            tools: [
                { label: 'Максимум момент', value: 'getMaxMoment', fields: ['Ачаалал q (kN/m)', 'Урт L (m)'], func: getMaxMoment },
                { label: 'Хазайлт шалгах', value: 'checkDeflection', fields: ['q (kN/m)', 'L (m)', 'E (GPa)', 'I (cm4)'], func: checkDeflection },
                { label: 'Суурийн даралт', value: 'getBearingPressure', fields: ['Ачаалал P (kN)', 'Талбай A (m2)'], func: getBearingPressure }
            ]
        },
        // ... Механик болон Цахилгаан табуудыг энд нэмж болно (өмнөх логикоор)
    ];

    const currentTab = tabs.find(t => t.id === activeTab);
    const currentTool = currentTab.tools.find(t => t.value === subType);
    const hasErrors = Object.values(errors).some(e => e !== null) || currentTool.fields.some((_, i) => !inputs[`v${i+1}`]);

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8 min-h-screen selection:bg-green-500/30">
            <header className="flex justify-between items-end">
                <div className="text-left">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Pro Engineer Toolkit</h2>
                    <div className="h-1 w-20 bg-green-500 mt-2 rounded-full shadow-[0_0_15px_#22c55e]" />
                </div>
                <button 
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-widest pb-1"
                >
                    <RotateCcw size={12} /> Reset Fields
                </button>
            </header>

            <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => {
                setActiveTab(id);
                setSubType(tabs.find(t => t.id === id).tools[0].value);
                setResult(null);
                setInputs({ v1: '', v2: '', v3: '', v4: '' });
                setErrors({});
            }} />

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Тооцооны төрөл</label>
                        <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-1">
                             <Dropdown title={currentTool.label} items={currentTab.tools.map(t => ({ label: t.label, onClick: () => setSubType(t.value) }))} className="w-full justify-between h-14" />
                        </div>
                    </div>
                    <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl relative group">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-2 text-green-400 items-center">
                                <Info size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Тайлбар</span>
                            </div>
                            <div className="relative">
                                <HelpCircle 
                                    size={14} 
                                    className="text-slate-600 cursor-help hover:text-blue-400 transition-colors"
                                    onMouseEnter={() => setShowFormula(true)}
                                    onMouseLeave={() => setShowFormula(false)}
                                />
                                {showFormula && (
                                    <div className="absolute bottom-6 right-0 w-48 p-3 bg-slate-900 border border-blue-500/30 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95">
                                        <p className="text-[9px] text-blue-400 font-black mb-1 uppercase">Томьёо:</p>
                                        <p className="text-xs text-white font-mono">{FORMULAS[subType] || "Standard Method"}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">{currentTab.description}</p>
                    </div>
                </div>

                <div className="flex-1">
                    <Card className="bg-[#111] border-white/10 p-8 rounded-[32px] space-y-6 shadow-2xl border-t-white/20">
                        <div className="grid grid-cols-1 gap-6">
                            {currentTool.fields.map((field, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{field}</label>
                                        {errors[`v${index + 1}`] && <span className="text-[10px] text-red-500 font-bold animate-pulse uppercase">⚠️ {errors[`v${index + 1}`]}</span>}
                                    </div>
                                    <input 
                                        type="number"
                                        value={inputs[`v${index + 1}`]}
                                        className={cn(
                                            "w-full h-14 bg-white/5 border rounded-xl px-4 text-white outline-none text-lg font-mono transition-all",
                                            errors[`v${index + 1}`] ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-green-500"
                                        )}
                                        onChange={(e) => handleInputChange(`v${index + 1}`, e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <Button 
                                onClick={loadExample}
                                className="px-6 h-16 bg-slate-900 text-slate-400 font-bold rounded-2xl hover:bg-slate-800 transition-all text-[10px] uppercase border border-white/5"
                            >
                                Жишээ
                            </Button>
                            <Button 
                                disabled={hasErrors}
                                onClick={() => {
                                    const vals = currentTool.fields.map((_, i) => Number(inputs[`v${i+1}`]));
                                    setResult(currentTool.func(...vals));
                                }}
                                className={cn(
                                    "flex-1 h-16 font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest",
                                    hasErrors ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-white text-black hover:bg-green-500 shadow-xl"
                                )}
                            >
                                ТООЦООЛОХ
                            </Button>
                        </div>

                        {result && (
                            <div className={cn(
                                "p-6 rounded-2xl border transition-all duration-500 animate-in zoom-in-95",
                                result.status === "SAFE" && "bg-green-500/10 border-green-500/30",
                                result.status === "WARNING" && "bg-yellow-500/10 border-yellow-500/30",
                                result.status === "DANGER" && "bg-red-500/10 border-red-500/30",
                                !result.status && "bg-blue-500/10 border-blue-500/30"
                            )}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-widest block mb-1",
                                            result.status === "SAFE" && "text-green-500",
                                            result.status === "WARNING" && "text-yellow-500",
                                            result.status === "DANGER" && "text-red-500",
                                            !result.status && "text-blue-400"
                                        )}>
                                            {result.label || "Үр дүн"}
                                        </span>
                                        <div className="text-3xl font-mono font-black text-white">
                                            {result.value || result} <span className="text-sm font-normal text-slate-500">{result.unit || ""}</span>
                                        </div>
                                    </div>
                                    {result.status && (
                                        <div className={cn(
                                            "px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5",
                                            result.status === "SAFE" && "bg-green-500 text-black",
                                            result.status === "WARNING" && "bg-yellow-500 text-black",
                                            result.status === "DANGER" && "bg-red-500 text-white"
                                        )}>
                                            {result.status === "SAFE" && <><CheckCircle2 size={12}/> SAFE</>}
                                            {result.status === "WARNING" && <><AlertTriangle size={12}/> WARNING</>}
                                            {result.status === "DANGER" && <><XCircle size={12}/> NOT OK</>}
                                        </div>
                                    )}
                                </div>

                                {result.limit && (
                                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase">
                                            Хязгаар: <span className="text-slate-300 ml-1">{result.limit} {result.unit}</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-500 uppercase">
                                            Ашиглалт: <span className={cn("ml-1", parseFloat(result.ratio) > 90 ? "text-red-400" : "text-green-400")}>{result.ratio}%</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Calculator;