package com.game_stats.game_stats.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MapaRequestDTO {

    @NotBlank(message = "O nome do mapa é obrigatório")
    private String nome;
}