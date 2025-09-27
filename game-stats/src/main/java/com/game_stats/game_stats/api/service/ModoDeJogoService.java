package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.model.ModoDeJogo;
import com.game_stats.game_stats.api.repository.ModoDeJogoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModoDeJogoService {

    private final ModoDeJogoRepository repository;

    public ModoDeJogoService(ModoDeJogoRepository repository) {
        this.repository = repository;
    }

    public List<ModoDeJogo> listarTodos() {
        return repository.findAll();
    }

    public Optional<ModoDeJogo> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public ModoDeJogo criar(ModoDeJogo modo) {
        repository.save(modo);
        return modo;
    }

    public ModoDeJogo atualizar(Integer id, ModoDeJogo modo) {
        if (repository.findById(id).isEmpty()) {
            throw new RuntimeException("Modo de jogo com ID " + id + " não encontrado!");
        }
        modo.setIdModoDeJogo(id);
        repository.update(modo);
        return modo;
    }

    public void deletar(Integer id) {
        repository.delete(id);
    }
}