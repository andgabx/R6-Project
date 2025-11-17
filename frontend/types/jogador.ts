// types/jogador.ts

// Estrutura para a requisição de criação/atualização
export interface JogadorOperadorRequest {
  nomeOperador: string;
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
    operador: {
        idOperador: number;
        nome: string;
        tipo: string;
    };
}

export interface Jogador {
  idJogador: number;
  nickname: string;
  dados: Dados | null;
  operadoresAtaque: JogadorOperador[];
  operadoresDefesa: JogadorOperador[];
}

// Estrutura simplificada retornada pelo endpoint de perfis
export interface JogadorPerfil {
  idJogador: number;
  nickname: string;
  nivel: number;
  rankJogador: string;
  winrateGeral: number;
  kd: number;
  horasJogadas: number;
  plataforma: string;
  mapaFavorito: string;
  mapaMaisVitorias: string;
  mapaMaisDerrotas: string;
}

// Estrutura para agrupamento por rank
export interface RankGroup {
  chave: string;
  contagem: number;
}

// Estrutura para logs de alteração de rank
export interface RankLog {
  logId: number;
  dadosId: number;
  rankAntigo: string;
  rankNovo: string;
  dataAlteracao: string;
}