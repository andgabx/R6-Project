package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.DadosResponseDTO;
import com.game_stats.game_stats.api.dto.JogadorResponseDTO;
import com.game_stats.game_stats.api.dto.MapaResponseDTO;
import com.game_stats.game_stats.api.model.Jogador;
import com.game_stats.game_stats.api.repository.DadosRepository;
import com.game_stats.game_stats.api.repository.JogadorRepository;
import com.game_stats.game_stats.api.repository.MapaRepository; // Importar o repositório de Mapa
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JogadorService {

    private final JogadorRepository jogadorRepository;
    private final DadosRepository dadosRepository;
    private final MapaRepository mapaRepository; // Adicionar a injeção do MapaRepository

    public List<JogadorResponseDTO> listarTodos() {
        return jogadorRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public JogadorResponseDTO buscarPorId(Integer id) {
        Jogador jogador = jogadorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Jogador com ID " + id + " não encontrado."));
        return toResponse(jogador);
    }

    public JogadorResponseDTO criarJogador(Jogador jogador) {
        jogadorRepository.findByNickname(jogador.getNickname()).ifPresent(j -> {
            throw new IllegalArgumentException("Nickname já está em uso!");
        });
        jogadorRepository.save(jogador);
        Jogador jogadorSalvo = jogadorRepository.findByNickname(jogador.getNickname())
                .orElseThrow(() -> new RuntimeException("Erro ao buscar jogador recém-criado."));
        return toResponse(jogadorSalvo);
    }

    public JogadorResponseDTO atualizarJogador(Integer id, Jogador jogador) {
        jogadorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Jogador com ID " + id + " não encontrado."));
        jogadorRepository.findByNickname(jogador.getNickname()).ifPresent(j -> {
            if (!j.getIdJogador().equals(id)) {
                throw new IllegalArgumentException("Já existe outro jogador com esse nickname.");
            }
        });
        jogador.setIdJogador(id);
        jogadorRepository.update(jogador);
        Jogador jogadorAtualizado = jogadorRepository.findById(id).orElseThrow();
        return toResponse(jogadorAtualizado);
    }

    public void deletarJogador(Integer id) {
        jogadorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Jogador com ID " + id + " não encontrado."));
        jogadorRepository.delete(id);
    }

    public List<JogadorResponseDTO> listarPorKdMinimo(Double kdMinimo) {
        return jogadorRepository.findByKdGreaterThan(kdMinimo).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<JogadorResponseDTO> listarPorWinrateMinimo(Double winrateMinimo) {
        return jogadorRepository.findByWinrateGreaterThan(winrateMinimo).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<JogadorResponseDTO> listarPorNivelMinimo(Integer nivelMinimo) {
        return jogadorRepository.findByNivelGreaterThan(nivelMinimo).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // =======================================================
    // MÉTODO HELPER ATUALIZADO E COMPLETO
    // =======================================================
    private JogadorResponseDTO toResponse(Jogador jogador) {
        JogadorResponseDTO jogadorDto = new JogadorResponseDTO();
        jogadorDto.setIdJogador(jogador.getIdJogador());
        jogadorDto.setNickname(jogador.getNickname());

        if (jogador.getDadosId() != null) {
            dadosRepository.findById(jogador.getDadosId()).ifPresent(dados -> {
                DadosResponseDTO dadosDto = new DadosResponseDTO();
                dadosDto.setId(dados.getId());
                dadosDto.setNivel(dados.getNivel());
                dadosDto.setWinrate(dados.getWinrate());
                dadosDto.setRankJogador(dados.getRankJogador());
                dadosDto.setHeadshot(dados.getHeadshot());
                dadosDto.setKd(dados.getKd());
                // --- Mapeamento dos novos campos ---
                dadosDto.setPlataforma(dados.getPlataforma());
                dadosDto.setHorasJogadas(dados.getHorasJogadas());
                dadosDto.setMainRole(dados.getMainRole());
                dadosDto.setPreferenciaJogo(dados.getPreferenciaJogo());

                // --- Mapeamento dos Mapas Aninhados ---
                if (dados.getFkMapaFavorito() != null) {
                    mapaRepository.findById(dados.getFkMapaFavorito()).ifPresent(mapa -> {
                        MapaResponseDTO mapaDto = new MapaResponseDTO();
                        mapaDto.setIdMapa(mapa.getIdMapa());
                        mapaDto.setNome(mapa.getNome());
                        dadosDto.setMapaFavorito(mapaDto);
                    });
                }
                if (dados.getFkMapaMaisVitorias() != null) {
                    mapaRepository.findById(dados.getFkMapaMaisVitorias()).ifPresent(mapa -> {
                        MapaResponseDTO mapaDto = new MapaResponseDTO();
                        mapaDto.setIdMapa(mapa.getIdMapa());
                        mapaDto.setNome(mapa.getNome());
                        dadosDto.setMapaMaisVitorias(mapaDto);
                    });
                }
                if (dados.getFkMapaMaisDerrotas() != null) {
                    mapaRepository.findById(dados.getFkMapaMaisDerrotas()).ifPresent(mapa -> {
                        MapaResponseDTO mapaDto = new MapaResponseDTO();
                        mapaDto.setIdMapa(mapa.getIdMapa());
                        mapaDto.setNome(mapa.getNome());
                        dadosDto.setMapaMaisDerrotas(mapaDto);
                    });
                }

                jogadorDto.setDados(dadosDto);
            });
        }
        return jogadorDto;
    }
}