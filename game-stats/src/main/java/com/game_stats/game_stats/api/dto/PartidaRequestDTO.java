package com.game_stats.game_stats.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PartidaRequestDTO {

    @NotBlank
    private String resultado;            // Resultado (ex.: "Vitória", "Derrota")

    @NotNull
    private Integer mapaId;              // fk_Mapa_ID_Mapa

    @NotNull
    private Integer modoDeJogoId;        // fk_Modo_de_Jogo_ID_Modo_de_Jogo

    @NotNull
    private LocalDateTime dataHora;      // DataHora (enviar em ISO 8601 via JSON)
}