package com.game_stats.game_stats.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DadosRequestDTO {
    @NotNull
    private Integer nivel;

    @NotNull
    private Double winrate;

    @NotNull
    private String rankJogador;

    @NotNull
    private Double headshot;

    @NotNull
    private Double kd;
}