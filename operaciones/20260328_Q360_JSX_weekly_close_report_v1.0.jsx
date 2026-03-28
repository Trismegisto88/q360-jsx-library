import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChevronDown, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, DollarSign, FileText, Wrench, Users, ArrowRight, Printer } from "lucide-react";

const COLORS = {
  navy: '#1B2A4A',
  navyLight: '#2D4373',
  blue: '#3B82F6',
  blueLight: '#93C5FD',
  bluePale: '#DBEAFE',
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray500: '#6B7280',
  gray700: '#374151',
  gray900: '#111827',
  success: '#059669',
  successBg: '#D1FAE5',
  error: '#DC2626',
  errorBg: '#FEE2E2',
  warning: '#D97706',
  warningBg: '#FEF3C7',
  purple: '#4814DA',
  teal: '#5FDAF4',
};

const fmt = {
  currency: (n) => `$${Number(n).toLocaleString('es-MX', { minimumFractionDigits: 0 })}`,
  percent: (n) => `${Number(n).toFixed(1)}%`,
  number: (n) => Number(n).toLocaleString('es-MX'),
};

// ── DATA ──
const weekData = {
  period: "Semana 13 · 24-28 Marzo 2026",
  generatedAt: "28-Mar-2026 18:00 CST",
  
  management: {
    summary: {
      revenueTarget: 640000, revenueActual: 689420, 
      otsTarget: 85, otsActual: 92,
      servicesTarget: 210, servicesActual: 227,
      collectionTarget: 580000, collectionActual: 543200,
      marginTarget: 59.7, marginActual: 61.2,
      correctivosDetected: 14, correctivosBilled: 9,
      cxcOver90: 352491, slaCompliance: 94.2,
    },
    byUN: [
      { un: "Baterías", supervisor: "Jaime González", cells: 10, techs: 28, 
        revenueTarget: 310000, revenueActual: 341580, otsTarget: 35, otsActual: 38,
        servicesTarget: 120, servicesActual: 131, collectionTarget: 280000, collectionActual: 267400,
        margin: 55.7, corrDetected: 5, corrBilled: 3, sla: 92.1 },
      { un: "Montacargas", supervisor: "Gersom García", cells: 3, techs: 4,
        revenueTarget: 106000, revenueActual: 118571, otsTarget: 18, otsActual: 21,
        servicesTarget: 35, servicesActual: 39, collectionTarget: 95000, collectionActual: 102300,
        margin: 71.6, corrDetected: 6, corrBilled: 4, sla: 97.5 },
      { un: "MrCoop", supervisor: "Jorge Argenis", cells: 4, techs: 10,
        revenueTarget: 198000, revenueActual: 203330, otsTarget: 28, otsActual: 29,
        servicesTarget: 45, servicesActual: 47, collectionTarget: 180000, collectionActual: 151200,
        margin: 56.8, corrDetected: 3, corrBilled: 2, sla: 95.8 },
      { un: "Carritos INOX", supervisor: "Thalía Ortiz", cells: 1, techs: 0,
        revenueTarget: 18000, revenueActual: 17760, otsTarget: 3, otsActual: 3,
        servicesTarget: 8, servicesActual: 8, collectionTarget: 18000, collectionActual: 15800,
        margin: 30.0, corrDetected: 0, corrBilled: 0, sla: 100 },
      { un: "Electromecánico", supervisor: "Jaime González", cells: 1, techs: 2,
        revenueTarget: 8000, revenueActual: 8179, otsTarget: 1, otsActual: 1,
        servicesTarget: 2, servicesActual: 2, collectionTarget: 7000, collectionActual: 6500,
        margin: -11.0, corrDetected: 0, corrBilled: 0, sla: 100 },
    ],
  },

  gersom: {
    cells: [
      { name: "MONTA-CORR", location: "Sam's ZMVM", techs: 1, revenueTarget: 24000, revenueActual: 27240,
        otsTarget: 8, otsActual: 10, servicesTarget: 12, servicesActual: 14, collection: 26100, margin: 72.1,
        corrDetected: 3, corrBilled: 2, sla: 98.0, topIssue: "2 correctivos pendientes cotizar" },
      { name: "MONTA-PREV1", location: "Sam's Cluster 1 (19)", techs: 2, revenueTarget: 44000, revenueActual: 48750,
        otsTarget: 5, otsActual: 6, servicesTarget: 12, servicesActual: 13, collection: 42200, margin: 65.1,
        corrDetected: 2, corrBilled: 1, sla: 96.0, topIssue: "1 OT sin evidencia fotográfica" },
      { name: "MONTA-PREV2", location: "Sam's Cluster 2 (20)", techs: 1, revenueTarget: 38000, revenueActual: 42581,
        otsTarget: 5, otsActual: 5, servicesTarget: 11, servicesActual: 12, collection: 34000, margin: 77.3,
        corrDetected: 1, corrBilled: 1, sla: 98.5, topIssue: "Todo en orden" },
    ]
  },

  jaime: {
    cells: [
      { name: "BAT-SMO", location: "San Martín Obispo", techs: 5, revenueTarget: 46000, revenueActual: 49160, otsTarget: 4, otsActual: 5, servicesTarget: 14, servicesActual: 16, collection: 44200, margin: 52.0, corrDetected: 1, corrBilled: 1, sla: 93.0, topIssue: "1 batería reportada con sulfatación" },
      { name: "BAT-CUAUT", location: "Cuautitlán", techs: 4, revenueTarget: 50000, revenueActual: 53420, otsTarget: 5, otsActual: 5, servicesTarget: 15, servicesActual: 17, collection: 48900, margin: 66.7, corrDetected: 1, corrBilled: 0, sla: 91.0, topIssue: "17 bats fuera contrato — OT mensual" },
      { name: "BAT-CHALCO", location: "Chalco", techs: 5, revenueTarget: 37000, revenueActual: 39360, otsTarget: 4, otsActual: 4, servicesTarget: 13, servicesActual: 14, collection: 35100, margin: 42.9, corrDetected: 1, corrBilled: 1, sla: 94.0, topIssue: "Margen bajo — revisar nómina" },
      { name: "BAT-MEGA10", location: "Las Ánimas N10", techs: 4, revenueTarget: 30000, revenueActual: 32530, otsTarget: 3, otsActual: 4, servicesTarget: 10, servicesActual: 11, collection: 28400, margin: 44.3, corrDetected: 0, corrBilled: 0, sla: 92.5, topIssue: "Sin novedades" },
      { name: "BAT-VHSA-P", location: "VHSA Perecederos", techs: 3, revenueTarget: 27000, revenueActual: 28920, otsTarget: 3, otsActual: 3, servicesTarget: 9, servicesActual: 10, collection: 26200, margin: 61.6, corrDetected: 1, corrBilled: 0, sla: 90.0, topIssue: "Técnico con falta — cubrir turno" },
      { name: "BAT-MERIDA", location: "Mérida", techs: 4, revenueTarget: 25000, revenueActual: 26200, otsTarget: 3, otsActual: 3, servicesTarget: 10, servicesActual: 9, collection: 18600, margin: 31.1, corrDetected: 0, corrBilled: 0, sla: 89.0, topIssue: "Margen BAJO — acción requerida" },
      { name: "BAT-VHSA-S", location: "VHSA Secos", techs: 3, revenueTarget: 23000, revenueActual: 24360, otsTarget: 3, otsActual: 3, servicesTarget: 9, servicesActual: 10, collection: 22100, margin: 53.8, corrDetected: 0, corrBilled: 0, sla: 93.5, topIssue: "Sin novedades" },
      { name: "BAT-N7Y8", location: "Las Ánimas N7+8", techs: 2, revenueTarget: 20000, revenueActual: 21320, otsTarget: 3, otsActual: 3, servicesTarget: 7, servicesActual: 8, collection: 19400, margin: 52.0, corrDetected: 1, corrBilled: 1, sla: 94.0, topIssue: "Sin novedades" },
      { name: "BAT-SBB", location: "Santa Bárbara", techs: 2, revenueTarget: 16000, revenueActual: 17240, otsTarget: 3, otsActual: 3, servicesTarget: 7, servicesActual: 7, collection: 15200, margin: 48.8, corrDetected: 0, corrBilled: 0, sla: 91.0, topIssue: "Sin novedades" },
      { name: "BAT-JW", location: "James Watt", techs: 1, revenueTarget: 13000, revenueActual: 14070, otsTarget: 3, otsActual: 4, servicesTarget: 5, servicesActual: 5, collection: 12500, margin: 56.4, corrDetected: 0, corrBilled: 0, sla: 93.0, topIssue: "Sin novedades" },
    ]
  },

  jorge: {
    cells: [
      { name: "COMEDORES", location: "Comedores (6 sub)", techs: 3, revenueTarget: 86000, revenueActual: 92130, otsTarget: 12, otsActual: 13, servicesTarget: 18, servicesActual: 20, collection: 78400, margin: 81.1, corrDetected: 1, corrBilled: 1, sla: 97.0, topIssue: "ASSET #1 — rendimiento excelente" },
      { name: "AC-CUAUT", location: "Cuautitlán (AC)", techs: 4, revenueTarget: 41000, revenueActual: 43760, otsTarget: 8, otsActual: 8, servicesTarget: 12, servicesActual: 12, collection: 36200, margin: 45.7, corrDetected: 1, corrBilled: 1, sla: 95.0, topIssue: "Sin Jefe Célula AC-HVAC" },
      { name: "SMO-Cocinas-RPC", location: "SMO", techs: 2, revenueTarget: 18000, revenueActual: 19180, otsTarget: 5, otsActual: 5, servicesTarget: 8, servicesActual: 8, collection: 14600, margin: 30.9, corrDetected: 1, corrBilled: 0, sla: 94.0, topIssue: "Margen bajo — revisar estructura" },
      { name: "RPC-GDL", location: "Guadalajara", techs: 1, revenueTarget: 15000, revenueActual: 15870, otsTarget: 3, otsActual: 3, servicesTarget: 7, servicesActual: 7, collection: 12000, margin: 52.5, corrDetected: 0, corrBilled: 0, sla: 97.0, topIssue: "Sin novedades" },
    ]
  }
};

