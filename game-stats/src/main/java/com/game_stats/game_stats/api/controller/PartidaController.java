package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.PartidaRequestDTO;
import com.game_stats.game_stats.api.dto.PartidaResponseDTO;
import com.game_stats.game_stats.api.service.PartidaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partidas")
@Tag(name = "Partidas", description = "Gerenciamento de partidas")
@RequiredArgsConstructor
public class PartidaController {

    private final PartidaService service;

    @GetMapping
    @Operation(summary = "Listar todas as partidas")
    public List<PartidaResponseDTO> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar partida por ID")
    public ResponseEntity<PartidaResponseDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    @Operation(summary = "Criar nova partida")
    public ResponseEntity<Void> criar(@Valid @RequestBody PartidaRequestDTO dto) {
        service.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar partida existente")
    public ResponseEntity<Void> atualizar(@PathVariable Integer id,
                                          @Valid @RequestBody PartidaRequestDTO dto) {
        service.atualizar(id, dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar partida")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}