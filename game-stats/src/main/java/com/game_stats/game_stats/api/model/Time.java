package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data
public class Time {
    private Integer idTime;     // ID_Time
    private Integer partidaId;  // fk_Partida_ID_Partida
}