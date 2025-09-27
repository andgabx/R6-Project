package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.DadosRequestDTO;
import com.game_stats.game_stats.api.dto.DadosResponseDTO;
import com.game_stats.game_stats.api.model.Dados;
import com.game_stats.game_stats.api.service.DadosService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/data")
public class DadosController {

    private final DadosService service;

    public DadosController(DadosService service) {
        this.service = service;
    }

    @GetMapping
    public List<DadosResponseDTO> listarTodos() {
        return service.listarTodos()
                .stream().map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosResponseDTO> buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id)
                .map(d -> ResponseEntity.ok(toResponseDTO(d)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DadosResponseDTO> criar(@Valid @RequestBody DadosRequestDTO dto) {
        Dados novo = service.criar(toModel(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponseDTO(novo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DadosResponseDTO> atualizar(@PathVariable Integer id, @Valid @RequestBody DadosRequestDTO dto) {
        Dados atualizado = service.atualizar(id, toModel(dto));
        return ResponseEntity.ok(toResponseDTO(atualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // =================== Mapper ===================
    private DadosResponseDTO toResponseDTO(Dados dados) {
        DadosResponseDTO dto = new DadosResponseDTO();
        dto.setId(dados.getId());
        dto.setNivel(dados.getNivel());
        dto.setWinrate(dados.getWinrate());
        dto.setRankJogador(dados.getRankJogador());
        dto.setHeadshot(dados.getHeadshot());
        dto.setKd(dados.getKd());
        return dto;
    }

    private Dados toModel(DadosRequestDTO dto) {
        Dados d = new Dados();
        d.setNivel(dto.getNivel());
        d.setWinrate(dto.getWinrate());
        d.setRankJogador(dto.getRankJogador());
        d.setHeadshot(dto.getHeadshot());
        d.setKd(dto.getKd());
        return d;
    }
}