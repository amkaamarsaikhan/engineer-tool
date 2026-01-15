import React, { useState } from 'react';
import { structural, mechanical, electrical } from '../utils/math'; 
import { Card } from '../components/ui/Card';
import { Button } from "../components/ui/button"; 
import Tabs from '../components/ui/Tabs';
import Dropdown from '../components/ui/Dropdown'; // 1. Dropdown-оо импортлох
import { Component, Settings, Zap, Info } from 'lucide-react';

const Calculator = () => {
    const [activeTab, setActiveTab] = useState('structural');
    const [subType, setSubType] = useState('getMaxMoment');
    const [inputs, setInputs] = useState({ v1: '', v2: '', v3: '', v4: '' });
    const [result, setResult] = useState(null);

    const tabs = [
        { 
            id: 'structural', 
            label: 'Бүтээц', 
            icon: <Component size={18} />, 
            description: "Дам нурууны момент болон хотлилтыг Еврокод болон МУ-ын нормын дагуу тооцоолох модуль.",
            tools: [
                { label: 'Момент тооцоолох', value: 'getMaxMoment', fields: ['Ачаалал q (kN/m)', 'Урт L (m)'], func: structural.getMaxMoment },
                { label: 'Хазайлт тооцоолох', value: 'checkDeflection', fields: ['q (kN/m)', 'L (m)', 'E (GPa)', 'I (cm4)'], func: structural.checkDeflection }
            ]
        },
        { 
            id: 'mechanical', 
            label: 'Механик', 
            icon: <Settings size={18} />, 
            description: "Эргүүлэх момент, хөдөлгүүрийн чадал болон механизмын ачааллыг тодорхойлох алгоритмууд.",
            tools: [
                { label: 'Чадал тооцоолох', value: 'getPower', fields: ['Момент T (Nm)', 'Эргэлт RPM'], func: mechanical.getPower },
                { label: 'Мушгиралт тооцоолох', value: 'getTorsionalStress', fields: ['T (Nm)', 'd (mm)'], func: mechanical.getTorsionalStress }
            ]
        },
        { 
            id: 'electrical', 
            label: 'Цахилгаан', 
            icon: <Zap size={18} />, 
            description: "Хүчдэлийн уналт, хэлхээний чадал болон эсэргүүцлийн автомат тооцоолол.",
            tools: [
                { label: 'Омын хууль тооцоолох', value: 'getBasicElectrical', fields: ['Хүчдэл V', 'Гүйдэл I'], func: electrical.getBasicElectrical }
            ]
        }
    ];

    const currentTab = tabs.find(t => t.id === activeTab);
    
    // Dropdown-д зориулж өгөгдлөө бэлдэх
    // Dropdown-ийн нэг элемент дээр дарахад subType-ийг шинэчилнэ
    const dropdownItems = currentTab.tools.map(tool => ({
        label: tool.label,
        onClick: () => {
            setSubType(tool.value);
            setResult(null);
            setInputs({ v1: '', v2: '', v3: '', v4: '' });
        }
    }));

    const currentTool = currentTab.tools.find(t => t.value === subType);

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8 animate-in fade-in duration-700">
            <header className="text-center space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Engineering Tools</h2>
                <div className="h-1 w-20 bg-green-500 mx-auto rounded-full" />
            </header>

            <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => {
                setActiveTab(id);
                setSubType(tabs.find(t => t.id === id).tools[0].value);
                setResult(null);
            }} />

            <div className="flex flex-col md:flex-row gap-6">
                {/* Зүүн тал: Dropdown болон Тайлан */}
                <div className="w-full md:w-1/3 space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Сонгох</label>
                        {/* 2. Шинэ Dropdown-ийг энд ашиглав */}
                        <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-1">
                             <Dropdown 
                                title={currentTool.label} 
                                items={dropdownItems} 
                                className="w-full justify-between h-14"
                             />
                        </div>
                    </div>

                    <div className="p-5 bg-green-500/5 border border-green-500/10 rounded-2xl">
                        <div className="flex gap-3 text-green-400 mb-2">
                            <Info size={16} />
                            <span className="text-[10px] font-black uppercase tracking-wider">Мэдээлэл</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed leading-relaxed">
                            {currentTab.description}
                        </p>
                    </div>
                </div>

                {/* Баруун тал: Оролт ба Үр дүн */}
                <div className="flex-1">
                    <Card className="bg-[#111] border-white/10 p-8 rounded-[32px] space-y-6 shadow-2xl">
                        <div className="grid grid-cols-1 gap-6">
                            {currentTool.fields.map((field, index) => (
                                <div key={index} className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{field}</label>
                                    <input 
                                        type="number"
                                        value={inputs[`v${index + 1}`]}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-green-500 outline-none transition-all text-lg font-mono"
                                        onChange={(e) => setInputs({ ...inputs, [`v${index + 1}`]: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>
                            ))}
                        </div>

                        <Button 
                            onClick={() => setResult(currentTool.func(...Object.values(inputs).filter(v => v !== '').map(Number)))}
                            className="w-full h-16 bg-white text-black font-black rounded-2xl hover:bg-green-500 transition-all shadow-xl active:scale-95"
                        >
                            ТООЦООЛОХ
                        </Button>

                        {result && (
                            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl animate-in zoom-in-95">
                                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest block mb-2">Үр дүн</span>
                                <div className="text-3xl font-mono font-bold text-white">
                                    {typeof result === 'object' ? JSON.stringify(result) : result.toLocaleString()}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Calculator;