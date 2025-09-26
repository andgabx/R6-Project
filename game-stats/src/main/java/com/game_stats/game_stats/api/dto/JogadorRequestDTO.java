package com.game_stats.game_stats.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class JogadorRequestDTO {

    @NotBlank(message = "Nickname é obrigatório")
    @Size(min = 3, max = 255, message = "Nickname deve ter entre 3 e 255 caracteres")
    private String nickname;

    private Integer dadosId; // opcional

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
}