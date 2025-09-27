package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.MapaRequestDTO;
import com.game_stats.game_stats.api.dto.MapaResponseDTO;
import com.game_stats.game_stats.api.model.Mapa;
import com.game_stats.game_stats.api.service.MapaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/maps")
@Tag(name = "Mapa", description = "Operações relacionadas aos mapas do jogo")
public class MapaController {

    private final MapaService service;

    public MapaController(MapaService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Lista todos os mapas")
    public List<MapaResponseDTO> listarTodos() {
        return service.listarTodos()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca um mapa específico")
    public ResponseEntity<MapaResponseDTO> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(m -> ResponseEntity.ok(toResponse(m)))
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/mapas -> criar novo
    @PostMapping
    @Operation(summary = "Cria um mapa novo")
    public ResponseEntity<MapaResponseDTO> criar(@Valid @RequestBody MapaRequestDTO dto) {
        Mapa novo = toModel(dto);
        Mapa criado = service.criar(novo);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(criado));
    }

    // PUT /api/mapas/{id} -> atualizar
    @PutMapping("/{id}")
    @Operation(summary = "Atualiza os dados de um mapa existente")
    public ResponseEntity<MapaResponseDTO> atualizar(@PathVariable Integer id,
                                                     @Valid @RequestBody MapaRequestDTO dto) {
        Mapa atualizado = service.atualizar(id, toModel(dto));
        return ResponseEntity.ok(toResponse(atualizado));
    }

    // DELETE /api/mapas/{id} -> deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // ============================
    // MÉTODOS AUXILIARES
    // ============================
    private MapaResponseDTO toResponse(Mapa mapa) {
        MapaResponseDTO dto = new MapaResponseDTO();
        dto.setIdMapa(mapa.getIdMapa());
        dto.setNome(mapa.getNome());
        return dto;
    }

    private Mapa toModel(MapaRequestDTO dto) {
        Mapa mapa = new Mapa();
        mapa.setNome(dto.getNome());
        return mapa;
    }
}