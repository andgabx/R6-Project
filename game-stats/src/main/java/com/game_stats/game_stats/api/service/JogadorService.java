package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.*;
import com.game_stats.game_stats.api.model.Dados;
import com.game_stats.game_stats.api.model.Jogador;
import com.game_stats.game_stats.api.repository.DadosRepository;
import com.game_stats.game_stats.api.repository.JogadorRepository;
import com.game_stats.game_stats.api.repository.MapaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JogadorService {

    private final JogadorRepository jogadorRepository;
    private final DadosRepository dadosRepository;
    private final MapaRepository mapaRepository;

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

    @Transactional
    public JogadorResponseDTO criarJogadorCompleto(JogadorRequestDTO request) {
        jogadorRepository.findByNickname(request.getNickname()).ifPresent(j -> {
            throw new IllegalArgumentException("Nickname já está em uso!");
        });

        // 1. Salvar os Dados
        Dados dados = toDadosModel(request.getDados());
        Integer dadosId = dadosRepository.saveAndReturnId(dados);

        // 2. Salvar o Jogador
        Jogador jogador = new Jogador();
        jogador.setNickname(request.getNickname());
        jogador.setDadosId(dadosId);
        Integer jogadorId = jogadorRepository.saveAndReturnId(jogador);

        // 3. Salvar associações de operadores
        if (request.getOperadoresAtaque() != null) {
            request.getOperadoresAtaque().forEach(op -> jogadorRepository.addOperadorAtaque(jogadorId, op));
        }
        if (request.getOperadoresDefesa() != null) {
            request.getOperadoresDefesa().forEach(op -> jogadorRepository.addOperadorDefesa(jogadorId, op));
        }

        return buscarPorId(jogadorId);
    }

    @Transactional
    public JogadorResponseDTO atualizarJogadorCompleto(Integer id, JogadorRequestDTO request) {
        Jogador jogadorExistente = jogadorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Jogador com ID " + id + " não encontrado."));
        
        // 1. Atualizar Dados
        Dados dados = toDadosModel(request.getDados());
        dados.setId(jogadorExistente.getDadosId());
        dadosRepository.update(dados);

        // 2. Atualizar Jogador
        jogadorExistente.setNickname(request.getNickname());
        jogadorRepository.update(jogadorExistente);

        // 3. Limpar e recriar associações de operadores
        jogadorRepository.clearOperadoresAtaque(id);
        if (request.getOperadoresAtaque() != null) {
            request.getOperadoresAtaque().forEach(op -> jogadorRepository.addOperadorAtaque(id, op));
        }

        jogadorRepository.clearOperadoresDefesa(id);
        if (request.getOperadoresDefesa() != null) {
            request.getOperadoresDefesa().forEach(op -> jogadorRepository.addOperadorDefesa(id, op));
        }
        
        return buscarPorId(id);
    }
    
    public void deletarJogador(Integer id) {
        jogadorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Jogador com ID " + id + " não encontrado."));
        jogadorRepository.delete(id);
    }
    // ... (métodos de listagem por filtro permanecem os mesmos) ...
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
                dadosDto.setPlataforma(dados.getPlataforma());
                dadosDto.setHorasJogadas(dados.getHorasJogadas());
                dadosDto.setMainRole(dados.getMainRole());
                dadosDto.setPreferenciaJogo(dados.getPreferenciaJogo());

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
        
        // NOVO TRECHO: Busca e adiciona os operadores de ataque e defesa
        List<JogadorOperadorDTO> operadoresAtaque = jogadorRepository.findOperadoresAtaqueByJogadorId(jogador.getIdJogador());
        jogadorDto.setOperadoresAtaque(operadoresAtaque);

        List<JogadorOperadorDTO> operadoresDefesa = jogadorRepository.findOperadoresDefesaByJogadorId(jogador.getIdJogador());
        jogadorDto.setOperadoresDefesa(operadoresDefesa);
        
        return jogadorDto;
    }

    private Dados toDadosModel(DadosJogadorRequestDTO dto) {
        Dados dados = new Dados();
        dados.setNivel(dto.getNivel());
        dados.setWinrate(dto.getWinrate());
        dados.setRankJogador(dto.getRankJogador());
        dados.setHeadshot(dto.getHeadshot());
        dados.setKd(dto.getKd());
        dados.setPlataforma(dto.getPlataforma());
        dados.setHorasJogadas(dto.getHorasJogadas());
        dados.setMainRole(dto.getMainRole());
        dados.setPreferenciaJogo(dto.getPreferenciaJogo());
        dados.setFkMapaFavorito(dto.getMapaFavoritoId());
        dados.setFkMapaMaisVitorias(dto.getMapaMaisVitoriasId());
        dados.setFkMapaMaisDerrotas(dto.getMapaMaisDerrotasId());
        return dados;
    }
}