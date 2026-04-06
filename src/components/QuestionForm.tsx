import { useState } from "react";
import { CLASSES, SUBJECTS, TERMS, QUESTION_TYPES, DIFFICULTY_LEVELS } from "@/src/constants";
import { QuestionParams } from "@/src/services/gemini";
import { LayoutDashboard, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface QuestionFormProps {
  onSubmit: (params: QuestionParams) => void;
  loading: boolean;
}

export function QuestionForm({ onSubmit, loading }: QuestionFormProps) {
  const [params, setParams] = useState<QuestionParams>({
    className: CLASSES[3], // Default Primary 1
    subject: SUBJECTS[0], // Default Mathematics
    term: TERMS[0], // Default First Term
    numQuestions: 10,
    questionType: QUESTION_TYPES[0], // Default Objective
    difficulty: DIFFICULTY_LEVELS[1], // Default Medium
    topic: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-6"
    >
      <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
          <LayoutDashboard size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Question Generator</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Test & Exam Questions</p>
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
          <label className="text-sm font-bold text-slate-700 ml-1">Number of Questions</label>
          <input
            type="number"
            min="1"
            max="50"
            value={params.numQuestions}
            onChange={(e) => setParams({ ...params, numQuestions: parseInt(e.target.value) })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Question Type</label>
          <select
            value={params.questionType}
            onChange={(e) => setParams({ ...params, questionType: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
          >
            {QUESTION_TYPES.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Difficulty Level</label>
          <select
            value={params.difficulty}
            onChange={(e) => setParams({ ...params, difficulty: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
          >
            {DIFFICULTY_LEVELS.map((d) => (
              <option key={d} value={d}>{d}</option>
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
          placeholder="e.g. Photosynthesis"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
      >
        <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
        {loading ? "Generating..." : "Generate Questions"}
      </button>
    </motion.form>
  );
}
