package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.ParticipaRequestDTO;
import com.game_stats.game_stats.api.dto.ParticipaResponseDTO;
import com.game_stats.game_stats.api.model.Partida;
import com.game_stats.game_stats.api.model.Participa;
import com.game_stats.game_stats.api.model.Time;
import com.game_stats.game_stats.api.repository.PartidaRepository;
import com.game_stats.game_stats.api.repository.ParticipaRepository;
import com.game_stats.game_stats.api.repository.TimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParticipaService {

    private final ParticipaRepository participaRepository;
    private final PartidaRepository partidaRepository;
    private final TimeRepository timeRepository;

    public List<ParticipaResponseDTO> listarTodos() {
        return participaRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ParticipaResponseDTO buscarPorIds(Integer partidaId, Integer timeId) {
        Participa participa = participaRepository.findByIds(partidaId, timeId)
                .orElseThrow(() -> new RuntimeException("Relacionamento Partida/Time não encontrado"));
        return toResponse(participa);
    }

    public void criar(ParticipaRequestDTO dto) {
        Partida partida = partidaRepository.findById(dto.getPartidaId())
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));

        Time time = timeRepository.findById(dto.getTimeId())
                .orElseThrow(() -> new RuntimeException("Time não encontrado"));

        participaRepository.save(toEntity(partida.getIdPartida(), time.getIdTime()));
    }

    public void deletar(Integer partidaId, Integer timeId) {
        participaRepository.findByIds(partidaId, timeId)
                .orElseThrow(() -> new RuntimeException("Relacionamento Partida/Time não encontrado"));

        participaRepository.delete(partidaId, timeId);
    }

    private Participa toEntity(Integer partidaId, Integer timeId) {
        Participa participa = new Participa();
        participa.setPartidaId(partidaId);
        participa.setTimeId(timeId);
        return participa;
    }

    private ParticipaResponseDTO toResponse(Participa participa) {
        ParticipaResponseDTO dto = new ParticipaResponseDTO();
        dto.setPartidaId(participa.getPartidaId());
        dto.setTimeId(participa.getTimeId());
        return dto;
    }
}