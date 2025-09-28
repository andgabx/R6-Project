package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.DadosResponseDTO;
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
        List<JogadorResponseDTO> jogadores = jogadorService.listarTodos();
        return ResponseEntity.ok(jogadores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JogadorResponseDTO> buscarPorId(@PathVariable Integer id) {
        Optional<JogadorResponseDTO> jogador = Optional.ofNullable(jogadorService.buscarPorId(id));
        return jogador.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<JogadorResponseDTO> criarJogador(@Valid @RequestBody JogadorRequestDTO request) {
        Jogador jogador = toModel(request);
        JogadorResponseDTO criado = jogadorService.criarJogador(jogador);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @GetMapping("/minkd")
    @Operation(summary = "Listar jogadores com kd acima de um valor determinado - FUNCIONAL")
    public List<JogadorResponseDTO> listarPorKdMinimo(@RequestParam("kdMin") Double kdMinimo) {
        return jogadorService.listarPorKdMinimo(kdMinimo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JogadorResponseDTO> atualizarJogador(
            @PathVariable Integer id,
            @Valid @RequestBody JogadorRequestDTO request) {

        Jogador jogador = toModel(request);
        JogadorResponseDTO atualizado = jogadorService.atualizarJogador(id, jogador);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleta um jogador específico - AINDA EM DESENVOLVIMENTO")
    public ResponseEntity<Void> deletarJogador(@PathVariable Integer id) {
        jogadorService.deletarJogador(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/minwinrate")
    @Operation(summary = "Listar jogadores com winrate acima de um valor - FUNCIONAL")
    public List<JogadorResponseDTO> listarPorWinrate(
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

        // buscar as estatísticas na tabela Dados
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

    private Jogador toModel(JogadorRequestDTO dto) {
        Jogador jogador = new Jogador();
        jogador.setNickname(dto.getNickname());
        jogador.setDadosId(dto.getDadosId());
        return jogador;
    }
}
