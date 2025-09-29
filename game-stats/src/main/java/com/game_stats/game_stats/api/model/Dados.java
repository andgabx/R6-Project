package com.game_stats.game_stats.api.model;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class Dados {
    private Integer id; // Mapeia Dados_PK_INT
    private Integer nivel;
    private Double winrate;
    private String rankJogador;
    private Double headshot;
    private Double kd;
    private String plataforma;
    private Integer horasJogadas;
    private String mainRole;
    private String preferenciaJogo;
    private Integer fkMapaFavorito;
    private Integer fkMapaMaisVitorias;
    private Integer fkMapaMaisDerrotas;
}