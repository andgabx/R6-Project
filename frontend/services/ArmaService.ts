import api from "../lib/api";
import { Arma, ArmaRequest } from "../types/arma";

export const armaService = {
  // CRUD básico
  listAll: async (): Promise<Arma[]> => {
    const response = await api.get<Arma[]>("/weapons");
    return response.data;
  },

  findById: async (id: number): Promise<Arma> => {
    const response = await api.get<Arma>(`/weapons/${id}`);
    return response.data;
  },

  create: async (arma: ArmaRequest): Promise<Arma> => {
    const response = await api.post<Arma>("/weapons", arma);
    return response.data;
  },

  update: async (id: number, arma: ArmaRequest): Promise<Arma> => {
    const response = await api.put<Arma>(`/weapons/${id}`, arma);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/weapons/${id}`);
  },

  // Filtros específicos baseados na estrutura da tabela
  listByMinDamage: async (minDamage: number): Promise<Arma[]> => {
    const response = await api.get<Arma[]>(`/weapons/mindamage?min=${minDamage}`);
    return response.data;
  },

  listByMinCadencia: async (minCadencia: number): Promise<Arma[]> => {
    const response = await api.get<Arma[]>(`/weapons/mincadencia?min=${minCadencia}`);
    return response.data;
  },

  listByMinCapacidade: async (minCapacidade: number): Promise<Arma[]> => {
    const response = await api.get<Arma[]>(`/weapons/mincapacidade?min=${minCapacidade}`);
    return response.data;
  },

  listByType: async (type: string): Promise<Arma[]> => {
    const response = await api.get<Arma[]>(`/weapons/type?type=${type}`);
    return response.data;
  },

  // Queries mais específicas e avançadas
  listRiflesWithHighDamage: async (minDamage: number): Promise<Arma[]> => {
    const response = await api.get<Arma[]>(`/weapons/rifles/highdamage?min=${minDamage}`);
    return response.data;
  },

  listPistolasWithHighCadencia: async (minCadencia: number): Promise<Arma[]> => {
    const response = await api.get<Arma[]>(`/weapons/pistolas/highcadencia?min=${minCadencia}`);
    return response.data;
  },

  listSMGsWithHighCapacity: async (minCapacidade: number): Promise<Arma[]> => {
    const response = await api.get<Arma[]>(`/weapons/smgs/highcapacity?min=${minCapacidade}`);
    return response.data;
  },

  listTopDamageByType: async (): Promise<Arma[]> => {
    const response = await api.get<Arma[]>("/weapons/topdamage/bytype");
    return response.data;
  },

  listHighCadenciaLowDamage: async (): Promise<Arma[]> => {
    const response = await api.get<Arma[]>("/weapons/highcadencia/lowdamage");
    return response.data;
  },

  listBalancedWeapons: async (): Promise<Arma[]> => {
    const response = await api.get<Arma[]>("/weapons/balanced");
    return response.data;
  },

  // Estatísticas e análises
  getWeaponStats: async (): Promise<any> => {
    const response = await api.get("/weapons/stats");
    return response.data;
  },

  getAverageDamageByType: async (): Promise<any> => {
    const response = await api.get("/weapons/stats/damage/bytype");
    return response.data;
  }
};