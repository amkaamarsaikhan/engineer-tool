import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/Badge'; 
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';  
import { Construction, Code, BarChart3, ArrowRight } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-white overflow-hidden relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 py-24 space-y-20 relative z-10">
                
                {/* Hero Section */}
                <header className="text-center space-y-8">
                    <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40">
                        <div className="absolute inset-0 bg-green-500 blur-2xl opacity-40 rounded-full animate-pulse" />
                        <div className="relative w-full h-full rounded-full border-4 border-green-500/50 p-1 overflow-hidden bg-black">
                            <img 
                                src="/hero.jpg" 
                                alt="Amka" 
                                className="w-full h-full object-cover rounded-full shadow-2xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
                            Hello, I'm <span className="text-green-400">Amka</span>
                        </h1>
                        
                        <div className="flex flex-wrap justify-center items-center gap-3 text-slate-400 text-sm md:text-lg font-medium">
                            <span className="flex items-center gap-1">Civil Engineer 🏗️</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span className="flex items-center gap-1">Basketball Lover 🏀</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span className="flex items-center gap-1">Nature Explorer ⛰️</span>
                        </div>

                        <div className="flex justify-center">
                            <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1 rounded-lg font-mono">
                                junior-developer 💻
                            </Badge>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button 
                            onClick={() => navigate('/Projects')} 
                            className="bg-white hover:bg-green-400 text-black rounded-full px-10 h-14 text-lg font-bold transition-all shadow-xl shadow-white/5 active:scale-95"
                        >
                            Explore My Life
                        </Button>
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-[#111111]/50 border-slate-800 backdrop-blur-md hover:border-green-500/50 transition-all group">
                        <CardHeader className="p-8">
                            <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Construction size={28} />
                            </div>
                            <CardTitle className="text-2xl font-bold text-white">Structural Analysis</CardTitle>
                            <CardDescription className="text-slate-400 leading-relaxed text-lg pt-2">
                                Даацын тооцоолол, материалын эсэргүүцэл болон барилгын кодын автоматжуулалт. React, Node.js болон өгөгдлийн сангийн архитектурын шийдлүүд.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="bg-[#111111]/50 border-slate-800 backdrop-blur-md hover:border-green-500/50 transition-all group">
                        <CardHeader className="p-8">
                            <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Code size={28} />
                            </div>
                            <CardTitle className="text-2xl font-bold text-white">Structural design tool</CardTitle>
                            <CardDescription className="text-slate-400 leading-relaxed text-lg pt-2">   
                                Бүтээц, механик болон цахилгаан тооцооллын хэрэгслийн төрөл бүрийн шийдэл. HTML, CSS болон JavaScript ашиглан интерактив веб аппликейшн хөгжүүлэлт.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </section>
            </div>
        </div>
    );
};

export default Home;