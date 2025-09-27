package com.game_stats.game_stats.api.repository;

import com.game_stats.game_stats.api.model.ModoDeJogo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ModoDeJogoRepository {

    private final JdbcTemplate jdbcTemplate;

    public ModoDeJogoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<ModoDeJogo> rowMapper = (rs, rowNum) -> {
        ModoDeJogo modo = new ModoDeJogo();
        modo.setIdModoDeJogo(rs.getInt("ID_Modo_de_Jogo"));
        modo.setNome(rs.getString("Nome"));
        modo.setDescricao(rs.getString("Descricao"));
        modo.setTipo(rs.getString("Tipo"));
        return modo;
    };

    // Listar todos
    public List<ModoDeJogo> findAll() {
        return jdbcTemplate.query("SELECT * FROM Modo_de_Jogo", rowMapper);
    }

    // Buscar por ID
    public Optional<ModoDeJogo> findById(Integer id) {
        return jdbcTemplate.query(
                        "SELECT * FROM Modo_de_Jogo WHERE ID_Modo_de_Jogo = ?",
                        rowMapper,
                        id)
                .stream()
                .findFirst();
    }

    // Criar novo registro
    public void save(ModoDeJogo modo) {
        jdbcTemplate.update(
                "INSERT INTO Modo_de_Jogo (Nome, Descricao, Tipo) VALUES (?, ?, ?)",
                modo.getNome(),
                modo.getDescricao(),
                modo.getTipo()
        );
    }

    // Atualizar existente
    public void update(ModoDeJogo modo) {
        jdbcTemplate.update(
                "UPDATE Modo_de_Jogo SET Nome = ?, Descricao = ?, Tipo = ? WHERE ID_Modo_de_Jogo = ?",
                modo.getNome(),
                modo.getDescricao(),
                modo.getTipo(),
                modo.getIdModoDeJogo()
        );
    }

    // Deletar por ID
    public void delete(Integer id) {
        jdbcTemplate.update(
                "DELETE FROM Modo_de_Jogo WHERE ID_Modo_de_Jogo = ?",
                id
        );
    }
}