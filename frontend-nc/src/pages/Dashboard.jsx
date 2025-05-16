import { Link } from "react-router-dom";
import { Plus, FileText, Activity } from "lucide-react";
import Navbar from "../components/Navbar";
import DashboardIndicadores from "../components/Dashboard/DashboardIndicadores";

// Componente para las tarjetas de módulos
const ModuloCard = ({ titulo, codigo, icono, enlaces, colorGradiente = "from-blue-50 to-blue-100" }) => {
  return (
    <div className={`bg-gradient-to-br ${colorGradiente} rounded-2xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 rounded-full bg-white shadow-sm">
          {icono}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{titulo}</h2>
          <p className="text-xs text-gray-500">{codigo}</p>
        </div>
      </div>
      <div className="space-y-3">
        {enlaces.map((enlace, index) => (
          <Link
            key={index}
            to={enlace.ruta}
            className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${enlace.principal
              ? "bg-white text-blue-600 font-medium shadow-sm hover:shadow"
              : "text-gray-700 hover:bg-white/50"
              }`}
          >
            {enlace.icono}
            <span>{enlace.texto}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar siempre fuera del contenedor centrado */}
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>
          <p className="text-gray-500">Bienvenido al sistema de gestión de No Conformidades</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* BLOQUE 1: No Conformidades */}
          <ModuloCard
            titulo="No Conformidades"
            codigo="PSM-03-I-03"
            icono={<FileText className="w-6 h-6 text-blue-600" />}
            colorGradiente="from-gray-100 to-gray-200"
            enlaces={[
              {
                ruta: "/noconformidades/nueva",
                texto: "Nueva No Conformidad",
                icono: <Plus size={18} />,
                principal: true
              },
              {
                ruta: "/noconformidades",
                texto: "Ver No Conformidades",
                icono: <FileText size={18} />,
                principal: false
              }
            ]}
          />

          {/* BLOQUE 2: Acciones Correctivas */}
          <ModuloCard
            titulo="Acciones Correctivas / Preventivas"
            codigo="PSM-03-I-05"
            icono={<Activity className="w-6 h-6 text-purple-600" />}
            colorGradiente="from-gray-100 to-gray-200"
            enlaces={[
              {
                ruta: "/acciones/nueva",
                texto: "Nuevo Informe de Acción",
                icono: <Plus size={18} />,
                principal: true
              },
              {
                ruta: "/acciones",
                texto: "Ver Informes de Acción",
                icono: <FileText size={18} />,
                principal: false
              }
            ]}
          />
        </div>

        {/* Panel de Indicadores */}
        <DashboardIndicadores />
      </div>
    </div>
  );
}