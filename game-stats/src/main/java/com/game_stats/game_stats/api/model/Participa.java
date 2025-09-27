package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data
public class Participa {
    private Integer partidaId; // fk_Partida_ID_Partida
    private Integer timeId;    // fk_Time_ID_Time
}