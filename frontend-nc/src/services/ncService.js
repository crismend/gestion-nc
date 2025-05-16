// services/ncService.js
import axiosInstance from "./axiosInstance";

const API_URL = "noconformidades/";

export const getNoConformidades = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};
