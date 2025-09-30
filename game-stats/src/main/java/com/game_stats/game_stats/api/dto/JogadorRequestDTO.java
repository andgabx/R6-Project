package com.game_stats.game_stats.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class JogadorRequestDTO {

    @NotBlank(message = "Nickname é obrigatório")
    @Size(min = 3, max = 255, message = "Nickname deve ter entre 3 e 255 caracteres")
    private String nickname;

    @NotNull
    @Valid
    private DadosJogadorRequestDTO dados;

    private List<@Valid JogadorOperadorRequestDTO> operadoresAtaque;
    private List<@Valid JogadorOperadorRequestDTO> operadoresDefesa;
}