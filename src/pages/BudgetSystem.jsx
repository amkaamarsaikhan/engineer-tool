import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Calculator, HardHat, Coins, ClipboardCheck, Info, TrendingUp, Settings2, Ruler } from 'lucide-react';

// 1. Зах зээлийн жишиг үнийн сан (2025-2026)
const MARKET_DATA = {
    concrete: {
        label: "Бетон цутгалт (М250)",
        unit: "м³",
        basePrice: 265000,
        laborRate: 85000,
        icon: "🏗️"
    },
    brick: {
        label: "Тоосгон өрлөг (Улаан)",
        unit: "м³",
        basePrice: 384000, // 1м3-т орох 512ш тоосго + зуурмаг
        laborRate: 95000,
        icon: "🧱"
    },
    gypsum: {
        label: "Гипсэн хана/тааз",
        unit: "м²",
        basePrice: 35000,
        laborRate: 20000,
        icon: "⛑️"
    }
};

const BudgetSystem = () => {
    // State-үүд
    const [type, setType] = useState('concrete');
    const [isManual, setIsManual] = useState(false);
    const [volume, setVolume] = useState('');
    const [price, setPrice] = useState('');
    const [result, setResult] = useState(null);

    // Хэмжээний state
    const [dims, setDims] = useState({ length: '', width: '', height: '3', thickness: '24' });

    // Төрөл солигдоход үнийг автоматаар шинэчлэх
    useEffect(() => {
        setPrice(MARKET_DATA[type].basePrice);
        setResult(null);
    }, [type]);

    // Хэмжээ өөрчлөгдөхөд эзлэхүүнийг бодох
    useEffect(() => {
        if (!isManual && dims.length && dims.width && dims.height) {
            const perimeter = (Number(dims.length) + Number(dims.width)) * 2;
            const wallArea = perimeter * Number(dims.height);
            const calcVolume = wallArea * (Number(dims.thickness) / 100);
            setVolume(calcVolume.toFixed(2));
        }
    }, [dims, isManual]);

    const handleCalculate = () => {
        if (!volume || volume <= 0) return;

        const materialCost = Number(volume) * Number(price);
        const laborCost = Number(volume) * MARKET_DATA[type].laborRate;
        const total = materialCost + laborCost;

        setResult({
            materialCost,
            laborCost,
            total,
            typeLabel: MARKET_DATA[type].label,
            unit: MARKET_DATA[type].unit,
            calculatedVolume: volume
        });
    };

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 space-y-10 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
                        <Calculator className="text-green-500" size={40} /> Construction Estimator
                    </h1>
                    <p className="text-slate-400 mt-2 italic text-sm md:text-base">Байшингийн хэмжээ болон материалын жишиг үнээр төсөвлөх систем.</p>
                </div>
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20 py-2 px-4 rounded-full font-mono text-[10px] uppercase tracking-widest">
                    Standard: BNBD 2026
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="bg-[#111] border-white/10 rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                            <Settings2 size={120} />
                        </div>

                        <CardContent className="pt-6 space-y-8 relative z-10">
                            {/* 1. Ажилбарын төрөл */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Ажилбарын төрөл</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {Object.entries(MARKET_DATA).map(([key, data]) => (
                                        <button
                                            key={key}
                                            onClick={() => setType(key)}
                                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${type === key
                                                    ? 'border-green-500 bg-green-500/10 text-white shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                                                    : 'border-white/5 bg-white/5 text-slate-500 hover:border-white/20'
                                                }`}
                                        >
                                            <span className="text-2xl">{data.icon}</span>
                                            <span className="text-[10px] font-black uppercase text-center">{data.label.split(' ')[0]}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Хэмжээ тооцоолох эсвэл шууд утга */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                        {isManual ? "Эзлэхүүн оруулах" : "Байшингийн хэмжээ (м)"}
                                    </label>
                                    <button
                                        onClick={() => setIsManual(!isManual)}
                                        className="text-[10px] text-green-500 font-black uppercase hover:text-white transition-colors flex items-center gap-1"
                                    >
                                        <Ruler size={12} /> {isManual ? "Хэмжээгээр бодох" : "Шууд м³ оруулах"}
                                    </button>
                                </div>

                                {isManual ? (
                                    <div className="relative">
                                        <input
                                            type="number"
                                            className="w-full h-16 bg-white/5 rounded-2xl border border-white/10 px-6 text-xl text-white outline-none focus:border-green-500 transition-all"
                                            placeholder="0.00"
                                            value={volume}
                                            onChange={(e) => setVolume(e.target.value)}
                                        />
                                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">{MARKET_DATA[type].unit}</span>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-500">
                                        <div className="space-y-1">
                                            <input
                                                type="number" placeholder="Урт (м)"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-green-500/50 outline-none"
                                                value={dims.length}
                                                onChange={(e) => setDims({ ...dims, length: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <input
                                                type="number" placeholder="Өргөн (м)"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-green-500/50 outline-none"
                                                value={dims.width}
                                                onChange={(e) => setDims({ ...dims, width: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <input
                                                type="number" placeholder="Өндөр (м)"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-green-500/50 outline-none"
                                                value={dims.height}
                                                onChange={(e) => setDims({ ...dims, height: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <select
                                                className="w-full h-14 bg-[#111] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-green-500/50"
                                                value={dims.thickness}
                                                onChange={(e) => setDims({ ...dims, thickness: e.target.value })}
                                            >
                                                <option value="24">Зузаан: 24см</option>
                                                <option value="38">Зузаан: 38см</option>
                                                <option value="51">Зузаан: 51см</option>
                                                <option value="20">Зузаан: 20см</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2 p-4 bg-green-500/5 border border-green-500/10 rounded-xl text-center">
                                            <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Тооцоолсон эзлэхүүн: </span>
                                            <span className="text-green-400 font-black ml-2">{volume || 0} м³</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 3. Үнэ */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Нэгж үнэ (₮)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        className="w-full h-16 bg-white/5 rounded-2xl border border-white/10 px-6 text-xl text-green-400 font-black outline-none focus:border-green-500"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-slate-600 font-bold">₮/{MARKET_DATA[type].unit}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleCalculate}
                                className="w-full h-20 rounded-[24px] bg-white text-black hover:bg-green-500 font-black text-xl shadow-xl active:scale-[0.98] transition-all"
                            >
                                ТӨСӨВ НЭГТГЭХ
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4 p-6 bg-white/[0.02] rounded-[32px] border border-white/5 items-center">
                        <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                            <Info size={24} />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed italic">
                            * Төсвийн тооцоололд материалын үнийг таны оруулснаар, ажиллах хүчний зардлыг МУ-ын барилгын жишиг норм (80к-95к ₮)-оор бодож нэгтгэв.
                        </p>
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5">
                    {result ? (
                        <Card className="bg-[#111] border-green-500/30 rounded-[40px] overflow-hidden sticky top-24 shadow-[0_0_50px_rgba(34,197,94,0.1)] animate-in zoom-in duration-500">
                            <div className="bg-green-500 p-10 text-black relative overflow-hidden">
                                <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                                    <ClipboardCheck size={120} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Нийт өртөг</p>
                                <div className="text-5xl font-black tracking-tighter">
                                    {result.total.toLocaleString()}<span className="text-xl ml-1">₮</span>
                                </div>
                            </div>

                            <CardContent className="p-10 space-y-8">
                                <div className="space-y-6">
                                    {/* Material Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end text-sm">
                                            <span className="text-slate-400 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"><Coins size={14} className="text-green-500" /> Материал</span>
                                            <span className="text-white font-black">{result.materialCost.toLocaleString()} ₮</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className="bg-green-500 h-full transition-all duration-1000"
                                                style={{ width: `${(result.materialCost / result.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Labor Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end text-sm">
                                            <span className="text-slate-400 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest"><HardHat size={14} className="text-green-500" /> Ажиллах хүч</span>
                                            <span className="text-white font-black">{result.laborCost.toLocaleString()} ₮</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className="bg-white/20 h-full transition-all duration-1000"
                                                style={{ width: `${(result.laborCost / result.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 space-y-4">
                                    <div className="flex items-center gap-2 text-green-400 text-[10px] font-black tracking-widest uppercase">
                                        <TrendingUp size={14} /> Тайлангийн хураангуй
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                        Нийт <span className="text-white font-bold">{result.calculatedVolume} {result.unit}</span> хэмжээтэй <span className="text-white font-bold">{result.typeLabel}</span> ажилд материалын зардал төсвийн <span className="text-green-400 font-bold">{Math.round((result.materialCost / result.total) * 100)}%</span>-ийг эзэлж байна.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-white/[0.02] p-6 text-center border-t border-white/5">
                                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest w-full">Estimate generated successfully</p>
                            </CardFooter>
                        </Card>
                    ) : (
                        <div className="h-[500px] border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center p-12 text-center bg-white/[0.01]">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-slate-800 mb-6">
                                <ClipboardCheck size={40} />
                            </div>
                            <h3 className="text-slate-600 font-black uppercase tracking-widest text-sm">Тооцоолол хийгдээгүй</h3>
                            <p className="text-slate-700 text-xs mt-2 font-medium leading-relaxed">Хэмжээ болон үнийн мэдээллээ оруулж <br /> Төсөв нэгтгэх товчийг дарна уу.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BudgetSystem;