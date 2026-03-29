import { ArrowRight, Building2, Lightbulb, Users, Radio } from "lucide-react";

interface FeaturedSectionProps {
  setActivePage: (page: string) => void;
}

export default function FeaturedSection({ setActivePage }: FeaturedSectionProps) {
  const sections = [
    {
      id: "projects",
      icon: <Building2 size={24} />,
      title: "Our Projects",
      description:
        "Explore 250+ engineering projects delivered across 18 countries.",
    },
    {
      id: "ideas",
      icon: <Lightbulb size={24} />,
      title: "Ideas & Insights",
      description:
        "Stay updated with industry trends and engineering innovations.",
    },
    {
      id: "people",
      icon: <Users size={24} />,
      title: "Our Team",
      description:
        "Meet the 120+ engineers and professionals driving our mission.",
    },
    {
      id: "podcast",
      icon: <Radio size={24} />,
      title: "URBA TECH Radio",
      description:
        "Tune in to expert discussions on engineering and technology.",
    },
  ];

  return (
    <section className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActivePage(section.id)}
              className="group bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all">
                {section.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {section.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {section.description}
              </p>
              <span className="inline-flex items-center gap-1 text-amber-400 text-sm font-medium">
                Learn More
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
