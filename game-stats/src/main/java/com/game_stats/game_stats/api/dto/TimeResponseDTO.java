package com.game_stats.game_stats.api.dto;

import lombok.Data;
import java.util.List;

@Data
public class TimeResponseDTO {

    private Integer idTime;
    private String nome; // Alterado de partidaId para nome

    private List<JogadorResponseDTO> jogadores; // preenchido na service
}