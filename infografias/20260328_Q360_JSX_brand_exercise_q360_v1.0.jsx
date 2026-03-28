import { useState } from "react";

const proposals = [
  {
    id: "pulso",
    name: "PULSO",
    tagline: "El latido de tu operación",
    taglineEn: "The heartbeat of your operation",
    rationale:
      "Conecta directamente con 'Sistema Nervioso Digital' — un sistema nervioso tiene pulso. Es visceral, inmediato, fácil de recordar. Funciona en español e inglés. 'Pulso' implica monitoreo constante, salud operativa, y ritmo de trabajo.",
    color: "#5FDAF4",
    colorDark: "#11152F",
    gradient: "linear-gradient(135deg, #5FDAF4 0%, #4814DA 100%)",
    pitch:
      '"Tu CEDIS tiene pulso. PULSO by Q360 te muestra en tiempo real: uptime, eficiencia energética, vida útil de activos y cumplimiento de SLA. Sin supuestos. Sin reportes mensuales tardíos. Datos vivos."',
    strengths: [
      "Memorable y corto (5 letras)",
      "Funciona como verbo: 'checa el Pulso'",
      "Metáfora natural con SND",
      "Fácil de pronunciar MX/US",
    ],
    risks: ["Podría sonar genérico sin contexto", "Hay apps de salud llamadas 'Pulso'"],
  },
  {
    id: "cortex",
    name: "CÓRTEX",
    tagline: "Inteligencia operativa en tiempo real",
    taglineEn: "Real-time operational intelligence",
    rationale:
      "El córtex cerebral es la capa que procesa, decide y visualiza. Es la extensión lógica del 'Sistema Nervioso Digital' — si el SND es el sistema nervioso, CÓRTEX es el cerebro que lo interpreta. Suena tech-forward, premium, y diferenciado.",
    color: "#4814DA",
    colorDark: "#11152F",
    gradient: "linear-gradient(135deg, #4814DA 0%, #D946EF 100%)",
    pitch:
      '"CÓRTEX by Q360 transforma datos operativos en decisiones. Cada batería, cada montacargas, cada equipo de refrigeración alimenta un dashboard que tu equipo de finanzas puede auditar. No vendemos reportes. Vendemos certeza."',
    strengths: [
      "Premium y tech-forward",
      "Extensión natural del SND (nervioso→cerebro)",
      "Diferenciado — nadie en FM MX lo usa",
      "Suena igual en español e inglés",
    ],
    risks: [
      "Puede sonar demasiado 'tech' para gerentes CEDIS",
      "Requiere acento (Córtex) o se lee 'Cortex' en inglés",
    ],
  },
  {
    id: "vigía",
    name: "VIGÍA",
    tagline: "Visibilidad total, sin ángulos muertos",
    taglineEn: "Total visibility, zero blind spots",
    rationale:
      "El vigía es quien ve todo desde arriba — el atalaya. Para un gerente de CEDIS, lo que más valor tiene es SABER qué está pasando sin tener que preguntar. VIGÍA comunica exactamente eso: alguien (algo) siempre está observando por ti.",
    color: "#22C55E",
    colorDark: "#11152F",
    gradient: "linear-gradient(135deg, #22C55E 0%, #5FDAF4 100%)",
    pitch:
      '"Con VIGÍA by Q360, tu centro de distribución nunca opera a ciegas. Cada equipo crítico reporta su estado. Cada técnico documenta su intervención. Cada peso invertido en mantenimiento tiene trazabilidad. VIGÍA es tu torre de control."',
    strengths: [
      "Comunica valor inmediato (visibilidad)",
      "Resonancia cultural mexicana (vigía, atalaya)",
      "Fácil de explicar a cualquier audiencia",
      "Implica protección y cuidado",
    ],
    risks: [
      "Menos 'tech' que las otras opciones",
      "Podría asociarse con vigilancia/control negativo",
    ],
  },
];

function Badge({ children, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 500,
        background: color + "18",
        color: color,
        marginRight: 6,
        marginBottom: 4,
      }}
    >
      {children}
    </span>
  );
}

