"use client";

import { useEffect, useState } from "react";
import { Jogador, JogadorRequest } from "../../types/jogador";
import { jogadorService } from "../../services/JogadorService";

type TabType = 'listAll' | 'findById' | 'create' | 'update' | 'delete' | 'minKd' | 'minWinRate' | 'minLevel';

export default function TesteJogadores() {
  const [activeTab, setActiveTab] = useState<TabType>('listAll');
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [jogador, setJogador] = useState<Jogador | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Form states
  const [novoJogador, setNovoJogador] = useState<JogadorRequest>({
    nickname: "",
    dadosId: null,
  });
  const [updateJogador, setUpdateJogador] = useState<JogadorRequest>({
    nickname: "",
    dadosId: null,
  });
  const [searchId, setSearchId] = useState<number>(0);
  const [updateId, setUpdateId] = useState<number>(0);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [minKd, setMinKd] = useState<number>(0);
  const [minWinRate, setMinWinRate] = useState<number>(0);
  const [minLevel, setMinLevel] = useState<number>(0);

  // Generic error handler
  const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    setError(`${message}: ${errorMessage}`);
  };

  // Clear error when changing tabs
  useEffect(() => {
    setError("");
    setJogador(null);
    setJogadores([]);
  }, [activeTab]);

  // Tab 1: List All Players
  const carregarTodosJogadores = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await jogadorService.listAll();
      setJogadores(data);
    } catch (error) {
      handleError(error, "Erro ao carregar jogadores");
    } finally {
      setLoading(false);
    }
  };

  // Tab 2: Find Player by ID
  const buscarJogadorPorId = async () => {
    if (!searchId) {
      setError("Por favor, insira um ID válido");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const data = await jogadorService.findById(searchId);
      setJogador(data);
    } catch (error) {
      handleError(error, "Erro ao buscar jogador");
    } finally {
      setLoading(false);
    }
  };

  // Tab 3: Create Player
  const criarJogador = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const created = await jogadorService.create(novoJogador);
      setJogador(created);
      setNovoJogador({ nickname: "", dadosId: null });
      alert("Jogador criado com sucesso!");
    } catch (error) {
      handleError(error, "Erro ao criar jogador");
    } finally {
      setLoading(false);
    }
  };

  // Tab 4: Update Player
  const atualizarJogador = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateId) {
      setError("Por favor, insira um ID válido");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const updated = await jogadorService.update(updateId, updateJogador);
      setJogador(updated);
      alert("Jogador atualizado com sucesso!");
    } catch (error) {
      handleError(error, "Erro ao atualizar jogador");
    } finally {
      setLoading(false);
    }
  };

  // Tab 5: Delete Player
  const deletarJogador = async () => {
    if (!deleteId) {
      setError("Por favor, insira um ID válido");
      return;
    }
    if (!confirm(`Tem certeza que deseja deletar o jogador com ID ${deleteId}?`)) {
      return;
    }
    try {
      setLoading(true);
      setError("");
      await jogadorService.delete(deleteId);
      setDeleteId(0);
      alert("Jogador deletado com sucesso!");
    } catch (error) {
      handleError(error, "Erro ao deletar jogador");
    } finally {
      setLoading(false);
    }
  };

  // Tab 6: List by Min K/D
  const buscarPorKdMinimo = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await jogadorService.listByMinKd(minKd);
      setJogadores(data);
    } catch (error) {
      handleError(error, "Erro ao buscar jogadores por K/D mínimo");
    } finally {
      setLoading(false);
    }
  };

  // Tab 7: List by Min Win Rate
  const buscarPorWinRateMinimo = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await jogadorService.listByMinWinRate(minWinRate);
      setJogadores(data);
    } catch (error) {
      handleError(error, "Erro ao buscar jogadores por Win Rate mínimo");
    } finally {
      setLoading(false);
    }
  };

  // Tab 8: List by Min Level
  const buscarPorNivelMinimo = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await jogadorService.listByMinLevel(minLevel);
      setJogadores(data);
    } catch (error) {
      handleError(error, "Erro ao buscar jogadores por nível mínimo");
    } finally {
      setLoading(false);
    }
  };

  // Auto-load all players when component mounts
  useEffect(() => {
    if (activeTab === 'listAll') {
      carregarTodosJogadores();
    }
  }, [activeTab]);

  const tabStyle = (tab: TabType) => ({
    padding: "10px 20px",
    margin: "0 5px",
    border: "1px solid #444",
    backgroundColor: activeTab === tab ? "#0d6efd" : "#2d3748",
    color: "#ffffff",
    cursor: "pointer",
    borderRadius: "5px 5px 0 0",
    transition: "all 0.3s ease",
  });

  const renderJogadorList = () => (
    <div>
      <h3 style={{ color: "#ffffff" }}>Resultados ({jogadores.length} jogadores)</h3>
      {jogadores.length === 0 ? (
        <p style={{ color: "#a0aec0" }}>Nenhum jogador encontrado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {jogadores.map((j) => (
            <li key={j.idJogador} style={{
              padding: "15px",
              margin: "10px 0",
              border: "1px solid #4a5568",
              borderRadius: "8px",
              backgroundColor: "#2d3748",
              color: "#ffffff"
            }}>
              <strong style={{ color: "#63b3ed" }}>{j.nickname}</strong>
              <span style={{ color: "#a0aec0" }}> (ID: {j.idJogador}, Dados ID: {j.dadosId ?? "N/A"})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderJogadorSingle = () => (
    jogador && (
      <div style={{
        padding: "20px",
        border: "1px solid #4a5568",
        borderRadius: "8px",
        backgroundColor: "#2d3748",
        marginTop: "15px",
        color: "#ffffff"
      }}>
        <h3 style={{ color: "#63b3ed", marginBottom: "15px" }}>Jogador Encontrado</h3>
        <p><strong style={{ color: "#81c784" }}>ID:</strong> <span style={{ color: "#ffffff" }}>{jogador.idJogador}</span></p>
        <p><strong style={{ color: "#81c784" }}>Nickname:</strong> <span style={{ color: "#ffffff" }}>{jogador.nickname}</span></p>
        <p><strong style={{ color: "#81c784" }}>Dados ID:</strong> <span style={{ color: "#ffffff" }}>{jogador.dadosId ?? "N/A"}</span></p>
      </div>
    )
  );

  const inputStyle = {
    padding: "10px",
    marginRight: "10px",
    width: "220px",
    backgroundColor: "#2d3748",
    border: "1px solid #4a5568",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "14px"
  };

  const buttonStyle = (variant: 'primary' | 'success' | 'warning' | 'danger' | 'info') => {
    const variants = {
      primary: "#0d6efd",
      success: "#198754",
      warning: "#fd7e14",
      danger: "#dc3545",
      info: "#0dcaf0"
    };
    
    return {
      padding: "10px 20px",
      backgroundColor: variants[variant],
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      marginBottom: "10px"
    };
  };

  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "Arial, sans-serif", 
      backgroundColor: "#1a202c", 
      minHeight: "100vh",
      color: "#ffffff"
    }}>
      <h1 style={{ color: "#63b3ed", marginBottom: "30px" }}>🎮 Gerenciamento de Jogadores</h1>
      
      {/* Tab Navigation */}
      <div style={{ borderBottom: "1px solid #4a5568", marginBottom: "30px" }}>
        <button style={tabStyle('listAll')} onClick={() => setActiveTab('listAll')}>
          Listar Todos
        </button>
        <button style={tabStyle('findById')} onClick={() => setActiveTab('findById')}>
          Buscar por ID
        </button>
        <button style={tabStyle('create')} onClick={() => setActiveTab('create')}>
          Criar Jogador
        </button>
        <button style={tabStyle('update')} onClick={() => setActiveTab('update')}>
          Atualizar Jogador
        </button>
        <button style={tabStyle('delete')} onClick={() => setActiveTab('delete')}>
          Deletar Jogador
        </button>
        <button style={tabStyle('minKd')} onClick={() => setActiveTab('minKd')}>
          Por K/D Mínimo
        </button>
        <button style={tabStyle('minWinRate')} onClick={() => setActiveTab('minWinRate')}>
          Por Win Rate Mínimo
        </button>
        <button style={tabStyle('minLevel')} onClick={() => setActiveTab('minLevel')}>
          Por Nível Mínimo
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#742a2a", 
          color: "#fed7d7", 
          border: "1px solid #e53e3e",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#2c5282", 
          color: "#bee3f8",
          border: "1px solid #3182ce",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          Carregando...
        </div>
      )}

      {/* Tab Content */}
      <div style={{ minHeight: "400px" }}>
        {/* Tab 1: List All */}
        {activeTab === 'listAll' && (
          <div>
            <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>Todos os Jogadores</h2>
            <button 
              onClick={carregarTodosJogadores}
              style={buttonStyle('success')}
            >
              Recarregar Lista
            </button>
            {renderJogadorList()}
          </div>
        )}

        {/* Tab 2: Find by ID */}
        {activeTab === 'findById' && (
          <div>
            <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>Buscar Jogador por ID</h2>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="number"
                placeholder="Digite o ID do jogador"
                value={searchId || ""}
                onChange={(e) => setSearchId(parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
              <button 
                onClick={buscarJogadorPorId}
                style={buttonStyle('primary')}
              >
                Buscar
              </button>
            </div>
            {renderJogadorSingle()}
          </div>
        )}

        {/* Tab 3: Create */}
        {activeTab === 'create' && (
          <div>
            <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>Criar Novo Jogador</h2>
            <form onSubmit={criarJogador} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  placeholder="Nickname"
                  value={novoJogador.nickname}
                  onChange={(e) => setNovoJogador({ ...novoJogador, nickname: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="number"
                  placeholder="Dados ID (opcional)"
                  value={novoJogador.dadosId ?? ""}
                  onChange={(e) => setNovoJogador({
                    ...novoJogador,
                    dadosId: e.target.value ? parseInt(e.target.value) : null,
                  })}
                  style={inputStyle}
                />
              </div>
              <button 
                type="submit"
                style={buttonStyle('success')}
              >
                Criar Jogador
              </button>
            </form>
            {renderJogadorSingle()}
          </div>
        )}

        {/* Tab 4: Update */}
        {activeTab === 'update' && (
          <div>
            <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>Atualizar Jogador</h2>
            <form onSubmit={atualizarJogador} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="number"
                  placeholder="ID do jogador a atualizar"
                  value={updateId || ""}
                  onChange={(e) => setUpdateId(parseInt(e.target.value) || 0)}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="text"
                  placeholder="Novo nickname"
                  value={updateJogador.nickname}
                  onChange={(e) => setUpdateJogador({ ...updateJogador, nickname: e.target.value })}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <input
                  type="number"
                  placeholder="Novo Dados ID (opcional)"
                  value={updateJogador.dadosId ?? ""}
                  onChange={(e) => setUpdateJogador({
                    ...updateJogador,
                    dadosId: e.target.value ? parseInt(e.target.value) : null,
                  })}
                  style={inputStyle}
                />
              </div>
              <button 
                type="submit"
                style={buttonStyle('warning')}
              >
                Atualizar Jogador
              </button>
            </form>
            {renderJogadorSingle()}
          </div>
        )}

        {/* Tab 5: Delete */}
        {activeTab === 'delete' && (
          <div>
            <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>Deletar Jogador</h2>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="number"
                placeholder="ID do jogador a deletar"
                value={deleteId || ""}
                onChange={(e) => setDeleteId(parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
              <button 
                onClick={deletarJogador}
                style={buttonStyle('danger')}
              >
                Deletar
              </button>
            </div>
            <p style={{ color: "#a0aec0" }}>
              ⚠️ Esta ação não pode ser desfeita. Certifique-se de que deseja deletar o jogador.
            </p>
          </div>
        )}

        {/* Tab 6: Min K/D */}
        {activeTab === 'minKd' && (
          <div>
            <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>Jogadores por K/D Mínimo</h2>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="number"
                step="0.1"
                placeholder="K/D mínimo (ex: 1.5)"
                value={minKd || ""}
                onChange={(e) => setMinKd(parseFloat(e.target.value) || 0)}
                style={inputStyle}
              />
              <button 
                onClick={buscarPorKdMinimo}
                style={buttonStyle('info')}
              >
                Buscar
              </button>
            </div>
            {renderJogadorList()}
          </div>
        )}

        {/* Tab 7: Min Win Rate */}
        {activeTab === 'minWinRate' && (
          <div>
            <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>Jogadores por Win Rate Mínimo</h2>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="number"
                step="0.1"
                placeholder="Win Rate mínimo (ex: 0.7)"
                value={minWinRate || ""}
                onChange={(e) => setMinWinRate(parseFloat(e.target.value) || 0)}
                style={inputStyle}
              />
              <button 
                onClick={buscarPorWinRateMinimo}
                style={buttonStyle('info')}
              >
                Buscar
              </button>
            </div>
            {renderJogadorList()}
          </div>
        )}

        {/* Tab 8: Min Level */}
        {activeTab === 'minLevel' && (
          <div>
            <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>Jogadores por Nível Mínimo</h2>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="number"
                placeholder="Nível mínimo (ex: 50)"
                value={minLevel || ""}
                onChange={(e) => setMinLevel(parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
              <button 
                onClick={buscarPorNivelMinimo}
                style={buttonStyle('info')}
              >
                Buscar
              </button>
            </div>
            {renderJogadorList()}
          </div>
        )}
      </div>
    </div>
  );
}