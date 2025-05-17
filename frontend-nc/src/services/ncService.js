// services/ncService.js
import axiosInstance from "./axiosInstance";

export const getNoConformidades = async () => {
  const response = await axiosInstance.get('noconformidades/');
  return response.data;
};
