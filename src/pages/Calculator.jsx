import React, { useState } from 'react';
import { structural, mechanical, electrical } from '../utils/math'; 
import { Card } from '../components/ui/Card';
import { Component, Settings, Zap, Info, ChevronDown } from 'lucide-react';

const Calculator = () => {
    const [activeTab, setActiveTab] = useState('structural');
    const [subType, setSubType] = useState('getMaxMoment');
    const [inputs, setInputs] = useState({ v1: '', v2: '', v3: '', v4: '' });
    const [result, setResult] = useState(null);

    // About хуудаснаас авсан тайлбаруудыг tabs дотор нэгтгэв
    const tabs = [
        { 
            id: 'structural', 
            label: 'Бүтээц', 
            icon: <Component size={18} />, 
            description: "Төрөл бүрийн алгасалтай дам нурууны дотоод хүч (момент) болон хотлилтыг Еврокод болон Монгол улсын барилгын нормын дагуу тооцоолох модуль.",
            tools: {
                getMaxMoment: { label: 'Момент', fields: ['Ачаалал q (kN/m)', 'Урт L (m)'], func: structural.getMaxMoment },
                checkDeflection: { label: 'Хазайлт', fields: ['q (kN/m)', 'L (m)', 'E (GPa)', 'I (cm4)'], func: structural.checkDeflection }
            }
        },
        { 
            id: 'mechanical', 
            label: 'Механик', 
            icon: <Settings size={18} />, 
            description: "Эргүүлэх момент, хөдөлгүүрийн чадал болон дамжуулагч механизмын ачааллыг тодорхойлох инженерийн алгоритмууд.",
            tools: {
                getPower: { label: 'Чадал', fields: ['Момент T (Nm)', 'Эргэлт RPM'], func: mechanical.getPower },
                getTorsionalStress: { label: 'Мушгиралт', fields: ['T (Nm)', 'd (mm)'], func: mechanical.getTorsionalStress }
            }
        },
        { 
            id: 'electrical', 
            label: 'Цахилгаан', 
            icon: <Zap size={18} />, 
            description: "Омын хууль дээр суурилсан хүчдэлийн уналт, хэлхээний чадал болон эсэргүүцлийн автомат тооцоолол.",
            tools: {
                getBasicElectrical: { label: 'Омын хууль', fields: ['Хүчдэл V', 'Гүйдэл I'], func: electrical.getBasicElectrical }
            }
        }
    ];

    const currentTab = tabs.find(t => t.id === activeTab);

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
            
            {/* 1. Ангилал сонгох (Tabs) */}
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setSubType(Object.keys(tab.tools)[0]); setResult(null); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${
                            activeTab === tab.id 
                            ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* 2. Динамик тайлбар хэсэг (About-аас орж ирсэн текст) */}
            <div className="p-6 bg-green-500/5 border border-green-500/10 rounded-3xl">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-400 mt-1">
                        <Info size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-lg mb-1">{currentTab.label} тооцооллын тухай</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            {currentTab.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Тооцооны төрөл сонгох */}
            <div className="relative group">
                <select 
                    value={subType}
                    onChange={(e) => { setSubType(e.target.value); setResult(null); }}
                    className="w-full h-16 bg-[#111] border border-white/10 rounded-2xl px-6 text-white font-bold appearance-none outline-none focus:border-green-500/50 transition-colors"
                >
                    {Object.entries(currentTab.tools).map(([key, val]) => (
                        <option key={key} value={key} className="bg-[#111]">{val.label} тооцоолох</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>

            {/* 4. Оролтын талбарууд болон Үр дүн */}
            <Card className="bg-[#111] border-white/10 p-8 rounded-[32px] space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                    {currentTab.tools[subType].fields.map((field, index) => (
                        <div key={index} className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 ml-1">{field}</label>
                            <input 
                                type="number"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 focus:border-green-500/50 outline-none transition-all"
                                onChange={(e) => setInputs({ ...inputs, [`v${index + 1}`]: e.target.value })}
                            />
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => setResult(currentTab.tools[subType].func(...Object.values(inputs).filter(v => v !== '').map(Number)))}
                    className="w-full h-16 bg-white text-black font-black rounded-2xl hover:bg-green-400 transition-all shadow-xl shadow-green-500/10"
                >
                    ТООЦООЛОХ
                </button>

                {result && (
                    <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl animate-in zoom-in-95">
                        <div className="text-2xl font-mono font-bold text-white break-words">
                            Үр дүн: {typeof result === 'object' ? JSON.stringify(result) : result}
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Calculator;