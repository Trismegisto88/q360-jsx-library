import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  Legend, ComposedChart, Area
} from "recharts";
import {
  DollarSign, TrendingUp, TrendingDown, FileText, Users,
  AlertTriangle, Clock, ChevronDown, ChevronUp, BarChart3,
  ArrowUpRight, ArrowDownRight, Briefcase, CreditCard
} from "lucide-react";

// ── Q360 BRAND ──
const C = {
  purplish: "#4814DA", liberty: "#11152F", smoke: "#F5F5F5",
  electric: "#5FDAF4", fuchsia: "#D946EF", rose: "#F43F5E",
  indigo: "#6366F1", green: "#22C55E", red: "#EF4444",
  amber: "#F59E0B", slate: "#475569", chrome: "#D1D5DB",
  chart: ["#4814DA", "#5FDAF4", "#D946EF", "#F43F5E", "#6366F1", "#22C55E"],
};

const fmt = {
  c: (n) => `$${(n / 1000).toFixed(0)}K`,
  cFull: (n) => `$${Number(n).toLocaleString("es-MX", { maximumFractionDigits: 0 })}`,
  p: (n) => `${Number(n).toFixed(1)}%`,
  n: (n) => Number(n).toLocaleString("es-MX"),
};

// ── DATA: CONFIRMED FROM NETSUITE SUITEQL + DOCS ──
const REVENUE_MONTHLY = [
  { mes: "Ene", real: 1957297, pres: 2037450, target: 2625000 },
  { mes: "Feb", real: 2144555, pres: 2037450, target: 2625000 },
  { mes: "Mar", real: 2564206, pres: 2037450, target: 2625000 },
];

const REVENUE_BY_UN = [
  { un: "Baterías", revenue: 1097607, costo: 486473, margen: 55.7, cells: 10 },
  { un: "Comedores", revenue: 331487, costo: 62724, margen: 81.1, cells: 1 },
  { un: "Montacargas", revenue: 379844, costo: 108011, margen: 71.6, cells: 3 },
  { un: "AC", revenue: 157475, costo: 85552, margen: 45.7, cells: 1 },
  { un: "MrCoop-Otros", revenue: 126488, costo: 75114, margen: 40.6, cells: 2 },
  { un: "Electromec", revenue: 33000, costo: 38255, margen: -15.9, cells: 1 },
];

const SALES_REPS_MAR = [
  { name: "Jaime González", revenue: 1316580, facturas: 25, pct: 51.4, color: C.purplish },
  { name: "Jorge Argenis", revenue: 879330, facturas: 51, pct: 34.3, color: C.electric },
  { name: "Jazmín Olivares", revenue: 178965, facturas: 10, pct: 7.0, color: C.fuchsia },
  { name: "Gersom García", revenue: 151571, facturas: 11, pct: 5.9, color: C.indigo },
  { name: "Thalía Ortiz", revenue: 37760, facturas: 1, pct: 1.5, color: C.chrome },
];

const CXC_AGING = [
  { bucket: "0-30d", monto: 968448, facturas: 21, color: C.green },
  { bucket: "31-60d", monto: 350000, facturas: 12, color: C.amber },
  { bucket: "61-90d", monto: 250000, facturas: 8, color: C.rose },
  { bucket: "90d+", monto: 352491, facturas: 26, color: C.red },
];

const CASH_FLOW = [
  { mes: "Ene", ingresos: 1957297, egresos: 2342505, saldo: 215482 },
  { mes: "Feb", ingresos: 2144555, egresos: 2552610, saldo: 215914 },
  { mes: "Mar (P)", ingresos: 2439000, egresos: 2256621, saldo: 398293 },
];

const SPLIT_BT_MAR = [
  { name: "Preventivo", value: 2025934, pct: 77.9, color: C.purplish },
  { name: "Correctivo", value: 575507, pct: 22.1, color: C.electric },
];

const ENTITY_MAR = [
  { name: "NM Limited", value: 1728840, pct: 67.4, color: C.liberty },
  { name: "MR Coop", value: 835366, pct: 32.6, color: C.fuchsia },
];

