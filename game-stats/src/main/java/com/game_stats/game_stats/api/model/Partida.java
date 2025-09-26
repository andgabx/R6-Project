package com.game_stats.game_stats.api.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Partida {
    private Integer idPartida;
    private Integer jogadorId;
    private Integer operadorId;
    private Integer kills;
    private Integer deaths;
    private Boolean vitoria;
    private LocalDateTime dataPartida;
}