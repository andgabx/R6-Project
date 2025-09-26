// types/jogador.ts
export interface Jogador {
  id: number;
  nickname: string;
  dadosId: number | null;
}

export interface JogadorRequest {
  nickname: string;
  dadosId?: number | null;
}