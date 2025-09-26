package com.game_stats.game_stats.api.dto;

public class OperadorResponseDTO {
    private Integer idOperador;
    private String nome;
    private String funcao;
    private Integer armaId;

    public OperadorResponseDTO(Integer idOperador, String nome, String funcao, Integer armaId) {
        this.idOperador = idOperador;
        this.nome = nome;
        this.funcao = funcao;
        this.armaId = armaId;
    }

    public Integer getIdOperador() { return idOperador; }
    public String getNome() { return nome; }
    public String getFuncao() { return funcao; }
    public Integer getArmaId() { return armaId; }
}
