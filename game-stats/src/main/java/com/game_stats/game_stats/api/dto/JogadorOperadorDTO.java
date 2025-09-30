package com.game_stats.game_stats.api.dto;

import lombok.Data;
import java.math.BigDecimal;

import com.game_stats.game_stats.api.model.Operador;

@Data
public class JogadorOperadorDTO {
    private String nomeOperador;
    private BigDecimal winrate;
}