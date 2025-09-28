export interface Partida {
  idPartida: number;
  kills: number;
  deaths: number;
  vitoria: boolean;
  dataPartida: string;

  jogador?: {
    idJogador: number;
    nickname: string;
    dadosId: number;
    nivel: number;
    winrate: number;
    rankJogador: string;
    headshot: number;
    kd: number;
  };

  operador?: {
    idOperador: number;
    nome: string;
    funcao: string;
  };

  mapa?: {
    idMapa: number;
    nome: string;
  };

  modoDeJogo?: {
    idModo: number;
    nome: string;
    descricao: string;
    tipo: string;
  };
}

export interface PartidaRequest {
  kills: number;
  deaths: number;
  vitoria: boolean;
  dataPartida: string;
  jogadorId: number;
  operadorId: number;
  mapaId: number;
  modoId: number;
}