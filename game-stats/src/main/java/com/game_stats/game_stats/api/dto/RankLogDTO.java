package com.game_stats.game_stats.api.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RankLogDTO {
    private Integer logId;
    private Integer dadosId;
    private String rankAntigo;
    private String rankNovo;
    private LocalDateTime dataAlteracao;
}