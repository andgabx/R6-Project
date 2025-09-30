package com.game_stats.game_stats.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class JogadorOperadorRequestDTO {

    @NotNull(message = "O ID do operador não pode ser nulo")
    private Integer operadorId;

    private BigDecimal winrate;
}