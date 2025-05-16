// services/informeNCService.js
import axiosInstance from "./axiosInstance";

const API_URL = "informes-nc/"; // Ya tienes baseURL definida en axiosInstance

export const crearInformeNC = async (datos) => {
  return await axiosInstance.post(API_URL, datos);
};

export const obtenerInformeNC = async (id) => {
  const res = await axiosInstance.get(`${API_URL}${id}/`);
  return res.data;
};

export const editarInformeNC = async (id, datos) => {
  return await axiosInstance.put(`${API_URL}${id}/`, datos);
};

export const listarInformesNC = async () => {
  const res = await axiosInstance.get(API_URL);
  return res.data;
};
