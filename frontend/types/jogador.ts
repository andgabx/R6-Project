export interface Jogador {
    idJogador: number;
    nickname: string;
    dadosId: number | null;
    dados?: Dados;
    operadoresAtaque?: Operador[];
    operadoresDefesa?: Operador[];
}

export interface JogadorRequest {
    nickname: string;
    dadosId: number | null;
}

interface Dados {
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
    mapaFavorito: Mapa;
    mapaMaisVitorias: Mapa;
    mapaMaisDerrotas: Mapa;
}

interface Mapa {
    idMapa: number;
    nome: string;
}

interface Operador {
    nomeOperador: string;
    winrate: number;
}
