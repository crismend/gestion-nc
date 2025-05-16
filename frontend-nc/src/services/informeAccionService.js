// services/informeAccionService.js
import axiosInstance from "./axiosInstance";

const API_URL = "informes-accion/";

// Crear un nuevo informe de acción
export const crearInformeAccion = async (datos) => {
  return await axiosInstance.post(API_URL, datos);
};

// Listar todos los informes de acción (para el <select>)
export const listarInformesAccion = async () => {
  const res = await axiosInstance.get(API_URL);
  return res.data;
};
