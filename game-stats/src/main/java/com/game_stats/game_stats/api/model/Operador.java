package com.game_stats.game_stats.api.model;

import lombok.Data;


@Data
public class Operador {
    // Getters e Setters
    private Integer idOperador;
    private String nome;
    private String funcao;   // Ataque ou Defesa
    private Integer armaId;  // FK Arma

}
