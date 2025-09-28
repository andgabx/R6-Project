package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.JogadorRequestDTO;
import com.game_stats.game_stats.api.dto.JogadorResponseDTO;
import com.game_stats.game_stats.api.model.Jogador;
import com.game_stats.game_stats.api.service.DadosService;
import com.game_stats.game_stats.api.service.JogadorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/players")
@Tag(name = "Jogadores", description = "Operações dos Jogadores")

public class JogadorController {

    private final JogadorService jogadorService;
    private final DadosService dadosService;

    public JogadorController(JogadorService jogadorService, DadosService dadosService) {
        this.jogadorService = jogadorService;
        this.dadosService = dadosService;
    }

    @GetMapping
    public ResponseEntity<List<JogadorResponseDTO>> listarTodos() {
        List<Jogador> jogadores = jogadorService.listarTodos();
        List<JogadorResponseDTO> response = jogadores.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JogadorResponseDTO> buscarPorId(@PathVariable Integer id) {
        Optional<Jogador> jogador = jogadorService.buscarPorId(id);
        return jogador.map(value -> ResponseEntity.ok(toResponseDTO(value)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<JogadorResponseDTO> criarJogador(@Valid @RequestBody JogadorRequestDTO request) {
        Jogador jogador = toModel(request);
        Jogador criado = jogadorService.criarJogador(jogador);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponseDTO(criado));
    }

    @GetMapping("/minkd")
    @Operation(summary = "Listar jogadores com kd acima de um valor determinado - FUNCIONAL")
    public List<Jogador> listarPorKdMinimo(@RequestParam("kdMin") Double kdMinimo) {
        return jogadorService.listarPorKdMinimo(kdMinimo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JogadorResponseDTO> atualizarJogador(
            @PathVariable Integer id,
            @Valid @RequestBody JogadorRequestDTO request) {

        Jogador jogador = toModel(request);
        Jogador atualizado = jogadorService.atualizarJogador(id, jogador);
        return ResponseEntity.ok(toResponseDTO(atualizado));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta um jogador específico - AINDA EM DESENVOLVIMENTO")
    public ResponseEntity<Void> deletarJogador(@PathVariable Integer id) {
        jogadorService.deletarJogador(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/minwinrate")
    @Operation(summary = "Listar jogadores com winrate acima de um valor - FUNCIONAL")
    public List<Jogador> listarPorWinrate(
            @RequestParam("min") Double winrateMinimo) {
        return jogadorService.listarPorWinrateMinimo(winrateMinimo);
    }

    @GetMapping("/minlevel")
    @Operation(summary = "Listar jogadores com nível acima de um valor - FUNCIONAL")
    public List<JogadorResponseDTO> listarPorNivel(
            @RequestParam("min") Integer nivelMinimo) {
        return jogadorService.listarPorNivelMinimo(nivelMinimo);
    }



    // =======================================
    // Conversão para DTO com dados completos
    // =======================================
    private JogadorResponseDTO toResponseDTO(Jogador jogador) {
        JogadorResponseDTO dto = new JogadorResponseDTO();
        dto.setIdJogador(jogador.getIdJogador());
        dto.setNickname(jogador.getNickname());
        dto.setDadosId(jogador.getDadosId());

        // buscar as estatísticas na tabela Dados
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

    private Jogador toModel(JogadorRequestDTO dto) {
        Jogador jogador = new Jogador();
        jogador.setNickname(dto.getNickname());
        jogador.setDadosId(dto.getDadosId());
        return jogador;
    }
}