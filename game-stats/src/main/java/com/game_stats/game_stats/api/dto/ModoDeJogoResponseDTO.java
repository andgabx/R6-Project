package com.game_stats.game_stats.api.dto;

import lombok.Data;

@Data
public class ModoDeJogoResponseDTO {
    private Integer idModoDeJogo;
    private String nome;
    private String descricao;
    private String tipo;
}