// ── COMPONENTS ──
const StatusPill = ({ value, target, inverse = false }) => {
  const ratio = value / target;
  const isGood = inverse ? ratio <= 1 : ratio >= 1;
  const isWarn = inverse ? (ratio > 1 && ratio < 1.15) : (ratio >= 0.85 && ratio < 1);
  if (isGood) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold" style={{background: COLORS.successBg, color: COLORS.success}}><CheckCircle size={12}/> Cumplido</span>;
  if (isWarn) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold" style={{background: COLORS.warningBg, color: COLORS.warning}}><Clock size={12}/> Parcial</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold" style={{background: COLORS.errorBg, color: COLORS.error}}><AlertTriangle size={12}/> Bajo</span>;
};

const VariationBadge = ({ actual, target }) => {
  const pct = ((actual - target) / target * 100);
  const isPositive = pct >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
      {isPositive ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
      {isPositive ? '+' : ''}{pct.toFixed(1)}%
    </span>
  );
};

const KPICard = ({ icon: Icon, label, value, target, format = 'currency', inverse = false }) => {
  const fmtVal = format === 'currency' ? fmt.currency(value) : format === 'percent' ? fmt.percent(value) : fmt.number(value);
  const fmtTgt = format === 'currency' ? fmt.currency(target) : format === 'percent' ? fmt.percent(target) : fmt.number(target);
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded flex items-center justify-center" style={{background: COLORS.bluePale}}>
          <Icon size={16} style={{color: COLORS.navy}}/>
        </div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-xl font-bold text-gray-900">{fmtVal}</div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-400">Obj: {fmtTgt}</span>
        <VariationBadge actual={value} target={target}/>
      </div>
    </div>
  );
};

