package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.dto.*;
import com.game_stats.game_stats.api.model.Arma;
import com.game_stats.game_stats.api.model.Operador;
import com.game_stats.game_stats.api.repository.ArmaRepository;
import com.game_stats.game_stats.api.repository.OperadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OperadorService {
    private final OperadorRepository operadorRepository;
    private final ArmaRepository armaRepository;

    public List<OperadorResponseDTO> listarTodos() {
        return operadorRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public OperadorResponseDTO buscarPorId(Integer id) {
        Operador operador = operadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operador não encontrado"));
        return toResponse(operador);
    }

    public void criar(OperadorRequestDTO dto) {
        Operador operador = new Operador();
        operador.setNome(dto.getNome());
        operadorRepository.save(operador);
    }

    public void atualizar(Integer id, OperadorRequestDTO dto) {
        operadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operador não encontrado"));

        Operador operador = new Operador();
        operador.setIdOperador(id);
        operador.setNome(dto.getNome());
        operadorRepository.update(operador);
    }

    public void deletar(Integer id) {
        operadorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Operador não encontrado"));

        operadorRepository.delete(id);
    }

    private OperadorResponseDTO toResponse(Operador operador) {
        OperadorResponseDTO dto = new OperadorResponseDTO();
        dto.setIdOperador(operador.getIdOperador());
        dto.setNome(operador.getNome());

        // Busca os dados de ataque
        operadorRepository.findAtaqueByOperadorId(operador.getIdOperador()).ifPresent(ataque -> {
            dto.setFuncao("Ataque");
            HabilidadesDTO habilidades = new HabilidadesDTO();
            habilidades.setGadgetName(ataque.getGadgetUnicoAtaque());
            habilidades.setGadgetAbility(ataque.getHabilidadeUnicaAtaque());
            dto.setHabilidades(habilidades);
        });

        // Se não for de ataque, busca os dados de defesa
        if (dto.getFuncao() == null) {
            operadorRepository.findDefesaByOperadorId(operador.getIdOperador()).ifPresent(defesa -> {
                dto.setFuncao("Defesa");
                HabilidadesDTO habilidades = new HabilidadesDTO();
                habilidades.setGadgetName(defesa.getGadgetUnicoDefesa());
                habilidades.setGadgetAbility(defesa.getHabilidadeUnicaDefesa());
                dto.setHabilidades(habilidades);
            });
        }

        // Busca a lista de armas associadas
        List<ArmaResponseDTO> armas = armaRepository.findArmasByOperadorId(operador.getIdOperador())
                .stream()
                .map(arma -> {
                    ArmaResponseDTO armaDto = new ArmaResponseDTO();
                    armaDto.setIdArma(arma.getIdArma());
                    armaDto.setNome(arma.getNome());
                    armaDto.setTipo(arma.getTipo());
                    armaDto.setDano(arma.getDano());
                    return armaDto;
                }).collect(Collectors.toList());
        dto.setArmas(armas);

        return dto;
    }

    public List<OperadorPopularidadeDTO> getTop5PopularAttackOperators() {
        return operadorRepository.findTop5PopularAttackOperators();
    }

    public Optional<MelhorJogadorDTO> findBestPlayerForAttackOperator(String operatorName) {
        if (operatorName == null || operatorName.trim().isEmpty()) {
            return Optional.empty();
        }
        return operadorRepository.findBestPlayerForAttackOperator(operatorName);
    }
}