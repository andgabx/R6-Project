package com.game_stats.game_stats.api.dto;

import lombok.Data;

@Data
public class StatsAgrupadosDTO {
    private String chave; // Ex: "PC", "Bronze I", "Entry"
    private Long contagem; // Ex: 10
}