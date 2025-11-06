package com.game_stats.game_stats.api.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ViewMetaAtaqueDTO {
    // Corresponde a view_meta_operador_ataque
    private String nome;
    private Integer velocidade;
    private Integer blindagem;
    private String unidadeEspecial;
    private String gadgetUnicoAtaque;
    private Long totalJogadoresQueUsam;
    private Double winrateMedioEntreEles;
}