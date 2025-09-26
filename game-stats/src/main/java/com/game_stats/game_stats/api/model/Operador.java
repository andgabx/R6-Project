package com.game_stats.game_stats.api.model;

public class Operador {
    private Integer idOperador;
    private String nome;
    private String funcao;   // Ataque ou Defesa
    private Integer armaId;  // FK Arma

    // Getters e Setters
    public Integer getIdOperador() {
        return idOperador;
    }
    public void setIdOperador(Integer idOperador) {
        this.idOperador = idOperador;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFuncao() {
        return funcao;
    }
    public void setFuncao(String funcao) {
        this.funcao = funcao;
    }

    public Integer getArmaId() {
        return armaId;
    }
    public void setArmaId(Integer armaId) {
        this.armaId = armaId;
    }
}
