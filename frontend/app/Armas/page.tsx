"use client";

import { useEffect, useState } from "react";
import { Arma, ArmaRequest } from "../../types/arma";
import { armaService } from "../../services/ArmaService";

type TabType =
  | "listAll"
  | "findById"
  | "create"
  | "update"
  | "delete"
  | "minDamage"
  | "minCadencia"
  | "minCapacidade"
  | "byType"
  | "riflesHighDamage"
  | "pistolasHighCadencia"
  | "smgsHighCapacidade"
  | "topDamageByType"
  | "highCadenciaLowDamage"
  | "balanced";

export default function TesteArmas() {
  const [activeTab, setActiveTab] = useState<TabType>("listAll");
  const [armas, setArmas] = useState<Arma[]>([]);
  const [arma, setArma] = useState<Arma | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [formData, setFormData] = useState<ArmaRequest>({
    nome: "",
    cadencia: 0,
    tipo: "",
    dano: 0,
    capacidade: 0,
  });

  const [searchId, setSearchId] = useState<number>(0);
  const [updateId, setUpdateId] = useState<number>(0);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [minDamage, setMinDamage] = useState<number>(0);
  const [minCadencia, setMinCadencia] = useState<number>(0);
  const [minCapacidade, setMinCapacidade] = useState<number>(0);
  const [weaponType, setWeaponType] = useState<string>("");

  const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    setError(`${message}: ${errorMessage}`);
  };

  useEffect(() => {
    setError("");
    setArma(null);
    setArmas([]);
  }, [activeTab]);

  const carregarTodasArmas = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listAll();
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao carregar armas");
    } finally {
      setLoading(false);
    }
  };

  const buscarArmaPorId = async () => {
    if (!searchId) {
      setError("Por favor, insira um ID válido");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const data = await armaService.findById(searchId);
      setArma(data);
    } catch (error) {
      handleError(error, "Erro ao buscar arma");
    } finally {
      setLoading(false);
    }
  };

  const criarArma = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const created = await armaService.create(formData);
      setArma(created);
      setFormData({ nome: "", cadencia: 0, tipo: "", dano: 0, capacidade: 0 });
      alert("Arma criada com sucesso!");
    } catch (error) {
      handleError(error, "Erro ao criar arma");
    } finally {
      setLoading(false);
    }
  };

  const atualizarArma = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateId) {
      setError("Por favor, insira um ID válido");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const updated = await armaService.update(updateId, formData);
      setArma(updated);
      alert("Arma atualizada com sucesso!");
    } catch (error) {
      handleError(error, "Erro ao atualizar arma");
    } finally {
      setLoading(false);
    }
  };

  const deletarArma = async () => {
    if (!deleteId) {
      setError("Por favor, insira um ID válido");
      return;
    }
    if (!confirm(`Tem certeza que deseja deletar a arma com ID ${deleteId}?`)) {
      return;
    }
    try {
      setLoading(true);
      setError("");
      await armaService.delete(deleteId);
      setDeleteId(0);
      alert("Arma deletada com sucesso!");
    } catch (error) {
      handleError(error, "Erro ao deletar arma");
    } finally {
      setLoading(false);
    }
  };

  const buscarPorDanoMinimo = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listByMinDamage(minDamage);
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar armas por dano mínimo");
    } finally {
      setLoading(false);
    }
  };

  const buscarPorCadenciaMinima = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listByMinCadencia(minCadencia);
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar armas por cadência mínima");
    } finally {
      setLoading(false);
    }
  };

  const buscarPorCapacidadeMinima = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listByMinCapacidade(minCapacidade);
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar armas por capacidade mínima");
    } finally {
      setLoading(false);
    }
  };

  const buscarPorTipo = async () => {
    if (!weaponType.trim()) {
      setError("Por favor, insira um tipo válido");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listByType(weaponType);
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar armas por tipo");
    } finally {
      setLoading(false);
    }
  };

  const buscarRiflesComAltoDano = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listRiflesWithHighDamage(minDamage);
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar rifles com alto dano");
    } finally {
      setLoading(false);
    }
  };

  const buscarPistolasComAltaCadencia = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listPistolasWithHighCadencia(minCadencia);
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar pistolas com alta cadência");
    } finally {
      setLoading(false);
    }
  };

  const buscarSMGsComAltaCapacidade = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listSMGsWithHighCapacity(minCapacidade);
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar SMGs com alta capacidade");
    } finally {
      setLoading(false);
    }
  };

  const buscarTopDanoPorTipo = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listTopDamageByType();
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar top dano por tipo");
    } finally {
      setLoading(false);
    }
  };

  const buscarAltaCadenciaBaixoDano = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listHighCadenciaLowDamage();
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar armas com alta cadência e baixo dano");
    } finally {
      setLoading(false);
    }
  };

  const buscarArmasBalanceadas = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await armaService.listBalancedWeapons();
      setArmas(data);
    } catch (error) {
      handleError(error, "Erro ao buscar armas balanceadas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "listAll") {
      carregarTodasArmas();
    }
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumber = ['cadencia', 'dano', 'capacidade'].includes(name);
    setFormData({ ...formData, [name]: isNumber ? parseInt(value) || 0 : value });
  };

  const armaForm = (handleSubmit: (e: React.FormEvent) => void, submitText: string) => (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome da arma"
          value={formData.nome}
          onChange={handleInputChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          required
        />
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleInputChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="Assault Rifles">Assault Rifles</option>
          <option value="Submachine Guns (SMGs)">Submachine Guns (SMGs)</option>
          <option value="Shotguns">Shotguns</option>
          <option value="Marksman Rifles">Marksman Rifles</option>
          <option value="Light Machine Guns (LMGs)">Light Machine Guns (LMGs)</option>
          <option value="Machine Pistols">Machine Pistols</option>
          <option value="Handguns">Handguns</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          name="dano"
          placeholder="Dano"
          value={formData.dano || ""}
          onChange={handleInputChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          required
        />
        <input
          type="number"
          name="cadencia"
          placeholder="Cadência"
          value={formData.cadencia || ""}
          onChange={handleInputChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          name="capacidade"
          placeholder="Capacidade"
          value={formData.capacidade || ""}
          onChange={handleInputChange}
          className="p-2 bg-gray-700 border border-gray-600 rounded text-white"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-bold">
        {submitText}
      </button>
    </form>
  );

  const renderArmaList = () => (
    <div>
      <h3 className="text-white text-xl mb-4">Resultados ({armas.length} armas)</h3>
      {armas.length === 0 ? (
        <p className="text-gray-400">Nenhuma arma encontrada.</p>
      ) : (
        <ul className="list-none p-0">
          {armas.map((a) => (
            <li key={a.idArma} className="p-4 my-2 border border-gray-700 rounded-lg bg-gray-800 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-blue-400">{a.nome}</strong>
                  <span className="text-gray-400"> (ID: {a.idArma})</span>
                  <br />
                  <span className="text-green-400">Tipo:</span> {a.tipo}
                  <br />
                  <span className="text-green-400">Cadência:</span> {a.cadencia}
                  <br />
                  <span className="text-green-400">Capacidade:</span> {a.capacidade}
                </div>
                <div className="text-right text-sm">
                  <div className="text-yellow-400">Dano: {a.dano}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderArmaSingle = () => (
    arma && (
      <div className="p-5 border border-gray-700 rounded-lg bg-gray-800 mt-4 text-white">
        <h3 className="text-blue-400 text-lg mb-4">Arma Encontrada</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong className="text-green-400">ID:</strong> {arma.idArma}</p>
            <p><strong className="text-green-400">Nome:</strong> {arma.nome}</p>
            <p><strong className="text-green-400">Tipo:</strong> {arma.tipo}</p>
            <p><strong className="text-green-400">Cadência:</strong> {arma.cadencia}</p>
            <p><strong className="text-green-400">Capacidade:</strong> {arma.capacidade}</p>
          </div>
          <div>
            <p><strong className="text-yellow-400">Dano:</strong> {arma.dano}</p>
          </div>
        </div>
      </div>
    )
  );

  const tabStyle = (tab: TabType) =>
    `px-4 py-2 mx-1 my-1 border rounded-t-lg cursor-pointer transition-all duration-300 ${
      activeTab === tab ? "bg-blue-600 text-white border-blue-600" : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
    }`;

  const buttonStyle = (variant: "primary" | "success" | "warning" | "danger" | "info") => {
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700",
      success: "bg-green-600 hover:bg-green-700",
      warning: "bg-yellow-500 hover:bg-yellow-600",
      danger: "bg-red-600 hover:bg-red-700",
      info: "bg-cyan-500 hover:bg-cyan-600",
    };
    return `px-4 py-2 rounded text-white font-bold transition-all duration-300 ${variants[variant]}`;
  };

  const inputClasses = "p-2 bg-gray-700 border border-gray-600 rounded text-white w-full md:w-auto";

  return (
    <div className="p-5 font-sans bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl text-blue-400 mb-6">🔫 Gerenciamento de Armas</h1>

      <div className="border-b border-gray-700 mb-6 flex flex-wrap">
        <button className={tabStyle("listAll")} onClick={() => setActiveTab("listAll")}>Listar Todas</button>
        <button className={tabStyle("findById")} onClick={() => setActiveTab("findById")}>Buscar por ID</button>
        <button className={tabStyle("create")} onClick={() => setActiveTab("create")}>Criar Arma</button>
        <button className={tabStyle("update")} onClick={() => setActiveTab("update")}>Atualizar Arma</button>
        <button className={tabStyle("delete")} onClick={() => setActiveTab("delete")}>Deletar Arma</button>
        <button className={tabStyle("minDamage")} onClick={() => setActiveTab("minDamage")}>Por Dano Mínimo</button>
        <button className={tabStyle("minCadencia")} onClick={() => setActiveTab("minCadencia")}>Por Cadência Mínima</button>
        <button className={tabStyle("minCapacidade")} onClick={() => setActiveTab("minCapacidade")}>Por Capacidade Mínima</button>
        <button className={tabStyle("byType")} onClick={() => setActiveTab("byType")}>Por Tipo</button>
        <button className={tabStyle("riflesHighDamage")} onClick={() => setActiveTab("riflesHighDamage")}>Rifles com Alto Dano</button>
        <button className={tabStyle("pistolasHighCadencia")} onClick={() => setActiveTab("pistolasHighCadencia")}>Pistolas com Alta Cadência</button>
        <button className={tabStyle("smgsHighCapacidade")} onClick={() => setActiveTab("smgsHighCapacidade")}>SMGs com Alta Capacidade</button>
        <button className={tabStyle("topDamageByType")} onClick={() => setActiveTab("topDamageByType")}>Top Dano por Tipo</button>
        <button className={tabStyle("highCadenciaLowDamage")} onClick={() => setActiveTab("highCadenciaLowDamage")}>Alta Cadência Baixo Dano</button>
        <button className={tabStyle("balanced")} onClick={() => setActiveTab("balanced")}>Armas Balanceadas</button>
      </div>

      {error && (
        <div className="p-4 bg-red-800 text-red-200 border border-red-600 rounded-lg mb-5">
          {error}
        </div>
      )}

      {loading && (
        <div className="p-4 bg-blue-800 text-blue-200 border border-blue-600 rounded-lg mb-5">
          Carregando...
        </div>
      )}

      <div className="min-h-[400px]">
        {activeTab === "listAll" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Todas as Armas</h2>
            <button onClick={carregarTodasArmas} className={buttonStyle("success")}>Recarregar Lista</button>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "findById" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Buscar Arma por ID</h2>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="number"
                placeholder="Digite o ID da arma"
                value={searchId || ""}
                onChange={(e) => setSearchId(parseInt(e.target.value) || 0)}
                className={inputClasses}
              />
              <button onClick={buscarArmaPorId} className={buttonStyle("primary")}>Buscar</button>
            </div>
            {renderArmaSingle()}
          </div>
        )}

        {activeTab === "create" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Criar Nova Arma</h2>
            {armaForm(criarArma, "Criar Arma")}
            {renderArmaSingle()}
          </div>
        )}

        {activeTab === "update" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Atualizar Arma</h2>
            <div className="mb-4">
              <input
                type="number"
                placeholder="ID da arma a atualizar"
                value={updateId || ""}
                onChange={(e) => setUpdateId(parseInt(e.target.value) || 0)}
                className={`${inputClasses} mb-2`}
                required
              />
            </div>
            {armaForm(atualizarArma, "Atualizar Arma")}
            {renderArmaSingle()}
          </div>
        )}

        {activeTab === "delete" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Deletar Arma</h2>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="number"
                placeholder="ID da arma a deletar"
                value={deleteId || ""}
                onChange={(e) => setDeleteId(parseInt(e.target.value) || 0)}
                className={inputClasses}
              />
              <button onClick={deletarArma} className={buttonStyle("danger")}>Deletar</button>
            </div>
            <p className="text-gray-400">
              ⚠️ Esta ação não pode ser desfeita. Certifique-se de que deseja deletar a arma.
            </p>
          </div>
        )}

        {activeTab === "minDamage" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Armas por Dano Mínimo</h2>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="number"
                placeholder="Dano mínimo (ex: 50)"
                value={minDamage || ""}
                onChange={(e) => setMinDamage(parseInt(e.target.value) || 0)}
                className={inputClasses}
              />
              <button onClick={buscarPorDanoMinimo} className={buttonStyle("info")}>Buscar</button>
            </div>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "minCadencia" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Armas por Cadência Mínima</h2>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="number"
                placeholder="Cadência mínima (ex: 600)"
                value={minCadencia || ""}
                onChange={(e) => setMinCadencia(parseInt(e.target.value) || 0)}
                className={inputClasses}
              />
              <button onClick={buscarPorCadenciaMinima} className={buttonStyle("info")}>Buscar</button>
            </div>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "minCapacidade" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Armas por Capacidade Mínima</h2>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="number"
                placeholder="Capacidade mínima (ex: 30)"
                value={minCapacidade || ""}
                onChange={(e) => setMinCapacidade(parseInt(e.target.value) || 0)}
                className={inputClasses}
              />
              <button onClick={buscarPorCapacidadeMinima} className={buttonStyle("info")}>Buscar</button>
            </div>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "byType" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Armas por Tipo</h2>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="text"
                placeholder="Tipo da arma (ex: Rifle, Pistola)"
                value={weaponType}
                onChange={(e) => setWeaponType(e.target.value)}
                className={inputClasses}
              />
              <button onClick={buscarPorTipo} className={buttonStyle("info")}>Buscar</button>
            </div>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "riflesHighDamage" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Rifles com Alto Dano</h2>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="number"
                placeholder="Dano mínimo (ex: 50)"
                value={minDamage || ""}
                onChange={(e) => setMinDamage(parseInt(e.target.value) || 0)}
                className={inputClasses}
              />
              <button onClick={buscarRiflesComAltoDano} className={buttonStyle("info")}>Buscar</button>
            </div>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "pistolasHighCadencia" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Pistolas com Alta Cadência</h2>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="number"
                placeholder="Cadência mínima (ex: 600)"
                value={minCadencia || ""}
                onChange={(e) => setMinCadencia(parseInt(e.target.value) || 0)}
                className={inputClasses}
              />
              <button onClick={buscarPistolasComAltaCadencia} className={buttonStyle("info")}>Buscar</button>
            </div>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "smgsHighCapacidade" && (
          <div>
            <h2 className="text-2xl text-white mb-4">SMGs com Alta Capacidade</h2>
            <div className="mb-5 flex items-center gap-2">
              <input
                type="number"
                placeholder="Capacidade mínima (ex: 30)"
                value={minCapacidade || ""}
                onChange={(e) => setMinCapacidade(parseInt(e.target.value) || 0)}
                className={inputClasses}
              />
              <button onClick={buscarSMGsComAltaCapacidade} className={buttonStyle("info")}>Buscar</button>
            </div>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "topDamageByType" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Top Dano por Tipo</h2>
            <button onClick={buscarTopDanoPorTipo} className={buttonStyle("info")}>Buscar</button>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "highCadenciaLowDamage" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Alta Cadência Baixo Dano</h2>
            <button onClick={buscarAltaCadenciaBaixoDano} className={buttonStyle("info")}>Buscar</button>
            {renderArmaList()}
          </div>
        )}

        {activeTab === "balanced" && (
          <div>
            <h2 className="text-2xl text-white mb-4">Armas Balanceadas</h2>
            <button onClick={buscarArmasBalanceadas} className={buttonStyle("info")}>Buscar</button>
            {renderArmaList()}
          </div>
        )}
      </div>
    </div>
  );
}
