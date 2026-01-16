import React, { useState } from 'react';
import { construction, structural, mechanical, electrical } from '../utils/math';
import { Card } from '../components/ui/Card';
import { Button } from "../components/ui/button";
import Tabs from '../components/ui/Tabs';
import Dropdown from '../components/ui/Dropdown';
import { HardHat, Component, Settings, Zap, Info } from 'lucide-react';

const Calculator = () => {
    const [activeTab, setActiveTab] = useState('construction');
    const [subType, setSubType] = useState('getBudget');
    const [inputs, setInputs] = useState({ v1: '', v2: '', v3: '', v4: '' });
    const [result, setResult] = useState(null);

    const tabs = [
        {
            id: 'construction',
            label: 'Төсөв',
            icon: <HardHat size={18} />,
            description: "Материалын зарцуулалт болон төсөв тооцох модуль.",
            tools: [
                { label: 'Бетон төсөв бодох', value: 'getBudget', fields: ['Эзлэхүүн м³', 'Нэгж үнэ ₮'], func: (v1, v2) => construction.getBudget(v1, 'concrete', v2) },
                { label: 'Арматурын жин', value: 'getRebarWeight', fields: ['Диаметр мм', 'Урт м'], func: construction.getRebarWeight }
            ]
        },
        {
            id: 'structural',
            label: 'Бүтээц',
            icon: <Component size={18} />,
            description: "Дам нурууны хүчлэл, хазайлтын тооцоо.",
            tools: [
                { label: 'Максимум момент', value: 'getMaxMoment', fields: ['Ачаалал q (kN/m)', 'Урт L (m)'], func: structural.getMaxMoment },
                { label: 'Хазайлт шалгах', value: 'checkDeflection', fields: ['q (kN/m)', 'L (m)', 'E (GPa)', 'I (cm4)'], func: structural.checkDeflection },
                { label: 'Суурийн даралт', value: 'getBearingPressure', fields: ['Ачаалал P (kN)', 'Талбай A (m2)'], func: structural.getBearingPressure }
            ]
        },
        {
            id: 'mechanical',
            label: 'Механик',
            icon: <Settings size={18} />,
            description: "Механизмын чадал, дамжуулга болон хүчдэлийн тооцоо.",
            tools: [
                { label: 'Моторын чадал (кВт)', value: 'getPower', fields: ['Момент T (Nm)', 'RPM'], func: mechanical.getPower },
                { label: 'Мушгирах хүчдэл', value: 'getTorsionalStress', fields: ['Момент T (Nm)', 'Диаметр мм'], func: mechanical.getTorsionalStress },
                { label: 'Дамжуулгын харьцаа', value: 'getGearRatio', fields: ['Шүд Z1', 'Шүд Z2', 'Input RPM'], func: mechanical.getGearRatio }
            ]
        },
        {
            id: 'electrical',
            label: 'Цахилгаан',
            icon: <Zap size={18} />,
            description: "Хэлхээний чадал, кабель сонголт.",
            tools: [
                { label: 'Омын хууль (P, R)', value: 'getBasicElectrical', fields: ['Хүчдэл V', 'Гүйдэл I'], func: electrical.getBasicElectrical },
                { label: '3 Фазын чадал', value: 'getThreePhasePower', fields: ['V (V)', 'I (A)', 'cosφ'], func: electrical.getThreePhasePower },
                { label: 'Кабель огтлол', value: 'getCableSizing', fields: ['Гүйдэл I (A)'], func: electrical.getCableSizing }
            ]
        }
    ];

    const currentTab = tabs.find(t => t.id === activeTab);
    const currentTool = currentTab.tools.find(t => t.value === subType);

    const dropdownItems = currentTab.tools.map(tool => ({
        label: tool.label,
        onClick: () => {
            setSubType(tool.value);
            setResult(null);
            setInputs({ v1: '', v2: '', v3: '', v4: '' });
        }
    }));

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
            <header className="text-center">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Pro Engineer Toolkit</h2>
                <div className="h-1 w-20 bg-green-500 mx-auto mt-2 rounded-full" />
            </header>

            <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => {
                setActiveTab(id);
                setSubType(tabs.find(t => t.id === id).tools[0].value);
                setResult(null);
                setInputs({ v1: '', v2: '', v3: '', v4: '' });
            }} />

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Тооцооны төрөл</label>
                        <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-1">
                             <Dropdown title={currentTool.label} items={dropdownItems} className="w-full justify-between h-14" />
                        </div>
                    </div>
                    <div className="p-5 bg-green-500/5 border border-green-500/10 rounded-2xl">
                        <div className="flex gap-2 text-green-400 mb-2 items-center"><Info size={14} /><span className="text-[10px] font-black uppercase">Тайлбар</span></div>
                        <p className="text-slate-400 text-xs leading-relaxed">{currentTab.description}</p>
                    </div>
                </div>

                <div className="flex-1">
                    <Card className="bg-[#111] border-white/10 p-8 rounded-[32px] space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {currentTool.fields.map((field, index) => (
                                <div key={index} className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{field}</label>
                                    <input 
                                        type="number"
                                        value={inputs[`v${index + 1}`]}
                                        className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-green-500 outline-none text-lg font-mono"
                                        onChange={(e) => setInputs({ ...inputs, [`v${index + 1}`]: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>
                            ))}
                        </div>

                        <Button 
                            onClick={() => {
                                const vals = Object.values(inputs).filter(v => v !== '').map(Number);
                                setResult(currentTool.func(...vals));
                            }}
                            className="w-full h-16 bg-white text-black font-black rounded-2xl hover:bg-green-500 transition-all active:scale-95"
                        >
                            ТООЦООЛОХ
                        </Button>

                        {result && (
                            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl animate-in zoom-in-95">
                                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest block mb-2">Үр дүн</span>
                                <div className="text-2xl font-mono font-bold text-white">
                                    {typeof result === 'object' ? JSON.stringify(result) : result}
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