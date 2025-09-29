package com.game_stats.game_stats.api.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class DadosResponseDTO {
    private Integer id;
    private Integer nivel;
    private Double winrate;
    private String rankJogador;
    private Double headshot;
    private Double kd;
    private String plataforma;
    private Integer horasJogadas;
    private String mainRole;
    private String preferenciaJogo;

    // Em vez de IDs, teremos os objetos completos dos mapas
    private MapaResponseDTO mapaFavorito;
    private MapaResponseDTO mapaMaisVitorias;
    private MapaResponseDTO mapaMaisDerrotas;
}