// ── NETSUITE HEADER ──
const NetSuiteHeader = ({ title, subtitle }) => (
  <div className="border-b-2" style={{borderColor: COLORS.navy}}>
    <div className="flex items-center justify-between py-3 px-4" style={{background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyLight} 100%)`}}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
          <span className="text-white font-bold text-sm">Q</span>
        </div>
        <div>
          <h1 className="text-white font-bold text-base leading-tight">{title}</h1>
          <p className="text-blue-200 text-xs">{subtitle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-blue-200 text-xs">Quantum 360°</p>
        <p className="text-white text-xs font-medium">{weekData.period}</p>
      </div>
    </div>
    <div className="flex items-center justify-between px-4 py-1.5 bg-gray-50 text-xs text-gray-500">
      <span>Generado: {weekData.generatedAt}</span>
      <span>NM Limited + MR Coop</span>
    </div>
  </div>
);

// ── TABLE ROW FOR CELLS ──
const CellRow = ({ cell, index }) => (
  <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
    <td className="px-3 py-2 text-xs font-semibold text-gray-800 whitespace-nowrap">{cell.name}</td>
    <td className="px-3 py-2 text-xs text-gray-600">{cell.location || '—'}</td>
    <td className="px-3 py-2 text-xs text-center">{cell.techs}</td>
    <td className="px-3 py-2 text-xs text-right font-medium">{cell.servicesActual}<span className="text-gray-400">/{cell.servicesTarget}</span></td>
    <td className="px-3 py-2 text-xs text-center"><StatusPill value={cell.servicesActual} target={cell.servicesTarget}/></td>
    <td className="px-3 py-2 text-xs text-right font-medium">{cell.otsActual}<span className="text-gray-400">/{cell.otsTarget}</span></td>
    <td className="px-3 py-2 text-xs text-center"><StatusPill value={cell.otsActual} target={cell.otsTarget}/></td>
    <td className="px-3 py-2 text-xs text-right font-medium">{fmt.currency(cell.revenueActual)}<span className="text-gray-400 block text-[10px]">obj: {fmt.currency(cell.revenueTarget)}</span></td>
    <td className="px-3 py-2 text-xs text-center"><VariationBadge actual={cell.revenueActual} target={cell.revenueTarget}/></td>
    <td className="px-3 py-2 text-xs text-right">{fmt.currency(cell.collection)}</td>
    <td className="px-3 py-2 text-xs text-center font-semibold" style={{color: cell.margin >= 50 ? COLORS.success : cell.margin >= 35 ? COLORS.warning : COLORS.error}}>{fmt.percent(cell.margin)}</td>
    <td className="px-3 py-2 text-xs text-center">{cell.corrDetected}<span className="text-gray-400">/{cell.corrBilled}</span></td>
    <td className="px-3 py-2 text-xs text-center" style={{color: cell.sla >= 95 ? COLORS.success : cell.sla >= 90 ? COLORS.warning : COLORS.error}}>{fmt.percent(cell.sla)}</td>
  </tr>
);

// ── MANAGEMENT REPORT ──
const ManagementReport = () => {
  const d = weekData.management;
  const s = d.summary;
  const chartData = d.byUN.filter(u => u.un !== 'Electromecánico').map(u => ({
    name: u.un.length > 8 ? u.un.substring(0,8)+'.' : u.un,
    Real: u.revenueActual,
    Objetivo: u.revenueTarget,
  }));

  return (
    <div>
      <NetSuiteHeader title="Cierre Semanal — Management Team" subtitle="Reporte Consolidado Todas las UNs"/>
      
      <div className="p-4 space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KPICard icon={DollarSign} label="Facturación" value={s.revenueActual} target={s.revenueTarget}/>
          <KPICard icon={DollarSign} label="Cobranza" value={s.collectionActual} target={s.collectionTarget}/>
          <KPICard icon={FileText} label="OTs Cerradas" value={s.otsActual} target={s.otsTarget} format="number"/>
          <KPICard icon={Wrench} label="Servicios" value={s.servicesActual} target={s.servicesTarget} format="number"/>
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500">Margen Operativo</p>
            <p className="text-lg font-bold" style={{color: COLORS.success}}>{fmt.percent(s.marginActual)}</p>
            <p className="text-[10px] text-gray-400">Obj: {fmt.percent(s.marginTarget)}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500">Correctivos Detectados</p>
            <p className="text-lg font-bold text-gray-900">{s.correctivosDetected}</p>
            <p className="text-[10px] text-gray-400">{s.correctivosBilled} facturados</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500">CxC +90 días</p>
            <p className="text-lg font-bold" style={{color: COLORS.error}}>{fmt.currency(s.cxcOver90)}</p>
            <p className="text-[10px] text-gray-400">26 facturas abiertas</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500">SLA Compliance</p>
            <p className="text-lg font-bold" style={{color: s.slaCompliance >= 95 ? COLORS.success : COLORS.warning}}>{fmt.percent(s.slaCompliance)}</p>
            <p className="text-[10px] text-gray-400">Obj: 95.0%</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Facturación por UN — Real vs Objetivo</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"/>
              <XAxis dataKey="name" tick={{fontSize: 11}} stroke="#9CA3AF"/>
              <YAxis tick={{fontSize: 10}} stroke="#9CA3AF" tickFormatter={v => `$${(v/1000).toFixed(0)}K`}/>
              <Tooltip formatter={(v) => fmt.currency(v)}/>
              <Bar dataKey="Objetivo" fill={COLORS.gray300} radius={[2,2,0,0]}/>
              <Bar dataKey="Real" fill={COLORS.navy} radius={[2,2,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table by UN */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2 border-b" style={{background: COLORS.navy}}>
            <h3 className="text-sm font-semibold text-white">Desglose por Unidad de Negocio</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{background: COLORS.bluePale}}>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase">UN</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase">Supervisor</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Céls</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Técs</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-right">Facturación</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">vs Obj</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-right">Cobranza</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">OTs</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Margen</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Corr D/F</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">SLA</th>
                </tr>
              </thead>
              <tbody>
                {d.byUN.map((u, i) => (
                  <tr key={u.un} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-3 py-2 text-xs font-semibold text-gray-800">{u.un}</td>
                    <td className="px-3 py-2 text-xs text-gray-600">{u.supervisor}</td>
                    <td className="px-3 py-2 text-xs text-center">{u.cells}</td>
                    <td className="px-3 py-2 text-xs text-center">{u.techs}</td>
                    <td className="px-3 py-2 text-xs text-right font-medium">{fmt.currency(u.revenueActual)}</td>
                    <td className="px-3 py-2 text-xs text-center"><VariationBadge actual={u.revenueActual} target={u.revenueTarget}/></td>
                    <td className="px-3 py-2 text-xs text-right">{fmt.currency(u.collectionActual)}</td>
                    <td className="px-3 py-2 text-xs text-center">{u.otsActual}/{u.otsTarget}</td>
                    <td className="px-3 py-2 text-xs text-center font-semibold" style={{color: u.margin >= 50 ? COLORS.success : u.margin >= 35 ? COLORS.warning : COLORS.error}}>{fmt.percent(u.margin)}</td>
                    <td className="px-3 py-2 text-xs text-center">{u.corrDetected}/{u.corrBilled}</td>
                    <td className="px-3 py-2 text-xs text-center" style={{color: u.sla >= 95 ? COLORS.success : u.sla >= 90 ? COLORS.warning : COLORS.error}}>{fmt.percent(u.sla)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-300 bg-gray-100 font-bold">
                  <td className="px-3 py-2 text-xs text-gray-900">TOTAL</td>
                  <td className="px-3 py-2 text-xs">—</td>
                  <td className="px-3 py-2 text-xs text-center">{d.byUN.reduce((a,u)=>a+u.cells,0)}</td>
                  <td className="px-3 py-2 text-xs text-center">{d.byUN.reduce((a,u)=>a+u.techs,0)}</td>
                  <td className="px-3 py-2 text-xs text-right">{fmt.currency(d.byUN.reduce((a,u)=>a+u.revenueActual,0))}</td>
                  <td className="px-3 py-2 text-xs text-center"><VariationBadge actual={d.byUN.reduce((a,u)=>a+u.revenueActual,0)} target={d.byUN.reduce((a,u)=>a+u.revenueTarget,0)}/></td>
                  <td className="px-3 py-2 text-xs text-right">{fmt.currency(d.byUN.reduce((a,u)=>a+u.collectionActual,0))}</td>
                  <td className="px-3 py-2 text-xs text-center">{d.byUN.reduce((a,u)=>a+u.otsActual,0)}/{d.byUN.reduce((a,u)=>a+u.otsTarget,0)}</td>
                  <td className="px-3 py-2 text-xs text-center">{fmt.percent(s.marginActual)}</td>
                  <td className="px-3 py-2 text-xs text-center">{s.correctivosDetected}/{s.correctivosBilled}</td>
                  <td className="px-3 py-2 text-xs text-center">{fmt.percent(s.slaCompliance)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2"><AlertTriangle size={14} className="text-amber-500"/> Alertas de la Semana</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 p-2 rounded" style={{background: COLORS.errorBg}}>
              <span className="text-red-600 font-bold">CRÍTICO</span>
              <span className="text-gray-700">CxC +90 días: {fmt.currency(s.cxcOver90)} (26 facturas). MrCoop $135K + Montas $85.7K en arrastre.</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded" style={{background: COLORS.warningBg}}>
              <span className="text-amber-600 font-bold">ALERTA</span>
              <span className="text-gray-700">Q360 sin Casco Rojo activo desde 06-Mar. Mario reclutando reemplazo.</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded" style={{background: COLORS.warningBg}}>
              <span className="text-amber-600 font-bold">ALERTA</span>
              <span className="text-gray-700">Ratio supervisión Jaime: 1:28 (benchmark 1:10-12). Riesgo operativo.</span>
            </div>
            <div className="flex items-start gap-2 p-2 rounded bg-blue-50">
              <span className="text-blue-600 font-bold">INFO</span>
              <span className="text-gray-700">5 correctivos detectados sin facturar. Revenue potencial ~$45K.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-2 border-t border-gray-200">
          <p className="text-[10px] text-gray-400">Quantum 360° | NM Limited S. de R.L. de C.V. | MR Coop S.A. de C.V. | quantum360.ltd</p>
          <p className="text-[10px] text-gray-400">Sin registro, no existe. — Generado por SND</p>
        </div>
      </div>
    </div>
  );
};

// ── SUPERVISOR REPORT ──
const SupervisorReport = ({ supervisor, un, cells, email }) => {
  const totalRevenue = cells.reduce((a,c) => a + c.revenueActual, 0);
  const totalTarget = cells.reduce((a,c) => a + c.revenueTarget, 0);
  const totalOTs = cells.reduce((a,c) => a + c.otsActual, 0);
  const totalOTsTarget = cells.reduce((a,c) => a + c.otsTarget, 0);
  const totalServices = cells.reduce((a,c) => a + c.servicesActual, 0);
  const totalServicesTarget = cells.reduce((a,c) => a + c.servicesTarget, 0);
  const totalCollection = cells.reduce((a,c) => a + c.collection, 0);
  const totalCorr = cells.reduce((a,c) => a + c.corrDetected, 0);
  const totalCorrBilled = cells.reduce((a,c) => a + c.corrBilled, 0);

  return (
    <div>
      <NetSuiteHeader title={`Cierre Semanal — ${un}`} subtitle={`Supervisor: ${supervisor} · ${email}`}/>
      
      <div className="p-4 space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KPICard icon={DollarSign} label="Facturación" value={totalRevenue} target={totalTarget}/>
          <KPICard icon={DollarSign} label="Cobranza" value={totalCollection} target={totalTarget * 0.9}/>
          <KPICard icon={FileText} label="OTs Cerradas" value={totalOTs} target={totalOTsTarget} format="number"/>
          <KPICard icon={Wrench} label="Servicios" value={totalServices} target={totalServicesTarget} format="number"/>
        </div>

        {/* Correctivos highlight */}
        <div className="bg-white border-l-4 border-amber-400 rounded-lg p-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-700">Correctivos Detectados / Facturados</p>
            <p className="text-lg font-bold text-gray-900">{totalCorr} <span className="text-sm text-gray-400">detectados</span> · {totalCorrBilled} <span className="text-sm text-green-600">facturados</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Tasa conversión</p>
            <p className="text-lg font-bold" style={{color: totalCorr > 0 ? (totalCorrBilled/totalCorr >= 0.7 ? COLORS.success : COLORS.warning) : COLORS.gray500}}>
              {totalCorr > 0 ? fmt.percent(totalCorrBilled/totalCorr * 100) : 'N/A'}
            </p>
          </div>
        </div>

        {/* Cell detail table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2 border-b" style={{background: COLORS.navy}}>
            <h3 className="text-sm font-semibold text-white">Detalle por Célula</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{background: COLORS.bluePale}}>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase">Célula</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase">Ubicación</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Técs</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-right">Servicios</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Status</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-right">OTs</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Status</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-right">Facturación</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Var.</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-right">Cobranza</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Margen</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">Corr</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-600 uppercase text-center">SLA</th>
                </tr>
              </thead>
              <tbody>
                {cells.map((cell, i) => <CellRow key={cell.name} cell={cell} index={i}/>)}
                <tr className="border-t-2 border-gray-300 bg-gray-100 font-bold">
                  <td className="px-3 py-2 text-xs text-gray-900" colSpan={2}>TOTAL {un}</td>
                  <td className="px-3 py-2 text-xs text-center">{cells.reduce((a,c)=>a+c.techs,0)}</td>
                  <td className="px-3 py-2 text-xs text-right">{totalServices}/{totalServicesTarget}</td>
                  <td className="px-3 py-2 text-xs text-center"><StatusPill value={totalServices} target={totalServicesTarget}/></td>
                  <td className="px-3 py-2 text-xs text-right">{totalOTs}/{totalOTsTarget}</td>
                  <td className="px-3 py-2 text-xs text-center"><StatusPill value={totalOTs} target={totalOTsTarget}/></td>
                  <td className="px-3 py-2 text-xs text-right">{fmt.currency(totalRevenue)}</td>
                  <td className="px-3 py-2 text-xs text-center"><VariationBadge actual={totalRevenue} target={totalTarget}/></td>
                  <td className="px-3 py-2 text-xs text-right">{fmt.currency(totalCollection)}</td>
                  <td className="px-3 py-2 text-xs text-center">—</td>
                  <td className="px-3 py-2 text-xs text-center">{totalCorr}/{totalCorrBilled}</td>
                  <td className="px-3 py-2 text-xs text-center">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Issues */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Novedades por Célula</h3>
          <div className="space-y-1.5">
            {cells.map(c => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-gray-700 w-28 shrink-0">{c.name}</span>
                <span className={`${c.topIssue.includes('BAJO') || c.topIssue.includes('pendiente') || c.topIssue.includes('falta') ? 'text-amber-600' : c.topIssue.includes('Sin novedades') || c.topIssue.includes('orden') || c.topIssue.includes('excelente') ? 'text-green-600' : 'text-gray-600'}`}>
                  {c.topIssue}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-2 border-t border-gray-200">
          <p className="text-[10px] text-gray-400">Quantum 360° | NM Limited S. de R.L. de C.V. | MR Coop S.A. de C.V. | quantum360.ltd</p>
          <p className="text-[10px] text-gray-400">Sin registro, no existe. — Generado por SND</p>
        </div>
      </div>
    </div>
  );
};

// ── MAIN APP ──
export default function WeeklyCloseReport() {
  const [activeTab, setActiveTab] = useState('management');

  const tabs = [
    { id: 'management', label: 'Management', icon: Users },
    { id: 'gersom', label: 'Gersom · Montas', icon: Wrench },
    { id: 'jaime', label: 'Jaime · Baterías', icon: Wrench },
    { id: 'jorge', label: 'Jorge · MrCoop', icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-[#1B2A4A] text-[#1B2A4A] bg-blue-50/50' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={14}/>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {activeTab === 'management' && <ManagementReport/>}
        {activeTab === 'gersom' && (
          <SupervisorReport 
            supervisor="Gersom García" 
            un="UN Montacargas" 
            cells={weekData.gersom.cells}
            email="gersom@nm.limited"
          />
        )}
        {activeTab === 'jaime' && (
          <SupervisorReport 
            supervisor="Jaime González Ortiz" 
            un="UN Baterías" 
            cells={weekData.jaime.cells}
            email="jaime@nm.limited"
          />
        )}
        {activeTab === 'jorge' && (
          <SupervisorReport 
            supervisor="Jorge Argenis Lara" 
            un="UN MrCoop" 
            cells={weekData.jorge.cells}
            email="supervision@mrcoop.mx"
          />
        )}
      </div>
    </div>
  );
}
