import { ArrowRight } from "lucide-react";
import { stats } from "../data/siteData";

interface HeroProps {
  setActivePage: (page: string) => void;
}

export default function Hero({ setActivePage }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-8">
          International Engineering & Consulting
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-2">
          URBA TECH
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-amber-400 mb-6">
          INTER
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12">
          Engineering & Tutorial Consulting — Delivering world-class
          infrastructure solutions and professional development across
          continents.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {["PROJECTS", "IDEAS", "PEOPLE", "ABOUT"].map((label) => (
            <button
              key={label}
              onClick={() => setActivePage(label.toLowerCase())}
              className="px-6 py-3 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setActivePage("projects")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors text-lg"
        >
          Explore Our Work
          <ArrowRight size={20} />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
