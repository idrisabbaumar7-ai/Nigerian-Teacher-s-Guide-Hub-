import { useState } from "react";
import { Header } from "./components/Header";
import { LessonNoteForm } from "./components/LessonNoteForm";
import { QuestionForm } from "./components/QuestionForm";
import { ContentDisplay } from "./components/ContentDisplay";
import { generateLessonNote, generateQuestions, LessonNoteParams, QuestionParams } from "./services/gemini";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, GraduationCap, Sparkles, Trophy } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("lesson-note");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [contentTitle, setContentTitle] = useState("");

  const handleLessonNoteSubmit = async (params: LessonNoteParams) => {
    setLoading(true);
    setGeneratedContent("");
    setContentTitle(`${params.className} - ${params.subject} (${params.week})`);
    try {
      const content = await generateLessonNote(params);
      setGeneratedContent(content || "Failed to generate content.");
    } catch (error) {
      console.error(error);
      setGeneratedContent("An error occurred while generating the lesson note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionsSubmit = async (params: QuestionParams) => {
    setLoading(true);
    setGeneratedContent("");
    setContentTitle(`${params.className} - ${params.subject} Questions`);
    try {
      const content = await generateQuestions(params);
      setGeneratedContent(content || "Failed to generate content.");
    } catch (error) {
      console.error(error);
      setGeneratedContent("An error occurred while generating the questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Info & Stats (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-6 sticky top-24">
            <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200 overflow-hidden relative group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <GraduationCap size={48} className="mb-6 opacity-80" />
              <h2 className="text-2xl font-bold leading-tight mb-2">Empowering Nigerian Teachers</h2>
              <p className="text-emerald-50 text-sm leading-relaxed opacity-90">
                Generate high-quality educational materials aligned with the national curriculum in seconds.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">15+ Levels</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase">Nursery to SS3</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">AI Powered</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase">Curriculum Aware</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Exam Ready</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase">Marking Schemes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Developer</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                  IU
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Idris Abba Umar</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase">Lead Developer</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                Passionate about leveraging AI to transform education in Nigeria.
              </p>
            </div>
          </div>

          {/* Right Column: Forms & Content */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === "lesson-note" ? (
                <LessonNoteForm key="lesson-note" onSubmit={handleLessonNoteSubmit} loading={loading} />
              ) : (
                <QuestionForm key="questions" onSubmit={handleQuestionsSubmit} loading={loading} />
              )}
            </AnimatePresence>

            <ContentDisplay content={generatedContent} title={contentTitle} loading={loading} />

            {!generatedContent && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center px-4"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                  <Sparkles size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to generate?</h3>
                <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Fill out the form above to automatically generate lesson notes or questions tailored to your class and subject.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-20 py-12 border-t bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center text-white">
              <GraduationCap size={14} />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Nigerian Teacher's Guide Hub</span>
          </div>
          <p className="text-slate-400 text-sm mb-2">
            Supporting Nigerian educators with intelligent curriculum tools.
          </p>
          <div className="flex flex-col items-center gap-1 mb-6">
            <p className="text-xs font-medium text-slate-500">Developed by <span className="text-emerald-600 font-bold">Idris Abba Umar</span></p>
            <p className="text-xs text-slate-400">Email: idrisabbaumar7@gmail.com | Tel: 08166527066</p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6">
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">Terms</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
