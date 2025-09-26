package com.game_stats.game_stats.api.service;

import com.game_stats.game_stats.api.model.Jogador;
import com.game_stats.game_stats.api.repository.JogadorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JogadorService {

    private final JogadorRepository repository;

    public JogadorService(JogadorRepository repository) {
        this.repository = repository;
    }

    public List<Jogador> listarTodos() {
        return repository.findAll();
    }

    public Optional<Jogador> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public Jogador criarJogador(Jogador jogador) {
        // Validação: nickname único
        Optional<Jogador> existente = repository.findByNickname(jogador.getNickname());
        if (existente.isPresent()) {
            throw new IllegalArgumentException("Nickname já está em uso!");
        }
        repository.save(jogador);
        return repository.findByNickname(jogador.getNickname()).orElseThrow();
    }

    public Jogador atualizarJogador(Integer id, Jogador jogador) {
        // Verifica se existe
        Optional<Jogador> existente = repository.findById(id);
        if (existente.isEmpty()) {
            throw new IllegalArgumentException("Jogador com ID " + id + " não encontrado.");
        }

        // Valida se o nickname não colide com outro jogador
        Optional<Jogador> mesmoNick = repository.findByNickname(jogador.getNickname());
        if (mesmoNick.isPresent() && !mesmoNick.get().getIdJogador().equals(id)) {
            throw new IllegalArgumentException("Já existe outro jogador com esse nickname.");
        }

        jogador.setIdJogador(id);
        repository.update(jogador);
        return repository.findById(id).orElseThrow();
    }

    public void deletarJogador(Integer id) {
        Optional<Jogador> existente = repository.findById(id);
        if (existente.isEmpty()) {
            throw new IllegalArgumentException("Jogador com ID " + id + " não encontrado.");
        }
        repository.delete(id);
    }
}
