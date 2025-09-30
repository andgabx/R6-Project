"use client";

import { useEffect, useState } from "react";
import { Arma, ArmaRequest } from "../../types/arma";
import { armaService } from "../../services/ArmaService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Crosshair, AlertTriangle, Loader2, Trash2, Search, Edit } from "lucide-react";

type TabType =
  | "listAll"
  | "findById"
  | "create"
  | "update"
  | "delete";

export default function ArmasPage() {
  const [activeTab, setActiveTab] = useState<TabType>("listAll");
  const [armas, setArmas] = useState<Arma[]>([]);
  const [arma, setArma] = useState<Arma | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form and Modal states
  const [formData, setFormData] = useState<ArmaRequest>({ nome: "", tipo: "", dano: 0 });
  const [selectedArma, setSelectedArma] = useState<Arma | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNotFoundModalOpen, setIsNotFoundModalOpen] = useState(false);

  const [searchId, setSearchId] = useState<number>(0);

  const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    setError(`${message}: ${errorMessage}`);
  };

  useEffect(() => {
    setError("");
    setArma(null);
    setArmas([]);
    if (["listAll", "update", "delete"].includes(activeTab)) {
      carregarTodasArmas();
    }
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
      setArma(null);
      const data = await armaService.findById(searchId);
      if (data) {
        setArma(data);
      } else {
        setIsNotFoundModalOpen(true);
      }
    } catch (error) {
        setIsNotFoundModalOpen(true);
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
      setFormData({ nome: "", tipo: "", dano: 0 });
      alert("Arma criada com sucesso!");
    } catch (error) {
      handleError(error, "Erro ao criar arma");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArma) return;
    try {
      setLoading(true);
      setError("");
      const updated = await armaService.update(selectedArma.idArma, formData);
      setArma(updated);
      setIsEditModalOpen(false);
      alert("Arma atualizada com sucesso!");
      carregarTodasArmas(); // Refresh list
    } catch (error) {
      handleError(error, "Erro ao atualizar arma");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedArma) return;
    try {
      setLoading(true);
      setError("");
      await armaService.delete(selectedArma.idArma);
      setIsDeleteModalOpen(false);
      alert("Arma deletada com sucesso!");
      carregarTodasArmas(); // Refresh list
    } catch (error) {
      handleError(error, "Erro ao deletar arma");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: ['dano'].includes(name) ? parseInt(value) || 0 : value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, tipo: value });
  };

  const openEditModal = (arma: Arma) => {
    setSelectedArma(arma);
    setFormData({ nome: arma.nome, tipo: arma.tipo, dano: arma.dano });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (arma: Arma) => {
    setSelectedArma(arma);
    setIsDeleteModalOpen(true);
  };

  const armaForm = (handleSubmit: (e: React.FormEvent) => void, submitText: string) => (
    <form onSubmit={handleSubmit}>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Arma</Label>
            <Input id="nome" name="nome" placeholder="Nome da arma" value={formData.nome} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Select name="tipo" value={formData.tipo} onValueChange={handleSelectChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Assault Rifles">Assault Rifles</SelectItem>
                <SelectItem value="Submachine Guns (SMGs)">Submachine Guns (SMGs)</SelectItem>
                <SelectItem value="Shotguns">Shotguns</SelectItem>
                <SelectItem value="Marksman Rifles">Marksman Rifles</SelectItem>
                <SelectItem value="Light Machine Guns (LMGs)">Light Machine Guns (LMGs)</SelectItem>
                <SelectItem value="Machine Pistols">Machine Pistols</SelectItem>
                <SelectItem value="Handguns">Handguns</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dano">Dano</Label>
          <Input id="dano" name="dano" type="number" placeholder="Dano" value={formData.dano || ""} onChange={handleInputChange} required />
        </div>
        <Button type="submit" className="w-full md:w-auto">
          {submitText}
        </Button>
      </div>
    </form>
  );

  const renderArmaList = (actions?: { onEdit?: (arma: Arma) => void; onDelete?: (arma: Arma) => void; }) => (
    <div>
      <h3 className="text-xl font-semibold mb-4">Resultados ({armas.length} armas)</h3>
      {armas.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma arma encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {armas.map((a) => (
            <Card key={a.idArma}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {a.nome}
                  <span className="text-sm font-normal text-muted-foreground">ID: {a.idArma}</span>
                </CardTitle>
                <CardDescription>{a.tipo}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p><strong className="text-primary">Dano:</strong> {a.dano}</p>
                <div className="flex gap-2">
                  {actions?.onEdit && <Button variant="outline" size="icon" onClick={() => actions.onEdit?.(a)}><Edit className="h-4 w-4" /></Button>}
                  {actions?.onDelete && <Button variant="destructive" size="icon" onClick={() => actions.onDelete?.(a)}><Trash2 className="h-4 w-4" /></Button>}
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
            <h2 className="text-2xl font-bold mb-4">Todas as Armas</h2>
            <Button onClick={carregarTodasArmas}><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Recarregar Lista</Button>
            <div className="mt-6">{renderArmaList()}</div>
          </div>
        );
      case "findById":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Buscar Arma por ID</h2>
            <div className="flex items-center gap-2 mb-6">
              <Input type="number" placeholder="Digite o ID da arma" value={searchId || ""} onChange={(e) => setSearchId(parseInt(e.target.value) || 0)} />
              <Button onClick={buscarArmaPorId}><Search className="mr-2 h-4 w-4" /> Buscar</Button>
            </div>
            {arma && <Card>
              <CardHeader><CardTitle>{arma.nome}</CardTitle><CardDescription>{arma.tipo}</CardDescription></CardHeader>
              <CardContent><p><strong className="text-primary">Dano:</strong> {arma.dano}</p></CardContent>
            </Card>}
          </div>
        );
      case "create":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Criar Nova Arma</h2>
            <Card>{armaForm(criarArma, "Criar Arma")}</Card>
          </div>
        );
      case "update":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Atualizar Arma</h2>
            <p className="text-muted-foreground mb-4">Selecione uma arma da lista para editar.</p>
            {renderArmaList({ onEdit: openEditModal })}
          </div>
        );
      case "delete":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Deletar Arma</h2>
            <p className="text-muted-foreground mb-4">Selecione uma arma da lista para deletar.</p>
            {renderArmaList({ onDelete: openDeleteModal })}
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
          <Crosshair className="h-10 w-10 text-primary" />
          Gerenciamento de Armas
        </h1>
        <p className="text-muted-foreground">
          Adicione, remova, atualize e consulte informações sobre as armas do jogo.
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
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 h-auto">
          <TabsTrigger value="listAll">Listar Todas</TabsTrigger>
          <TabsTrigger value="findById">Buscar por ID</TabsTrigger>
          <TabsTrigger value="create">Criar</TabsTrigger>
          <TabsTrigger value="update">Atualizar</TabsTrigger>
          <TabsTrigger value="delete">Deletar</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          {renderContent(activeTab)}
        </div>
      </Tabs>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Arma: {selectedArma?.nome}</DialogTitle>
            <DialogDescription>Faça as alterações necessárias e clique em salvar.</DialogDescription>
          </DialogHeader>
          {armaForm(handleUpdateSubmit, "Salvar Alterações")}
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Deleção</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja deletar a arma <strong className="text-destructive">{selectedArma?.nome}</strong>? Esta ação não pode ser desfeita.
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
              Nenhuma arma foi encontrada com o ID <strong className="text-primary">{searchId}</strong>. Por favor, tente um ID diferente.
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
