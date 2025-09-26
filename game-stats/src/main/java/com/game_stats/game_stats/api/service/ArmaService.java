package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.ArmaRequestDTO;
import com.game_stats.game_stats.api.dto.ArmaResponseDTO;
import com.game_stats.game_stats.api.model.Arma;
import com.game_stats.game_stats.api.repository.ArmaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArmaService {

    private final ArmaRepository repository;

    public List<ArmaResponseDTO> listarTodas() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ArmaResponseDTO buscarPorId(Integer id) {
        Arma arma = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Arma não encontrada"));
        return toResponse(arma);
    }

    public void criar(ArmaRequestDTO dto) {
        Arma arma = new Arma();
        arma.setNome(dto.getNome());
        arma.setTipo(dto.getTipo());
        arma.setDano(dto.getDano());
        repository.save(arma);
    }

    public void atualizar(Integer id, ArmaRequestDTO dto) {
        // Validar se a arma existe
        repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Arma não encontrada"));

        Arma arma = new Arma();
        arma.setIdArma(id);
        arma.setNome(dto.getNome());
        arma.setTipo(dto.getTipo());
        arma.setDano(dto.getDano());
        repository.update(arma);
    }

    public void deletar(Integer id) {
        // Validar se a arma existe
        repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Arma não encontrada"));

        repository.delete(id);
    }

    private ArmaResponseDTO toResponse(Arma arma) {
        ArmaResponseDTO r = new ArmaResponseDTO();
        r.setIdArma(arma.getIdArma());
        r.setNome(arma.getNome());
        r.setTipo(arma.getTipo());
        r.setDano(arma.getDano());
        return r;
    }
}