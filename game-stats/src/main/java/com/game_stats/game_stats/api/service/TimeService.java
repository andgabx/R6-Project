package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.JogadorResponseDTO;
import com.game_stats.game_stats.api.dto.TimeRequestDTO;
import com.game_stats.game_stats.api.dto.TimeResponseDTO;
import com.game_stats.game_stats.api.model.Jogador;
import com.game_stats.game_stats.api.model.Time;
import com.game_stats.game_stats.api.repository.JogadorRepository;
import com.game_stats.game_stats.api.repository.TimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimeService {

    private final TimeRepository timeRepository;
    private final JogadorRepository jogadorRepository;
    // 1. ADICIONADO JogadorService
    private final JogadorService jogadorService; 
    // 2. REMOVIDO DadosService (não é mais necessário aqui)
    // private final DadosService dadosService;

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
        Time novoTime = new Time();
        novoTime.setNome(dto.getNome());
        timeRepository.save(novoTime);

        // Esta busca pelo ID máximo é perigosa, mas mantida da sua lógica original.
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

        existente.setNome(dto.getNome());
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
        dto.setNome(time.getNome());

        // 3. CORRIGIDO: Agora usa o jogadorService para buscar o DTO completo
        List<JogadorResponseDTO> jogadores = timeRepository.findJogadoresByTimeId(time.getIdTime())
                .stream()
                .map(jogadorService::buscarPorId) // <- MUDANÇA PRINCIPAL
                .collect(Collectors.toList());

        dto.setJogadores(jogadores);
        return dto;
    }

    // 4. REMOVIDO: O método private toJogadorResponse foi removido
    // pois agora usamos o mapeamento completo do JogadorService.
}