import api from "../lib/api";
import { Jogador, JogadorRequest, JogadorPerfil, RankGroup, RankLog, MaxKdPlayer, JogadorTime, KdHeadshotScatterData, TimePorMapa, KpiDTO } from "../types/jogador";

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
  },

  listPerfis: async (): Promise<JogadorPerfil[]> => {
    const response = await api.get<JogadorPerfil[]>("/stats/view/perfis-jogadores");
    return response.data;
  },

  getRankGroups: async (): Promise<RankGroup[]> => {
    const response = await api.get<RankGroup[]>("/stats/group/by-rank");
    return response.data;
  },

  getRoleGroups: async (): Promise<RankGroup[]> => {
    const response = await api.get<RankGroup[]>("/stats/group/by-role");
    return response.data;
  },

  getRankLogs: async (): Promise<RankLog[]> => {
    const response = await api.get<RankLog[]>("/stats/trigger/rank-logs");
    return response.data;
  },

  getMaxKdPlayer: async (): Promise<MaxKdPlayer[]> => {
    const response = await api.get<MaxKdPlayer[]>("/stats/query/sub-max-kd");
    return response.data;
  },

  getJogadoresTimes: async (): Promise<JogadorTime[]> => {
    const response = await api.get<JogadorTime[]>("/stats/query/full-join-jogadores-times");
    return response.data;
  },

  getKdHeadshotScatter: async (): Promise<KdHeadshotScatterData[]> => {
    const response = await api.get<KdHeadshotScatterData[]>("/stats/scatter/kd-vs-headshot");
    return response.data;
  },

  recalcularRanks: async (): Promise<void> => {
    await api.post("/stats/procedure/recalcular-ranks");
  },

  getTimesPorMapa: async (mapaNome: string): Promise<TimePorMapa[]> => {
    const response = await api.get<TimePorMapa[]>(`/stats/query/sub-in-times-mapa/${encodeURIComponent(mapaNome)}`);
    return response.data;
  },

  getKpis: async (): Promise<KpiDTO> => {
    const response = await api.get<KpiDTO>("/stats/kpis");
    return response.data;
  }
};