import { Jogador } from "./jogador";
import { Operador } from "./operador";
import { Mapa } from "./mapa";

export interface ModoDeJogo {
  idModoDeJogo: number;
  nome: string;
  descricao: string;
  tipo: string;
}

export interface Partida {
  idPartida: number;
  resultado: string;
  dataHora: string;
  mapa: Mapa | null;
  modoDeJogo: ModoDeJogo | null;
  jogador: Jogador | null;
  operador: Operador | null;
}

export interface PartidaRequest {
  resultado: string;
  mapaId: number;
  modoDeJogoId: number;
  dataHora: string;
}