package com.game_stats.game_stats.api.dto;

import lombok.Data;
import java.util.List;

@Data
public class JogadorResponseDTO {
    private Integer idJogador;
    private String nickname;
    private DadosResponseDTO dados;
    private List<JogadorOperadorDTO> operadoresAtaque; // Adicionado
    private List<JogadorOperadorDTO> operadoresDefesa; // Adicionado
}