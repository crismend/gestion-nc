// services/informeNCService.js
import axiosInstance from "./axiosInstance";

export const crearInformeNC = async (datos) => {
  return await axiosInstance.post('informes-nc/', datos);
};

export const obtenerInformeNC = async (id) => {
  const res = await axiosInstance.get(`informes-nc/${id}/`);
  return res.data;
};

export const editarInformeNC = async (id, datos) => {
  return await axiosInstance.put(`informes-nc/${id}/`, datos);
};

export const listarInformesNC = async () => {
  const res = await axiosInstance.get('informes-nc/');
  return res.data;
};
