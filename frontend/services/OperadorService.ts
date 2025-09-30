// services/OperadorService.ts
import api from "../lib/api";
import { Operador } from "../types/operador";

export const operadorService = {
  listAll: async (): Promise<Operador[]> => {
    const response = await api.get<Operador[]>("/operators");
    return response.data;
  },
};