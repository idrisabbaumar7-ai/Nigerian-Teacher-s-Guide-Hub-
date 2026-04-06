import { useState } from "react";
import { CLASSES, SUBJECTS, TERMS, WEEKS } from "@/src/constants";
import { LessonNoteParams } from "@/src/services/gemini";
import { BookOpen, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface LessonNoteFormProps {
  onSubmit: (params: LessonNoteParams) => void;
  loading: boolean;
}

export function LessonNoteForm({ onSubmit, loading }: LessonNoteFormProps) {
  const [params, setParams] = useState<LessonNoteParams>({
    className: CLASSES[3], // Default Primary 1
    subject: SUBJECTS[0], // Default Mathematics
    term: TERMS[0], // Default First Term
    week: WEEKS[0], // Default Week 1
    topic: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-6"
    >
      <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
          <BookOpen size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Lesson Note Generator</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Nigerian Curriculum Standard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Class Level</label>
          <select
            value={params.className}
            onChange={(e) => setParams({ ...params, className: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
          >
            {CLASSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
          <select
            value={params.subject}
            onChange={(e) => setParams({ ...params, subject: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Academic Term</label>
          <select
            value={params.term}
            onChange={(e) => setParams({ ...params, term: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
          >
            {TERMS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Lesson Week</label>
          <select
            value={params.week}
            onChange={(e) => setParams({ ...params, week: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
          >
            {WEEKS.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Specific Topic (Optional)</label>
        <input
          type="text"
          value={params.topic}
          onChange={(e) => setParams({ ...params, topic: e.target.value })}
          placeholder="e.g. Addition of 2-digit numbers"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
      >
        <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
        {loading ? "Generating..." : "Generate Lesson Note"}
      </button>
    </motion.form>
  );
}
