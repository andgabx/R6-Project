package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.ArmaResponseDTO;
import com.game_stats.game_stats.api.dto.OperadorRequestDTO;
import com.game_stats.game_stats.api.dto.OperadorResponseDTO;
import com.game_stats.game_stats.api.model.Operador;
import com.game_stats.game_stats.api.repository.ArmaRepository;
import com.game_stats.game_stats.api.repository.OperadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
        // Validar se a arma existe
        if (dto.getArmaId() != null) {
            armaRepository.findById(dto.getArmaId())
                    .orElseThrow(() -> new RuntimeException("Arma não encontrada"));
        }

        Operador operador = new Operador();
        operador.setNome(dto.getNome());
        operador.setFuncao(dto.getFuncao());
        operador.setArmaId(dto.getArmaId());
        operadorRepository.save(operador);
    }

    public void atualizar(Integer id, OperadorRequestDTO dto) {
        // Validar se o operador existe
        operadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operador não encontrado"));

        // Validar se a arma existe
        if (dto.getArmaId() != null) {
            armaRepository.findById(dto.getArmaId())
                    .orElseThrow(() -> new RuntimeException("Arma não encontrada"));
        }

        Operador operador = new Operador();
        operador.setIdOperador(id);
        operador.setNome(dto.getNome());
        operador.setFuncao(dto.getFuncao());
        operador.setArmaId(dto.getArmaId());
        operadorRepository.update(operador);
    }

    public void deletar(Integer id) {
        // Validar se o operador existe
        operadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operador não encontrado"));

        operadorRepository.delete(id);
    }

    private OperadorResponseDTO toResponse(Operador operador) {
        OperadorResponseDTO dto = new OperadorResponseDTO();
        dto.setIdOperador(operador.getIdOperador());
        dto.setNome(operador.getNome());
        dto.setFuncao(operador.getFuncao());

        // Buscar arma associada
        if (operador.getArmaId() != null) {
            armaRepository.findById(operador.getArmaId()).ifPresent(arma -> {
                ArmaResponseDTO armaDto = new ArmaResponseDTO();
                armaDto.setIdArma(arma.getIdArma());
                armaDto.setNome(arma.getNome());
                armaDto.setTipo(arma.getTipo());
                armaDto.setDano(arma.getDano());
                dto.setArma(armaDto);
            });
        }

        return dto;
    }
}