// ── COMPONENTS ──
const KPICard = ({ icon: Icon, label, value, sub, trend, alert, small }) => (
  <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${small ? "p-3" : "p-4"} flex flex-col justify-between`}>
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg" style={{ background: `${C.purplish}12` }}>
          <Icon size={small ? 14 : 16} color={C.purplish} />
        </div>
        <span className={`${small ? "text-[10px]" : "text-xs"} font-medium text-gray-500`}>{label}</span>
      </div>
      {alert && <AlertTriangle size={14} color={C.red} />}
    </div>
    <div className="mt-2">
      <p className={`${small ? "text-base" : "text-xl"} font-bold text-gray-900`}>{value}</p>
      {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
    {trend !== undefined && (
      <div className={`flex items-center gap-1 mt-1.5 ${trend >= 0 ? "text-green-600" : "text-red-500"} text-[11px] font-medium`}>
        {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trend >= 0 ? "+" : ""}{trend}% vs mes ant.
      </div>
    )}
  </div>
);

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-2 mb-3 mt-6">
    {Icon && <Icon size={16} color={C.purplish} />}
    <h3 className="text-sm font-bold text-gray-800">{children}</h3>
  </div>
);

const MiniPie = ({ data, size = 120 }) => (
  <ResponsiveContainer width={size} height={size}>
    <PieChart>
      <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={size * 0.28} outerRadius={size * 0.42} paddingAngle={2} strokeWidth={0}>
        {data.map((d, i) => <Cell key={i} fill={d.color} />)}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill }}>
          {p.name}: {fmt.cFull(p.value)}
        </p>
      ))}
    </div>
  );
};

// ── MAIN ──
export default function CEOFinancialCockpit() {
  const [tab, setTab] = useState("overview");

  const q1Total = REVENUE_MONTHLY.reduce((s, m) => s + m.real, 0);
  const totalAR = CXC_AGING.reduce((s, b) => s + b.monto, 0);
  const totalFacturas = CXC_AGING.reduce((s, b) => s + b.facturas, 0);

  const marginData = REVENUE_BY_UN.filter(u => u.un !== "Electromec").map(u => ({
    name: u.un.length > 10 ? u.un.substring(0, 10) + "." : u.un,
    margen: u.margen,
    revenue: u.revenue,
    fill: u.margen >= 70 ? C.green : u.margen >= 50 ? C.purplish : u.margen >= 40 ? C.amber : C.red,
  }));

  const tabs = [
    { id: "overview", label: "Resumen" },
    { id: "revenue", label: "Revenue" },
    { id: "margin", label: "Rentabilidad" },
    { id: "cashflow", label: "Flujo" },
    { id: "cxc", label: "CxC" },
  ];

  return (
    <div className="min-h-screen" style={{ background: C.smoke, fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* HEADER */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: C.liberty }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.purplish }}>
            <BarChart3 size={16} color="white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm tracking-wide">DB-02 · CEO Financial Cockpit</h1>
            <p className="text-gray-400 text-[10px]">Quantum 360° · Datos NetSuite SuiteQL · Marzo 2026</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-[10px]">Última actualización</p>
          <p className="text-white text-xs font-medium">28 Mar 2026 · 03:00 CST</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 px-4 pt-3 pb-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              tab === t.id
                ? "text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 bg-white/60"
            }`}
            style={tab === t.id ? { background: C.purplish } : {}}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 pb-6">
        {/* ══════════════════ OVERVIEW ══════════════════ */}
        {tab === "overview" && (
          <>
            {/* KPI ROW 1 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              <KPICard icon={DollarSign} label="Revenue Marzo" value={fmt.cFull(2564206)} sub="Q1 YTD: $6.67M" trend={19.6} />
              <KPICard icon={TrendingUp} label="Margen Operativo" value={fmt.p(59.7)} sub="Benchmark FM: 52.8% (Rollins)" />
              <KPICard icon={CreditCard} label="CxC Abierta" value={fmt.cFull(totalAR)} sub={`${totalFacturas} facturas`} alert />
              <KPICard icon={Briefcase} label="Saldo Caja" value={fmt.cFull(215914)} sub="Breakeven operativo" />
            </div>

            {/* KPI ROW 2 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              <KPICard small icon={FileText} label="Facturas Mar" value="98" sub="25 Jaime · 51 Jorge · 11 Gersom" />
              <KPICard small icon={Users} label="Empleados" value="61" sub="45 NM + 16 MR · 3 supervisores" />
              <KPICard small icon={Clock} label="AR 90d+" value={fmt.cFull(352491)} sub="26 facturas — ALERTA" alert />
              <KPICard small icon={TrendingUp} label="Prev vs Corr" value="78% / 22%" sub="$2.03M prev · $575K corr" />
            </div>

            {/* REVENUE TREND + ENTITY SPLIT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <p className="text-xs font-bold text-gray-700 mb-3">Revenue Mensual Q1 2026</p>
                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart data={REVENUE_MONTHLY} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="real" name="Real" fill={C.purplish} radius={[4, 4, 0, 0]} barSize={36} />
                    <Line dataKey="target" name="Target 2026" stroke={C.red} strokeDasharray="5 5" strokeWidth={2} dot={false} />
                    <Line dataKey="pres" name="Presupuesto" stroke={C.amber} strokeDasharray="3 3" strokeWidth={1.5} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* SPLIT CARDS */}
              <div className="space-y-3">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <p className="text-[10px] font-semibold text-gray-500 mb-2">Por Entidad — Marzo</p>
                  <div className="flex items-center gap-2">
                    <MiniPie data={ENTITY_MAR} size={80} />
                    <div className="text-xs space-y-1.5">
                      {ENTITY_MAR.map(e => (
                        <div key={e.name} className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                          <span className="text-gray-600">{e.name}</span>
                          <span className="font-bold text-gray-800 ml-auto">{e.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <p className="text-[10px] font-semibold text-gray-500 mb-2">Preventivo vs Correctivo — Mar</p>
                  <div className="flex items-center gap-2">
                    <MiniPie data={SPLIT_BT_MAR} size={80} />
                    <div className="text-xs space-y-1.5">
                      {SPLIT_BT_MAR.map(e => (
                        <div key={e.name} className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                          <span className="text-gray-600">{e.name}</span>
                          <span className="font-bold text-gray-800 ml-auto">{fmt.c(e.value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ REVENUE TAB ══════════════════ */}
        {tab === "revenue" && (
          <>
            <SectionTitle icon={DollarSign}>Revenue por Sales Rep — Marzo 2026</SectionTitle>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={SALES_REPS_MAR} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" name="Revenue" radius={[0, 4, 4, 0]} barSize={24}>
                    {SALES_REPS_MAR.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-4 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: C.purplish }}>
                    {["Sales Rep", "Facturas", "Revenue", "% Total"].map(h => (
                      <th key={h} className="text-left text-white font-semibold px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SALES_REPS_MAR.map((r, i) => (
                    <tr key={r.name} className={i % 2 ? "bg-gray-50/50" : "bg-white"}>
                      <td className="px-4 py-2 font-medium text-gray-800">{r.name}</td>
                      <td className="px-4 py-2 text-gray-600">{r.facturas}</td>
                      <td className="px-4 py-2 font-semibold" style={{ color: C.liberty }}>{fmt.cFull(r.revenue)}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
                          </div>
                          <span className="text-gray-600">{r.pct}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-200 font-bold">
                    <td className="px-4 py-2.5">Total</td>
                    <td className="px-4 py-2.5">98</td>
                    <td className="px-4 py-2.5" style={{ color: C.purplish }}>{fmt.cFull(2564206)}</td>
                    <td className="px-4 py-2.5">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* REVENUE BY UN */}
            <SectionTitle icon={BarChart3}>Revenue por UN — Promedio Mensual</SectionTitle>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={REVENUE_BY_UN} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="un" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => fmt.c(v)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" name="Revenue" fill={C.purplish} radius={[4, 4, 0, 0]} barSize={32}>
                    {REVENUE_BY_UN.map((d, i) => <Cell key={i} fill={C.chart[i % C.chart.length]} />)}
                  </Bar>
                  <Bar dataKey="costo" name="Costo" fill={C.chrome} radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ══════════════════ MARGIN TAB ══════════════════ */}
        {tab === "margin" && (
          <>
            <SectionTitle icon={TrendingUp}>Margen Operativo por Línea de Negocio</SectionTitle>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={marginData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} domain={[0, 100]} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Bar dataKey="margen" name="Margen %" radius={[4, 4, 0, 0]} barSize={36}>
                    {marginData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background: C.green}} /> 70%+</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background: C.purplish}} /> 50-69%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background: C.amber}} /> 40-49%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background: C.red}} /> &lt;40%</span>
              </div>
            </div>

            {/* DETAIL TABLE */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-4 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: C.purplish }}>
                    {["UN", "Céls", "Revenue/Mes", "Costo", "Utilidad", "Margen", "% Rev"].map(h => (
                      <th key={h} className="text-left text-white font-semibold px-3 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REVENUE_BY_UN.map((u, i) => (
                    <tr key={u.un} className={i % 2 ? "bg-gray-50/50" : "bg-white"}>
                      <td className="px-3 py-2 font-medium text-gray-800">{u.un}</td>
                      <td className="px-3 py-2 text-gray-500 text-center">{u.cells}</td>
                      <td className="px-3 py-2 font-semibold">{fmt.cFull(u.revenue)}</td>
                      <td className="px-3 py-2 text-gray-500">{fmt.cFull(u.costo)}</td>
                      <td className="px-3 py-2 font-semibold" style={{ color: u.margen >= 0 ? C.green : C.red }}>{fmt.cFull(u.revenue - u.costo)}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{
                          background: u.margen >= 70 ? "#dcfce7" : u.margen >= 50 ? "#ede9fe" : u.margen >= 40 ? "#fef3c7" : u.margen >= 0 ? "#fee2e2" : "#dbeafe",
                          color: u.margen >= 70 ? C.green : u.margen >= 50 ? C.purplish : u.margen >= 40 ? "#92400e" : u.margen >= 0 ? C.red : "#1d4ed8",
                        }}>
                          {fmt.p(u.margen)}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-500">{fmt.p(u.revenue / 2125901 * 100)}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-200 font-bold">
                    <td className="px-3 py-2.5">Total</td>
                    <td className="px-3 py-2.5 text-center">18</td>
                    <td className="px-3 py-2.5">{fmt.cFull(2125901)}</td>
                    <td className="px-3 py-2.5">{fmt.cFull(856129)}</td>
                    <td className="px-3 py-2.5" style={{ color: C.green }}>{fmt.cFull(1269772)}</td>
                    <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">59.7%</span></td>
                    <td className="px-3 py-2.5">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BENCHMARK */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mt-4">
              <p className="text-[10px] font-semibold text-gray-500 mb-2">Benchmark Industria FM</p>
              <div className="space-y-2">
                {[
                  { name: "Q360", val: 59.7, color: C.purplish },
                  { name: "Rollins (FY25)", val: 52.8, color: C.slate },
                  { name: "Comfort Systems", val: 24.1, color: C.chrome },
                  { name: "Otis (Servicio)", val: 24.6, color: C.chrome },
                ].map(b => (
                  <div key={b.name} className="flex items-center gap-3">
                    <span className="text-[11px] text-gray-600 w-28">{b.name}</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${b.val}%`, background: b.color }} />
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: b.color }}>{b.val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ CASH FLOW TAB ══════════════════ */}
        {tab === "cashflow" && (
          <>
            <SectionTitle icon={CreditCard}>Flujo de Efectivo Consolidado Q1 2026</SectionTitle>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={CASH_FLOW} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="ingresos" name="Ingresos" fill={C.purplish} radius={[4, 4, 0, 0]} barSize={28} />
                  <Bar dataKey="egresos" name="Egresos" fill={C.rose} radius={[4, 4, 0, 0]} barSize={28} opacity={0.7} />
                  <Line dataKey="saldo" name="Saldo" stroke={C.green} strokeWidth={2.5} dot={{ r: 4, fill: C.green }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* DETAIL TABLE */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-4 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: C.purplish }}>
                    {["Mes", "Ingresos", "Egresos", "Flujo Neto", "Saldo"].map(h => (
                      <th key={h} className="text-left text-white font-semibold px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CASH_FLOW.map((r, i) => {
                    const neto = r.ingresos - r.egresos;
                    return (
                      <tr key={r.mes} className={i % 2 ? "bg-gray-50/50" : "bg-white"}>
                        <td className="px-4 py-2 font-medium text-gray-800">{r.mes}</td>
                        <td className="px-4 py-2 text-gray-700">{fmt.cFull(r.ingresos)}</td>
                        <td className="px-4 py-2 text-gray-700">{fmt.cFull(r.egresos)}</td>
                        <td className="px-4 py-2 font-bold" style={{ color: neto >= 0 ? C.green : C.red }}>
                          {neto >= 0 ? "+" : ""}{fmt.cFull(neto)}
                        </td>
                        <td className="px-4 py-2 font-bold text-gray-800">{fmt.cFull(r.saldo)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* KEY ITEMS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <p className="text-[10px] font-semibold text-gray-500 mb-2">Egresos Top Feb 2026</p>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Nómina (flujo)", val: 923088, pct: 36.2 },
                    { label: "Gastos Admin", val: 443117, pct: 17.4 },
                    { label: "Insumos", val: 303008, pct: 11.9 },
                    { label: "Acreedores", val: 272663, pct: 10.7 },
                    { label: "Flotilla", val: 159458, pct: 6.3 },
                    { label: "Impuestos", val: 120136, pct: 4.7 },
                    { label: "Préstamo BBVA", val: 73540, pct: 2.9 },
                  ].map(e => (
                    <div key={e.label} className="flex items-center gap-2">
                      <span className="text-gray-600 w-28">{e.label}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${e.pct * 2.5}%`, background: C.purplish }} />
                      </div>
                      <span className="font-medium text-gray-700 w-16 text-right">{fmt.c(e.val)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <p className="text-[10px] font-semibold text-gray-500 mb-2">Deuda Activa</p>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">BBVA MrCoop</p>
                      <p className="text-gray-500">$44,500/mes fijo</p>
                    </div>
                    <p className="font-bold text-red-600">$2,625,000</p>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">OVB1 + OVB2 + EVF</p>
                      <p className="text-gray-500">PAUSADAS sin intereses</p>
                    </div>
                    <p className="font-bold text-gray-500">~$2,740,000</p>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">Benjamin + Yair</p>
                      <p className="text-green-600 font-medium">LIQUIDADOS</p>
                    </div>
                    <p className="font-bold text-green-600">$0</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════ CXC TAB ══════════════════ */}
        {tab === "cxc" && (
          <>
            <SectionTitle icon={AlertTriangle}>Cuentas por Cobrar — Aging</SectionTitle>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-1">
              {CXC_AGING.map(b => (
                <div key={b.bucket} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: b.color }} />
                    <span className="text-xs font-semibold text-gray-600">{b.bucket}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{fmt.cFull(b.monto)}</p>
                  <p className="text-[10px] text-gray-400">{b.facturas} facturas</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mt-4">
              <p className="text-xs font-bold text-gray-700 mb-3">Distribución CxC</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={CXC_AGING} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="bucket" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => fmt.c(v)} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="monto" name="Monto" radius={[4, 4, 0, 0]} barSize={44}>
                    {CXC_AGING.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ALERTS */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} color={C.red} />
                <p className="text-xs font-bold text-red-700">Alertas CxC Activas</p>
              </div>
              <div className="space-y-2 text-xs text-red-800">
                <div className="flex justify-between items-center">
                  <span>MrCoop arrastre 90d+: 18 OTs</span>
                  <span className="font-bold">$135,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Montacargas arrastre Feb</span>
                  <span className="font-bold">$85,676</span>
                </div>
                <div className="flex justify-between items-center border-t border-red-200 pt-2 mt-1">
                  <span className="font-bold">Total arrastre crítico</span>
                  <span className="font-bold">$220,676</span>
                </div>
              </div>
              <p className="text-[10px] text-red-600 mt-2">Owner: Thalía Ortiz (Jazmín apoya si escala)</p>
            </div>
          </>
        )}

        {/* FOOTER */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-[10px] text-gray-400">Quantum 360° · CEO Financial Cockpit DB-02 · Datos NetSuite SuiteQL</p>
          <p className="text-[10px] text-gray-400">Fuente: WF-NS01 (3AM) → PostgreSQL → Monday 18402650904</p>
        </div>
      </div>
    </div>
  );
}
