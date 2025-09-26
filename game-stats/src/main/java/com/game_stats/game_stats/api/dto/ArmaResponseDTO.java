package com.game_stats.game_stats.api.dto;

import lombok.Data;

@Data
public class ArmaResponseDTO {
    private Integer idArma;
    private String nome;
    private String tipo;
    private Integer dano;
}