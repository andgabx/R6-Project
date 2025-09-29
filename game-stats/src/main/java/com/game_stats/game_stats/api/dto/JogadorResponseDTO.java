package com.game_stats.game_stats.api.dto;

import lombok.Data;

@Data
public class JogadorResponseDTO {
    private Integer idJogador;
    private String nickname;
    private DadosResponseDTO dados;
    private OperadorResponseDTO operador;
}