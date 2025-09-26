package com.game_stats.game_stats.api.dto;

public class JogadorResponseDTO {
    private Integer id;
    private String nickname;
    private Integer dadosId;

    // Getters e Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

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