package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.*;
import com.game_stats.game_stats.api.model.Arma;
import com.game_stats.game_stats.api.model.Operador;
import com.game_stats.game_stats.api.repository.ArmaRepository;
import com.game_stats.game_stats.api.repository.OperadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OperadorService {
    private final OperadorRepository operadorRepository;
    private final ArmaRepository armaRepository;

    public List<OperadorResponseDTO> listarTodos() {
        return operadorRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public OperadorResponseDTO buscarPorId(Integer id) {
        Operador operador = operadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operador não encontrado"));
        return toResponse(operador);
    }

    public void criar(OperadorRequestDTO dto) {
        Operador operador = new Operador();
        operador.setNome(dto.getNome());
        // A função não é mais um campo direto, ela é determinada pela existência
        // do operador nas tabelas de Ataque ou Defesa
        operadorRepository.save(operador);
    }

    public void atualizar(Integer id, OperadorRequestDTO dto) {
        operadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operador não encontrado"));

        Operador operador = new Operador();
        operador.setIdOperador(id);
        operador.setNome(dto.getNome());
        operadorRepository.update(operador);
    }

    public void deletar(Integer id) {
        operadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operador não encontrado"));

        operadorRepository.delete(id);
    }

    private OperadorResponseDTO toResponse(Operador operador) {
        OperadorResponseDTO dto = new OperadorResponseDTO();
        dto.setIdOperador(operador.getIdOperador());
        dto.setNome(operador.getNome());

        // Lógica para determinar a função e buscar as armas
        armaRepository.findArmasByOperadorId(operador.getIdOperador()).forEach(arma -> {
            ArmaResponseDTO armaDto = new ArmaResponseDTO();
            armaDto.setIdArma(arma.getIdArma());
            armaDto.setNome(arma.getNome());
            armaDto.setTipo(arma.getTipo());
            armaDto.setDano(arma.getDano());
            dto.setArma(armaDto); // Nota: Isto irá sobrescrever, idealmente seria uma lista de armas
        });


        return dto;
    }

    public List<OperadorPopularidadeDTO> getTop5PopularAttackOperators() {
        return operadorRepository.findTop5PopularAttackOperators();
    }

    public Optional<MelhorJogadorDTO> getBestPlayerForAttackOperator(String operatorName) {
        if (operatorName == null || operatorName.trim().isEmpty()) {
            return Optional.empty();
        }
        return operadorRepository.findBestPlayerForAttackOperator(operatorName);
    }
}