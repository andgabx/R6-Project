// types/team.ts

import { Jogador } from "./jogador";

export interface Time {
  idTime: number;
  nome: string;
  jogadores: Jogador[];
}

