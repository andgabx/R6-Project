package com.game_stats.game_stats.api.dto;

import lombok.Data;

@Data
public class PartidaRequestDTO {
    private Integer jogadorId;
    private Integer operadorId;
    private Integer kills;
    private Integer deaths;
    private Boolean vitoria;
}