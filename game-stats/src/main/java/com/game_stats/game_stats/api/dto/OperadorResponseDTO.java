package com.game_stats.game_stats.api.dto;

import lombok.Data;
import java.util.List;

@Data
public class OperadorResponseDTO {
    private Integer idOperador;
    private String nome;
    private String funcao;
    private List<ArmaResponseDTO> armas; // Modificado para ser uma lista
    private HabilidadesDTO habilidades;
}