export default function BrandExercise() {
  const [selected, setSelected] = useState("pulso");
  const current = proposals.find((p) => p.id === selected);

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 680, margin: "0 auto", padding: "1rem 0" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "#4814DA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            Q
          </div>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>
            Quantum 360° — Ejercicio de naming
          </span>
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: "var(--color-text-primary)",
            margin: "8px 0 4px",
          }}
        >
          Capa de inteligencia del SND
        </h1>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
          Tres propuestas para nombrar el producto que el cliente ve: dashboards, reportes de valor, proof of performance. El equivalente de Nuash para Neuro+.
        </p>
      </div>

      {/* Architecture reference */}
      <div
        style={{
          background: "var(--color-background-secondary)",
          borderRadius: "var(--border-radius-lg)",
          padding: "16px 20px",
          marginBottom: 20,
          fontSize: 13,
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
        }}
      >
        <div style={{ fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 8, fontSize: 14 }}>
          Arquitectura comercial
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "4px 12px", alignItems: "center" }}>
          <span style={{ textAlign: "right" }}>andlogistics (empresa)</span>
          <span style={{ color: "var(--color-text-tertiary)" }}>→</span>
          <span><strong style={{ fontWeight: 500 }}>Q360</strong> (empresa)</span>

          <span style={{ textAlign: "right" }}>Neuro+ (plataforma)</span>
          <span style={{ color: "var(--color-text-tertiary)" }}>→</span>
          <span><strong style={{ fontWeight: 500 }}>SND</strong> (plataforma interna)</span>

          <span style={{ textAlign: "right" }}>Nuash (inteligencia)</span>
          <span style={{ color: "var(--color-text-tertiary)" }}>→</span>
          <span>
            <strong style={{ fontWeight: 500, color: current.color }}>
              {current.name}
            </strong>{" "}
            (lo que el cliente ve)
          </span>
        </div>
      </div>

      {/* Selector tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {proposals.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            style={{
              flex: 1,
              padding: "12px 8px",
              borderRadius: "var(--border-radius-md)",
              border:
                selected === p.id
                  ? `2px solid ${p.color}`
                  : "0.5px solid var(--color-border-tertiary)",
              background:
                selected === p.id
                  ? p.color + "12"
                  : "var(--color-background-primary)",
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: selected === p.id ? p.color : "var(--color-text-primary)",
                letterSpacing: "0.05em",
              }}
            >
              {p.name}
            </div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>
              {p.tagline}
            </div>
          </button>
        ))}
      </div>

      {/* Selected proposal detail */}
      <div
        style={{
          background: "var(--color-background-primary)",
          borderRadius: "var(--border-radius-lg)",
          border: "0.5px solid var(--color-border-tertiary)",
          overflow: "hidden",
        }}
      >
        {/* Hero */}
        <div
          style={{
            background: current.gradient,
            padding: "32px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.7)",
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            by Quantum 360°
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            {current.name}
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{current.tagline}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
            {current.taglineEn}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 24px" }}>
          {/* Rationale */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 6 }}>
              Por qué este nombre
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>
              {current.rationale}
            </p>
          </div>

          {/* Pitch */}
          <div
            style={{
              background: "var(--color-background-secondary)",
              borderRadius: "var(--border-radius-md)",
              padding: "14px 18px",
              marginBottom: 20,
              borderLeft: `3px solid ${current.color}`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "var(--color-text-tertiary)",
                marginBottom: 6,
                letterSpacing: "0.05em",
              }}
            >
              PITCH COMERCIAL (para gerente CEDIS)
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-primary)",
                lineHeight: 1.7,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {current.pitch}
            </p>
          </div>

          {/* Strengths & Risks */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--color-text-success)",
                  marginBottom: 8,
                }}
              >
                Fortalezas
              </div>
              {current.strengths.map((s, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    paddingLeft: 12,
                    position: "relative",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 2,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--color-text-success)",
                    }}
                  />
                  {s}
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--color-text-warning)",
                  marginBottom: 8,
                }}
              >
                Riesgos
              </div>
              {current.risks.map((r, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    paddingLeft: 12,
                    position: "relative",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 2,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--color-text-warning)",
                    }}
                  />
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* Commercial usage */}
          <div
            style={{
              borderTop: "0.5px solid var(--color-border-tertiary)",
              paddingTop: 16,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 10 }}>
              Cómo se usa comercialmente
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
              <Badge color={current.color}>{current.name} by Q360</Badge>
              <Badge color={current.color}>Dashboard {current.name}</Badge>
              <Badge color={current.color}>Reporte {current.name}</Badge>
              <Badge color={current.color}>{current.name} Score</Badge>
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
              <strong style={{ fontWeight: 500 }}>En propuesta comercial:</strong> "Incluye acceso a{" "}
              <span style={{ color: current.color, fontWeight: 500 }}>{current.name}</span>, nuestro dashboard de inteligencia operativa con KPIs en tiempo real."
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.7, marginTop: 6 }}>
              <strong style={{ fontWeight: 500 }}>En QBR:</strong> "Como muestra el reporte{" "}
              <span style={{ color: current.color, fontWeight: 500 }}>{current.name}</span> de este trimestre, su CEDIS operó al 97.2% de disponibilidad..."
            </div>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.7, marginTop: 6 }}>
              <strong style={{ fontWeight: 500 }}>En website:</strong> "Powered by SND. Visualizado con{" "}
              <span style={{ color: current.color, fontWeight: 500 }}>{current.name}</span>."
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Vote */}
      <div
        style={{
          marginTop: 20,
          padding: "16px 20px",
          background: "var(--color-background-secondary)",
          borderRadius: "var(--border-radius-lg)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 10 }}>
          Selecciona tu favorita para ejecutar el branding completo
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {proposals.map((p) => (
            <button
              key={p.id}
              onClick={() => sendPrompt(`GO con ${p.name}. Ejecuta el branding completo.`)}
              style={{
                padding: "8px 20px",
                borderRadius: "var(--border-radius-md)",
                border: "0.5px solid var(--color-border-secondary)",
                background: "var(--color-background-primary)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                color: p.color,
                transition: "all 0.15s",
              }}
              onMouseOver={(e) => {
                e.target.style.background = p.color + "15";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "var(--color-background-primary)";
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
