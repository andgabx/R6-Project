package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.JogadorRequestDTO;
import com.game_stats.game_stats.api.dto.JogadorResponseDTO;
import com.game_stats.game_stats.api.model.Jogador;
import com.game_stats.game_stats.api.service.JogadorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jogadores")
public class JogadorController {

    private final JogadorService service;

    public JogadorController(JogadorService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<JogadorResponseDTO>> listarTodos() {
        List<Jogador> jogadores = service.listarTodos();
        List<JogadorResponseDTO> response = jogadores.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JogadorResponseDTO> buscarPorId(@PathVariable Integer id) {
        Optional<Jogador> jogador = service.buscarPorId(id);
        if (jogador.isPresent()) {
            return ResponseEntity.ok(toResponseDTO(jogador.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<JogadorResponseDTO> criarJogador(@Valid @RequestBody JogadorRequestDTO request) {
        Jogador jogador = toModel(request);
        Jogador criado = service.criarJogador(jogador);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponseDTO(criado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JogadorResponseDTO> atualizarJogador(
            @PathVariable Integer id,
            @Valid @RequestBody JogadorRequestDTO request) {
        Jogador jogador = toModel(request);
        Jogador atualizado = service.atualizarJogador(id, jogador);
        return ResponseEntity.ok(toResponseDTO(atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarJogador(@PathVariable Integer id) {
        service.deletarJogador(id);
        return ResponseEntity.noContent().build();
    }

    // Métodos auxiliares para conversão
    private JogadorResponseDTO toResponseDTO(Jogador jogador) {
        JogadorResponseDTO dto = new JogadorResponseDTO();
        dto.setId(jogador.getIdJogador());
        dto.setNickname(jogador.getNickname());
        dto.setDadosId(jogador.getDadosId());
        return dto;
    }

    private Jogador toModel(JogadorRequestDTO dto) {
        Jogador jogador = new Jogador();
        jogador.setNickname(dto.getNickname());
        jogador.setDadosId(dto.getDadosId());
        return jogador;
    }
}