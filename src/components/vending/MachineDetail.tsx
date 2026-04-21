import { useMemo, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Power,
  Lock,
  Unlock,
  RefreshCw,
  Snowflake,
  Thermometer,
  Wrench,
  BarChart3,
  Package,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Alert, VendingMachine } from "../../data/vendingData";
import AlertsPanel from "./AlertsPanel";

interface MachineDetailProps {
  machine: VendingMachine;
  alerts: Alert[];
  onBack: () => void;
  onUpdate: (patch: Partial<VendingMachine>) => void;
  onMarkAlertRead: (id: string) => void;
}

const STATUS_STYLES: Record<
  VendingMachine["status"],
  { dot: string; label: string; badge: string }
> = {
  online: {
    dot: "bg-emerald-400",
    label: "En ligne",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  offline: {
    dot: "bg-red-500",
    label: "Hors ligne",
    badge: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  maintenance: {
    dot: "bg-orange-400",
    label: "Maintenance",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  },
};

interface ConfirmState {
  title: string;
  message: string;
  confirmLabel: string;
  confirmClass: string;
  onConfirm: () => void;
}

function stockColor(ratio: number): string {
  if (ratio >= 0.6) return "bg-emerald-500";
  if (ratio >= 0.3) return "bg-amber-500";
  return "bg-red-500";
}

export default function MachineDetail({
  machine,
  alerts,
  onBack,
  onUpdate,
  onMarkAlertRead,
}: MachineDetailProps) {
  const status = STATUS_STYLES[machine.status];
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  const [targetTemp, setTargetTemp] = useState(machine.targetTemperature);

  const machineAlerts = useMemo(
    () => alerts.filter((a) => a.machineId === machine.id),
    [alerts, machine.id],
  );

  const askConfirm = (state: ConfirmState) => setConfirm(state);
  const closeConfirm = () => setConfirm(null);

  const handleRestart = () => {
    askConfirm({
      title: "Redémarrer la machine",
      message:
        "La machine sera redémarrée à distance. Les transactions en cours seront interrompues.",
      confirmLabel: "Redémarrer",
      confirmClass: "bg-amber-500 text-slate-900 hover:bg-amber-400",
      onConfirm: () => {
        onUpdate({ status: "online", lastSync: new Date().toISOString() });
        closeConfirm();
      },
    });
  };

  const handleToggleLock = () => {
    const locking = !machine.locked;
    askConfirm({
      title: locking ? "Verrouiller la machine" : "Déverrouiller la machine",
      message: locking
        ? "Les ventes seront bloquées jusqu'au déverrouillage."
        : "La machine redeviendra accessible aux clients.",
      confirmLabel: locking ? "Verrouiller" : "Déverrouiller",
      confirmClass: locking
        ? "bg-red-500 text-white hover:bg-red-400"
        : "bg-emerald-500 text-slate-900 hover:bg-emerald-400",
      onConfirm: () => {
        onUpdate({ locked: locking });
        closeConfirm();
      },
    });
  };

  const handleToggleCooling = () => {
    onUpdate({ coolingEnabled: !machine.coolingEnabled });
  };

  const handleMaintenance = () => {
    const entering = machine.status !== "maintenance";
    askConfirm({
      title: entering ? "Mettre en maintenance" : "Sortir de maintenance",
      message: entering
        ? "La machine sera marquée en maintenance et indisponible aux clients."
        : "La machine retournera en mode opérationnel.",
      confirmLabel: entering ? "Mettre en maintenance" : "Remettre en service",
      confirmClass: entering
        ? "bg-orange-500 text-slate-900 hover:bg-orange-400"
        : "bg-emerald-500 text-slate-900 hover:bg-emerald-400",
      onConfirm: () => {
        onUpdate({ status: entering ? "maintenance" : "online" });
        closeConfirm();
      },
    });
  };

  const handleApplyTemp = () => {
    onUpdate({ targetTemperature: targetTemp });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-400 transition-colors"
      >
        <ArrowLeft size={16} />
        Retour au tableau de bord
      </button>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{machine.name}</h2>
            <div className="flex items-center gap-1.5 text-gray-400 mt-1">
              <MapPin size={14} />
              <span className="text-sm">{machine.location}</span>
            </div>
          </div>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${status.badge}`}
          >
            <span className={`h-2 w-2 rounded-full ${status.dot}`} />
            {status.label}
          </div>
        </div>
      </div>

      <section className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <h3 className="text-white font-bold flex items-center gap-2 mb-5">
          <Power size={18} className="text-amber-400" />
          Contrôles à distance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={handleRestart}
            className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl hover:border-amber-500/50 hover:bg-slate-900 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <RefreshCw size={18} className="text-amber-400" />
              <div>
                <div className="text-sm font-semibold text-white">
                  Redémarrer la machine
                </div>
                <div className="text-xs text-gray-400">
                  Relance à distance le système
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={handleToggleCooling}
            className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl hover:border-amber-500/50 hover:bg-slate-900 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <Snowflake
                size={18}
                className={
                  machine.coolingEnabled ? "text-sky-400" : "text-gray-500"
                }
              />
              <div>
                <div className="text-sm font-semibold text-white">
                  {machine.coolingEnabled ? "Désactiver" : "Activer"} le refroidissement
                </div>
                <div className="text-xs text-gray-400">
                  État :{" "}
                  <span
                    className={
                      machine.coolingEnabled ? "text-sky-400" : "text-gray-300"
                    }
                  >
                    {machine.coolingEnabled ? "Actif" : "Inactif"}
                  </span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={handleToggleLock}
            className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl hover:border-amber-500/50 hover:bg-slate-900 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              {machine.locked ? (
                <Lock size={18} className="text-red-400" />
              ) : (
                <Unlock size={18} className="text-emerald-400" />
              )}
              <div>
                <div className="text-sm font-semibold text-white">
                  {machine.locked ? "Déverrouiller" : "Verrouiller"} la machine
                </div>
                <div className="text-xs text-gray-400">
                  État :{" "}
                  <span
                    className={
                      machine.locked ? "text-red-400" : "text-emerald-400"
                    }
                  >
                    {machine.locked ? "Verrouillée" : "Déverrouillée"}
                  </span>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={handleMaintenance}
            className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-900/70 border border-slate-700 rounded-xl hover:border-amber-500/50 hover:bg-slate-900 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <Wrench
                size={18}
                className={
                  machine.status === "maintenance"
                    ? "text-orange-400"
                    : "text-gray-300"
                }
              />
              <div>
                <div className="text-sm font-semibold text-white">
                  {machine.status === "maintenance"
                    ? "Sortir de maintenance"
                    : "Mettre en maintenance"}
                </div>
                <div className="text-xs text-gray-400">
                  Bascule le mode maintenance
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-5 p-4 bg-slate-900/70 border border-slate-700 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Thermometer size={16} className="text-amber-400" />
              <span className="text-sm font-semibold text-white">
                Température cible
              </span>
            </div>
            <span className="text-sm font-bold text-amber-400">
              {targetTemp.toFixed(1)}°C
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={12}
            step={0.5}
            value={targetTemp}
            onChange={(e) => setTargetTemp(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>2°C</span>
            <span>12°C</span>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <span>
              Actuel :{" "}
              <span className="text-white font-medium">
                {machine.temperature.toFixed(1)}°C
              </span>{" "}
              · Consigne :{" "}
              <span className="text-white font-medium">
                {machine.targetTemperature.toFixed(1)}°C
              </span>
            </span>
            <button
              onClick={handleApplyTemp}
              disabled={targetTemp === machine.targetTemperature}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-900 font-medium text-xs hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Appliquer
            </button>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
        <h3 className="text-white font-bold flex items-center gap-2 mb-5">
          <Package size={18} className="text-amber-400" />
          Inventaire
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b border-slate-700">
                <th className="pb-3 pr-3 font-medium">Produit</th>
                <th className="pb-3 px-3 font-medium">Prix</th>
                <th className="pb-3 px-3 font-medium">Stock</th>
                <th className="pb-3 pl-3 font-medium">Niveau</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {machine.products.map((p) => {
                const ratio = p.maxStock === 0 ? 0 : p.stock / p.maxStock;
                return (
                  <tr key={p.id} className="hover:bg-slate-900/40">
                    <td className="py-3 pr-3 text-white font-medium">
                      {p.name}
                    </td>
                    <td className="py-3 px-3 text-gray-300">
                      {p.price.toLocaleString("fr-FR")} DA
                    </td>
                    <td className="py-3 px-3 text-gray-300">
                      {p.stock} / {p.maxStock}
                    </td>
                    <td className="py-3 pl-3 w-48">
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${stockColor(ratio)}`}
                          style={{ width: `${Math.round(ratio * 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h3 className="text-white font-bold flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-amber-400" />
            Ventes sur 7 jours (DA)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={machine.weeklySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                  cursor={{ fill: "rgba(245,158,11,0.08)" }}
                />
                <Bar dataKey="sales" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h3 className="text-white font-bold flex items-center gap-2 mb-4">
            <Thermometer size={18} className="text-amber-400" />
            Température sur 24h (°C)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={machine.dailyTemperature}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="hour"
                  stroke="#94a3b8"
                  fontSize={12}
                  interval={3}
                />
                <YAxis stroke="#94a3b8" fontSize={12} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <AlertsPanel
        alerts={machineAlerts}
        machineNames={{ [machine.id]: machine.name }}
        onMarkRead={onMarkAlertRead}
        title="Alertes de la machine"
      />

      {confirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
        >
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-white">{confirm.title}</h4>
            <p className="text-sm text-gray-400 mt-2">{confirm.message}</p>
            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-slate-700 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirm.onConfirm}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${confirm.confirmClass}`}
              >
                {confirm.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
