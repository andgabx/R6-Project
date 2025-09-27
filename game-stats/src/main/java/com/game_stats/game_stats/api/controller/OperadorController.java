package com.game_stats.game_stats.api.controller;

import com.game_stats.game_stats.api.dto.OperadorRequestDTO;
import com.game_stats.game_stats.api.dto.OperadorResponseDTO;
import com.game_stats.game_stats.api.service.OperadorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operadores")
@Tag(name = "Operadores", description = "Gerenciar os Operadores existentes e os que pode vir futuramente")

public class OperadorController {

    private final OperadorService operadorService;

    public OperadorController(OperadorService operadorService) {
        this.operadorService = operadorService;
    }

    @GetMapping
    public ResponseEntity<List<OperadorResponseDTO>> listar() {
        return ResponseEntity.ok(operadorService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OperadorResponseDTO> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(operadorService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<String> criar(@RequestBody OperadorRequestDTO dto) {
        operadorService.criar(dto);
        return ResponseEntity.ok("Operador criado com sucesso!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable Integer id, @RequestBody OperadorRequestDTO dto) {
        operadorService.atualizar(id, dto);
        return ResponseEntity.ok("Operador atualizado com sucesso!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable Integer id) {
        operadorService.deletar(id);
        return ResponseEntity.ok("Operador deletado com sucesso!");
    }
}