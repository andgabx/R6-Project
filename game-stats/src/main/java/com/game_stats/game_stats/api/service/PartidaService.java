package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.MapaResponseDTO;
import com.game_stats.game_stats.api.dto.ModoDeJogoResponseDTO;
import com.game_stats.game_stats.api.dto.PartidaRequestDTO;
import com.game_stats.game_stats.api.dto.PartidaResponseDTO;
import com.game_stats.game_stats.api.model.Mapa;
import com.game_stats.game_stats.api.model.ModoDeJogo;
import com.game_stats.game_stats.api.model.Partida;
import com.game_stats.game_stats.api.repository.PartidaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartidaService {

    private final PartidaRepository partidaRepository;
    private final MapaService mapaService;
    private final ModoDeJogoService modoDeJogoService;

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
        // valida FKs
        Mapa mapa = mapaService.buscarPorId(dto.getMapaId())
                .orElseThrow(() -> new RuntimeException("Mapa não encontrado"));
        ModoDeJogo modo = modoDeJogoService.buscarPorId(dto.getModoDeJogoId())
                .orElseThrow(() -> new RuntimeException("Modo de jogo não encontrado"));

        Partida partida = new Partida();
        partida.setResultado(dto.getResultado());
        partida.setMapaId(mapa.getIdMapa());
        partida.setModoDeJogoId(modo.getIdModoDeJogo());
        partida.setDataHora(dto.getDataHora());

        partidaRepository.save(partida);
    }

    public void atualizar(Integer id, PartidaRequestDTO dto) {
        partidaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));

        Mapa mapa = mapaService.buscarPorId(dto.getMapaId())
                .orElseThrow(() -> new RuntimeException("Mapa não encontrado"));
        ModoDeJogo modo = modoDeJogoService.buscarPorId(dto.getModoDeJogoId())
                .orElseThrow(() -> new RuntimeException("Modo de jogo não encontrado"));

        Partida partida = new Partida();
        partida.setIdPartida(id);
        partida.setResultado(dto.getResultado());
        partida.setMapaId(mapa.getIdMapa());
        partida.setModoDeJogoId(modo.getIdModoDeJogo());
        partida.setDataHora(dto.getDataHora());

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
        dto.setResultado(partida.getResultado());
        dto.setDataHora(partida.getDataHora());

        mapaService.buscarPorId(partida.getMapaId()).ifPresent(m -> {
            MapaResponseDTO mapaDto = new MapaResponseDTO();
            mapaDto.setIdMapa(m.getIdMapa());
            mapaDto.setNome(m.getNome());
            dto.setMapa(mapaDto);
        });

        modoDeJogoService.buscarPorId(partida.getModoDeJogoId()).ifPresent(m -> {
            ModoDeJogoResponseDTO modoDto = new ModoDeJogoResponseDTO();
            modoDto.setIdModoDeJogo(m.getIdModoDeJogo());
            modoDto.setNome(m.getNome());
            modoDto.setDescricao(m.getDescricao());
            modoDto.setTipo(m.getTipo());
            dto.setModoDeJogo(modoDto);
        });

        return dto;
    }
}