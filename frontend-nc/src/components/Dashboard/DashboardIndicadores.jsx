import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import {
  AlertTriangle,
  Clock,
  PlusCircle,
  CheckCircle,
  BarChart2,
  FileText,
  ClipboardList,
  Eye,
  RefreshCw,
  Loader2,
} from "lucide-react";
import CountUp from "react-countup";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#10B981", "#FBBF24", "#EF4444"];
const ACCIONES_COLORS = ["#10B981", "#FBBF24", "#EF4444"]; // verde, amarillo, rojo

const DashboardIndicadores = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { token } = useAuth();

  const fetchIndicadores = async () => {
    if (!token) {
      setError("No se encontró el token de autenticación.");
      setLoading(false);
      return;
    }

    try {
      setRefreshing(true);
      const response = await axiosInstance.get("dashboard/indicadores/");
      setData(response.data);
      setError("");
    } catch (err) {
      console.error("Error al cargar indicadores:", err);
      if (err.response && err.response.status === 401) {
        setError(
          "Token inválido o sesión expirada. Por favor, vuelve a iniciar sesión."
        );
      } else {
        setError("Error al cargar los indicadores.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchIndicadores();
  }, [token]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        <p className="text-blue-500 font-medium">Cargando indicadores...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 rounded-lg p-4 my-4 shadow-sm">
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );

  const Indicador = ({
    titulo,
    valor,
    color,
    fondo,
    icono,
    descripcion,
    alertaAlta = false,
  }) => {
    const gradientes = {
      "text-gray-800": "bg-gradient-to-br from-gray-50 to-gray-200",
      "text-amber-600": "bg-gradient-to-br from-amber-50 to-amber-200",
      "text-emerald-600": "bg-gradient-to-br from-emerald-50 to-emerald-200",
      "text-blue-600": "bg-gradient-to-br from-blue-50 to-blue-200",
      "text-red-600": "bg-gradient-to-br from-red-50 to-red-200",
      "text-indigo-600": "bg-gradient-to-br from-indigo-50 to-indigo-200",
      "text-purple-600": "bg-gradient-to-br from-purple-50 to-purple-200",
    };

    const gradienteBg = gradientes[color] || "bg-gradient-to-br from-gray-50 to-gray-200";

    return (
      <div className={`${gradienteBg} rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md ${alertaAlta ? "animate-pulse" : ""}`}>
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">{titulo}</p>
              <CountUp
                end={parseFloat(valor)}
                duration={1.5}
                separator=","
                decimals={valor.toString().includes(".") ? 1 : 0}
                className={`text-3xl font-bold ${color}`}
              />
              {descripcion && (
                <p className="text-xs text-gray-400">{descripcion}</p>
              )}
            </div>
            <div className={`p-3 rounded-full ${fondo}`}>{icono}</div>
          </div>
          {alertaAlta && (
            <div className="mt-2 text-xs font-medium text-red-600 flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Requiere atención inmediata
            </div>
          )}
        </div>
      </div>
    );
  };

  const pieNC = [
    {
      name: "Cerradas",
      value: data.porcentaje_nc_cerradas,
    },
    {
      name: "Abiertas / Revisión",
      value: data.porcentaje_nc_abiertas_revision,
    },
  ];

  const pieAcciones = [
    { name: "Cerradas", value: data.porcentaje_acciones_cerradas },
    { name: "En proceso", value: data.porcentaje_acciones_en_proceso },
    { name: "Pendientes", value: data.porcentaje_acciones_pendientes },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Panel de Indicadores</h1>
        <button
          onClick={fetchIndicadores}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600 rounded-lg transition-colors duration-200 font-medium shadow-sm"
        >
          {refreshing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Actualizar
        </button>
      </div>

      {/* Tarjetas - NC */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <ClipboardList className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Indicadores de No Conformidades</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Indicador titulo="Total de No Conformidades" valor={data.total_nc} color="text-gray-800" fondo="bg-gray-100" icono={<ClipboardList className="w-5 h-5 text-gray-600" />} descripcion="Registros totales en el sistema" />
          <Indicador titulo="% NC Abiertas / En revisión" valor={data.porcentaje_nc_abiertas_revision} color="text-amber-600" fondo="bg-amber-100" icono={<Clock className="w-5 h-5 text-amber-600" />} descripcion="Requieren atención" />
          <Indicador titulo="% NC Cerradas" valor={data.porcentaje_nc_cerradas} color="text-emerald-600" fondo="bg-emerald-100" icono={<CheckCircle className="w-5 h-5 text-emerald-600" />} descripcion="Completadas satisfactoriamente" />
          <Indicador titulo="% Efectividad (NC cerradas)" valor={data.porcentaje_efectividad} color="text-blue-600" fondo="bg-blue-100" icono={<BarChart2 className="w-5 h-5 text-blue-600" />} descripcion="Cierre efectivo de NC" />
          <Indicador
            titulo="NC con riesgo sin tratamiento"
            valor={data.nc_con_riesgo_sin_tratamiento}
            color={data.nc_con_riesgo_sin_tratamiento === 0 ? "text-emerald-600" : "text-red-600"}
            fondo="bg-gradient-to-br from-red-100 to-red-50"
            icono={<AlertTriangle className={`w-5 h-5 ${data.nc_con_riesgo_sin_tratamiento === 0 ? "text-emerald-600" : "text-red-600"}`} />}
            descripcion="Requieren atención inmediata"
            alertaAlta={data.nc_con_riesgo_sin_tratamiento > 0}
          />

          <Indicador titulo="NC nuevas este mes" valor={data.nc_nuevas_este_mes} color="text-indigo-600" fondo="bg-indigo-100" icono={<PlusCircle className="w-5 h-5 text-indigo-600" />} descripcion="Creadas en los últimos 30 días" />
        </div>
      </div>

      {/* Tarjetas - Acciones */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Indicadores de Acciones Correctivas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Indicador titulo="Total de Acciones" valor={data.total_acciones} color="text-gray-800" fondo="bg-gray-100" icono={<FileText className="w-5 h-5 text-gray-600" />} descripcion="Registros totales en el sistema" />
          <Indicador titulo="% Acciones Pendientes" valor={data.porcentaje_acciones_pendientes} color="text-amber-600" fondo="bg-amber-100" icono={<Clock className="w-5 h-5 text-amber-600" />} descripcion="No iniciadas" />
          <Indicador titulo="% Acciones en proceso" valor={data.porcentaje_acciones_en_proceso} color="text-blue-600" fondo="bg-blue-100" icono={<Eye className="w-5 h-5 text-blue-600" />} descripcion="En ejecución" />
          <Indicador titulo="% Acciones Cerradas" valor={data.porcentaje_acciones_cerradas} color="text-emerald-600" fondo="bg-emerald-100" icono={<CheckCircle className="w-5 h-5 text-emerald-600" />} descripcion="Completadas satisfactoriamente" />
        </div>
      </div>

      {/* Gráficas Pie */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución de No Conformidades</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieNC}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                labelLine={false} // ✅ Elimina líneas guía innecesarias
                label={({ name, percent, value }) =>
                  value > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                }
              >
                {pieNC.map((entry, index) => (
                  <Cell
                    key={`nc-${index}`}
                    fill={COLORS[index % COLORS.length]} // Puedes usar COLORS para pieNC
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>


        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución de Acciones Correctivas</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieAcciones}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                labelLine={false} // 🔧 Desactiva las líneas guía
                label={({ name, percent, value }) =>
                  value > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                }
              >
                {pieAcciones.map((entry, index) => (
                  <Cell
                    key={`ac-${index}`}
                    fill={ACCIONES_COLORS[index % ACCIONES_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>


      </div>
    </div>
  );
};

export default DashboardIndicadores;
