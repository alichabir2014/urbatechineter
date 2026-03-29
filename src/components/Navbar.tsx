import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../data/siteData";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setActivePage("home")}
            className="flex items-center gap-3"
          >
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
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activePage === item.id
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-gray-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setActivePage("podcast")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === "podcast"
                  ? "bg-amber-500/10 text-amber-400"
                  : "text-gray-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              PODCAST
            </button>
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-2">
          {[...navItems, { id: "podcast", label: "PODCAST" }].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setMobileOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === item.id
                  ? "bg-amber-500/10 text-amber-400"
                  : "text-gray-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
