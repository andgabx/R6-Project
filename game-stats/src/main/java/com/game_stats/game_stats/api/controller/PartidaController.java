package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.PartidaRequestDTO;
import com.game_stats.game_stats.api.dto.PartidaResponseDTO;
import com.game_stats.game_stats.api.service.PartidaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partidas")
@Tag(name = "Partidas", description = "Gerenciamento de partidas e estatísticas")
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
    public PartidaResponseDTO buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @Operation(summary = "Criar nova partida")
    public void criar(@RequestBody PartidaRequestDTO dto) {
        service.criar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar partida existente")
    public void atualizar(@PathVariable Integer id, @RequestBody PartidaRequestDTO dto) {
        service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar partida")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}