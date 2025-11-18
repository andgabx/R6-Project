// services/OperadorService.ts
import api from "../lib/api";
import { Operador, MetaAtaque } from "../types/operador";

export interface OperadorRequest {
  nome: string;
  funcao: string;
  armaId: number;
}

export const operadorService = {
  listAll: async (): Promise<Operador[]> => {
    const response = await api.get<Operador[]>("/operators");
    return response.data;
  },

  getMetaAtaque: async (): Promise<MetaAtaque[]> => {
    const response = await api.get<MetaAtaque[]>("/stats/view/meta-ataque");
    return response.data;
  },

  create: async (data: OperadorRequest): Promise<string> => {
    const response = await api.post<string>("/operators", data);
    return response.data;
  },

  update: async (id: number, data: OperadorRequest): Promise<string> => {
    const response = await api.put<string>(`/operators/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<string> => {
    const response = await api.delete<string>(`/operators/${id}`);
    return response.data;
  },
};