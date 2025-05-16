export default function PlantillaPDFInforme({ informe }) {
  const cumpleCondicionesCierre = (
    informe.fecha_cierre &&
    informe.firma_administrador &&
    new Date(informe.fecha_cierre) <= new Date()
  );

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
      {/* Encabezado visual moderno */}
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
            <strong>Fecha detección:</strong> {informe.fecha_deteccion}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Estado:</strong> {informe.estado?.replace("_", " ") || "—"}
          </p>
        </div>
      </div>


      {/* SECCIÓN 1: INFORMACIÓN GENERAL */}
      <h3 style={{ fontSize: "14px", marginTop: "24px" }}>Información de la No Conformidad</h3>
      <p><strong>Detectado por:</strong> {informe.detectado_por}</p>
      <p><strong>Requisito incumplido:</strong> {informe.requisito_incumplido}</p>
      <p style={{ marginTop: "12px" }}><strong>Descripción:</strong><br />{informe.descripcion}</p>

      {/* SECCIÓN 2: SOLUCIÓN */}
      <h3 style={{ fontSize: "14px", marginTop: "24px" }}>Solución Aplicada</h3>
      <p><strong>Solución aplicada:</strong><br />{informe.solucion}</p>
      <p><strong>Fecha de realización:</strong> {informe.fecha_realizacion || "—"}</p>
      <p><strong>Realizada por:</strong> {informe.realizada_por || "—"}</p>
      <p><strong>Observaciones:</strong><br />{informe.observaciones || "—"}</p>

      {/* SECCIÓN 3: VERIFICACIÓN */}
      <h3 style={{ fontSize: "14px", marginTop: "24px" }}>Verificación de Eficacia</h3>
      <p><strong>Fecha de verificación:</strong> {informe.fecha_verificacion || "—"}</p>
      <p><strong>¿Efectiva?:</strong> {informe.accion_efectiva ? "Sí" : "No"}</p>
      <p><strong>Verificación:</strong><br />{informe.descripcion_verificacion || "—"}</p>
      <p><strong>Evidencia documental:</strong><br />{informe.evidencia_documental || "—"}</p>

      {/* SECCIÓN 4: CIERRE Y CLASIFICACIÓN */}
      <h3 style={{ fontSize: "14px", marginTop: "24px" }}>Cierre y Clasificación</h3>
      <p><strong>Clasificación:</strong> {informe.clasificacion || "—"}</p>
      <p><strong>Acción asociada:</strong> {informe.accion_asociada_codigo || "No asociada"}</p>
      <p><strong>Riesgo asociado:</strong> {informe.riesgo_asociado || "—"}</p>
      <p><strong>¿Tratamiento realizado?:</strong> {informe.tratamiento_realizado ? "Sí" : "No"}</p>
      <p><strong>Responsable Seguridad:</strong> {informe.responsable_seguridad || "—"}</p>
      <p><strong>Firma Administrador:</strong> {informe.firma_administrador ? "Sí" : "No"}</p>
      <p><strong>Fecha de cierre:</strong> {informe.fecha_cierre || "—"}</p>


      {/* Bloque de firma */}
      <hr style={{ margin: "32px 0", borderColor: "#ccc" }} />
      <table style={{ width: "100%", tableLayout: "fixed" }}>
        <tbody>
          <tr>
            <td style={{ width: "33%", fontSize: "12px", textAlign: "left", verticalAlign: "top" }}>
              <p style={{ marginBottom: 0 }}><strong>Firmado por:</strong></p>
              <p style={{ marginTop: 2, overflowWrap: "break-word" }}>{informe.responsable_seguridad || "Responsable designado"}</p>
              <p style={{ fontSize: "11px", color: "#666" }}>Responsable de Seguridad</p>
            </td>

            <td style={{ width: "33%", textAlign: "center", verticalAlign: "top" }}>
              <img src="/logo.png" alt="Firma escaneada" style={{ height: "60px", maxWidth: "100%" }} />
              <p style={{ fontSize: "11px", color: "#666" }}>Firma digital / escaneada</p>
            </td>

            <td style={{ width: "33%", fontSize: "12px", textAlign: "right", verticalAlign: "top" }}>
              <p style={{ marginBottom: 0 }}><strong>Fecha de cierre:</strong></p>
              <p style={{ marginTop: 2, overflowWrap: "break-word" }}>{informe.fecha_cierre || "—"}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
