package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data
public class Dados {
    private Integer id;
    private Integer nivel;
    private Double winrate;
    private String rankJogador;
    private Double headshot;
    private Double kd;
}