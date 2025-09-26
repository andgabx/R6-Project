package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.ArmaRequestDTO;
import com.game_stats.game_stats.api.dto.ArmaResponseDTO;
import com.game_stats.game_stats.api.service.ArmaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/armas")
@Tag(name = "Armas", description = "Operações de CRUD para armas")
@RequiredArgsConstructor
public class ArmaController {

    private final ArmaService service;

    @GetMapping
    @Operation(summary = "Listar todas as armas")
    public List<ArmaResponseDTO> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar arma por ID")
    public ArmaResponseDTO buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @Operation(summary = "Criar nova arma")
    public void criar(@RequestBody ArmaRequestDTO dto) {
        service.criar(dto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar arma existente")
    public void atualizar(@PathVariable Integer id, @RequestBody ArmaRequestDTO dto) {
        service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar arma")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}