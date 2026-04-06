import { BookOpen, GraduationCap, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Nigerian Teacher's Guide Hub</h1>
            <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-widest mt-1">Curriculum Assistant</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full">
          <button
            onClick={() => setActiveTab("lesson-note")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
              activeTab === "lesson-note" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
            )}
          >
            Lesson Notes
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
              activeTab === "questions" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
            )}
          >
            Questions
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex border-t bg-white">
        <button
          onClick={() => setActiveTab("lesson-note")}
          className={cn(
            "flex-1 py-3 flex flex-col items-center gap-1 transition-all",
            activeTab === "lesson-note" ? "text-emerald-600 border-t-2 border-emerald-600" : "text-slate-400"
          )}
        >
          <BookOpen size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Lesson Notes</span>
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={cn(
            "flex-1 py-3 flex flex-col items-center gap-1 transition-all",
            activeTab === "questions" ? "text-emerald-600 border-t-2 border-emerald-600" : "text-slate-400"
          )}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Questions</span>
        </button>
      </div>
    </header>
  );
}
