package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.ParticipaRequestDTO;
import com.game_stats.game_stats.api.dto.ParticipaResponseDTO;
import com.game_stats.game_stats.api.service.ParticipaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participacoes")
@Tag(name = "Participações", description = "Gerenciamento do relacionamento Partida ↔ Time")
@RequiredArgsConstructor
public class ParticipaController {

    private final ParticipaService participaService;

    @GetMapping
    @Operation(summary = "Listar todos os vínculos Partida/Time")
    public List<ParticipaResponseDTO> listarTodos() {
        return participaService.listarTodos();
    }

    @GetMapping("/partida/{partidaId}/time/{timeId}")
    @Operation(summary = "Buscar um vínculo específico")
    public ResponseEntity<ParticipaResponseDTO> buscarPorIds(@PathVariable Integer partidaId,
                                                             @PathVariable Integer timeId) {
        return ResponseEntity.ok(participaService.buscarPorIds(partidaId, timeId));
    }

    @PostMapping
    @Operation(summary = "Criar um novo vínculo Partida/Time")
    public ResponseEntity<Void> criar(@Valid @RequestBody ParticipaRequestDTO dto) {
        participaService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/partida/{partidaId}/time/{timeId}")
    @Operation(summary = "Remover um vínculo existente")
    public ResponseEntity<Void> deletar(@PathVariable Integer partidaId,
                                        @PathVariable Integer timeId) {
        participaService.deletar(partidaId, timeId);
        return ResponseEntity.noContent().build();
    }
}