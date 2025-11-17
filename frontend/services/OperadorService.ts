// services/OperadorService.ts
import api from "../lib/api";
import { Operador, MetaAtaque } from "../types/operador";

export const operadorService = {
  listAll: async (): Promise<Operador[]> => {
    const response = await api.get<Operador[]>("/operators");
    return response.data;
  },

  getMetaAtaque: async (): Promise<MetaAtaque[]> => {
    const response = await api.get<MetaAtaque[]>("/stats/view/meta-ataque");
    return response.data;
  },
};