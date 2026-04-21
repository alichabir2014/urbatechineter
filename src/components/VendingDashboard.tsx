import { useMemo, useState } from "react";
import {
  Monitor,
  Wifi,
  AlertTriangle,
  DollarSign,
  Search,
} from "lucide-react";
import {
  initialAlerts,
  vendingMachines as initialMachines,
  type Alert,
  type MachineStatus,
  type VendingMachine,
} from "../data/vendingData";
import MachineCard from "./vending/MachineCard";
import MachineDetail from "./vending/MachineDetail";
import AlertsPanel from "./vending/AlertsPanel";

type StatusFilter = "all" | MachineStatus;

const FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "online", label: "En ligne" },
  { id: "offline", label: "Hors ligne" },
  { id: "maintenance", label: "Maintenance" },
];

interface StatCard {
  label: string;
  value: string;
  icon: typeof Monitor;
  accent: string;
}

export default function VendingDashboard() {
  const [machines, setMachines] = useState<VendingMachine[]>(initialMachines);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(
    null,
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const machineNames = useMemo(
    () => Object.fromEntries(machines.map((m) => [m.id, m.name])),
    [machines],
  );

  const stats = useMemo<StatCard[]>(() => {
    const online = machines.filter((m) => m.status === "online").length;
    const totalSales = machines.reduce((acc, m) => acc + m.totalSales, 0);
    const activeAlerts = alerts.length;
    return [
      {
        label: "Machines totales",
        value: machines.length.toString(),
        icon: Monitor,
        accent: "text-amber-400",
      },
      {
        label: "En ligne",
        value: `${online} / ${machines.length}`,
        icon: Wifi,
        accent: "text-emerald-400",
      },
      {
        label: "Alertes actives",
        value: activeAlerts.toString(),
        icon: AlertTriangle,
        accent: "text-red-400",
      },
      {
        label: "Ventes du jour",
        value: `${totalSales.toLocaleString("fr-FR")} DA`,
        icon: DollarSign,
        accent: "text-amber-400",
      },
    ];
  }, [machines, alerts]);

  const filteredMachines = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return machines.filter((m) => {
      if (statusFilter !== "all" && m.status !== statusFilter) return false;
      if (!normalized) return true;
      return (
        m.name.toLowerCase().includes(normalized) ||
        m.location.toLowerCase().includes(normalized)
      );
    });
  }, [machines, statusFilter, query]);

  const selectedMachine = useMemo(
    () => machines.find((m) => m.id === selectedMachineId) ?? null,
    [machines, selectedMachineId],
  );

  const updateMachine = (id: string, patch: Partial<VendingMachine>) => {
    setMachines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );
  };

  const markAlertRead = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm w-fit">
            <Monitor size={14} />
            IoT Fleet Management
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Contrôle Vending Machines
          </h1>
          <p className="text-gray-400 text-lg">
            Surveillance et contrôle à distance
          </p>
        </header>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-slate-800 rounded-2xl border border-slate-700 p-5 flex items-center gap-4"
              >
                <div
                  className={`h-11 w-11 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700 ${stat.accent}`}
                >
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white truncate">
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {selectedMachine ? (
          <MachineDetail
            machine={selectedMachine}
            alerts={alerts}
            onBack={() => setSelectedMachineId(null)}
            onUpdate={(patch) => updateMachine(selectedMachine.id, patch)}
            onMarkAlertRead={markAlertRead}
          />
        ) : (
          <>
            <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setStatusFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      statusFilter === f.id
                        ? "bg-amber-500 text-slate-900 border-amber-500"
                        : "text-gray-300 bg-slate-800 border-slate-700 hover:border-amber-500/40 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="relative md:w-80">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher par nom ou localisation..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
                />
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMachines.map((m) => (
                <MachineCard
                  key={m.id}
                  machine={m}
                  onSelect={setSelectedMachineId}
                />
              ))}
              {filteredMachines.length === 0 && (
                <div className="col-span-full bg-slate-800 rounded-2xl border border-slate-700 p-10 text-center text-gray-400">
                  Aucune machine ne correspond aux filtres.
                </div>
              )}
            </section>

            <section>
              <AlertsPanel
                alerts={alerts}
                machineNames={machineNames}
                onMarkRead={markAlertRead}
                title="Toutes les alertes"
                compact
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
