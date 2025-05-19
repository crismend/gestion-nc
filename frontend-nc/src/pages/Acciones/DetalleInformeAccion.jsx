import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance"; // ✅ Corregido
import { useAuth } from "../../context/AuthContext";
import html2pdf from "html2pdf.js";
import PlantillaPDFAccion from "../../components/PlantillaPDFAccion";

export default function DetalleInformeAccion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [informe, setInforme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInforme = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`informes-accion/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInforme(res.data);
      } catch (error) {
        console.error("❌ Error al cargar informe de acción:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInforme();
  }, [id, token]);

  const exportarPDF = () => {
    if (!informe) {
      console.warn("⚠️ Informe aún no cargado.");
      return;
    }

    const element = document.getElementById("pdf");
    const opciones = {
      margin: 10,
      filename: `${informe.codigo || "informe"}_InformeAccion.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opciones).from(element).save();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-300 border-l-blue-300 border-r-blue-300 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Cargando informe...</p>
        </div>
      </div>
    );
  }

  if (!informe) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-700 mb-2">No se encontró el informe</h3>
          <p className="text-gray-600 mb-4">El informe solicitado no está disponible o no existe.</p>
          <button
            onClick={() => navigate("/acciones")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm transition duration-150"
          >
            Volver al listado
          </button>
        </div>
      </div>
    );
  }

  const getEstadoTag = () => {
    switch (informe.estado) {
      case "pendiente":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-yellow-200">
            Pendiente
          </span>
        );
      case "en_proceso":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-200">
            En proceso
          </span>
        );
      case "cerrada":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-200">
            Cerrada
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-200">
            {informe.estado?.replace("_", " ") || "Sin estado"}
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cabecera con acciones */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/acciones")}
            className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-sm border border-gray-200 transition duration-150"
            aria-label="Volver"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Informe de Acción</h1>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <span className="font-semibold text-gray-700 mr-2">Código: {informe.codigo}</span>
              {getEstadoTag()}
            </div>
          </div>
        </div>

        <button
          onClick={exportarPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md shadow-sm flex items-center justify-center space-x-2 transition duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
          </svg>
          <span>Exportar a PDF</span>
        </button>
      </div>

      {/* Contenido principal */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <PlantillaPDFAccion informe={informe} />
        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-right">
          <p className="text-xs text-gray-500 italic">
            Documento generado automáticamente - Sistema Gestión Acciones (ISOpyme)
          </p>
        </div>
      </div>

      {/* Plantilla oculta solo para exportar */}
      <div className="hidden">
        <div id="pdf">
          <PlantillaPDFAccion informe={informe} />
        </div>
      </div>
    </div>
  );
}
