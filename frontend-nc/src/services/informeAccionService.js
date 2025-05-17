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
