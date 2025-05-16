import { crearInformeNC, editarInformeNC, obtenerInformeNC } from "../../services/informeNCService"
import { listarInformesAccion } from "../../services/informeAccionService"
import { toast } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function RegistroInformeNC() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    codigo: "",
    fecha_deteccion: "",
    descripcion: "",
    requisito_incumplido: "",
    usuario_reporta: 1,
    usuario_responsable: 1,
    detectado_por: "",
    solucion: "",
    fecha_realizacion: "",
    realizada_por: "",
    observaciones: "",
    fecha_verificacion: "",
    descripcion_verificacion: "",
    evidencia_documental: "",
    accion_efectiva: false,
    clasificacion: "",
    accion_asociada: "",
    riesgo_asociado: "",
    tratamiento_realizado: false,
    responsable_seguridad: "",
    firma_administrador: false,
    fecha_cierre: ""
  })

  const [acciones, setAcciones] = useState([])

  useEffect(() => {
    const fetchAcciones = async () => {
      try {
        const datos = await listarInformesAccion()
        setAcciones(datos)
      } catch (error) {
        console.error("Error al cargar acciones:", error)
      }
    }

    const fetchInforme = async () => {
      try {
        const data = await obtenerInformeNC(id)
        const limpiarNulls = (valor) => valor === null ? "" : valor
        const limpiarBooleanos = (valor) => valor === null ? false : valor

        const datosSanitizados = {
          codigo: limpiarNulls(data.codigo),
          fecha_deteccion: limpiarNulls(data.fecha_deteccion),
          descripcion: limpiarNulls(data.descripcion),
          requisito_incumplido: limpiarNulls(data.requisito_incumplido),
          usuario_reporta: data.usuario_reporta || 1,
          usuario_responsable: data.usuario_responsable || 1,
          detectado_por: limpiarNulls(data.detectado_por),
          solucion: limpiarNulls(data.solucion),
          fecha_realizacion: limpiarNulls(data.fecha_realizacion),
          realizada_por: limpiarNulls(data.realizada_por),
          observaciones: limpiarNulls(data.observaciones),
          fecha_verificacion: limpiarNulls(data.fecha_verificacion),
          descripcion_verificacion: limpiarNulls(data.descripcion_verificacion),
          evidencia_documental: limpiarNulls(data.evidencia_documental),
          accion_efectiva: limpiarBooleanos(data.accion_efectiva),
          clasificacion: limpiarNulls(data.clasificacion),
          accion_asociada: data.accion_asociada || "",
          riesgo_asociado: limpiarNulls(data.riesgo_asociado),
          tratamiento_realizado: limpiarBooleanos(data.tratamiento_realizado),
          responsable_seguridad: limpiarNulls(data.responsable_seguridad),
          firma_administrador: limpiarBooleanos(data.firma_administrador),
          fecha_cierre: limpiarNulls(data.fecha_cierre)
        }

        setFormData(datosSanitizados)
      } catch (error) {
        console.error("❌ Error al cargar informe:", error)
      }
    }

    fetchAcciones()
    if (id) fetchInforme()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const datosLimpios = {
      ...formData,
      accion_asociada: formData.accion_asociada === "" ? null : parseInt(formData.accion_asociada),
      fecha_cierre: formData.fecha_cierre === "" ? null : formData.fecha_cierre,
      fecha_realizacion: formData.fecha_realizacion === "" ? null : formData.fecha_realizacion,
      fecha_verificacion: formData.fecha_verificacion === "" ? null : formData.fecha_verificacion
    }

    try {
      if (id) {
        await editarInformeNC(id, datosLimpios)
        toast.success("Informe actualizado correctamente")
      } else {
        await crearInformeNC(datosLimpios)
        toast.success("Informe registrado correctamente")
      }
      navigate("/noconformidades")
    } catch (error) {
      console.error("❌ Error al guardar:", error)
      toast.error("Error al guardar el informe")
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">
          {id ? "Editar No Conformidad" : "Registrar Nueva No Conformidad"}
        </h1>


        {/* Sección 1  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-sm text-gray-700">Código / Nº</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-700">Fecha de detección</label>
            <input
              type="date"
              name="fecha_deteccion"
              value={formData.fecha_deteccion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-700">Detectado por</label>
            <input
              type="text"
              name="detectado_por"
              value={formData.detectado_por}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-700">Requisito incumplido</label>
            <input
              type="text"
              name="requisito_incumplido"
              value={formData.requisito_incumplido}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 🔹 BLOQUE 2 - Descripción y tratamiento de la no conformidad */}

        <div className="space-y-6 mt-8">
          <div>
            <label className="font-semibold text-sm text-gray-700">Descripción de la No Conformidad</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Describe brevemente la no conformidad detectada"
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-700">Solución aplicada y resultado obtenido</label>
            <textarea
              name="solucion"
              value={formData.solucion}
              onChange={handleChange}
              rows={3}
              placeholder="Indica el tratamiento que se aplicó y el resultado que se obtuvo"
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-sm text-gray-700">Fecha de realización</label>
              <input
                type="date"
                name="fecha_realizacion"
                value={formData.fecha_realizacion}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-700">Realizada por</label>
              <input
                type="text"
                name="realizada_por"
                value={formData.realizada_por}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-700">Observaciones (si no aplica tratamiento)</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={3}
              placeholder="Indica el motivo si no se aplicó tratamiento"
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        {/* 🔹 BLOQUE 3 - Verificación de eficacia */}

        <div className="space-y-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-700">Verificación de Eficacia</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-sm text-gray-700">Fecha de verificación</label>
              <input
                type="date"
                name="fecha_verificacion"
                value={formData.fecha_verificacion}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-700">¿La acción fue efectiva?</label>
              <div className="flex items-center gap-4 mt-1">
                <label className="flex items-center gap-1 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="accion_efectiva"
                    value={true}
                    checked={formData.accion_efectiva === true}
                    onChange={() => setFormData(prev => ({ ...prev, accion_efectiva: true }))}
                  />
                  Sí
                </label>
                <label className="flex items-center gap-1 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="accion_efectiva"
                    value={false}
                    checked={formData.accion_efectiva === false}
                    onChange={() => setFormData(prev => ({ ...prev, accion_efectiva: false }))}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-700">Descripción de la verificación</label>
            <textarea
              name="descripcion_verificacion"
              value={formData.descripcion_verificacion}
              onChange={handleChange}
              rows={3}
              placeholder="Describe cómo se comprobó la eficacia del tratamiento"
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="font-semibold text-sm text-gray-700">Evidencia documental</label>
            <input
              type="text"
              name="evidencia_documental"
              value={formData.evidencia_documental}
              onChange={handleChange}
              placeholder="Referencia de documentos, informes, imágenes, etc."
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 🔹 BLOQUE 4 - Clasificación, acciones asociadas y cierre */}

        <div className="space-y-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-700">Cierre del Informe</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-sm text-gray-700">Clasificación de la NC</label>
              <select
                name="clasificacion"
                value={formData.clasificacion}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Selecciona --</option>
                <option value="puntual">Puntual</option>
                <option value="se_repite">Se repite</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-700">Acción correctiva asociada Nº</label>
              <select
                name="accion_asociada"
                value={formData.accion_asociada || ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Selecciona una acción --</option>
                {acciones.map((accion) => (
                  <option key={accion.id} value={accion.id}>
                    {accion.codigo} — {accion.estado}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-700">Evaluación de riesgo asociada</label>
              <input
                type="text"
                name="riesgo_asociado"
                value={formData.riesgo_asociado}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                name="tratamiento_realizado"
                checked={formData.tratamiento_realizado}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">¿Se realizó tratamiento?</label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="font-semibold text-sm text-gray-700">Responsable de Seguridad</label>
              <input
                type="text"
                name="responsable_seguridad"
                value={formData.responsable_seguridad}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                name="firma_administrador"
                checked={formData.firma_administrador}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">Firmado por Administrador Único</label>
            </div>
          </div>

          <div className="mt-4">
            <label className="font-semibold text-sm text-gray-700">Fecha de cierre</label>
            <input
              type="date"
              name="fecha_cierre"
              value={formData.fecha_cierre || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>


        {/* Botones */}
        <div className="flex justify-end gap-2 pt-4">
          {/* <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 shadow-sm transition">Cancelar</button> */}

          <button onClick={handleSubmit} className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-800 shadow-sm transition">
            {id ? "Guardar Cambios" : "Registrar NC"}
          </button>
        </div>
      </div>
    </div>
  )
}
