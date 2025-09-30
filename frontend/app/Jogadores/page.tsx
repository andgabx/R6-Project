"use client";

import { useEffect, useState } from "react";
import { Jogador, JogadorRequest } from "../../types/jogador";
import { jogadorService } from "../../services/JogadorService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Users, AlertTriangle, Loader2, Trash2, Search, Edit } from "lucide-react";

type TabType = 'listAll' | 'findById' | 'create' | 'update' | 'delete' | 'minKd' | 'minWinRate' | 'minLevel';

export default function JogadoresPage() {
  const [activeTab, setActiveTab] = useState<TabType>('listAll');
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [jogador, setJogador] = useState<Jogador | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Form and Modal states
  const [formData, setFormData] = useState<JogadorRequest>({ nickname: "", dadosId: null });
  const [selectedJogador, setSelectedJogador] = useState<Jogador | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNotFoundModalOpen, setIsNotFoundModalOpen] = useState(false);
  
  const [searchId, setSearchId] = useState<number>(0);
  const [minKd, setMinKd] = useState<number>(0);
  const [minWinRate, setMinWinRate] = useState<number>(0);
  const [minLevel, setMinLevel] = useState<number>(0);

  const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    setError(`${message}: ${errorMessage}`);
  };

  useEffect(() => {
    setError("");
    setJogador(null);
    setJogadores([]);
    if (['listAll', 'update', 'delete', 'minKd', 'minWinRate', 'minLevel'].includes(activeTab)) {
      carregarTodosJogadores();
    }
  }, [activeTab]);

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

  const buscarJogadorPorId = async () => {
    if (!searchId) {
      setError("Por favor, insira um ID válido");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setJogador(null);
      const data = await jogadorService.findById(searchId);
      if (data) {
        setJogador(data);
      } else {
        setIsNotFoundModalOpen(true);
      }
    } catch (error) {
      setIsNotFoundModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const criarJogador = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const created = await jogadorService.create(formData);
      setJogador(created);
      setFormData({ nickname: "", dadosId: null });
      alert("Jogador criado com sucesso!");
    } catch (error) {
      handleError(error, "Erro ao criar jogador");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJogador) return;
    try {
      setLoading(true);
      setError("");
      const updated = await jogadorService.update(selectedJogador.idJogador, formData);
      setJogador(updated);
      setIsEditModalOpen(false);
      alert("Jogador atualizado com sucesso!");
      carregarTodosJogadores();
    } catch (error) {
      handleError(error, "Erro ao atualizar jogador");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedJogador) return;
    try {
      setLoading(true);
      setError("");
      await jogadorService.delete(selectedJogador.idJogador);
      setIsDeleteModalOpen(false);
      alert("Jogador deletado com sucesso!");
      carregarTodosJogadores();
    } catch (error) {
      handleError(error, "Erro ao deletar jogador");
    } finally {
      setLoading(false);
    }
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'dadosId' ? (value ? parseInt(value) : null) : value });
  };

  const openEditModal = (jogador: Jogador) => {
    setSelectedJogador(jogador);
    setFormData({ nickname: jogador.nickname, dadosId: jogador.dadosId });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (jogador: Jogador) => {
    setSelectedJogador(jogador);
    setIsDeleteModalOpen(true);
  };

  const jogadorForm = (handleSubmit: (e: React.FormEvent) => void, submitText: string) => (
    <form onSubmit={handleSubmit}>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nickname">Nickname</Label>
          <Input id="nickname" name="nickname" placeholder="Nickname" value={formData.nickname} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dadosId">Dados ID (opcional)</Label>
          <Input id="dadosId" name="dadosId" type="number" placeholder="Dados ID" value={formData.dadosId ?? ""} onChange={handleInputChange} />
        </div>
        <Button type="submit">{submitText}</Button>
      </div>
    </form>
  );

  const renderJogadorList = (actions?: { onEdit?: (j: Jogador) => void; onDelete?: (j: Jogador) => void; }) => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Resultados ({jogadores.length} jogadores)</h3>
      {jogadores.length === 0 ? (
        <p className="text-muted-foreground">Nenhum jogador encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jogadores.map((j) => (
            <Card key={j.idJogador}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {j.nickname}
                  <span className="text-sm font-normal text-muted-foreground">ID: {j.idJogador}</span>
                </CardTitle>
                {j.dados && <CardDescription>Nível {j.dados.nivel} - {j.dados.rankJogador}</CardDescription>}
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                {j.dados ? (
                  <div>
                    <p><strong className="text-primary">K/D:</strong> {j.dados.kd}</p>
                    <p><strong className="text-primary">Winrate:</strong> {j.dados.winrate}%</p>
                    <p><strong className="text-primary">Horas Jogadas:</strong> {j.dados.horasJogadas}</p>
                    <p><strong className="text-primary">Plataforma:</strong> {j.dados.plataforma}</p>
                    <p><strong className="text-primary">Função Principal:</strong> {j.dados.mainRole}</p>
                  </div>
                ) : <p className="text-sm text-muted-foreground">Sem dados.</p>}
                <div className="flex gap-2">
                  {actions?.onEdit && <Button variant="outline" size="icon" onClick={() => actions.onEdit?.(j)}><Edit className="h-4 w-4" /></Button>}
                  {actions?.onDelete && <Button variant="destructive" size="icon" onClick={() => actions.onDelete?.(j)}><Trash2 className="h-4 w-4" /></Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = (tab: TabType) => {
    switch (tab) {
      case "listAll":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Todos os Jogadores</h2>
            <Button onClick={carregarTodosJogadores}><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Recarregar Lista</Button>
            <div className="mt-6">{renderJogadorList()}</div>
          </div>
        );
      case "findById":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Buscar Jogador por ID</h2>
            <div className="flex items-center gap-2 mb-6">
              <Input type="number" placeholder="Digite o ID do jogador" value={searchId || ""} onChange={(e) => setSearchId(parseInt(e.target.value) || 0)} />
              <Button onClick={buscarJogadorPorId}><Search className="mr-2 h-4 w-4" /> Buscar</Button>
            </div>
            {jogador && <Card>
              <CardHeader><CardTitle>{jogador.nickname}</CardTitle>{jogador.dados && <CardDescription>Nível {jogador.dados.nivel} - {jogador.dados.rankJogador}</CardDescription>}</CardHeader>
              <CardContent>{/* ... detailed view ... */}</CardContent>
            </Card>}
          </div>
        );
      case "create":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Criar Novo Jogador</h2>
            <Card>{jogadorForm(criarJogador, "Criar Jogador")}</Card>
          </div>
        );
      case "update":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Atualizar Jogador</h2>
            <p className="text-muted-foreground mb-4">Selecione um jogador da lista para editar.</p>
            {renderJogadorList({ onEdit: openEditModal })}
          </div>
        );
      case "delete":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Deletar Jogador</h2>
            <p className="text-muted-foreground mb-4">Selecione um jogador da lista para deletar.</p>
            {renderJogadorList({ onDelete: openDeleteModal })}
          </div>
        );
      case "minKd":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Jogadores por K/D Mínimo</h2>
            <div className="flex items-center gap-2 mb-6">
              <Input type="number" step="0.1" placeholder="K/D mínimo" value={minKd || ""} onChange={(e) => setMinKd(parseFloat(e.target.value) || 0)} />
              <Button onClick={buscarPorKdMinimo}><Search className="mr-2 h-4 w-4" /> Buscar</Button>
            </div>
            {renderJogadorList()}
          </div>
        );
      case "minWinRate":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Jogadores por Win Rate Mínimo</h2>
            <div className="flex items-center gap-2 mb-6">
              <Input type="number" step="0.1" placeholder="Win Rate mínimo" value={minWinRate || ""} onChange={(e) => setMinWinRate(parseFloat(e.target.value) || 0)} />
              <Button onClick={buscarPorWinRateMinimo}><Search className="mr-2 h-4 w-4" /> Buscar</Button>
            </div>
            {renderJogadorList()}
          </div>
        );
      case "minLevel":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Jogadores por Nível Mínimo</h2>
            <div className="flex items-center gap-2 mb-6">
              <Input type="number" placeholder="Nível mínimo" value={minLevel || ""} onChange={(e) => setMinLevel(parseInt(e.target.value) || 0)} />
              <Button onClick={buscarPorNivelMinimo}><Search className="mr-2 h-4 w-4" /> Buscar</Button>
            </div>
            {renderJogadorList()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Users className="h-10 w-10 text-primary" />
          Gerenciamento de Jogadores
        </h1>
        <p className="text-muted-foreground">
          Adicione, remova, atualize e consulte informações sobre os jogadores.
        </p>
      </header>

      {error && (
        <Card className="bg-destructive/10 border-destructive text-destructive-foreground mb-6">
          <CardContent className="p-4 flex items-center gap-3"><AlertTriangle className="h-5 w-5" /><p>{error}</p></CardContent>
        </Card>
      )}

      {loading && (
        <Card className="bg-primary/10 border-primary text-primary-foreground mb-6">
          <CardContent className="p-4 flex items-center gap-3"><Loader2 className="h-5 w-5 animate-spin" /><p>Carregando...</p></CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 h-auto">
          <TabsTrigger value="listAll">Listar Todos</TabsTrigger>
          <TabsTrigger value="findById">Buscar por ID</TabsTrigger>
          <TabsTrigger value="create">Criar</TabsTrigger>
          <TabsTrigger value="update">Atualizar</TabsTrigger>
          <TabsTrigger value="delete">Deletar</TabsTrigger>
          <TabsTrigger value="minKd">K/D Mín.</TabsTrigger>
          <TabsTrigger value="minWinRate">Win Rate Mín.</TabsTrigger>
          <TabsTrigger value="minLevel">Nível Mín.</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          {renderContent(activeTab)}
        </div>
      </Tabs>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Jogador: {selectedJogador?.nickname}</DialogTitle>
            <DialogDescription>Faça as alterações necessárias e clique em salvar.</DialogDescription>
          </DialogHeader>
          {jogadorForm(handleUpdateSubmit, "Salvar Alterações")}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Deleção</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja deletar o jogador <strong className="text-destructive">{selectedJogador?.nickname}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Deletar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Not Found Modal */}
      <Dialog open={isNotFoundModalOpen} onOpenChange={setIsNotFoundModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Busca sem Resultados</DialogTitle>
            <DialogDescription>
              Nenhum jogador foi encontrado com o ID <strong className="text-primary">{searchId}</strong>. Por favor, tente um ID diferente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsNotFoundModalOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
