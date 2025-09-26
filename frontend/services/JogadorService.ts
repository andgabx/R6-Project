import api from "../lib/api";
import { Jogador, JogadorRequest } from "../types/jogador";

export const jogadorService = {
  listarTodos: async (): Promise<Jogador[]> => {
    const response = await api.get<Jogador[]>("/jogadores");
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Jogador> => {
    const response = await api.get<Jogador>(`/jogadores/${id}`);
    return response.data;
  },

  criar: async (jogador: JogadorRequest): Promise<Jogador> => {
    const response = await api.post<Jogador>("/jogadores", jogador);
    return response.data;
  },

  atualizar: async (id: number, jogador: JogadorRequest): Promise<Jogador> => {
    const response = await api.put<Jogador>(`/jogadores/${id}`, jogador);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/jogadores/${id}`);
  },
};