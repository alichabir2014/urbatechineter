export type MachineStatus = "online" | "offline" | "maintenance";
export type AlertType = "stock_low" | "temperature" | "offline" | "maintenance";
export type AlertSeverity = "info" | "warning" | "critical";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  maxStock: number;
  imageUrl: string;
}

export interface Alert {
  id: string;
  machineId: string;
  type: AlertType;
  message: string;
  timestamp: string;
  severity: AlertSeverity;
}

export interface SalesPoint {
  day: string;
  sales: number;
}

export interface TemperaturePoint {
  hour: string;
  temperature: number;
}

export interface VendingMachine {
  id: string;
  name: string;
  location: string;
  status: MachineStatus;
  temperature: number;
  targetTemperature: number;
  lastSync: string;
  stockLevel: number;
  totalSales: number;
  locked: boolean;
  coolingEnabled: boolean;
  products: Product[];
  weeklySales: SalesPoint[];
  dailyTemperature: TemperaturePoint[];
}

const now = new Date();
const iso = (minutesAgo: number) =>
  new Date(now.getTime() - minutesAgo * 60_000).toISOString();

const DEFAULT_PRODUCTS: Omit<Product, "id" | "stock" | "maxStock">[] = [
  { name: "Coca-Cola 33cl", price: 80, imageUrl: "/images/vending/coca.jpg" },
  { name: "Fanta Orange 33cl", price: 80, imageUrl: "/images/vending/fanta.jpg" },
  { name: "Eau minérale 50cl", price: 40, imageUrl: "/images/vending/eau.jpg" },
  { name: "Jus Rouiba 25cl", price: 70, imageUrl: "/images/vending/rouiba.jpg" },
  { name: "Red Bull 25cl", price: 200, imageUrl: "/images/vending/redbull.jpg" },
  { name: "Café expresso", price: 50, imageUrl: "/images/vending/cafe.jpg" },
  { name: "Chips Pringles", price: 150, imageUrl: "/images/vending/pringles.jpg" },
  { name: "Biscuits Tchikita", price: 60, imageUrl: "/images/vending/tchikita.jpg" },
  { name: "Chocolat Kinder", price: 90, imageUrl: "/images/vending/kinder.jpg" },
  { name: "Barre KitKat", price: 100, imageUrl: "/images/vending/kitkat.jpg" },
  { name: "Sandwich Thon", price: 250, imageUrl: "/images/vending/sandwich.jpg" },
  { name: "Yaourt Soummam", price: 60, imageUrl: "/images/vending/yaourt.jpg" },
];

const buildProducts = (machineId: string, seed: number): Product[] =>
  DEFAULT_PRODUCTS.map((p, idx) => {
    const maxStock = 20;
    const stock = Math.max(
      0,
      Math.min(maxStock, Math.round(((seed * (idx + 3)) % 23) - 2)),
    );
    return {
      id: `${machineId}-p${idx + 1}`,
      name: p.name,
      price: p.price,
      stock,
      maxStock,
      imageUrl: p.imageUrl,
    };
  });

const buildWeeklySales = (seed: number): SalesPoint[] => {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  return days.map((day, idx) => ({
    day,
    sales: Math.round(
      1500 + Math.sin((seed + idx) * 1.3) * 900 + ((seed * (idx + 2)) % 700),
    ),
  }));
};

const buildDailyTemperature = (
  seed: number,
  target: number,
): TemperaturePoint[] => {
  return Array.from({ length: 24 }, (_, h) => ({
    hour: `${h.toString().padStart(2, "0")}h`,
    temperature:
      Math.round(
        (target + Math.sin((h + seed) / 3) * 1.2 + ((seed + h) % 5) * 0.15) * 10,
      ) / 10,
  }));
};

