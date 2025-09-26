"use client";

import { useEffect, useState } from "react";
import { Jogador, JogadorRequest } from "../../types/jogador";
import { jogadorService } from "../../services/JogadorService";

export default function TesteJogadores() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(false);
  const [novoJogador, setNovoJogador] = useState<JogadorRequest>({
    nickname: "",
    dadosId: null,
  });

  // Carregar jogadores
  const carregarJogadores = async () => {
    try {
      setLoading(true);
      const data = await jogadorService.listarTodos();
      setJogadores(data);
    } catch (error) {
      console.error("Erro ao carregar jogadores:", error);
    } finally {
      setLoading(false);
    }
  };

  // Criar jogador
  const criarJogador = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await jogadorService.criar(novoJogador);
      setNovoJogador({ nickname: "", dadosId: null });
      carregarJogadores();
    } catch (error) {
      console.error("Erro ao criar jogador:", error);
      alert("Erro ao criar jogador.");
    }
  };

  // Deletar jogador
  const deletarJogador = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar?")) {
      try {
        await jogadorService.deletar(id);
        carregarJogadores();
      } catch (error) {
        console.error("Erro ao deletar jogador:", error);
      }
    }
  };

  useEffect(() => {
    carregarJogadores();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎮 Teste CRUD Jogadores (TS + Axios)</h1>

      {/* Form criar jogador */}
      <form onSubmit={criarJogador} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nickname"
          value={novoJogador.nickname}
          onChange={(e) =>
            setNovoJogador({ ...novoJogador, nickname: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Dados ID"
          value={novoJogador.dadosId ?? ""}
          onChange={(e) =>
            setNovoJogador({
              ...novoJogador,
              dadosId: e.target.value ? parseInt(e.target.value) : null,
            })
          }
        />
        <button type="submit">Criar</button>
      </form>

      {/* Lista */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {jogadores.map((j) => (
            <li key={j.id}>
              <strong>{j.nickname}</strong> (ID: {j.id}, Dados:{" "}
              {j.dadosId ?? "N/A"})
              <button
                onClick={() => deletarJogador(j.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}