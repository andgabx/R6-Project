package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.DadosResponseDTO;
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
    // Removido PartidaRepository, não é usado aqui
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
        // A lógica de Partida não pertence à criação de um Time
        // Um Time existe independentemente de uma Partida
        
        Time novoTime = new Time();
        novoTime.setNome(dto.getNome()); // Assumindo que TimeRequestDTO terá 'nome'
        timeRepository.save(novoTime);

        // Esta busca pelo ID máximo é perigosa e pode falhar em produção.
        // O ideal era o save() do repository retornar o ID.
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

        // A lógica de Partida também não pertence aqui
        existente.setNome(dto.getNome()); // Assumindo que TimeRequestDTO terá 'nome'
        timeRepository.update(existente);

        timeRepository.clearJogadores(id);
        if (dto.getJogadorIds() != null && !dto.getJogadorIds().isEmpty()) {
            vincularJogadores(id, dto.getJogadorIds());
        }

        return buscarPorId(id);
    }

    public void deletar(Integer id) {
        // ... (seu método deletar está correto)
        timeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Time não encontrado"));

        timeRepository.clearJogadores(id);
        timeRepository.delete(id);
    }

    private void vincularJogadores(Integer timeId, List<Integer> jogadorIds) {
        // ... (seu método vincularJogadores está correto)
        for (Integer jogadorId : jogadorIds) {
            Jogador jogador = jogadorRepository.findById(jogadorId)
                    .orElseThrow(() -> new RuntimeException("Jogador ID " + jogadorId + " não encontrado"));
            timeRepository.addJogador(timeId, jogador.getIdJogador());
        }
    }

    private TimeResponseDTO toResponse(Time time) {
        TimeResponseDTO dto = new TimeResponseDTO();
        dto.setIdTime(time.getIdTime());
        dto.setNome(time.getNome()); // Corrigido de getPartidaId()

        List<JogadorResponseDTO> jogadores = timeRepository.findJogadoresByTimeId(time.getIdTime())
                .stream()
                .map(jogadorRepository::findById)
                .flatMap(Optional::stream)
                .map(this::toJogadorResponse)
                .collect(Collectors.toList());

        dto.setJogadores(jogadores);
        return dto;
    }

    private JogadorResponseDTO toJogadorResponse(Jogador jogador) {
        // ... (seu método toJogadorResponse está correto)
        JogadorResponseDTO dto = new JogadorResponseDTO();
        dto.setIdJogador(jogador.getIdJogador());
        dto.setNickname(jogador.getNickname());

        if (jogador.getDadosId() != null) {
            dadosService.buscarPorId(jogador.getDadosId()).ifPresent(d -> {
                DadosResponseDTO dadosDTO = new DadosResponseDTO();
                dadosDTO.setId(d.getId());
                dadosDTO.setNivel(d.getNivel());
                dadosDTO.setWinrate(d.getWinrate());
                dadosDTO.setRankJogador(d.getRankJogador());
                dadosDTO.setHeadshot(d.getHeadshot());
                dadosDTO.setKd(d.getKd());
                dto.setDados(dadosDTO);
            });
        }

        return dto;
    }
}