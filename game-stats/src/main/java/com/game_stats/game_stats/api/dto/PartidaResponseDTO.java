package com.game_stats.game_stats.api.dto;

import com.game_stats.game_stats.api.dto.JogadorResponseDTO;
import com.game_stats.game_stats.api.dto.OperadorResponseDTO;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PartidaResponseDTO {
    private Integer idPartida;
    private JogadorResponseDTO jogador;
    private OperadorResponseDTO operador;
    private Integer kills;
    private Integer deaths;
    private Boolean vitoria;
    private LocalDateTime dataPartida;
}