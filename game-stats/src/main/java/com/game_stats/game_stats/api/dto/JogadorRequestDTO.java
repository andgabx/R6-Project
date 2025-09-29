package com.game_stats.game_stats.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados para criar ou atualizar um jogador")
public class JogadorRequestDTO {

    @NotBlank(message = "Nickname é obrigatório")
    @Size(min = 3, max = 255, message = "Nickname deve ter entre 3 e 255 caracteres")
    private String nickname;

    @JsonProperty("dados_id")
    @Schema(description = "ID de dados existentes (use este OU o objeto dados, não ambos)", required = false)
    private Integer dadosId; // Para vincular dados já existentes

    @Valid // Valida o objeto aninhado
    @JsonProperty("dados")
    @Schema(description = "Dados completos do jogador (use este OU dados_id, não ambos)", required = false)
    private DadosRequestDTO dados; // Para criar novos dados junto com o jogador

    // Getters e Setters
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Integer getDadosId() {
        return dadosId;
    }

    public void setDadosId(Integer dadosId) {
        this.dadosId = dadosId;
    }

    public DadosRequestDTO getDados() {
        return dados;
    }

    public void setDados(DadosRequestDTO dados) {
        this.dados = dados;
    }
}
