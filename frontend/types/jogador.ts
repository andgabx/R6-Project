// types/jogador.ts
export interface Jogador {
  idJogador: number;
  nickname: string;
  dadosId: number | null;
}

export interface JogadorRequest {
  nickname: string;
  dadosId?: number | null;
}