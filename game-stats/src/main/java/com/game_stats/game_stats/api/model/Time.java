package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data
public class Time {
    private Integer idTime;
    private String nome;   

    public Integer getIdTime() {
        return idTime;
    }
    public void setIdTime(Integer idTime) {
        this.idTime = idTime;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
}