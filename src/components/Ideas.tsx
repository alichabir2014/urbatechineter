import { Lightbulb, ArrowRight } from "lucide-react";
import { ideas } from "../data/siteData";

export default function Ideas() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-4">
            <Lightbulb size={16} />
            Knowledge Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ideas & Insights
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Stay updated with the latest trends, research, and innovations in
            engineering and infrastructure development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {ideas.map((idea) => (
            <div
              key={idea.title}
              className="group bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-medium rounded-full border border-amber-500/20">
                  {idea.tag}
                </span>
                <span className="text-gray-500 text-sm">{idea.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                {idea.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {idea.excerpt}
              </p>
              <button className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors">
                Read More
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
