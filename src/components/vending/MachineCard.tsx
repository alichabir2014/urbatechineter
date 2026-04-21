import {
  MapPin,
  Thermometer,
  DollarSign,
  Clock,
  ChevronRight,
} from "lucide-react";
import type { VendingMachine } from "../../data/vendingData";

interface MachineCardProps {
  machine: VendingMachine;
  onSelect: (id: string) => void;
}

const STATUS_STYLES: Record<
  VendingMachine["status"],
  { dot: string; label: string; badge: string }
> = {
  online: {
    dot: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]",
    label: "En ligne",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  offline: {
    dot: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]",
    label: "Hors ligne",
    badge: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  maintenance: {
    dot: "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.6)]",
    label: "Maintenance",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  },
};

function formatRelative(iso: string): string {
  const delta = Math.max(0, Date.now() - new Date(iso).getTime());
  const minutes = Math.floor(delta / 60_000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
}

function stockColor(level: number): string {
  if (level >= 60) return "bg-emerald-500";
  if (level >= 30) return "bg-amber-500";
  return "bg-red-500";
}

export default function MachineCard({ machine, onSelect }: MachineCardProps) {
  const status = STATUS_STYLES[machine.status];

  return (
    <div className="group bg-slate-800 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="p-6 flex flex-col gap-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors truncate">
              {machine.name}
            </h3>
            <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{machine.location}</span>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium shrink-0 ${status.badge}`}
          >
            <span className={`h-2 w-2 rounded-full ${status.dot}`} />
            {status.label}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span>Niveau de stock</span>
            <span className="text-white font-medium">{machine.stockLevel}%</span>
          </div>
          <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${stockColor(
                machine.stockLevel,
              )}`}
              style={{ width: `${machine.stockLevel}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/60 rounded-lg border border-slate-700/60">
            <Thermometer size={16} className="text-amber-400" />
            <div>
              <div className="text-xs text-gray-500">Température</div>
              <div className="text-sm text-white font-semibold">
                {machine.temperature.toFixed(1)}°C
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/60 rounded-lg border border-slate-700/60">
            <DollarSign size={16} className="text-amber-400" />
            <div>
              <div className="text-xs text-gray-500">Ventes du jour</div>
              <div className="text-sm text-white font-semibold">
                {machine.totalSales.toLocaleString("fr-FR")} DA
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock size={12} />
          <span>Synchronisé {formatRelative(machine.lastSync)}</span>
        </div>
      </div>

      <button
        onClick={() => onSelect(machine.id)}
        className="flex items-center justify-between px-6 py-3 bg-slate-900/70 border-t border-slate-700 text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-colors"
      >
        Voir détails
        <ChevronRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}
