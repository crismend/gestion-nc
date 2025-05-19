import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
import { useAuth } from '../../context/AuthContext'
import { toast } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../services/axiosInstance";



export default function RegistroInformeAccion() {
  const { token } = useAuth()
  const [mensaje, setMensaje] = useState("")

  const [formData, setFormData] = useState({
    codigo: "",
    fecha_apertura: "",
    procedimiento_afectado: "",
    estado: "pendiente",
    responsable: "",
    origen: "",
    estudio_causa: "",
    clasificacion_deficiencia: "",
    acciones: [],
    firma_responsable: false,
    motivo_cierre: "",
    evaluacion_eficacia: "",
    fecha_cierre_seguridad: "",
    validado_por_seguridad: "",
    responsable_1: "",
    firma_responsable_1: false,
    responsable_2: "",
    firma_responsable_2: false,
    seguimientos: [],
  })

  const [nuevaAccion, setNuevaAccion] = useState({
    tipo: "correctiva",
    descripcion: "",
    fecha_compromiso: "",
    responsable: ""
  })

  const [nuevoSeguimiento, setNuevoSeguimiento] = useState({
    fecha: "",
    comentario: ""
  })

  const { id } = useParams()
  const isEditMode = Boolean(id)
  const navigate = useNavigate()

  useEffect(() => {
    if (isEditMode) {
      const fetchInforme = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axiosInstance.get(`informes-accion/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          setFormData({
            ...response.data,
            codigo: response.data.codigo || "",
            fecha_apertura: response.data.fecha_apertura || "",
            procedimiento_afectado: response.data.procedimiento_afectado || "",
            estado: response.data.estado || "pendiente",
            responsable_1: response.data.responsable_1 || "",
            firma_responsable_1: response.data.firma_responsable_1 ?? false,
            responsable_2: response.data.responsable_2 || "",
            firma_responsable_2: response.data.firma_responsable_2 ?? false,
            origen: response.data.origen || "",
            estudio_causa: response.data.estudio_causa || "",
            clasificacion_deficiencia: response.data.clasificacion_deficiencia || "",
            acciones: response.data.acciones || [],
            seguimientos: response.data.seguimientos || [],
            evaluacion_eficacia: response.data.evaluacion_eficacia || "",
            motivo_cierre: response.data.motivo_cierre || "",
            fecha_cierre_seguridad: response.data.fecha_cierre_seguridad || "",
            validado_por_seguridad: response.data.validado_por_seguridad || "",
          });

        } catch (error) {
          console.error("❌ Error al cargar el informe:", error);
          toast.error("No se pudo cargar el informe");
        }
      };

      fetchInforme();
    }
  }, [id]);




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleAccionChange = (e) => {
    const { name, value } = e.target
    setNuevaAccion((prev) => ({ ...prev, [name]: value }))
  }

  const agregarAccion = () => {
    if (!nuevaAccion.descripcion.trim()) return
    setFormData((prev) => ({
      ...prev,
      acciones: [...prev.acciones, nuevaAccion],
    }))
    setNuevaAccion({
      tipo: "correctiva",
      descripcion: "",
      fecha_compromiso: "",
      responsable: ""
    })
  }

  const eliminarAccion = (index) => {
    const accionesActualizadas = [...formData.acciones]
    accionesActualizadas.splice(index, 1)
    setFormData((prev) => ({ ...prev, acciones: accionesActualizadas }))
  }

  const handleSeguimientoChange = (e) => {
    const { name, value } = e.target
    setNuevoSeguimiento((prev) => ({ ...prev, [name]: value }))
  }

  const agregarSeguimiento = () => {
    if (!nuevoSeguimiento.fecha || !nuevoSeguimiento.comentario.trim()) return
    setFormData((prev) => ({
      ...prev,
      seguimientos: [...prev.seguimientos, nuevoSeguimiento]
    }))
    setNuevoSeguimiento({ fecha: "", comentario: "" })
  }

  const eliminarSeguimiento = (index) => {
    const nuevos = [...formData.seguimientos]
    nuevos.splice(index, 1)
    setFormData((prev) => ({ ...prev, seguimientos: nuevos }))
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    const isEditMode = Boolean(id);

    const url = isEditMode
      ? `informes-accion/${id}/`
      : "informes-accion/";

    const method = isEditMode ? "put" : "post";

    try {
      const response = await axiosInstance({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Informe guardado: ", response);
      toast.success("Informe guardado correctamente");

      navigate("/acciones");

      if (!isEditMode) {
        setFormData({
          codigo: "",
          fecha_apertura: "",
          procedimiento_afectado: "",
          estado: "pendiente",
          responsable_1: "",
          firma_responsable_1: false,
          responsable_2: "",
          firma_responsable_2: false,
          origen: "",
          estudio_causa: "",
          clasificacion_deficiencia: "",
          acciones: [],
          seguimientos: [],
          evaluacion_eficacia: "",
          motivo_cierre: "",
          fecha_cierre_seguridad: "",
          validado_por_seguridad: "",
        });

        setNuevaAccion({
          tipo: "correctiva",
          descripcion: "",
          fecha_compromiso: "",
          responsable: "",
        });

        setNuevoSeguimiento({
          fecha: "",
          comentario: "",
        });
      }

    } catch (error) {
      console.error("❌ Error al guardar: ", error);
      toast.error("Hubo un error al guardar el informe");
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-800">
          Registro de Acción Correctiva / Preventiva PSM-03-I-05
        </h1>

        {/* Sección 1 - Datos generales */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Datos Generales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">Código</label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Fecha de apertura</label>
              <input
                type="date"
                name="fecha_apertura"
                value={formData.fecha_apertura}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Procedimiento afectado</label>
              <input
                type="text"
                name="procedimiento_afectado"
                value={formData.procedimiento_afectado}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full bg-white border rounded px-3 py-2 mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En proceso</option>
                <option value="cerrada">Cerrada</option>
              </select>
            </div>
          </div>
          <div >
            <label className="font-medium text-gray-700">Origen</label>
            <textarea
              type="text"
              name="origen"
              value={formData.origen}
              onChange={handleChange}
              className="w-full bg-white border  rounded px-3 py-2 mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Ej: Auditoría Interna, Cliente, Operador..."
            />
          </div>
        </div>


        {/* Sección 2 - Estudio de la causa raíz + Clasificación */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <div>
            <label className="font-semibold block">Estudio de la causa raíz</label>
            <textarea
              name="estudio_causa"
              value={formData.estudio_causa}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white border  rounded px-3 py-2 mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Describe el análisis de causa raíz de esta acción"
            />
          </div>

          <div>
            <label className="font-semibold block">Clasificación de la deficiencia</label>
            <input
              type="text"
              name="clasificacion_deficiencia"
              value={formData.clasificacion_deficiencia}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Ej: Documental, Procedimental, Operativa..."
            />
          </div>
        </div>

        {/* Sección 3 - Acciones propuestas */}
        <div className="bg-gray-50 p-4 rounded-xl space-y-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Acciones propuestas</h2>

          <table className="w-full text-sm border border-gray-300 ">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-2 py-2">Tipo</th>
                <th className="px-2 py-2 w-2/5">Acción</th>
                <th className="px-2 py-2 w-1/5">Fecha compromiso</th>
                <th className="px-2 py-2">Responsable</th>
                <th className="px-2 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {formData.acciones.map((accion, index) => (
                <tr key={index} className="border-t border-gray-400">
                  <td className="px-2 py-1 capitalize">{accion.tipo}</td>
                  <td className="px-2 py-1">{accion.descripcion}</td>
                  <td className="px-2 py-1 ">{accion.fecha_compromiso}</td>
                  <td className="px-2 py-1">{accion.responsable}</td>
                  <td className="px-2 py-1 text-center">
                    <button onClick={() => eliminarAccion(index)}>
                      <Trash2 size={16} className="text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Fila para agregar nueva acción */}
              <tr className="border-t">
                <td className="px-2 py-1">
                  <select
                    name="tipo"
                    value={nuevaAccion.tipo}
                    onChange={handleAccionChange}
                    className="w-full border rounded px-2 py-1 bg-white "
                  >
                    <option value="correctiva">Correctiva</option>
                    <option value="preventiva">Preventiva</option>
                  </select>
                </td>
                <td className="px-2 py-1">
                  <input
                    type="text"
                    name="descripcion"
                    value={nuevaAccion.descripcion}
                    onChange={handleAccionChange}
                    className="w-full border rounded px-2 py-1 bg-white"
                    placeholder="Descripción"
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    type="date"
                    name="fecha_compromiso"
                    value={nuevaAccion.fecha_compromiso}
                    onChange={handleAccionChange}
                    className="w-full border rounded px-2 py-1 bg-white"
                  />
                </td>
                <td className="px-2 py-1">
                  <input
                    type="text"
                    name="responsable"
                    value={nuevaAccion.responsable}
                    onChange={handleAccionChange}
                    className="w-full border rounded px-2 py-1 bg-white"
                    placeholder="Responsable"
                  />
                </td>
                <td className="px-2 py-1 text-center"></td>
              </tr>
            </tbody>
          </table>

          <div className="text-right">
            <button
              onClick={agregarAccion}
              className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-800 shadow-sm transition"

            >
              Añadir acción
            </button>
          </div>
        </div>

        {/* Sección 4 - Responsables de la aplicación */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Responsables de la aplicación del informe</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Responsable 1 */}
            <div>
              <label className="font-medium text-gray-700">Responsable 1</label>
              <input
                type="text"
                name="responsable_1"
                value={formData.responsable_1}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                placeholder="Nombre del responsable"
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="firma_responsable_1"
                  checked={formData.firma_responsable_1}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-sm text-gray-700">Firma responsable 1</label>
              </div>
            </div>

            {/* Responsable 2 */}
            <div>
              <label className="font-medium text-gray-700">Responsable 2</label>
              <input
                type="text"
                name="responsable_2"
                value={formData.responsable_2}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                placeholder="Nombre del segundo responsable"
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="firma_responsable_2"
                  checked={formData.firma_responsable_2}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label className="text-sm text-gray-700">Firma responsable 2</label>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 5 - Seguimientos */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Seguimientos</h2>

          {/* Lista existente */}
          {formData.seguimientos.length > 0 && (
            <ul className="space-y-2 text-sm">
              {formData.seguimientos.map((s, index) => (
                <li key={index} className="bg-white border rounded px-3 py-2 flex justify-between items-start border-gray-400">
                  <div>
                    <span className="font-medium text-blue-700">{s.fecha}</span>
                    <p className="text-gray-700 ">{s.comentario}</p>
                  </div>
                  <button
                    onClick={() => eliminarSeguimiento(index)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Formulario de nuevo seguimiento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm font-medium text-gray-700 ">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={nuevoSeguimiento.fecha}
                onChange={handleSeguimientoChange}
                className="w-full border rounded px-3 py-2 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Comentario</label>
              <input
                type="text"
                name="comentario"
                value={nuevoSeguimiento.comentario}
                onChange={handleSeguimientoChange}
                className="w-full border rounded px-3 py-2 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                placeholder="Ej. Revisión inicial, seguimiento de avance..."
              />
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={agregarSeguimiento}
              className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-800 shadow-sm transition"
            >
              Añadir seguimiento
            </button>
          </div>
        </div>


        {/* Sección 6 - Evaluación de eficacia y cierre */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Evaluación de eficacia y cierre</h2>

          <div>
            <label className="font-medium text-gray-700 block">Evaluación de la eficacia</label>
            <textarea
              name="evaluacion_eficacia"
              value={formData.evaluacion_eficacia}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="¿Fueron eficaces las acciones propuestas? ¿Por qué?"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700 block">Motivo de cierre</label>
            <textarea
              name="motivo_cierre"
              value={formData.motivo_cierre}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              placeholder="Motivo por el que se cierra el informe..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">Fecha de cierre por seguridad</label>
              <input
                type="date"
                name="fecha_cierre_seguridad"
                value={formData.fecha_cierre_seguridad}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Validado por seguridad</label>
              <input
                type="text"
                name="validado_por_seguridad"
                value={formData.validado_por_seguridad}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                placeholder="Ej. Responsable de Seguridad Operacional"
              />
            </div>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="pt-6 text-right">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
          >
            Guardar informe
          </button>
          {mensaje && (
            <p className="text-sm mt-2 text-gray-600">{mensaje}</p>
          )}
        </div>




      </div>
    </div>
  )
}

