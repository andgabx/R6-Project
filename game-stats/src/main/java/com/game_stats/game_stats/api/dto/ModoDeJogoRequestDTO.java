package com.game_stats.game_stats.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ModoDeJogoRequestDTO {

    @NotBlank(message = "O nome do modo de jogo é obrigatório")
    private String nome;

    private String descricao;

    private String tipo;
}