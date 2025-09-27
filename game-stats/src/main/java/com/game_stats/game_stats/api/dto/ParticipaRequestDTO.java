package com.game_stats.game_stats.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ParticipaRequestDTO {

    @NotNull
    private Integer partidaId; // fk_Partida_ID_Partida

    @NotNull
    private Integer timeId;    // fk_Time_ID_Time
}