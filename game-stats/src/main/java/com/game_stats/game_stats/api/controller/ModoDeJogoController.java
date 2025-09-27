package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.ModoDeJogoRequestDTO;
import com.game_stats.game_stats.api.dto.ModoDeJogoResponseDTO;
import com.game_stats.game_stats.api.model.ModoDeJogo;
import com.game_stats.game_stats.api.service.ModoDeJogoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/modos-de-jogo")
@Tag(name = "Modo de Jogo", description = "Operações que envolvam o modo de jogo")

public class ModoDeJogoController {

    private final ModoDeJogoService service;

    public ModoDeJogoController(ModoDeJogoService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Pegar todos os modos de jogo - FUNCIONAL")
    public List<ModoDeJogoResponseDTO> listarTodos() {
        return service.listarTodos()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Pegar um modo de jogo - FUNCIONAL")
    public ResponseEntity<ModoDeJogoResponseDTO> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(m -> ResponseEntity.ok(toResponse(m)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Criar um novo modo de jogo - FUNCIONAL")
    public ResponseEntity<ModoDeJogoResponseDTO> criar(@Valid @RequestBody ModoDeJogoRequestDTO dto) {
        ModoDeJogo novo = toModel(dto);
        ModoDeJogo criado = service.criar(novo);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(criado));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Editar um modo de jogo - FUNCIONAL")
    public ResponseEntity<ModoDeJogoResponseDTO> atualizar(@PathVariable Integer id,
                                                           @Valid @RequestBody ModoDeJogoRequestDTO dto) {
        ModoDeJogo atualizado = service.atualizar(id, toModel(dto));
        return ResponseEntity.ok(toResponse(atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    private ModoDeJogoResponseDTO toResponse(ModoDeJogo modo) {
        ModoDeJogoResponseDTO dto = new ModoDeJogoResponseDTO();
        dto.setIdModoDeJogo(modo.getIdModoDeJogo());
        dto.setNome(modo.getNome());
        dto.setDescricao(modo.getDescricao());
        dto.setTipo(modo.getTipo());
        return dto;
    }

    private ModoDeJogo toModel(ModoDeJogoRequestDTO dto) {
        ModoDeJogo modo = new ModoDeJogo();
        modo.setNome(dto.getNome());
        modo.setDescricao(dto.getDescricao());
        modo.setTipo(dto.getTipo());
        return modo;
    }
}