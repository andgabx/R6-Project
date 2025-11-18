import { Partida, PartidaRequest } from "@/types/partida";
import api from "../lib/api";

export const partidaService = {
  listAll: async (): Promise<Partida[]> => {
    const response = await api.get<Partida[]>("/match");
    return response.data;
  },

  findById: async (id: number): Promise<Partida> => {
    const response = await api.get<Partida>(`/match/${id}`);
    return response.data;
  },

  create: async (partida: PartidaRequest): Promise<Partida> => {
    const response = await api.post<Partida>("/match", partida);
    return response.data;
  },

  update: async (id: number, partida: PartidaRequest): Promise<Partida> => {
    const response = await api.put<Partida>(`/match/${id}`, partida);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/match/${id}`);
  },
};