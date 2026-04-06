import ReactMarkdown from "react-markdown";
import { Copy, Download, Printer, Share2 } from "lucide-react";
import { motion } from "motion/react";

interface ContentDisplayProps {
  content: string;
  title: string;
  loading?: boolean;
}

export function ContentDisplay({ content, title, loading }: ContentDisplayProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    // You could add a toast here
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Generating your content...</p>
      </div>
    );
  }

  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
    >
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 tracking-tight">{title}</h3>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Copy">
            <Copy size={18} />
          </button>
          <button onClick={handlePrint} className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Print">
            <Printer size={18} />
          </button>
          <button className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Download">
            <Download size={18} />
          </button>
          <button className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Share">
            <Share2 size={18} />
          </button>
        </div>
      </div>
      <div className="p-8 prose prose-slate max-w-none prose-headings:text-emerald-800 prose-strong:text-emerald-700 prose-a:text-emerald-600">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
}
