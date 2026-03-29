import {
  Info,
  Target,
  Eye,
  Award,
  Globe,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-4">
            <Info size={16} />
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About URBA TECH INTER
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            International Engineering & Tutorial Consulting — Building a better
            world through innovation and education.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To deliver innovative engineering solutions and professional
              development programs that empower communities and transform
              infrastructure across the globe. We combine technical excellence
              with educational outreach to build capacity in emerging markets.
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
              <Eye size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              To be the leading international engineering consultancy that
              bridges the gap between world-class infrastructure development and
              professional education, creating sustainable impact in every
              community we serve.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Award size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Excellence</h4>
            <p className="text-gray-400 text-sm">
              Committed to the highest standards in engineering design,
              consulting, and project delivery.
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Globe size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              Global Reach
            </h4>
            <p className="text-gray-400 text-sm">
              Operating across 18 countries with a team of over 120 engineers
              and professionals.
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <Target size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Innovation</h4>
            <p className="text-gray-400 text-sm">
              Leveraging cutting-edge technology and methodologies to solve
              complex engineering challenges.
            </p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Contact Us
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">
                  Office Address
                </h4>
                <p className="text-gray-400 text-sm">
                  123 Engineering Boulevard, Business District, International
                  City
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Phone</h4>
                <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                <p className="text-gray-400 text-sm">+1 (555) 987-6543</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Email</h4>
                <p className="text-gray-400 text-sm">
                  contact@urbatechinter.com
                </p>
                <p className="text-gray-400 text-sm">info@urbatechinter.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
