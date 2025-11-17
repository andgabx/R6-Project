"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Trash2, Edit, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter as DialogFooterComponent, // Renomeado para evitar conflito
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { jogadorService } from "@/services/JogadorService";
import { Jogador, JogadorRequest } from "@/types/jogador";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { mapaService } from "@/services/MapaService";
import { Mapa } from "@/types/mapa";
import { operadorService } from "@/services/OperadorService";
import { Operador } from "@/types/operador";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ListAllProps {
    jogadores: Jogador[];
    setJogadores: (jogadores: Jogador[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
}

export default function ListAll({
    jogadores,
    setJogadores,
    loading,
    setLoading,
    setError,
}: ListAllProps) {
    const [selectedJogador, setSelectedJogador] = useState<Jogador | null>(
        null
    );
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [localSearchId, setLocalSearchId] = useState<number>(0);
    const [searchedJogador, setSearchedJogador] = useState<Jogador | null>(
        null
    );
    const [minKd, setMinKd] = useState<number>(0);
    const [minWinRate, setMinWinRate] = useState<number>(0);
    const [minLevel, setMinLevel] = useState<number>(0);
    const [activeSearch, setActiveSearch] = useState<
        "id" | "kd" | "winrate" | "level" | null
    >(null);
    const [mapas, setMapas] = useState<Mapa[]>([]);
    const [operadores, setOperadores] = useState<Operador[]>([]);
    const [rankNome, setRankNome] = useState<string>("Bronze");
    const [rankNumero, setRankNumero] = useState<string>("I");
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filterRankNome, setFilterRankNome] = useState<string>("");
    const [filterRankNumero, setFilterRankNumero] = useState<string>("");
    const [allJogadores, setAllJogadores] = useState<Jogador[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mapasData, operadoresData] = await Promise.all([
                    mapaService.listAll(),
                    operadorService.listAll(),
                ]);
                setMapas(mapasData);
                setOperadores(operadoresData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, []);

    // Parsear rank quando jogador é selecionado
    useEffect(() => {
        if (selectedJogador?.dados?.rankJogador) {
            const rank = selectedJogador.dados.rankJogador;
            // Tentar separar nome e número (ex: "Ouro I" -> ["Ouro", "I"])
            const parts = rank.split(" ");
            if (parts.length >= 2) {
                const numero = parts[parts.length - 1];
                const nome = parts.slice(0, -1).join(" ");
                if (["I", "II", "III", "IV", "V"].includes(numero)) {
                    setRankNome(nome);
                    setRankNumero(numero);
                } else {
                    setRankNome(rank);
                    setRankNumero("none");
                }
            } else {
                setRankNome(rank);
                setRankNumero("none");
            }
        }
    }, [selectedJogador]);

    // Função para obter ID do mapa pelo nome
    const getMapaIdByName = (nome: string | null): number | null => {
        if (!nome) return null;
        const mapa = mapas.find((m) => m.nome === nome);
        return mapa ? mapa.idMapa : null;
    };

    // Função para obter nome do mapa pelo ID
    const getMapaNameById = (id: number | null): string => {
        if (!id) return "none";
        const mapa = mapas.find((m) => m.idMapa === id);
        return mapa ? mapa.nome : "none";
    };

    // Funções auxiliares para operadores
    const getOperadorIdByName = (nome: string | null): number | null => {
        if (!nome || nome === "none") return null;
        const operador = operadores.find((o) => o.nome === nome);
        return operador ? operador.idOperador : null;
    };

    const getOperadorNameById = (id: number | null): string => {
        if (!id) return "none";
        const operador = operadores.find((o) => o.idOperador === id);
        return operador ? operador.nome : "none";
    };

    const operadoresAtaque = operadores.filter((o) => o.funcao === "Ataque");
    const operadoresDefesa = operadores.filter((o) => o.funcao === "Defesa");

    // Handler para atualizar rank
    const handleRankChange = (nome: string, numero: string) => {
        setRankNome(nome);
        setRankNumero(numero);
        const rankCompleto = numero === "none" ? nome : `${nome} ${numero}`;
        if (selectedJogador) {
            setSelectedJogador({
                ...selectedJogador,
                dados: {
                    ...selectedJogador.dados!,
                    rankJogador: rankCompleto,
                },
            });
        }
    };

    const carregarTodosJogadores = async (showToast = false) => {
        try {
            setLoading(true);
            setError("");
            const perfis = await jogadorService.listPerfis();
            // Converter JogadorPerfil[] para Jogador[] para manter compatibilidade
            const jogadoresConvertidos: Jogador[] = perfis.map((perfil) => ({
                idJogador: perfil.idJogador,
                nickname: perfil.nickname,
                dados: {
                    id: 0,
                    nivel: perfil.nivel,
                    winrate: perfil.winrateGeral,
                    rankJogador: perfil.rankJogador,
                    headshot: 0,
                    kd: perfil.kd,
                    plataforma: perfil.plataforma,
                    horasJogadas: perfil.horasJogadas,
                    mainRole: "",
                    preferenciaJogo: "",
                    mapaFavorito: perfil.mapaFavorito
                        ? { idMapa: 0, nome: perfil.mapaFavorito }
                        : null,
                    mapaMaisVitorias: perfil.mapaMaisVitorias
                        ? { idMapa: 0, nome: perfil.mapaMaisVitorias }
                        : null,
                    mapaMaisDerrotas: perfil.mapaMaisDerrotas
                        ? { idMapa: 0, nome: perfil.mapaMaisDerrotas }
                        : null,
                },
                operadoresAtaque: [],
                operadoresDefesa: [],
            }));
            setAllJogadores(jogadoresConvertidos);
            aplicarFiltroRank(jogadoresConvertidos);
            setSearchedJogador(null);
            setActiveSearch(null);
            if (showToast) {
                toast.success("Lista de jogadores carregada com sucesso!", {
                    position: "bottom-center",
                });
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao carregar jogadores: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    };

    const buscarJogadorPorId = async () => {
        if (!localSearchId) {
            toast.error("Por favor, insira um ID válido", {
                position: "bottom-center",
            });
            return;
        }
        try {
            setLoading(true);
            setError("");
            setSearchedJogador(null);
            setActiveSearch("id");
            const data = await jogadorService.findById(localSearchId);
            if (data) {
                setSearchedJogador(data);
                // Filtra a lista para mostrar apenas o jogador encontrado
                // Não aplica filtro de rank quando busca por ID específico
                setAllJogadores([data]);
                setJogadores([data]);
                toast.success(`Jogador encontrado: ${data.nickname}`, {
                    position: "bottom-center",
                });
            } else {
                toast.error(
                    `Nenhum jogador foi encontrado com o ID ${localSearchId}`,
                    {
                        position: "bottom-center",
                    }
                );
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(
                `Não foi possível encontrar o jogador com ID ${localSearchId}: ${errorMessage}`,
                {
                    position: "bottom-center",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const buscarPorKdMinimo = async () => {
        if (!minKd || minKd <= 0) {
            toast.error("Por favor, insira um K/D mínimo válido", {
                position: "bottom-center",
            });
            return;
        }
        try {
            setLoading(true);
            setError("");
            setActiveSearch("kd");
            const data = await jogadorService.listByMinKd(minKd);
            setAllJogadores(data);
            aplicarFiltroRank(data);
            toast.success(
                `Encontrados ${data.length} jogador(es) com K/D mínimo de ${minKd}`,
                {
                    position: "bottom-center",
                }
            );
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(
                `Erro ao buscar jogadores por K/D mínimo: ${errorMessage}`,
                {
                    position: "bottom-center",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const buscarPorWinRateMinimo = async () => {
        if (!minWinRate || minWinRate <= 0) {
            toast.error("Por favor, insira um Win Rate mínimo válido", {
                position: "bottom-center",
            });
            return;
        }
        try {
            setLoading(true);
            setError("");
            setActiveSearch("winrate");
            const data = await jogadorService.listByMinWinRate(minWinRate);
            setAllJogadores(data);
            aplicarFiltroRank(data);
            toast.success(
                `Encontrados ${data.length} jogador(es) com Win Rate mínimo de ${minWinRate}%`,
                {
                    position: "bottom-center",
                }
            );
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(
                `Erro ao buscar jogadores por Win Rate mínimo: ${errorMessage}`,
                {
                    position: "bottom-center",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const buscarPorNivelMinimo = async () => {
        if (!minLevel || minLevel <= 0) {
            toast.error("Por favor, insira um nível mínimo válido", {
                position: "bottom-center",
            });
            return;
        }
        try {
            setLoading(true);
            setError("");
            setActiveSearch("level");
            const data = await jogadorService.listByMinLevel(minLevel);
            setAllJogadores(data);
            aplicarFiltroRank(data);
            toast.success(
                `Encontrados ${data.length} jogador(es) com nível mínimo de ${minLevel}`,
                {
                    position: "bottom-center",
                }
            );
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(
                `Erro ao buscar jogadores por nível mínimo: ${errorMessage}`,
                {
                    position: "bottom-center",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const limparBusca = () => {
        setLocalSearchId(0);
        setSearchedJogador(null);
        setMinKd(0);
        setMinWinRate(0);
        setMinLevel(0);
        setActiveSearch(null);
        carregarTodosJogadores();
    };

    // Função para aplicar filtro de rank
    const aplicarFiltroRank = (listaJogadores: Jogador[]) => {
        if (!filterRankNome && !filterRankNumero) {
            // Sem filtro, mostrar todos
            setJogadores(listaJogadores);
            return;
        }

        const jogadoresFiltrados = listaJogadores.filter((j) => {
            if (!j.dados?.rankJogador) return false;

            const rank = j.dados.rankJogador;
            const parts = rank.split(" ");
            const ultimaParte = parts[parts.length - 1];
            const temNumero = ["I", "II", "III", "IV", "V"].includes(ultimaParte);
            
            const nomeRank = temNumero ? parts.slice(0, -1).join(" ") : rank;
            const numeroRank = temNumero ? ultimaParte : "";

            // Verificar se o nome do rank corresponde
            const nomeMatch = !filterRankNome || nomeRank === filterRankNome;
            
            // Verificar se o número do rank corresponde
            let numeroMatch = true;
            if (filterRankNumero) {
                if (filterRankNumero === "none") {
                    // Se selecionou "none", deve não ter número
                    numeroMatch = !temNumero;
                } else {
                    // Se selecionou um número específico, deve ter esse número
                    numeroMatch = numeroRank === filterRankNumero;
                }
            }

            return nomeMatch && numeroMatch;
        });

        setJogadores(jogadoresFiltrados);
    };

    // Função para aplicar o filtro quando o usuário confirmar
    const handleAplicarFiltroRank = () => {
        aplicarFiltroRank(allJogadores);
        setIsFilterModalOpen(false);
        if (filterRankNome || filterRankNumero) {
            toast.success("Filtro de rank aplicado!", {
                position: "bottom-center",
            });
        }
    };

    // Função para limpar o filtro de rank
    const handleLimparFiltroRank = () => {
        setFilterRankNome("");
        setFilterRankNumero("");
        setIsFilterModalOpen(false);
        // Recarrega todos os jogadores, igual ao botão "Recarregar"
        carregarTodosJogadores(true);
    };

    useEffect(() => {
        carregarTodosJogadores();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteConfirm = async () => {
        if (!selectedJogador) return;
        try {
            setLoading(true);
            setError("");
            await jogadorService.delete(selectedJogador.idJogador);
            setIsDeleteModalOpen(false);
            toast.success(
                `Jogador "${selectedJogador.nickname}" deletado com sucesso!`,
                {
                    position: "bottom-center",
                }
            );
            carregarTodosJogadores(); // Recarrega a lista
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao deletar jogador: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (jogador: Jogador) => {
        setSelectedJogador(jogador);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = async (jogador: Jogador) => {
        try {
            setLoading(true);
            // Buscar os dados completos do jogador antes de abrir o modal de edição
            const jogadorCompleto = await jogadorService.findById(jogador.idJogador);
            
            console.log("=== DEBUG: Jogador selecionado para edição ===");
            console.log("Jogador da lista (incompleto):", jogador);
            console.log("Jogador completo da API:", jogadorCompleto);
            console.log("Dados completos:", jogadorCompleto.dados);
            console.log("Operadores Ataque:", jogadorCompleto.operadoresAtaque);
            console.log("Operadores Defesa:", jogadorCompleto.operadoresDefesa);
            
            // Fazer uma cópia profunda do jogador completo
            const jogadorCopy: Jogador = {
                ...jogadorCompleto,
                dados: jogadorCompleto.dados
                    ? {
                          ...jogadorCompleto.dados,
                          mapaFavorito: jogadorCompleto.dados.mapaFavorito
                              ? { ...jogadorCompleto.dados.mapaFavorito }
                              : null,
                          mapaMaisVitorias: jogadorCompleto.dados.mapaMaisVitorias
                              ? { ...jogadorCompleto.dados.mapaMaisVitorias }
                              : null,
                          mapaMaisDerrotas: jogadorCompleto.dados.mapaMaisDerrotas
                              ? { ...jogadorCompleto.dados.mapaMaisDerrotas }
                              : null,
                      }
                    : null,
                operadoresAtaque: jogadorCompleto.operadoresAtaque
                    ? jogadorCompleto.operadoresAtaque.map((op) => ({ ...op }))
                    : [],
                operadoresDefesa: jogadorCompleto.operadoresDefesa
                    ? jogadorCompleto.operadoresDefesa.map((op) => ({ ...op }))
                    : [],
            };
            
            console.log("Jogador copiado para edição:", jogadorCopy);
            
            setSelectedJogador(jogadorCopy);
            setIsEditModalOpen(true);
        } catch (error) {
            console.error("Erro ao buscar dados completos do jogador:", error);
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(
                `Erro ao carregar dados do jogador: ${errorMessage}`,
                {
                    position: "bottom-center",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJogador || !selectedJogador.dados) return;
        
        try {
            setLoading(true);
            setError("");
            
            // Usar os valores reais do jogador, não valores padrão
            const updateData: JogadorRequest = {
                nickname: selectedJogador.nickname,
                dados: {
                    nivel: selectedJogador.dados.nivel ?? 1,
                    winrate: selectedJogador.dados.winrate ?? 50.0,
                    rankJogador: selectedJogador.dados.rankJogador ?? "Bronze",
                    headshot: selectedJogador.dados.headshot ?? 0.0,
                    kd: selectedJogador.dados.kd ?? 1.0,
                    plataforma: selectedJogador.dados.plataforma ?? "PC",
                    horasJogadas: selectedJogador.dados.horasJogadas ?? 0,
                    mainRole: selectedJogador.dados.mainRole ?? "Support",
                    preferenciaJogo: selectedJogador.dados.preferenciaJogo ?? "Competitivo",
                    mapaFavoritoId: selectedJogador.dados.mapaFavorito?.idMapa ?? null,
                    mapaMaisVitoriasId: selectedJogador.dados.mapaMaisVitorias?.idMapa ?? null,
                    mapaMaisDerrotasId: selectedJogador.dados.mapaMaisDerrotas?.idMapa ?? null,
                },
                operadoresAtaque: (selectedJogador.operadoresAtaque || []).map(
                    (op) => ({
                        nomeOperador: op.nomeOperador ?? "",
                        winrate: op.winrate ?? 0,
                    })
                ),
                operadoresDefesa: (selectedJogador.operadoresDefesa || []).map(
                    (op) => ({
                        nomeOperador: op.nomeOperador ?? "",
                        winrate: op.winrate ?? 0,
                    })
                ),
            };
            
            // Converter null para 0 apenas para mapas (conforme esperado pela API)
            if (updateData.dados.mapaFavoritoId === null) {
                updateData.dados.mapaFavoritoId = 0;
            }
            if (updateData.dados.mapaMaisVitoriasId === null) {
                updateData.dados.mapaMaisVitoriasId = 0;
            }
            if (updateData.dados.mapaMaisDerrotasId === null) {
                updateData.dados.mapaMaisDerrotasId = 0;
            }

            await jogadorService.update(selectedJogador.idJogador, updateData);
            setIsEditModalOpen(false);
            toast.success(
                `Jogador "${selectedJogador.nickname}" atualizado com sucesso!`
            );
            carregarTodosJogadores();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao atualizar jogador: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

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
                          dados: prev.dados
                              ? {
                              ...prev.dados,
                              [name]:
                                  name === "nivel" ||
                                  name === "winrate" ||
                                  name === "headshot" ||
                                  name === "kd" ||
                                  name === "horasJogadas"
                                      ? Number(value)
                                      : value,
                                }
                              : prev.dados,
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

    const jogadorEditForm = () => {
        if (!selectedJogador) return null;
        return (
            <form
                onSubmit={handleUpdateSubmit}
                className="space-y-4"
            >
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
                                value={selectedJogador.dados?.nivel ?? 0}
                                onChange={(e) =>
                                    handleEditInputChange(e, "dados")
                                }
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
                                value={selectedJogador.dados?.winrate ?? 0}
                                onChange={(e) =>
                                    handleEditInputChange(e, "dados")
                                }
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                        <div>
                                <Label htmlFor="rankNome">Rank (Nome)</Label>
                                <Select
                                    value={rankNome}
                                    onValueChange={(nome) =>
                                        handleRankChange(nome, rankNumero)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o rank" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[200px]">
                                        <SelectItem value="Cobre">Cobre</SelectItem>
                                        <SelectItem value="Bronze">Bronze</SelectItem>
                                        <SelectItem value="Prata">Prata</SelectItem>
                                        <SelectItem value="Ouro">Ouro</SelectItem>
                                        <SelectItem value="Platina">Platina</SelectItem>
                                        <SelectItem value="Esmeralda">Esmeralda</SelectItem>
                                        <SelectItem value="Diamante">Diamante</SelectItem>
                                        <SelectItem value="Campeão">Campeão</SelectItem>
                                        <SelectItem value="Desconhecido">Desconhecido</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="rankNumero">Rank (Número)</Label>
                                <Select
                                    value={rankNumero}
                                    onValueChange={(numero) =>
                                        handleRankChange(rankNome, numero)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o número" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[200px]">
                                        <SelectItem value="none">Sem número</SelectItem>
                                        <SelectItem value="I">I</SelectItem>
                                        <SelectItem value="II">II</SelectItem>
                                        <SelectItem value="III">III</SelectItem>
                                        <SelectItem value="IV">IV</SelectItem>
                                        <SelectItem value="V">V</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="headshot">Headshot</Label>
                            <Input
                                id="headshot"
                                name="headshot"
                                type="number"
                                step="0.01"
                                value={selectedJogador.dados?.headshot ?? 0}
                                onChange={(e) =>
                                    handleEditInputChange(e, "dados")
                                }
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
                                value={selectedJogador.dados?.kd ?? 0}
                                onChange={(e) =>
                                    handleEditInputChange(e, "dados")
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="plataforma">Plataforma</Label>
                            <Input
                                id="plataforma"
                                name="plataforma"
                                value={selectedJogador.dados?.plataforma ?? ""}
                                onChange={(e) =>
                                    handleEditInputChange(e, "dados")
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="horasJogadas">Horas Jogadas</Label>
                            <Input
                                id="horasJogadas"
                                name="horasJogadas"
                                type="number"
                                value={selectedJogador.dados?.horasJogadas ?? 0}
                                onChange={(e) =>
                                    handleEditInputChange(e, "dados")
                                }
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="mainRole">Função Principal</Label>
                            <Select
                                value={selectedJogador.dados?.mainRole ?? "Support"}
                                onValueChange={(value) => {
                                    if (selectedJogador) {
                                        setSelectedJogador({
                                            ...selectedJogador,
                                            dados: {
                                                ...selectedJogador.dados!,
                                                mainRole: value,
                                            },
                                        });
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a função" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    <SelectItem value="Entry Fragger">
                                        Entry Fragger
                                    </SelectItem>
                                    <SelectItem value="Support">
                                        Support
                                    </SelectItem>
                                    <SelectItem value="Hard Breacher">
                                        Hard Breacher
                                    </SelectItem>
                                    <SelectItem value="Soft Breacher">
                                        Soft Breacher
                                    </SelectItem>
                                    <SelectItem value="Flank Watch">
                                        Flank Watch
                                    </SelectItem>
                                    <SelectItem value="Anchor">
                                        Anchor
                                    </SelectItem>
                                    <SelectItem value="Roamer">
                                        Roamer
                                    </SelectItem>
                                    <SelectItem value="Anti-Hard Breach">
                                        Anti-Hard Breach
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="preferenciaJogo">
                                Preferência de Jogo
                            </Label>
                            <Select
                                value={
                                    selectedJogador.dados?.preferenciaJogo ?? "Competitivo"
                                }
                                onValueChange={(value) => {
                                    if (selectedJogador) {
                                        setSelectedJogador({
                                            ...selectedJogador,
                                            dados: {
                                                ...selectedJogador.dados!,
                                                preferenciaJogo: value,
                                            },
                                        });
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a preferência" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    <SelectItem value="Competitivo">
                                        Competitivo
                                    </SelectItem>
                                    <SelectItem value="Casual">Casual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="mapaFavoritoId">
                                Mapa Favorito (Opcional)
                            </Label>
                            <Select
                                value={getMapaNameById(
                                    selectedJogador.dados?.mapaFavorito?.idMapa ||
                                        null
                                )}
                                onValueChange={(nome) => {
                                    const id = nome === "none" ? null : getMapaIdByName(nome);
                                    setSelectedJogador((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  dados: {
                                                      ...prev.dados!,
                                                      mapaFavorito: id
                                                          ? {
                                                                idMapa: id,
                                                                nome: nome,
                                                            }
                                                          : null,
                                                  },
                                              }
                                            : prev
                                    );
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um mapa" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    <SelectItem value="none">Nenhum</SelectItem>
                                    {mapas.map((mapa) => (
                                        <SelectItem
                                            key={mapa.idMapa}
                                            value={mapa.nome}
                                        >
                                            {mapa.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="mapaMaisVitoriasId">
                                Mapa Mais Vitórias (Opcional)
                            </Label>
                            <Select
                                value={getMapaNameById(
                                    selectedJogador.dados?.mapaMaisVitorias
                                        ?.idMapa || null
                                )}
                                onValueChange={(nome) => {
                                    const id = nome === "none" ? null : getMapaIdByName(nome);
                                    setSelectedJogador((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  dados: {
                                                      ...prev.dados!,
                                                      mapaMaisVitorias: id
                                                          ? {
                                                                idMapa: id,
                                                                nome: nome,
                                                            }
                                                          : null,
                                                  },
                                              }
                                            : prev
                                    );
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um mapa" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    <SelectItem value="none">Nenhum</SelectItem>
                                    {mapas.map((mapa) => (
                                        <SelectItem
                                            key={mapa.idMapa}
                                            value={mapa.nome}
                                        >
                                            {mapa.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="mapaMaisDerrotasId">
                                Mapa Mais Derrotas (Opcional)
                            </Label>
                            <Select
                                value={getMapaNameById(
                                    selectedJogador.dados?.mapaMaisDerrotas
                                        ?.idMapa || null
                                )}
                                onValueChange={(nome) => {
                                    const id = nome === "none" ? null : getMapaIdByName(nome);
                                    setSelectedJogador((prev) =>
                                        prev
                                            ? {
                                                  ...prev,
                                                  dados: {
                                                      ...prev.dados!,
                                                      mapaMaisDerrotas: id
                                                          ? {
                                                                idMapa: id,
                                                                nome: nome,
                                                            }
                                                          : null,
                                                  },
                                              }
                                            : prev
                                    );
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um mapa" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    <SelectItem value="none">Nenhum</SelectItem>
                                    {mapas.map((mapa) => (
                                        <SelectItem
                                            key={mapa.idMapa}
                                            value={mapa.nome}
                                        >
                                            {mapa.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </fieldset>
            </form>
        );
    };

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
                <ScrollArea className="h-[55vh] w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {jogadores.map((j) => (
                            <Card
                                key={j.idJogador}
                                className="flex flex-col justify-between h-full hover:bg-primary/5 transition-all duration-200"
                            >
                                {/* O Link agora envolve apenas a parte clicável (Header e Content) */}
                                <Link
                                    href={`/Jogadores/${j.idJogador}`}
                                    passHref
                                >
                                    <div className="cursor-pointer hover:border-primary transition-all duration-200">
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
                                        </CardContent>
                                    </div>
                                </Link>

                                {/* CardFooter com os botões de ação */}
                                {(actions?.onEdit || actions?.onDelete) && (
                                    <CardFooter className="flex justify-end gap-2 pt-4 border-t">
                                        {actions?.onEdit && (
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    actions.onEdit?.(j)
                                                }
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
                                    </CardFooter>
                                )}
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Todos os Jogadores</h2>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setIsFilterModalOpen(true)}
                        variant="outline"
                        className="relative"
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrar por Rank
                        {(filterRankNome || filterRankNumero) && (
                            <span className="ml-2 h-2 w-2 bg-primary rounded-full" />
                        )}
                    </Button>
                    <Button
                        onClick={() => carregarTodosJogadores(true)}
                        variant="outline"
                    >
                        Recarregar
                    </Button>
                </div>
            </div>

            {/* Buscas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Busca por ID */}
                <div className="flex flex-col gap-2">
                    <Input
                        type="number"
                        placeholder="Buscar por ID"
                        value={localSearchId || ""}
                        onChange={(e) =>
                            setLocalSearchId(parseInt(e.target.value) || 0)
                        }
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={buscarJogadorPorId}
                            variant="outline"
                            className="flex-1"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            Buscar
                        </Button>
                        {activeSearch === "id" && (
                            <Button onClick={limparBusca} variant="ghost">
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>

                {/* Busca por K/D Mínimo */}
                <div className="flex flex-col gap-2">
                    <Input
                        type="number"
                        step="0.1"
                        placeholder="K/D mínimo"
                        value={minKd || ""}
                        onChange={(e) =>
                            setMinKd(parseFloat(e.target.value) || 0)
                        }
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={buscarPorKdMinimo}
                            variant="outline"
                            className="flex-1"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            Buscar
                        </Button>
                        {activeSearch === "kd" && (
                            <Button onClick={limparBusca} variant="ghost">
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>

                {/* Busca por Win Rate Mínimo */}
                <div className="flex flex-col gap-2">
                    <Input
                        type="number"
                        step="0.1"
                        placeholder="Win Rate mínimo (%)"
                        value={minWinRate || ""}
                        onChange={(e) =>
                            setMinWinRate(parseFloat(e.target.value) || 0)
                        }
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={buscarPorWinRateMinimo}
                            variant="outline"
                            className="flex-1"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            Buscar
                        </Button>
                        {activeSearch === "winrate" && (
                            <Button onClick={limparBusca} variant="ghost">
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>

                {/* Busca por Nível Mínimo */}
                <div className="flex flex-col gap-2">
                    <Input
                        type="number"
                        placeholder="Nível mínimo"
                        value={minLevel || ""}
                        onChange={(e) =>
                            setMinLevel(parseInt(e.target.value) || 0)
                        }
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={buscarPorNivelMinimo}
                            variant="outline"
                            className="flex-1"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            Buscar
                        </Button>
                        {activeSearch === "level" && (
                            <Button onClick={limparBusca} variant="ghost">
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Indicadores de busca ativa */}
            {activeSearch === "id" && searchedJogador && (
                <Card className="mb-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                            Mostrando resultado da busca por ID:{" "}
                            <strong className="text-primary">
                                {localSearchId}
                            </strong>
                        </p>
                    </CardContent>
                </Card>
            )}

            {activeSearch === "kd" && (
                <Card className="mb-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                            Mostrando jogadores com K/D mínimo de:{" "}
                            <strong className="text-primary">{minKd}</strong>
                        </p>
                    </CardContent>
                </Card>
            )}

            {activeSearch === "winrate" && (
                <Card className="mb-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                            Mostrando jogadores com Win Rate mínimo de:{" "}
                            <strong className="text-primary">
                                {minWinRate}%
                            </strong>
                        </p>
                    </CardContent>
                </Card>
            )}

            {activeSearch === "level" && (
                <Card className="mb-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                            Mostrando jogadores com nível mínimo de:{" "}
                            <strong className="text-primary">{minLevel}</strong>
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Indicador de filtro de rank ativo */}
            {(filterRankNome || filterRankNumero) && (
                <Card className="mb-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Filtro de Rank ativo:{" "}
                            <strong className="text-primary">
                                {filterRankNome || "Qualquer"}{" "}
                                {filterRankNumero && filterRankNumero !== "none" && filterRankNumero}
                            </strong>
                        </p>
                        <Button
                            onClick={handleLimparFiltroRank}
                            variant="ghost"
                            size="sm"
                            className="h-8"
                        >
                            <X className="h-4 w-4 mr-1" />
                            Limpar
                        </Button>
                    </CardContent>
                </Card>
            )}
            
            <div className="mt-6">
                {renderJogadorList({
                    onEdit: handleEdit,
                    onDelete: openDeleteModal,
                })}
            </div>

            {/* O Dialog de confirmação, copiado do Delete.tsx */}
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
                    <DialogFooterComponent>
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
                    </DialogFooterComponent>
                </DialogContent>
            </Dialog>

            {/* Dialog de Edição */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full flex flex-col p-0 gap-0">
                    <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b">
                        <DialogTitle>
                            Editar Jogador: {selectedJogador?.nickname || "Carregando..."}
                        </DialogTitle>
                        <DialogDescription>
                            {loading
                                ? "Carregando dados do jogador..."
                                : "Faça as alterações necessárias e clique em salvar."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <p className="text-muted-foreground">
                                    Carregando dados do jogador...
                                </p>
                            </div>
                        ) : (
                            jogadorEditForm()
                        )}
                    </div>
                    <div className="flex justify-end gap-2 px-6 py-4 border-t flex-shrink-0">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                if (selectedJogador) {
                                    const form = document.querySelector('form') as HTMLFormElement;
                                    if (form) {
                                        form.requestSubmit();
                                    }
                                }
                            }}
                        >
                            Salvar Alterações
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog de Filtro por Rank */}
            <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Filtrar por Rank</DialogTitle>
                        <DialogDescription>
                            Selecione o rank para filtrar os jogadores. Deixe em branco para não filtrar por aquele campo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="filterRankNome">Rank (Nome)</Label>
                            <Select
                                value={filterRankNome || "none"}
                                onValueChange={(value) =>
                                    setFilterRankNome(value === "none" ? "" : value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o rank" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    <SelectItem value="none">Todos</SelectItem>
                                    <SelectItem value="Cobre">Cobre</SelectItem>
                                    <SelectItem value="Bronze">Bronze</SelectItem>
                                    <SelectItem value="Prata">Prata</SelectItem>
                                    <SelectItem value="Ouro">Ouro</SelectItem>
                                    <SelectItem value="Platina">Platina</SelectItem>
                                    <SelectItem value="Esmeralda">Esmeralda</SelectItem>
                                    <SelectItem value="Diamante">Diamante</SelectItem>
                                    <SelectItem value="Campeão">Campeão</SelectItem>
                                    <SelectItem value="Desconhecido">Desconhecido</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="filterRankNumero">Rank (Número)</Label>
                            <Select
                                value={filterRankNumero || "none"}
                                onValueChange={(value) =>
                                    setFilterRankNumero(value === "none" ? "" : value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o número" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    <SelectItem value="none">Todos</SelectItem>
                                    <SelectItem value="I">I</SelectItem>
                                    <SelectItem value="II">II</SelectItem>
                                    <SelectItem value="III">III</SelectItem>
                                    <SelectItem value="IV">IV</SelectItem>
                                    <SelectItem value="V">V</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooterComponent>
                        <Button
                            variant="outline"
                            onClick={handleLimparFiltroRank}
                        >
                            Limpar Filtro
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsFilterModalOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={handleAplicarFiltroRank}>
                            Aplicar Filtro
                        </Button>
                    </DialogFooterComponent>
                </DialogContent>
            </Dialog>
        </div>
    );
}
