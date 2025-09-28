// types/arma.ts
export interface Arma {
  idArma: number;
  nome: string;
  cadencia: number;
  tipo: string;
  dano: number;
  capacidade: number;
}

export interface ArmaRequest {
  nome: string;
  cadencia: number;
  tipo: string;
  dano: number;
  capacidade: number;
}