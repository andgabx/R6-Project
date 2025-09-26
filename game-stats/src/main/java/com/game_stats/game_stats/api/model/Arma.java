package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data // gera automaticamente getters, setters, toString, equals e hashCode
public class Arma {
    private Integer idArma;
    private String nome;
    private String tipo;
    private Integer dano;
}