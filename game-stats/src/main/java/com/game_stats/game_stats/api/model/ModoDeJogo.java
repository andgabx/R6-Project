package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data
public class ModoDeJogo {
    private Integer idModoDeJogo;
    private String nome;
    private String descricao;
    private String tipo;
}