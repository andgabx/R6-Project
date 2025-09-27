package com.game_stats.game_stats.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class TimeRequestDTO {

    @NotNull
    private Integer partidaId;          // fk_Partida_ID_Partida

    private List<Integer> jogadorIds;   // IDs dos jogadores (opcional, para popular a tabela Tem)
}