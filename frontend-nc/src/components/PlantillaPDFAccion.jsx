import React from "react";

export default function PlantillaPDFAccion({ informe }) {
  return (
    <div id="pdf" style={{
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "32px",
      fontSize: "13px",
      color: "#000",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      boxSizing: "border-box"
    }}>

      {/* Título */}
      <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px" }}>
        Informe de Acción Correctiva / Preventiva
      </h2>

      {/* Encabezado para exportación PDF */}
      <div
        style={{
          background: "linear-gradient(to right, #2563eb, #214199)",
          borderRadius: "12px",
          color: "white",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <img src="/logo.png" alt="Logo" style={{ height: "50px" }} />
        <div style={{ textAlign: "right", fontSize: "13px", lineHeight: "1.6" }}>
          <p style={{ margin: 0 }}>
            <strong>Código:</strong> {informe.codigo}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Fecha apertura:</strong> {informe.fecha_apertura}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Estado:</strong> {informe.estado?.replace("_", " ")}
          </p>
        </div>
      </div>


      {/* SECCIÓN 1: DATOS PRINCIPALES */}
      <p><strong>Procedimiento afectado:</strong> {informe.procedimiento_afectado}</p>
      <p><strong>Origen:</strong> {informe.origen}</p>
      <p><strong>Clasificación de la deficiencia:</strong> {informe.clasificacion_deficiencia}</p>
      <p><strong>Estudio de causa:</strong><br />{informe.estudio_causa}</p>

      {/* SECCIÓN 2: ACCIONES */}
      <h3 style={{ marginTop: "24px", fontSize: "14px" }}>Acciones Propuestas</h3>
      {informe.acciones?.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee", textAlign: "left" }}>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Tipo</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Descripción</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Fecha compromiso</th>
              <th style={{ border: "1px solid #ccc", padding: "6px" }}>Responsable</th>
            </tr>
          </thead>
          <tbody>
            {informe.acciones.map((a, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{a.tipo}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{a.descripcion}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{a.fecha_compromiso}</td>
                <td style={{ border: "1px solid #ccc", padding: "6px" }}>{a.responsable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay acciones registradas.</p>
      )}

      {/* SECCIÓN 3: RESPONSABLES */}
      <h3 style={{ marginTop: "24px", fontSize: "14px" }}>Responsables del Informe</h3>
      <p><strong>Responsable 1:</strong> {informe.responsable_1 || "—"} ({informe.firma_responsable_1 ? "Firmado" : "No firmado"})</p>
      <p><strong>Responsable 2:</strong> {informe.responsable_2 || "—"} ({informe.firma_responsable_2 ? "Firmado" : "No firmado"})</p>

      {/* SECCIÓN 4: SEGUIMIENTOS */}
      <h3 style={{ marginTop: "24px", fontSize: "14px" }}>Seguimientos</h3>
      {informe.seguimientos?.length > 0 ? (
        <ul style={{ paddingLeft: "18px" }}>
          {informe.seguimientos.map((s, i) => (
            <li key={i}>
              <strong>{s.fecha}</strong>: {s.comentario}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay seguimientos registrados.</p>
      )}

      {/* SECCIÓN 5: EVALUACIÓN Y CIERRE */}
      <h3 style={{ marginTop: "24px", fontSize: "14px" }}>Evaluación de Eficacia y Cierre</h3>
      <p><strong>Evaluación de eficacia:</strong><br />{informe.evaluacion_eficacia || "—"}</p>
      <p><strong>Motivo de cierre:</strong><br />{informe.motivo_cierre || "—"}</p>
      <p><strong>Fecha de cierre:</strong> {informe.fecha_cierre_seguridad || "—"}</p>
      <p><strong>Validado por seguridad:</strong> {informe.validado_por_seguridad || "—"}</p>

      {/* FIRMAS */}
      <hr style={{ margin: "32px 0", borderColor: "#ccc" }} />
      <table style={{ width: "100%", tableLayout: "fixed" }}>
        <tbody>
          <tr>
            <td style={{ width: "33%", fontSize: "12px", textAlign: "left" }}>
              <p style={{ marginBottom: 0 }}><strong>Firmado por:</strong></p>
              <p style={{ marginTop: 2 }}>{informe.validado_por_seguridad || "—"}</p>
              <p style={{ fontSize: "11px", color: "#666" }}>Responsable de Seguridad</p>
            </td>
            <td style={{ width: "33%", textAlign: "center" }}>
              <img src="/logo.png" alt="Firma" style={{ height: "60px" }} />
              <p style={{ fontSize: "11px", color: "#666" }}>Firma digital / escaneada</p>
            </td>
            <td style={{ width: "33%", fontSize: "12px", textAlign: "right" }}>
              <p style={{ marginBottom: 0 }}><strong>Fecha de cierre:</strong></p>
              <p style={{ marginTop: 2 }}>{informe.fecha_cierre_seguridad || "—"}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
