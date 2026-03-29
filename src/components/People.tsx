import { Users, Linkedin, Mail } from "lucide-react";
import { teamMembers } from "../data/siteData";

export default function People() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-4">
            <Users size={16} />
            Our Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our People
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A diverse team of engineers, architects, and consultants delivering
            excellence across the globe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/300x400/1e293b/f59e0b/png?text=${encodeURIComponent(member.name)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-amber-400 text-sm">{member.role}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-slate-900 cursor-pointer transition-all">
                    <Linkedin size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-slate-900 cursor-pointer transition-all">
                    <Mail size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
