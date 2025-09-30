// types/operador.ts
export interface Habilidades {
    gadgetName: string;
    gadgetAbility: string;
}

export interface Arma {
    idArma: number;
    nome: string;
    tipo: string;
    dano: number;
}

export interface Operador {
    idOperador: number;
    nome: string;
    funcao: 'Ataque' | 'Defesa';
    armas: Arma[];
    habilidades: Habilidades;
}