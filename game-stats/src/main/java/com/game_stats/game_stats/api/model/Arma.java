package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data
public class Arma {
    private Integer idArma;
    private String nome;
    private String tipo;
    private Integer dano;
}