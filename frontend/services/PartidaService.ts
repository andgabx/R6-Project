import { Partida, PartidaRequest } from "@/types/partida";
import api from "../lib/api";

export const partidasService = {
  listarTodas: async (): Promise<Partida[]> => {
    const response = await api.get<Partida[]>("/partidas");
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Partida> => {
    const response = await api.get<Partida>(`/partidas/${id}`);
    return response.data;
  },

  criar: async (partida: PartidaRequest): Promise<Partida> => {
    const response = await api.post<Partida>("/partidas", partida);
    return response.data;
  },

  atualizar: async (id: number, partida: PartidaRequest): Promise<Partida> => {
    const response = await api.put<Partida>(`/partidas/${id}`, partida);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/partidas/${id}`);
  },
};