// types/jogador.ts

// Estrutura para a requisição de criação/atualização
export interface JogadorOperadorRequest {
  operadorId: number;
  winrate: number;
}

export interface DadosJogadorRequest {
  nivel: number;
  winrate: number;
  rankJogador: string;
  headshot: number;
  kd: number;
  plataforma: string;
  horasJogadas: number;
  mainRole: string;
  preferenciaJogo: string;
  mapaFavoritoId: number | null;
  mapaMaisVitoriasId: number | null;
  mapaMaisDerrotasId: number | null;
}

export interface JogadorRequest {
  nickname: string;
  dados: DadosJogadorRequest;
  operadoresAtaque: JogadorOperadorRequest[];
  operadoresDefesa: JogadorOperadorRequest[];
}

// Estrutura para a resposta da API (o que recebemos)
export interface Mapa {
    idMapa: number;
    nome: string;
}

export interface Dados {
    id: number;
    nivel: number;
    winrate: number;
    rankJogador: string;
    headshot: number;
    kd: number;
    plataforma: string;
    horasJogadas: number;
    mainRole: string;
    preferenciaJogo: string;
    mapaFavorito: Mapa | null;
    mapaMaisVitorias: Mapa | null;
    mapaMaisDerrotas: Mapa | null;
}

export interface JogadorOperador {
    nomeOperador: string;
    winrate: number;
}

export interface Jogador {
  idJogador: number;
  nickname: string;
  dados: Dados | null;
  operadoresAtaque: JogadorOperador[];
  operadoresDefesa: JogadorOperador[];
}