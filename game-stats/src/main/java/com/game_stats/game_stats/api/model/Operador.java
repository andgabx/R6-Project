package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data
public class Operador {
    private Integer idOperador;
    private String nome;
    private Integer velocidade;
    private Integer blindagem;
    private String unidadeEspecial;
    private Integer armaId;
    private String funcao;
}