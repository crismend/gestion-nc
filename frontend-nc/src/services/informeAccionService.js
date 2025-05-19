// services/informeAccionService.js
import axiosInstance from "./axiosInstance";

// Crear un nuevo informe de acción
export const crearInformeAccion = async (datos) => {
  return await axiosInstance.post('informes-accion/', datos);
};

// Listar todos los informes de acción (para el <select>)
export const listarInformesAccion = async () => {
  const res = await axiosInstance.get('informes-accion/');
  return res.data;
};

// ✅ NUEVO: función de eliminar (esto es lo que te falta)
export const eliminarInformeAccion = async (id) => {
  return await axiosInstance.delete(`informes-accion/${id}/`);
};
