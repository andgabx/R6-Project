package com.game_stats.game_stats.api.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PartidaResponseDTO {

    private Integer idPartida;
    private String resultado;
    private LocalDateTime dataHora;

    private MapaResponseDTO mapa;
    private ModoDeJogoResponseDTO modoDeJogo;

    private JogadorResponseDTO jogador;
    private OperadorResponseDTO operador;
}