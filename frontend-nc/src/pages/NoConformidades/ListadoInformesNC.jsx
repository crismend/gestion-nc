import { useEffect, useState } from "react"
import { listarInformesNC } from "../../services/informeNCService"
import { Link } from "react-router-dom"
import { FaEye, FaEdit, FaFileExport } from "react-icons/fa"

export default function ListadoInformesNC() {
  const [informes, setInformes] = useState([])

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const data = await listarInformesNC()
        setInformes(data)
      } catch (error) {
        console.error("❌ Error al cargar informes de NC:", error)
      }
    }

    fetchInformes()
  }, [])

  const getEstadoBadge = (estado) => {
    const base = "px-2 py-1 rounded text-xs font-medium inline-block border";
    switch (estado.toLowerCase()) {
      case "abierto":
        return `${base} bg-red-50 text-red-700 border-red-300`;
      case "en_revision":
        return `${base} bg-blue-50 text-blue-700 border-blue-300`;
      case "cerrado":
        return `${base} bg-green-50 text-green-700 border-green-300`;
      default:
        return `${base} bg-gray-50 text-gray-500 border-gray-200`;
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
        <Link
          to="/dashboard"
          className="inline-block bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1.5 rounded-md text-sm mb-4"
        >
          ← Volver al Panel Principal
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Informes de No Conformidad</h2>
          <Link
            to="/noconformidades/nueva"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            + Nueva No Conformidad
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-blue-50 text-blue-700 font-semibold">
              <tr>
                <th className="px-4 py-2 border-b">Código</th>
                <th className="px-4 py-2 border-b">Fecha</th>
                <th className="px-4 py-2 border-b">Descripción</th>
                <th className="px-4 py-2 border-b">Estado</th>
                <th className="px-4 py-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {informes.map((inf) => (
                <tr key={inf.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{inf.codigo}</td>
                  <td className="px-4 py-2 border-b">{inf.fecha_deteccion}</td>
                  <td className="px-4 py-2 border-b text-gray-600">{inf.descripcion?.slice(0, 40)}...</td>

                  <td className="px-4 py-2 border-b">
                    <div className="flex items-center space-x-2">
                      {inf.estado === "cerrado" && (
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293z" />
                        </svg>
                      )}
                      {inf.estado === "en_revision" && (
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 10a1 1 0 100-2 1 1 0 000 2zm1 4H9v-2h2v2z" />
                        </svg>
                      )}
                      {inf.estado === "abierto" && (
                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4h2v2H9v-2zm0-8h2v6H9V6z" />
                        </svg>
                      )}

                      <span
                        className={getEstadoBadge(inf.estado)}
                        title={
                          inf.estado === "cerrado"
                            ? "Informe cerrado y validado"
                            : inf.estado === "en_revision"
                              ? "En ejecución o verificación"
                              : "Informe abierto sin cierre"
                        }
                      >
                        {inf.estado === "cerrado"
                          ? "Cerrada"
                          : inf.estado === "abierto"
                            ? "Abierta"
                            : "En revisión"}
                      </span>

                    </div>
                  </td>


                  <td className="px-4 py-2 border-b text-center space-x-2 text-gray-600 text-lg">
                    <Link to={`/noconformidades/${inf.id}/editar`} title="Editar">
                      <FaEdit className="inline hover:text-blue-600" />
                    </Link>
                    <Link to={`/noconformidades/${inf.id}/ver`} title="Ver detalle / Exportar">
                      <FaFileExport className="inline hover:text-purple-600" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
