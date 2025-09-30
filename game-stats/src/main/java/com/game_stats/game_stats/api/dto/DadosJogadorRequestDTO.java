package com.game_stats.game_stats.api.dto;

import lombok.Data;


@Data
public class DadosJogadorRequestDTO {
    private Integer nivel;
    private Double winrate;
    private String rankJogador;
    private Double headshot;
    private Double kd;
    private String plataforma;
    private Integer horasJogadas;
    private String mainRole;
    private String preferenciaJogo;
    private Integer mapaFavoritoId;
    private Integer mapaMaisVitoriasId;
    private Integer mapaMaisDerrotasId;
}