export const vendingMachines: VendingMachine[] = [
  {
    id: "vm-001",
    name: "Machine Alpha",
    location: "Centre Commercial Bab Ezzouar",
    status: "online",
    temperature: 5.2,
    targetTemperature: 5,
    lastSync: iso(3),
    stockLevel: 78,
    totalSales: 28450,
    locked: false,
    coolingEnabled: true,
    products: buildProducts("vm-001", 7),
    weeklySales: buildWeeklySales(7),
    dailyTemperature: buildDailyTemperature(7, 5),
  },
  {
    id: "vm-002",
    name: "Machine Beta",
    location: "Gare Agha",
    status: "online",
    temperature: 6.1,
    targetTemperature: 6,
    lastSync: iso(1),
    stockLevel: 62,
    totalSales: 19800,
    locked: false,
    coolingEnabled: true,
    products: buildProducts("vm-002", 11),
    weeklySales: buildWeeklySales(11),
    dailyTemperature: buildDailyTemperature(11, 6),
  },
  {
    id: "vm-003",
    name: "Machine Gamma",
    location: "Aéroport Houari Boumediene - Terminal 1",
    status: "maintenance",
    temperature: 8.4,
    targetTemperature: 5,
    lastSync: iso(45),
    stockLevel: 34,
    totalSales: 41200,
    locked: true,
    coolingEnabled: false,
    products: buildProducts("vm-003", 13),
    weeklySales: buildWeeklySales(13),
    dailyTemperature: buildDailyTemperature(13, 8),
  },
  {
    id: "vm-004",
    name: "Machine Delta",
    location: "Université USTHB - Bab Ezzouar",
    status: "online",
    temperature: 4.8,
    targetTemperature: 5,
    lastSync: iso(6),
    stockLevel: 45,
    totalSales: 15600,
    locked: false,
    coolingEnabled: true,
    products: buildProducts("vm-004", 17),
    weeklySales: buildWeeklySales(17),
    dailyTemperature: buildDailyTemperature(17, 5),
  },
  {
    id: "vm-005",
    name: "Machine Epsilon",
    location: "Hôpital Mustapha Pacha",
    status: "offline",
    temperature: 12.3,
    targetTemperature: 5,
    lastSync: iso(320),
    stockLevel: 58,
    totalSales: 22100,
    locked: false,
    coolingEnabled: false,
    products: buildProducts("vm-005", 19),
    weeklySales: buildWeeklySales(19),
    dailyTemperature: buildDailyTemperature(19, 10),
  },
  {
    id: "vm-006",
    name: "Machine Zeta",
    location: "Parc des Grands Vents",
    status: "online",
    temperature: 5.6,
    targetTemperature: 6,
    lastSync: iso(2),
    stockLevel: 91,
    totalSales: 33750,
    locked: false,
    coolingEnabled: true,
    products: buildProducts("vm-006", 23),
    weeklySales: buildWeeklySales(23),
    dailyTemperature: buildDailyTemperature(23, 6),
  },
  {
    id: "vm-007",
    name: "Machine Eta",
    location: "Métro Place des Martyrs",
    status: "online",
    temperature: 5.9,
    targetTemperature: 6,
    lastSync: iso(4),
    stockLevel: 27,
    totalSales: 26900,
    locked: false,
    coolingEnabled: true,
    products: buildProducts("vm-007", 29),
    weeklySales: buildWeeklySales(29),
    dailyTemperature: buildDailyTemperature(29, 6),
  },
  {
    id: "vm-008",
    name: "Machine Theta",
    location: "Siège Urba Tech Inter - Hydra",
    status: "online",
    temperature: 5.1,
    targetTemperature: 5,
    lastSync: iso(8),
    stockLevel: 84,
    totalSales: 18500,
    locked: false,
    coolingEnabled: true,
    products: buildProducts("vm-008", 31),
    weeklySales: buildWeeklySales(31),
    dailyTemperature: buildDailyTemperature(31, 5),
  },
];

export const initialAlerts: Alert[] = [
  {
    id: "alert-1",
    machineId: "vm-005",
    type: "offline",
    message: "La machine est hors ligne depuis plus de 5 heures.",
    timestamp: iso(320),
    severity: "critical",
  },
  {
    id: "alert-2",
    machineId: "vm-003",
    type: "temperature",
    message: "Température au-dessus de la cible (8.4°C / 5°C).",
    timestamp: iso(44),
    severity: "critical",
  },
  {
    id: "alert-3",
    machineId: "vm-003",
    type: "maintenance",
    message: "Machine en mode maintenance - intervention technicien requise.",
    timestamp: iso(60),
    severity: "warning",
  },
  {
    id: "alert-4",
    machineId: "vm-007",
    type: "stock_low",
    message: "Niveau de stock faible (27%). Réapprovisionnement conseillé.",
    timestamp: iso(15),
    severity: "warning",
  },
  {
    id: "alert-5",
    machineId: "vm-004",
    type: "stock_low",
    message: "Stock de Red Bull épuisé.",
    timestamp: iso(90),
    severity: "warning",
  },
  {
    id: "alert-6",
    machineId: "vm-002",
    type: "temperature",
    message: "Légère fluctuation de température détectée.",
    timestamp: iso(25),
    severity: "info",
  },
  {
    id: "alert-7",
    machineId: "vm-006",
    type: "stock_low",
    message: "Café expresso en rupture de stock imminente.",
    timestamp: iso(5),
    severity: "info",
  },
  {
    id: "alert-8",
    machineId: "vm-001",
    type: "maintenance",
    message: "Maintenance préventive planifiée dans 3 jours.",
    timestamp: iso(120),
    severity: "info",
  },
];
