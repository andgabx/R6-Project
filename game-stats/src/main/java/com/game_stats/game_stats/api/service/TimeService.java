package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.JogadorResponseDTO;
import com.game_stats.game_stats.api.dto.TimeRequestDTO;
import com.game_stats.game_stats.api.dto.TimeResponseDTO;
import com.game_stats.game_stats.api.model.Jogador;
import com.game_stats.game_stats.api.model.Partida;
import com.game_stats.game_stats.api.model.Time;
import com.game_stats.game_stats.api.repository.JogadorRepository;
import com.game_stats.game_stats.api.repository.PartidaRepository;
import com.game_stats.game_stats.api.repository.TimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimeService {

    private final TimeRepository timeRepository;
    private final PartidaRepository partidaRepository;
    private final JogadorRepository jogadorRepository;
    private final DadosService dadosService;

    public List<TimeResponseDTO> listarTodos() {
        return timeRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public TimeResponseDTO buscarPorId(Integer id) {
        Time time = timeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Time não encontrado"));
        return toResponse(time);
    }

    public TimeResponseDTO criar(TimeRequestDTO dto) {
        Partida partida = partidaRepository.findById(dto.getPartidaId())
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));

        Time novoTime = new Time();
        novoTime.setPartidaId(partida.getIdPartida());
        timeRepository.save(novoTime);

        Integer novoId = timeRepository.findAll().stream()
                .map(Time::getIdTime)
                .max(Comparator.naturalOrder())
                .orElseThrow(() -> new RuntimeException("Falha ao localizar time recém-criado"));

        if (dto.getJogadorIds() != null && !dto.getJogadorIds().isEmpty()) {
            vincularJogadores(novoId, dto.getJogadorIds());
        }

        return buscarPorId(novoId);
    }

    public TimeResponseDTO atualizar(Integer id, TimeRequestDTO dto) {
        Time existente = timeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Time não encontrado"));

        partidaRepository.findById(dto.getPartidaId())
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));

        existente.setPartidaId(dto.getPartidaId());
        timeRepository.update(existente);

        timeRepository.clearJogadores(id);
        if (dto.getJogadorIds() != null && !dto.getJogadorIds().isEmpty()) {
            vincularJogadores(id, dto.getJogadorIds());
        }

        return buscarPorId(id);
    }

    public void deletar(Integer id) {
        timeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Time não encontrado"));

        timeRepository.clearJogadores(id);
        timeRepository.delete(id);
    }

    private void vincularJogadores(Integer timeId, List<Integer> jogadorIds) {
        for (Integer jogadorId : jogadorIds) {
            Jogador jogador = jogadorRepository.findById(jogadorId)
                    .orElseThrow(() -> new RuntimeException("Jogador ID " + jogadorId + " não encontrado"));
            timeRepository.addJogador(timeId, jogador.getIdJogador());
        }
    }

    private TimeResponseDTO toResponse(Time time) {
        TimeResponseDTO dto = new TimeResponseDTO();
        dto.setIdTime(time.getIdTime());
        dto.setPartidaId(time.getPartidaId());

        List<JogadorResponseDTO> jogadores = timeRepository.findJogadoresByTimeId(time.getIdTime())
                .stream()
                .map(jogadorRepository::findById)   // Optional<Jogador>
                .flatMap(Optional::stream)          // Jogador
                .map(this::toJogadorResponse)       // JogadorResponseDTO
                .collect(Collectors.toList());

        dto.setJogadores(jogadores);
        return dto;
    }

    private JogadorResponseDTO toJogadorResponse(Jogador jogador) {
        JogadorResponseDTO dto = new JogadorResponseDTO();
        dto.setIdJogador(jogador.getIdJogador());
        dto.setNickname(jogador.getNickname());
        dto.setDadosId(jogador.getDadosId());

        if (jogador.getDadosId() != null) {
            dadosService.buscarPorId(jogador.getDadosId()).ifPresent(d -> {
                dto.setNivel(d.getNivel());
                dto.setWinrate(d.getWinrate());
                dto.setRankJogador(d.getRankJogador());
                dto.setHeadshot(d.getHeadshot());
                dto.setKd(d.getKd());
            });
        }

        return dto;
    }
}