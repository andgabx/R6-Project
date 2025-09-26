package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.JogadorResponseDTO;
import com.game_stats.game_stats.api.dto.OperadorResponseDTO;
import com.game_stats.game_stats.api.dto.PartidaRequestDTO;
import com.game_stats.game_stats.api.dto.PartidaResponseDTO;
import com.game_stats.game_stats.api.model.Partida;
import com.game_stats.game_stats.api.repository.JogadorRepository;
import com.game_stats.game_stats.api.repository.OperadorRepository;
import com.game_stats.game_stats.api.repository.PartidaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartidaService {
    private final PartidaRepository partidaRepository;
    private final JogadorRepository jogadorRepository;
    private final OperadorRepository operadorRepository;

    public List<PartidaResponseDTO> listarTodas() {
        return partidaRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public PartidaResponseDTO buscarPorId(Integer id) {
        Partida partida = partidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));
        return toResponse(partida);
    }

    public void criar(PartidaRequestDTO dto) {
        // validar FK Jogador
        jogadorRepository.findById(dto.getJogadorId())
                .orElseThrow(() -> new RuntimeException("Jogador não encontrado"));
        // validar FK Operador
        operadorRepository.findById(dto.getOperadorId())
                .orElseThrow(() -> new RuntimeException("Operador não encontrado"));

        Partida partida = new Partida();
        partida.setJogadorId(dto.getJogadorId());
        partida.setOperadorId(dto.getOperadorId());
        partida.setKills(dto.getKills());
        partida.setDeaths(dto.getDeaths());
        partida.setVitoria(dto.getVitoria());
        partida.setDataPartida(LocalDateTime.now());
        partidaRepository.save(partida);
    }

    public void atualizar(Integer id, PartidaRequestDTO dto) {
        partidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));

        Partida partida = new Partida();
        partida.setIdPartida(id);
        partida.setJogadorId(dto.getJogadorId());
        partida.setOperadorId(dto.getOperadorId());
        partida.setKills(dto.getKills());
        partida.setDeaths(dto.getDeaths());
        partida.setVitoria(dto.getVitoria());
        partidaRepository.update(partida);
    }

    public void deletar(Integer id) {
        partidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));
        partidaRepository.delete(id);
    }

    private PartidaResponseDTO toResponse(Partida partida) {
        PartidaResponseDTO dto = new PartidaResponseDTO();
        dto.setIdPartida(partida.getIdPartida());
        dto.setKills(partida.getKills());
        dto.setDeaths(partida.getDeaths());
        dto.setVitoria(partida.getVitoria());
        dto.setDataPartida(partida.getDataPartida());

        // Jogador
        jogadorRepository.findById(partida.getJogadorId()).ifPresent(j -> {
            JogadorResponseDTO jr = new JogadorResponseDTO();
            jr.setIdJogador(j.getIdJogador());
            jr.setNickname(j.getNickname());
            jr.setRankJogador((String) j.getRankJogador());
            dto.setJogador(jr);
        });

        // Operador
        operadorRepository.findById(partida.getOperadorId()).ifPresent(o -> {
            OperadorResponseDTO or = new OperadorResponseDTO();
            or.setIdOperador(o.getIdOperador());
            or.setNome(o.getNome());
            or.setFuncao(o.getFuncao());
            dto.setOperador(or);
        });

        return dto;
    }
}