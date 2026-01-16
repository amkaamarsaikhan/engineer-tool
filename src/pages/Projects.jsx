import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { ExternalLink, LayoutDashboard, Github, Layers, ArrowRight, Code2 } from 'lucide-react';

const Projects = () => {
  const projectList = [
    {
      title: "Барилгын Төсвийн Систем",
      tech: ["React", "Tailwind", "Math.js"],
      desc: "Монгол улсын барилгын жишиг норм (BNBD 2026)-д суурилсан бетон, өрлөг, гипсэн ханын материалын түүвэр, ажлын хөлс бодох систем.",
      link: "/budget",
      isInternal: true,
      icon: <LayoutDashboard className="w-6 h-6" />
    },
    {
      title: "Github Repository",
      tech: ["Source Code", "Documentation"],
      desc: "Миний хөгжүүлсэн бүх нээлттэй эх код бүхий төслүүд, инженерийн тооцооллын алгоритмууд болон автоматжуулалтын скриптүүдийн сан.",
      link: "https://github.com/amkaamarsaikhan",
      isInternal: false,
      icon: <Github className="w-6 h-6" />
    },
    {
      title: "Official Portfolio",
      tech: ["Vite", "PWA", "Animation"],
      desc: "Миний мэргэжлийн туршлага, ур чадвар болон гүйцэтгэсэн ажлуудыг нэгтгэсэн, гар утсанд апп шиг суудаг (PWA) танилцуулга вэб.",
      link: "https://amkaamarsaikhan.github.io/Porfolio/",
      isInternal: false,
      icon: <Code2 className="w-6 h-6" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 lg:px-8 space-y-20 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
          Миний <span className="text-green-400">Төслүүд</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-xl md:text-2xl font-medium italic">
          Инженерчлэл болон Програм хангамжийн огтлолцол.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectList.map((project, index) => (
          <Card key={index} className="flex flex-col h-full bg-[#111] border border-white/10 rounded-[40px] overflow-hidden hover:border-green-500/50 transition-all duration-500 group relative">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="space-y-6 pt-10 px-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-400 group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                {project.icon}
              </div>
              <div className="space-y-3">
                <CardTitle className="text-2xl font-black text-white leading-tight">
                  {project.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} className="bg-white/5 text-slate-400 border border-white/10 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 px-8 pt-4 relative z-10">
              <CardDescription className="text-slate-400 text-lg leading-relaxed">
                {project.desc}
              </CardDescription>
            </CardContent>

            <CardFooter className="p-8 relative z-10">
              {project.isInternal ? (
                <Button asChild className="w-full h-14 rounded-2xl bg-white text-black hover:bg-green-400 font-black text-md group transition-all active:scale-95 shadow-xl shadow-white/5">
                  <Link to={project.link} className="flex items-center justify-center gap-2">
                    Систем рүү орох <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full h-14 rounded-2xl border-2 border-white/10 bg-transparent text-white hover:border-green-500 hover:text-green-400 font-black transition-all active:scale-95">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    {project.title === "Github Repository" ? "Код үзэх" : "Вэб үзэх"} <ExternalLink className="w-5 h-5" />
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;