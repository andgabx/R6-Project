package com.game_stats.game_stats.api.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ViewPerfilJogadorDTO {
    // Corresponde a view_perfil_jogador
    private Integer idJogador;
    private String nickname;
    private Integer nivel;
    private String rankJogador;
    private Double winrateGeral;
    private Double kd;
    private Integer horasJogadas;
    private String plataforma;
    private String mapaFavorito;
    private String mapaMaisVitorias;
    private String mapaMaisDerrotas;
}