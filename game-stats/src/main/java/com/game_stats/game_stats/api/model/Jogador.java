package com.game_stats.game_stats.api.model;

import lombok.Data;

@Data
public class Jogador {
    private Integer idJogador;   // mapeia ID_Jogador
    private String nickname;     // mapeia Nickname
    private Integer dadosId;     // mapeia fk_Dados_Dados_PK_INT
}