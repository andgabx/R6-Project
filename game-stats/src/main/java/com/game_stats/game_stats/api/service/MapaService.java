package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.model.Mapa;
import com.game_stats.game_stats.api.repository.MapaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MapaService {

    private final MapaRepository repository;

    public MapaService(MapaRepository repository) {
        this.repository = repository;
    }

    // Listar todos
    public List<Mapa> listarTodos() {
        return repository.findAll();
    }

    // Buscar por ID
    public Optional<Mapa> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    // Criar novo
    public Mapa criar(Mapa mapa) {
        repository.save(mapa);
        return mapa; // retorna o objeto já salvo
    }

    // Atualizar existente
    public Mapa atualizar(Integer id, Mapa mapa) {
        if (repository.findById(id).isEmpty()) {
            throw new RuntimeException("Mapa com ID " + id + " não encontrado!");
        }
        mapa.setIdMapa(id);
        repository.update(mapa);
        return mapa;
    }

    // Deletar
    public void deletar(Integer id) {
        repository.delete(id);
    }
}