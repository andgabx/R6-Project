package com.game_stats.game_stats.api.dto;

import lombok.Data;

@Data
public class ArmaRequestDTO {
    private String nome;
    private String tipo;
    private Integer dano;
}