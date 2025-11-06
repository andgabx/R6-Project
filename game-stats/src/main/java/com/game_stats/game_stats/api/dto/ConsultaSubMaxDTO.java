package com.game_stats.game_stats.api.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ConsultaSubMaxDTO {
    private String nickname;
    private BigDecimal kd;
}