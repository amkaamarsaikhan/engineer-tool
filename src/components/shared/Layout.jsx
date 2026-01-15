import Navbar from './Navbar';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-10 px-4 container mx-auto animate-in fade-in duration-500">
        {children}
      </main>
      <footer className="py-6 text-center text-slate-400 text-sm border-t">
        © 2026 MyTool App. Built with React & Tailwind v4
      </footer>
    </div>
  );
};