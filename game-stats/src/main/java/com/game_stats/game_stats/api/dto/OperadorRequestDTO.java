package com.game_stats.game_stats.api.dto;

public class OperadorRequestDTO {
    private String nome;
    private String funcao;   // "Ataque" ou "Defesa"
    private Integer armaId;  // FK da Arma

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getFuncao() { return funcao; }
    public void setFuncao(String funcao) { this.funcao = funcao; }

    public Integer getArmaId() { return armaId; }
    public void setArmaId(Integer armaId) { this.armaId = armaId; }
}
