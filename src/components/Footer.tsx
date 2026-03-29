import { Twitter, Linkedin, Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-slate-900 text-lg">
                U
              </div>
              <div>
                <div className="font-bold text-lg text-white leading-tight">
                  URBA TECH
                </div>
                <div className="text-xs text-amber-400 tracking-widest">
                  INTER
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              International Engineering & Tutorial Consulting — Building a
              better world through innovation and excellence.
            </p>
            <div className="flex gap-3 mt-6">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-slate-900 cursor-pointer transition-all"
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["projects", "ideas", "people", "about", "podcast"].map(
                (page) => (
                  <li key={page}>
                    <button
                      onClick={() => setActivePage(page)}
                      className="text-gray-400 text-sm hover:text-amber-400 transition-colors capitalize"
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Urban Planning",
                "Structural Engineering",
                "Civil Infrastructure",
                "Environmental Design",
                "Training & Tutorials",
              ].map((service) => (
                <li key={service} className="text-gray-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} className="text-amber-400 shrink-0" />
                Business District, International City
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={14} className="text-amber-400 shrink-0" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={14} className="text-amber-400 shrink-0" />
                contact@urbatechinter.com
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} URBA TECH INTER. All rights
            reserved. International Engineering & Tutorial Consulting.
          </p>
        </div>
      </div>
    </footer>
  );
}
