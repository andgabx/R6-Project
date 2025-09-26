package com.game_stats.game_stats.api.model;

public class Jogador {
    private Integer idJogador;
    private String nickname;
    private Integer dadosId; // FK opcional para Dados

    // Getters e Setters
    public Integer getIdJogador() {
        return idJogador;
    }
    public void setIdJogador(Integer idJogador) {
        this.idJogador = idJogador;
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

    public Object getRankJogador() {
        return null;
    }
}
