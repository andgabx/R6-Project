// services/MapaService.ts
import api from "../lib/api";
import { Mapa } from "../types/mapa";

export const mapaService = {
  listAll: async (): Promise<Mapa[]> => {
    const response = await api.get<Mapa[]>("/maps");
    return response.data;
  },
};