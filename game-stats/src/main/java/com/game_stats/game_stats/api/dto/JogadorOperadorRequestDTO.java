package com.game_stats.game_stats.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JogadorOperadorRequestDTO {

    @NotNull(message = "O nome do operador não pode ser nulo") // <-- AQUI ESTÁ O MOTIVO
    private String nomeOperador;
    private Double winrate;
}