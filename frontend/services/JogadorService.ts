import api from "../lib/api";
import { Jogador, JogadorRequest } from "../types/jogador";

export const jogadorService = {
  listAll: async (): Promise<Jogador[]> => {
    const response = await api.get<Jogador[]>("/players");
    return response.data;
  },

  findById: async (id: number): Promise<Jogador> => {
    const response = await api.get<Jogador>(`/players/${id}`);
    return response.data;
  },

  create: async (jogador: JogadorRequest): Promise<Jogador> => {
    const response = await api.post<Jogador>("/players", jogador);
    return response.data;
  },

  update: async (id: number, jogador: JogadorRequest): Promise<Jogador> => {
    const response = await api.put<Jogador>(`/players/${id}`, jogador);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/players/${id}`);
  },

  listByMinKd: async (minKd: number): Promise<Jogador[]> => {
    const response = await api.get<Jogador[]>(`/players/minkd?kdMin=${minKd}`);
    return response.data;
  },

  listByMinWinRate: async (minWinRate: number): Promise<Jogador[]> => {
    const response = await api.get<Jogador[]>(`/players/minwinrate?min=${minWinRate}`);
    return response.data;
  }, 

  listByMinLevel: async (minLevel: number): Promise<Jogador[]> => {
    const response = await api.get<Jogador[]>(`/players/minlevel?min=${minLevel}`);
    return response.data;
  }
};