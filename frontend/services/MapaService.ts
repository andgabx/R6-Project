// services/MapaService.ts
import api from "../lib/api";
import { Mapa } from "../types/mapa";

export interface MapaRequest {
  nome: string;
}

export const mapaService = {
  listAll: async (): Promise<Mapa[]> => {
    const response = await api.get<Mapa[]>("/maps");
    return response.data;
  },
  create: async (data: MapaRequest): Promise<Mapa> => {
    const response = await api.post<Mapa>("/maps", data);
    return response.data;
  },
  update: async (id: number, data: MapaRequest): Promise<Mapa> => {
    const response = await api.put<Mapa>(`/maps/${id}`, data);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/maps/${id}`);
  },
};