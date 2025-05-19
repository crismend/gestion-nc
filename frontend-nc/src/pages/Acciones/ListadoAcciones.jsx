import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaFileExport, FaTrash } from "react-icons/fa";
import { eliminarInformeAccion } from "../../services/informeAccionService";

export default function ListadoAcciones() {
  const { token } = useAuth();
  const [informes, setInformes] = useState([]);

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const res = await axiosInstance.get("informes-accion/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInformes(res.data);
      } catch (error) {
        console.error("Error al cargar informes:", error);
      }
    };

    fetchInformes();
  }, [token]);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este informe?");
    if (!confirmar) return;

    try {
      await eliminarInformeAccion(id);
      setInformes((prev) => prev.filter((informe) => informe.id !== id));
      alert("Informe eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar informe:", error);
      alert("Hubo un error al eliminar el informe.");
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

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Listado Informe de Acciones</h2>
          <Link
            to="/acciones/nueva"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Nuevo informe
          </Link>
        </div>

        <table className="w-full table-auto text-sm border">
          <thead className="bg-blue-50 text-blue-700 font-semibold">
            <tr>
              <th className="px-3 py-2">Código</th>
              <th className="px-3 py-2">Fecha apertura</th>
              <th className="px-3 py-2">Procedimiento</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Validado por</th>
              <th className="px-3 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {informes.map((informe) => (
              <tr key={informe.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{informe.codigo}</td>
                <td className="px-3 py-2">{informe.fecha_apertura}</td>
                <td className="px-3 py-2">{informe.procedimiento_afectado}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium border
                    ${informe.estado === 'pendiente'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                        : informe.estado === 'en_proceso'
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : informe.estado === 'cerrada'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                  >
                    {informe.estado.replace("_", " ")}
                  </span>
                </td>
                <td className="px-3 py-2">{informe.validado_por_seguridad || "-"}</td>
                <td className="px-3 py-2 text-center space-x-2 text-gray-600 text-lg">
                  <Link to={`/acciones/${informe.id}/editar`} title="Editar">
                    <FaEdit className="inline hover:text-blue-600" />
                  </Link>
                  <Link to={`/acciones/${informe.id}/ver`} title="Ver / Exportar">
                    <FaFileExport className="inline hover:text-purple-600" />
                  </Link>
                  <button
                    onClick={() => handleEliminar(informe.id)}
                    title="Eliminar"
                    className="inline ml-2 text-red-600 hover:text-red-700"
                  >
                    <FaTrash className="inline text-base align-middle" />
                  </button>

                </td>
              </tr>
            ))}
            {informes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No hay informes registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
