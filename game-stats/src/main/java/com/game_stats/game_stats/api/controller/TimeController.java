package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.TimeRequestDTO;
import com.game_stats.game_stats.api.dto.TimeResponseDTO;
import com.game_stats.game_stats.api.service.TimeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@Tag(name = "Times", description = "Gerenciamento de times e seus jogadores")
@RequiredArgsConstructor
public class TimeController {

    private final TimeService timeService;

    @GetMapping
    @Operation(summary = "Listar todos os times")
    public List<TimeResponseDTO> listarTodos() {
        return timeService.listarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar um time por ID")
    public ResponseEntity<TimeResponseDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(timeService.buscarPorId(id));
    }

    @PostMapping
    @Operation(summary = "Criar um novo time")
    public ResponseEntity<TimeResponseDTO> criar(@Valid @RequestBody TimeRequestDTO dto) {
        TimeResponseDTO criado = timeService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um time existente")
    public ResponseEntity<TimeResponseDTO> atualizar(@PathVariable Integer id,
                                                     @Valid @RequestBody TimeRequestDTO dto) {
        TimeResponseDTO atualizado = timeService.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remover um time")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        timeService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}