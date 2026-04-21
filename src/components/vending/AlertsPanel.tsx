import {
  AlertTriangle,
  Thermometer,
  Package,
  WifiOff,
  Wrench,
  Check,
} from "lucide-react";
import type { Alert } from "../../data/vendingData";

interface AlertsPanelProps {
  alerts: Alert[];
  machineNames: Record<string, string>;
  onMarkRead: (id: string) => void;
  title?: string;
  compact?: boolean;
}

const SEVERITY_STYLES: Record<
  Alert["severity"],
  { border: string; bg: string; icon: string; label: string }
> = {
  critical: {
    border: "border-red-500/40",
    bg: "bg-red-500/10",
    icon: "text-red-400",
    label: "Critique",
  },
  warning: {
    border: "border-orange-500/40",
    bg: "bg-orange-500/10",
    icon: "text-orange-400",
    label: "Avertissement",
  },
  info: {
    border: "border-blue-500/40",
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    label: "Info",
  },
};

function iconFor(type: Alert["type"]) {
  switch (type) {
    case "stock_low":
      return Package;
    case "temperature":
      return Thermometer;
    case "offline":
      return WifiOff;
    case "maintenance":
      return Wrench;
    default:
      return AlertTriangle;
  }
}

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

export default function AlertsPanel({
  alerts,
  machineNames,
  onMarkRead,
  title = "Alertes récentes",
  compact = false,
}: AlertsPanelProps) {
  const sorted = [...alerts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-400" />
          <h3 className="text-white font-bold">{title}</h3>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-slate-900 text-xs font-medium text-gray-300 border border-slate-700">
          {sorted.length}
        </span>
      </div>

      {sorted.length === 0 ? (
        <div className="px-6 py-10 text-center text-gray-500 text-sm">
          Aucune alerte active.
        </div>
      ) : (
        <ul
          className={`divide-y divide-slate-700/70 ${
            compact ? "max-h-[520px] overflow-y-auto" : ""
          }`}
        >
          {sorted.map((alert) => {
            const Icon = iconFor(alert.type);
            const style = SEVERITY_STYLES[alert.severity];
            return (
              <li
                key={alert.id}
                className="px-6 py-4 flex items-start gap-3 hover:bg-slate-900/40 transition-colors"
              >
                <div
                  className={`shrink-0 h-9 w-9 rounded-lg flex items-center justify-center border ${style.border} ${style.bg}`}
                >
                  <Icon size={16} className={style.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold ${style.icon}`}
                    >
                      {style.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      · {formatRelative(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-white mt-1 leading-snug">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {machineNames[alert.machineId] ?? alert.machineId}
                  </p>
                </div>
                <button
                  onClick={() => onMarkRead(alert.id)}
                  className="shrink-0 inline-flex items-center gap-1 text-xs text-gray-400 hover:text-amber-400 transition-colors px-2 py-1 rounded-md border border-slate-700 hover:border-amber-500/40"
                  aria-label="Marquer comme lu"
                >
                  <Check size={12} />
                  Lu
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
