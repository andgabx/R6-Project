package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.model.Dados;
import com.game_stats.game_stats.api.repository.DadosRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DadosService {

    private final DadosRepository repository;

    public DadosService(DadosRepository repository) {
        this.repository = repository;
    }

    public List<Dados> listarTodos() {
        return repository.findAll();
    }

    public Optional<Dados> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public Dados criar(Dados dados) {
        return repository.save(dados);
    }

    public Dados atualizar(Integer id, Dados dados) {
        if (repository.findById(id).isEmpty()) {
            throw new RuntimeException("Dados não encontrados");
        }
        dados.setId(id);
        repository.update(dados);
        return dados;
    }

    public void deletar(Integer id) {
        repository.delete(id);
    }
}