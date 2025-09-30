"use client";

import { useEffect, useState } from "react";
import { Jogador, JogadorRequest } from "../../types/jogador";
import { jogadorService } from "../../services/JogadorService";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Users,
    AlertTriangle,
    Loader2,
    Trash2,
    Search,
    Edit,
    UserPlus,
    Plus,
    X,
} from "lucide-react";

type TabType =
    | "listAll"
    | "findById"
    | "create"
    | "update"
    | "delete"
    | "minKd"
    | "minWinRate"
    | "minLevel";

export default function JogadoresPage() {
    const [activeTab, setActiveTab] = useState<TabType>("listAll");
    const [jogadores, setJogadores] = useState<Jogador[]>([]);
    const [jogador, setJogador] = useState<Jogador | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    // Form and Modal states - ATUALIZADO para o formato correto
    const [formData, setFormData] = useState<JogadorRequest>({
        nickname: "",
        dados: {
            nivel: 1,
            winrate: 50.0,
            rankJogador: "Bronze",
            headshot: 0.0,
            kd: 1.0,
            plataforma: "PC",
            horasJogadas: 0,
            mainRole: "Suporte",
            preferenciaJogo: "Casual",
            mapaFavoritoId: null,
            mapaMaisVitoriasId: null,
            mapaMaisDerrotasId: null
        },
        operadoresAtaque: [],
        operadoresDefesa: []
    });

    const [selectedJogador, setSelectedJogador] = useState<Jogador | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNotFoundModalOpen, setIsNotFoundModalOpen] = useState(false);

    const [searchId, setSearchId] = useState<number>(0);
    const [minKd, setMinKd] = useState<number>(0);
    const [minWinRate, setMinWinRate] = useState<number>(0);
    const [minLevel, setMinLevel] = useState<number>(0);

    // Estados para novos operadores
    const [novoOperadorAtaque, setNovoOperadorAtaque] = useState({ operadorId: 0, winrate: 0 });
    const [novoOperadorDefesa, setNovoOperadorDefesa] = useState({ operadorId: 0, winrate: 0 });

    const handleError = (error: unknown, message: string) => {
        console.error(message, error);
        const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";
        setError(`${message}: ${errorMessage}`);
    };

    useEffect(() => {
        setError("");
        setJogador(null);
        setJogadores([]);
        if (
            [
                "listAll",
                "update",
                "delete",
                "minKd",
                "minWinRate",
                "minLevel",
            ].includes(activeTab)
        ) {
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
            handleError(error, `Não foi possível encontrar o jogador com ID ${searchId}`);
        } finally {
            setLoading(false);
        }
    };

    // FUNÇÃO CRIAR JOGADOR ATUALIZADA
    const criarJogador = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const created = await jogadorService.create(formData);
            setJogador(created);
            // Reset do form
            setFormData({
                nickname: "",
                dados: {
                    nivel: 1,
                    winrate: 50.0,
                    rankJogador: "Bronze",
                    headshot: 0.0,
                    kd: 1.0,
                    plataforma: "PC",
                    horasJogadas: 0,
                    mainRole: "Suporte",
                    preferenciaJogo: "Casual",
                    mapaFavoritoId: null,
                    mapaMaisVitoriasId: null,
                    mapaMaisDerrotasId: null
                },
                operadoresAtaque: [],
                operadoresDefesa: []
            });
            alert("Jogador criado com sucesso!");
        } catch (error) {
            handleError(error, "Erro ao criar jogador");
        } finally {
            setLoading(false);
        }
    };

    // FUNÇÃO ATUALIZAR JOGADOR ATUALIZADA
    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJogador) return;
        
        try {
            setLoading(true);
            setError("");
            
            // Construir o objeto de atualização com base no selectedJogador
            const updateData: JogadorRequest = {
                nickname: selectedJogador.nickname,
                dados: {
                    nivel: selectedJogador.dados?.nivel || 1,
                    winrate: selectedJogador.dados?.winrate || 50.0,
                    rankJogador: selectedJogador.dados?.rankJogador || "Bronze",
                    headshot: selectedJogador.dados?.headshot || 0.0,
                    kd: selectedJogador.dados?.kd || 1.0,
                    plataforma: selectedJogador.dados?.plataforma || "PC",
                    horasJogadas: selectedJogador.dados?.horasJogadas || 0,
                    mainRole: selectedJogador.dados?.mainRole || "Suporte",
                    preferenciaJogo: selectedJogador.dados?.preferenciaJogo || "Casual",
                    mapaFavoritoId: selectedJogador.dados?.mapaFavorito?.idMapa || null,
                    mapaMaisVitoriasId: selectedJogador.dados?.mapaMaisVitorias?.idMapa || null,
                    mapaMaisDerrotasId: selectedJogador.dados?.mapaMaisDerrotas?.idMapa || null
                },
                operadoresAtaque: selectedJogador.operadoresAtaque.map(op => ({
                    nomeOperador: op.nomeOperador || 0,
                    winrate: op.winrate || 0
                })),
                operadoresDefesa: selectedJogador.operadoresDefesa.map(op => ({
                    nomeOperador: op.nomeOperador || 0,
                    winrate: op.winrate || 0
                }))
            };

            const updated = await jogadorService.update(selectedJogador.idJogador, updateData);
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

    // FUNÇÃO ATUALIZADA PARA LIDAR COM O NOVO FORMATO
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section?: string
    ) => {
        const { name, value } = e.target;
        
        if (section === "dados") {
            const isNumeric = ["nivel", "winrate", "headshot", "kd", "horasJogadas", "mapaFavoritoId", "mapaMaisVitoriasId", "mapaMaisDerrotasId"].includes(name);
            setFormData({
                ...formData,
                dados: {
                    ...formData.dados,
                    [name]: isNumeric ? (value ? Number(value) : (name.includes("Id") ? null : 0)) : value,
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Funções para gerenciar operadores
    const adicionarOperadorAtaque = () => {
        if (novoOperadorAtaque.operadorId <= 0 || novoOperadorAtaque.winrate <= 0) {
            return;
        }
        setFormData({
            ...formData,
            operadoresAtaque: [...formData.operadoresAtaque, { ...novoOperadorAtaque }]
        });
        setNovoOperadorAtaque({ operadorId: 0, winrate: 0 });
    };

    const adicionarOperadorDefesa = () => {
        if (novoOperadorDefesa.operadorId <= 0 || novoOperadorDefesa.winrate <= 0) {
            return;
        }
        setFormData({
            ...formData,
            operadoresDefesa: [...formData.operadoresDefesa, { ...novoOperadorDefesa }]
        });
        setNovoOperadorDefesa({ operadorId: 0, winrate: 0 });
    };

    const removerOperadorAtaque = (index: number) => {
        setFormData({
            ...formData,
            operadoresAtaque: formData.operadoresAtaque.filter((_, i) => i !== index)
        });
    };

    const removerOperadorDefesa = (index: number) => {
        setFormData({
            ...formData,
            operadoresDefesa: formData.operadoresDefesa.filter((_, i) => i !== index)
        });
    };

    // Função para manipular mudanças nos campos de edição
    const handleEditInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section?: string,
        index?: number,
        field?: string
    ) => {
        const { name, value } = event.target;
        if (!selectedJogador) return;

        if (section === "dados") {
            setSelectedJogador((prev) =>
                prev
                    ? {
                          ...prev,
                          dados: prev.dados ? {
                              ...prev.dados,
                              [name]:
                                  name === "nivel" ||
                                  name === "winrate" ||
                                  name === "headshot" ||
                                  name === "kd" ||
                                  name === "horasJogadas"
                                      ? Number(value)
                                      : value,
                          } : prev.dados,
                      }
                    : prev
            );
        } else if (
            section === "operadoresAtaque" &&
            typeof index === "number" &&
            field
        ) {
            setSelectedJogador((prev) => {
                if (!prev) return prev;
                const newOperadoresAtaque = [...prev.operadoresAtaque];
                newOperadoresAtaque[index] = {
                    ...newOperadoresAtaque[index],
                    [field]:
                        field === "operadorId" || field === "winrate"
                            ? Number(value)
                            : value,
                };
                return {
                    ...prev,
                    operadoresAtaque: newOperadoresAtaque,
                };
            });
        } else if (
            section === "operadoresDefesa" &&
            typeof index === "number" &&
            field
        ) {
            setSelectedJogador((prev) => {
                if (!prev) return prev;
                const newOperadoresDefesa = [...prev.operadoresDefesa];
                newOperadoresDefesa[index] = {
                    ...newOperadoresDefesa[index],
                    [field]:
                        field === "operadorId" || field === "winrate"
                            ? Number(value)
                            : value,
                };
                return {
                    ...prev,
                    operadoresDefesa: newOperadoresDefesa,
                };
            });
        } else {
            setSelectedJogador((prev) =>
                prev
                    ? {
                          ...prev,
                          [name]: value,
                      }
                    : prev
            );
        }
    };

    // Formulário de edição de jogador
    const jogadorEditForm = () => {
        if (!selectedJogador) return null;
        return (
            <form onSubmit={handleUpdateSubmit} className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input
                        id="nickname"
                        name="nickname"
                        value={selectedJogador.nickname}
                        onChange={handleEditInputChange}
                        required
                    />
                </div>

                <fieldset className="border p-4 rounded">
                    <legend className="font-semibold">Dados</legend>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="nivel">Nível</Label>
                            <Input
                                id="nivel"
                                name="nivel"
                                type="number"
                                value={selectedJogador.dados?.nivel || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="winrate">Winrate</Label>
                            <Input
                                id="winrate"
                                name="winrate"
                                type="number"
                                step="0.01"
                                value={selectedJogador.dados?.winrate || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="rankJogador">Rank Jogador</Label>
                            <Input
                                id="rankJogador"
                                name="rankJogador"
                                value={selectedJogador.dados?.rankJogador || ""}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="headshot">Headshot</Label>
                            <Input
                                id="headshot"
                                name="headshot"
                                type="number"
                                step="0.01"
                                value={selectedJogador.dados?.headshot || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="kd">K/D</Label>
                            <Input
                                id="kd"
                                name="kd"
                                type="number"
                                step="0.01"
                                value={selectedJogador.dados?.kd || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="plataforma">Plataforma</Label>
                            <Input
                                id="plataforma"
                                name="plataforma"
                                value={selectedJogador.dados?.plataforma || ""}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="horasJogadas">Horas Jogadas</Label>
                            <Input
                                id="horasJogadas"
                                name="horasJogadas"
                                type="number"
                                value={selectedJogador.dados?.horasJogadas || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="mainRole">Main Role</Label>
                            <Input
                                id="mainRole"
                                name="mainRole"
                                value={selectedJogador.dados?.mainRole || ""}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="preferenciaJogo">Preferência de Jogo</Label>
                            <Input
                                id="preferenciaJogo"
                                name="preferenciaJogo"
                                value={selectedJogador.dados?.preferenciaJogo || ""}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                    </div>
                </fieldset>

                <Button type="submit">Salvar Alterações</Button>
            </form>
        );
    };

    const openEditModal = (jogador: Jogador) => {
        setSelectedJogador(jogador);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (jogador: Jogador) => {
        setSelectedJogador(jogador);
        setIsDeleteModalOpen(true);
    };

    // FORMULÁRIO COMPLETO PARA CRIAÇÃO
    const jogadorForm = (
        handleSubmit: (e: React.FormEvent) => void,
        submitText: string
    ) => (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 space-y-4">
                {/* Informações básicas */}
                <div className="space-y-2">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input
                        id="nickname"
                        name="nickname"
                        placeholder="Nickname do jogador"
                        value={formData.nickname}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Dados do jogador */}
                <fieldset className="border p-4 rounded space-y-4">
                    <legend className="font-semibold">Dados do Jogador</legend>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="nivel">Nível</Label>
                            <Input
                                id="nivel"
                                name="nivel"
                                type="number"
                                placeholder="Nível"
                                value={formData.dados.nivel}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="winrate">Winrate (%)</Label>
                            <Input
                                id="winrate"
                                name="winrate"
                                type="number"
                                step="0.01"
                                placeholder="Winrate"
                                value={formData.dados.winrate}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="rankJogador">Rank</Label>
                            <Input
                                id="rankJogador"
                                name="rankJogador"
                                placeholder="Ex: Emerald IV"
                                value={formData.dados.rankJogador}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="headshot">Headshot (%)</Label>
                            <Input
                                id="headshot"
                                name="headshot"
                                type="number"
                                step="0.01"
                                placeholder="Headshot"
                                value={formData.dados.headshot}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="kd">K/D</Label>
                            <Input
                                id="kd"
                                name="kd"
                                type="number"
                                step="0.01"
                                placeholder="K/D Ratio"
                                value={formData.dados.kd}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="plataforma">Plataforma</Label>
                            <Input
                                id="plataforma"
                                name="plataforma"
                                placeholder="PC, Xbox, PlayStation"
                                value={formData.dados.plataforma}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="horasJogadas">Horas Jogadas</Label>
                            <Input
                                id="horasJogadas"
                                name="horasJogadas"
                                type="number"
                                placeholder="Horas jogadas"
                                value={formData.dados.horasJogadas}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="mainRole">Função Principal</Label>
                            <Input
                                id="mainRole"
                                name="mainRole"
                                placeholder="Suporte, Fragger, etc."
                                value={formData.dados.mainRole}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="preferenciaJogo">Preferência de Jogo</Label>
                            <Input
                                id="preferenciaJogo"
                                name="preferenciaJogo"
                                placeholder="Ranked, Casual, etc."
                                value={formData.dados.preferenciaJogo}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="mapaFavoritoId">ID Mapa Favorito (Opcional)</Label>
                            <Input
                                id="mapaFavoritoId"
                                name="mapaFavoritoId"
                                type="number"
                                placeholder="ID do mapa"
                                value={formData.dados.mapaFavoritoId || ""}
                                onChange={(e) => handleInputChange(e, "dados")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="mapaMaisVitoriasId">ID Mapa Mais Vitórias (Opcional)</Label>
                            <Input
                                id="mapaMaisVitoriasId"
                                name="mapaMaisVitoriasId"
                                type="number"
                                placeholder="ID do mapa"
                                value={formData.dados.mapaMaisVitoriasId || ""}
                                onChange={(e) => handleInputChange(e, "dados")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="mapaMaisDerrotasId">ID Mapa Mais Derrotas (Opcional)</Label>
                            <Input
                                id="mapaMaisDerrotasId"
                                name="mapaMaisDerrotasId"
                                type="number"
                                placeholder="ID do mapa"
                                value={formData.dados.mapaMaisDerrotasId || ""}
                                onChange={(e) => handleInputChange(e, "dados")}
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Operadores de Ataque */}
                <fieldset className="border p-4 rounded space-y-4">
                    <legend className="font-semibold">Operadores de Ataque</legend>
                    
                    {/* Lista de operadores de ataque */}
                    {formData.operadoresAtaque.map((op, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <div className="flex-1">
                                <span>Operador ID: {op.operadorId} - Winrate: {op.winrate}%</span>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removerOperadorAtaque(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    
                    {/* Adicionar novo operador de ataque */}
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="ID do Operador"
                            value={novoOperadorAtaque.operadorId || ""}
                            onChange={(e) => setNovoOperadorAtaque({
                                ...novoOperadorAtaque,
                                operadorId: parseInt(e.target.value) || 0
                            })}
                        />
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Winrate"
                            value={novoOperadorAtaque.winrate || ""}
                            onChange={(e) => setNovoOperadorAtaque({
                                ...novoOperadorAtaque,
                                winrate: parseFloat(e.target.value) || 0
                            })}
                        />
                        <Button
                            type="button"
                            onClick={adicionarOperadorAtaque}
                            disabled={!novoOperadorAtaque.operadorId || !novoOperadorAtaque.winrate}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </fieldset>

                {/* Operadores de Defesa */}
                <fieldset className="border p-4 rounded space-y-4">
                    <legend className="font-semibold">Operadores de Defesa</legend>
                    
                    {/* Lista de operadores de defesa */}
                    {formData.operadoresDefesa.map((op, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <div className="flex-1">
                                <span>Operador ID: {op.operadorId} - Winrate: {op.winrate}%</span>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removerOperadorDefesa(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    
                    {/* Adicionar novo operador de defesa */}
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="ID do Operador"
                            value={novoOperadorDefesa.operadorId || ""}
                            onChange={(e) => setNovoOperadorDefesa({
                                ...novoOperadorDefesa,
                                operadorId: parseInt(e.target.value) || 0
                            })}
                        />
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Winrate"
                            value={novoOperadorDefesa.winrate || ""}
                            onChange={(e) => setNovoOperadorDefesa({
                                ...novoOperadorDefesa,
                                winrate: parseFloat(e.target.value) || 0
                            })}
                        />
                        <Button
                            type="button"
                            onClick={adicionarOperadorDefesa}
                            disabled={!novoOperadorDefesa.operadorId || !novoOperadorDefesa.winrate}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </fieldset>

                <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {submitText}
                </Button>
            </div>
        </form>
    );

    const renderJogadorList = (actions?: {
        onEdit?: (j: Jogador) => void;
        onDelete?: (j: Jogador) => void;
    }) => (
        <div>
            <h3 className="text-xl font-semibold mb-4">
                Resultados ({jogadores.length} jogadores)
            </h3>
            {jogadores.length === 0 ? (
                <p className="text-muted-foreground">
                    Nenhum jogador encontrado.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jogadores.map((j) => (
                        <Card key={j.idJogador}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {j.nickname}
                                    <span className="text-sm font-normal text-muted-foreground">
                                        ID: {j.idJogador}
                                    </span>
                                </CardTitle>
                                {j.dados && (
                                    <CardDescription>
                                        Nível {j.dados.nivel} -{" "}
                                        {j.dados.rankJogador}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                                {j.dados ? (
                                    <div>
                                        <p>
                                            <strong className="text-primary">
                                                K/D:
                                            </strong>{" "}
                                            {j.dados.kd}
                                        </p>
                                        <p>
                                            <strong className="text-primary">
                                                Winrate:
                                            </strong>{" "}
                                            {j.dados.winrate}%
                                        </p>
                                        <p>
                                            <strong className="text-primary">
                                                Horas Jogadas:
                                            </strong>{" "}
                                            {j.dados.horasJogadas}
                                        </p>
                                        <p>
                                            <strong className="text-primary">
                                                Plataforma:
                                            </strong>{" "}
                                            {j.dados.plataforma}
                                        </p>
                                        <p>
                                            <strong className="text-primary">
                                                Função Principal:
                                            </strong>{" "}
                                            {j.dados.mainRole}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Sem dados.
                                    </p>
                                )}
                                <div className="flex gap-2">
                                    {actions?.onEdit && (
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => actions.onEdit?.(j)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    )}
                                    {actions?.onDelete && (
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() =>
                                                actions.onDelete?.(j)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
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
                        <h2 className="text-2xl font-bold mb-4">
                            Todos os Jogadores
                        </h2>
                        <Button onClick={carregarTodosJogadores}>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Recarregar Lista
                        </Button>
                        <div className="mt-6">{renderJogadorList()}</div>
                    </div>
                );
            case "findById":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Buscar Jogador por ID
                        </h2>
                        <div className="flex items-center gap-2 mb-6">
                            <Input
                                type="number"
                                placeholder="Digite o ID do jogador"
                                value={searchId || ""}
                                onChange={(e) =>
                                    setSearchId(parseInt(e.target.value) || 0)
                                }
                            />
                            <Button onClick={buscarJogadorPorId}>
                                <Search className="mr-2 h-4 w-4" /> Buscar
                            </Button>
                        </div>
                        {jogador && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{jogador.nickname}</CardTitle>
                                    {jogador.dados && (
                                        <CardDescription>
                                            Nível {jogador.dados.nivel} -{" "}
                                            {jogador.dados.rankJogador}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    {/* Detalhes do jogador encontrado */}
                                    {jogador.dados && (
                                        <div className="space-y-2">
                                            <p><strong>K/D:</strong> {jogador.dados.kd}</p>
                                            <p><strong>Winrate:</strong> {jogador.dados.winrate}%</p>
                                            <p><strong>Headshot:</strong> {jogador.dados.headshot}%</p>
                                            <p><strong>Plataforma:</strong> {jogador.dados.plataforma}</p>
                                            <p><strong>Horas jogadas:</strong> {jogador.dados.horasJogadas}</p>
                                            <p><strong>Função Principal:</strong> {jogador.dados.mainRole}</p>
                                            <p><strong>Preferência de jogo:</strong> {jogador.dados.preferenciaJogo}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                );
            case "create":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Criar Novo Jogador
                        </h2>
                        <Card className="max-h-96 overflow-y-auto">
                            {jogadorForm(criarJogador, "Criar Jogador")}
                        </Card>
                    </div>
                );
            case "update":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Atualizar Jogador
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            Selecione um jogador da lista para editar.
                        </p>
                        {renderJogadorList({ onEdit: openEditModal })}
                    </div>
                );
            case "delete":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Deletar Jogador
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            Selecione um jogador da lista para deletar.
                        </p>
                        {renderJogadorList({ onDelete: openDeleteModal })}
                    </div>
                );
            case "minKd":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Jogadores por K/D Mínimo
                        </h2>
                        <div className="flex items-center gap-2 mb-6">
                            <Input
                                type="number"
                                step="0.1"
                                placeholder="K/D mínimo"
                                value={minKd || ""}
                                onChange={(e) =>
                                    setMinKd(parseFloat(e.target.value) || 0)
                                }
                            />
                            <Button onClick={buscarPorKdMinimo}>
                                <Search className="mr-2 h-4 w-4" /> Buscar
                            </Button>
                        </div>
                        {renderJogadorList()}
                    </div>
                );
            case "minWinRate":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Jogadores por Win Rate Mínimo
                        </h2>
                        <div className="flex items-center gap-2 mb-6">
                            <Input
                                type="number"
                                step="0.1"
                                placeholder="Win Rate mínimo"
                                value={minWinRate || ""}
                                onChange={(e) =>
                                    setMinWinRate(
                                        parseFloat(e.target.value) || 0
                                    )
                                }
                            />
                            <Button onClick={buscarPorWinRateMinimo}>
                                <Search className="mr-2 h-4 w-4" /> Buscar
                            </Button>
                        </div>
                        {renderJogadorList()}
                    </div>
                );
            case "minLevel":
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Jogadores por Nível Mínimo
                        </h2>
                        <div className="flex items-center gap-2 mb-6">
                            <Input
                                type="number"
                                placeholder="Nível mínimo"
                                value={minLevel || ""}
                                onChange={(e) =>
                                    setMinLevel(parseInt(e.target.value) || 0)
                                }
                            />
                            <Button onClick={buscarPorNivelMinimo}>
                                <Search className="mr-2 h-4 w-4" /> Buscar
                            </Button>
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
                    Adicione, remova, atualize e consulte informações sobre os
                    jogadores.
                </p>
            </header>

            {error && (
                <Card className="bg-destructive/10 border-destructive text-destructive-foreground mb-6">
                    <CardContent className="p-4 flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5" />
                        <p>{error}</p>
                    </CardContent>
                </Card>
            )}

            {loading && (
                <Card className="bg-primary/10 border-primary text-primary-foreground mb-6">
                    <CardContent className="p-4 flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <p>Carregando...</p>
                    </CardContent>
                </Card>
            )}

            <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as TabType)}
                className="w-full"
            >
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
                <TabsContent value={activeTab} className="mt-6">
                    {renderContent(activeTab)}
                </TabsContent>
            </Tabs>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Editar Jogador: {selectedJogador?.nickname}
                        </DialogTitle>
                        <DialogDescription>
                            Faça as alterações necessárias e clique em salvar.
                        </DialogDescription>
                    </DialogHeader>
                    {jogadorEditForm()}
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Deleção</DialogTitle>
                        <DialogDescription>
                            Você tem certeza que deseja deletar o jogador{" "}
                            <strong className="text-destructive">
                                {selectedJogador?.nickname}
                            </strong>
                            ? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                        >
                            Deletar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Not Found Modal */}
            <Dialog
                open={isNotFoundModalOpen}
                onOpenChange={setIsNotFoundModalOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Busca sem Resultados</DialogTitle>
                        <DialogDescription>
                            Nenhum jogador foi encontrado com o ID{" "}
                            <strong className="text-primary">{searchId}</strong>
                            . Por favor, tente um ID diferente.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setIsNotFoundModalOpen(false)}>
                            Fechar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}