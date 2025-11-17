// services/TeamService.ts
import api from "../lib/api";
import { Time } from "../types/team";

export const teamService = {
  listAll: async (): Promise<Time[]> => {
    const response = await api.get<Time[]>("/team");
    return response.data;
  },
};

