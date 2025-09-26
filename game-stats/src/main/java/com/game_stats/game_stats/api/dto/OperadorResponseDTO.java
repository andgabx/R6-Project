package com.game_stats.game_stats.api.dto;

import com.game_stats.game_stats.api.dto.ArmaResponseDTO;
import lombok.Data;

@Data
public class OperadorResponseDTO {
    private Integer idOperador;
    private String nome;
    private String funcao;
    private ArmaResponseDTO arma;
}