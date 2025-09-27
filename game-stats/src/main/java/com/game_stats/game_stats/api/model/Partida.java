package com.game_stats.game_stats.api.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Partida {
    private Integer idPartida;      // ID_Partida
    private String resultado;       // Resultado (ex.: "Vitória" / "Derrota")
    private Integer mapaId;         // fk_Mapa_ID_Mapa
    private Integer modoDeJogoId;   // fk_Modo_de_Jogo_ID_Modo_de_Jogo
    private LocalDateTime dataHora; // DataHora
}