package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data
public class Ataque {
    private Integer fk_Operador_ID_Operador;
    private Integer drone;
    private String gadgetUnicoAtaque;
    private String habilidadeUnicaAtaque;
}