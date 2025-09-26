package com.game_stats.game_stats.api.service;


import com.game_stats.game_stats.api.dto.OperadorRequestDTO;
import com.game_stats.game_stats.api.dto.OperadorResponseDTO;
import com.game_stats.game_stats.api.model.Operador;
import com.game_stats.game_stats.api.repository.OperadorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OperadorService {

    private final OperadorRepository operadorRepository;

    public OperadorService(OperadorRepository operadorRepository) {
        this.operadorRepository = operadorRepository;
    }

    public List<OperadorResponseDTO> listarTodos() {
        return operadorRepository.findAll()
                .stream()
                .map(op -> new OperadorResponseDTO(
                        op.getIdOperador(),
                        op.getNome(),
                        op.getFuncao(),
                        op.getArmaId()
                ))
                .collect(Collectors.toList());
    }

    public OperadorResponseDTO buscarPorId(Integer id) {
        Optional<Operador> operador = operadorRepository.findById(id);
        return operador.map(op -> new OperadorResponseDTO(
                op.getIdOperador(),
                op.getNome(),
                op.getFuncao(),
                op.getArmaId()
        )).orElseThrow(() -> new RuntimeException("Operador não encontrado"));
    }

    public void criar(OperadorRequestDTO dto) {
        validarFuncao(dto.getFuncao());

        Operador operador = new Operador();
        operador.setNome(dto.getNome());
        operador.setFuncao(dto.getFuncao());
        operador.setArmaId(dto.getArmaId());

        operadorRepository.save(operador);
    }

    public void atualizar(Integer id, OperadorRequestDTO dto) {
        validarFuncao(dto.getFuncao());

        Operador operador = new Operador();
        operador.setIdOperador(id);
        operador.setNome(dto.getNome());
        operador.setFuncao(dto.getFuncao());
        operador.setArmaId(dto.getArmaId());

        if (operadorRepository.update(operador) == 0) {
            throw new RuntimeException("Operador não encontrado para atualização");
        }
    }

    public void deletar(Integer id) {
        if (operadorRepository.delete(id) == 0) {
            throw new RuntimeException("Operador não encontrado para exclusão");
        }
    }

    // Validação da função
    private void validarFuncao(String funcao) {
        if (funcao == null ||
                (!funcao.equalsIgnoreCase("Ataque") && !funcao.equalsIgnoreCase("Defesa"))) {
            throw new IllegalArgumentException("Função deve ser 'Ataque' ou 'Defesa'");
        }
    }
}
