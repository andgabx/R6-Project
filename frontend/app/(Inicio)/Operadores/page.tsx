"use client";

import { useEffect, useState, useMemo } from "react";
import { operadorService, OperadorRequest } from "@/services/OperadorService";
import { Operador, MetaAtaque } from "@/types/operador";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Shield,
    Loader2,
    Sword,
    Zap,
    Users,
    TrendingUp,
    Gauge,
    ShieldCheck,
    Edit,
    Trash2,
    AlertCircle,
} from "lucide-react";
import OperatorIcon from "@/components/ui/OperatorIcon";
import { CreateOperatorButton } from "@/components/create-operator-button";
import { armaService } from "@/services/ArmaService";
import { Arma } from "@/types/arma";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OperadorNaoUsado } from "@/types/operador";

export default function OperadoresPage() {
    const [operadores, setOperadores] = useState<Operador[]>([]);
    const [metaAtaque, setMetaAtaque] = useState<MetaAtaque[]>([]);
    const [operadoresNaoUsados, setOperadoresNaoUsados] = useState<OperadorNaoUsado[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingNaoUsados, setLoadingNaoUsados] = useState(false);
    const [selectedOperador, setSelectedOperador] = useState<Operador | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filter, setFilter] = useState<"all" | "Ataque" | "Defesa">("all");
    const [filtroAtaque, setFiltroAtaque] = useState<"todos" | "mais-usados">("todos");
    const [mostrarNaoUsados, setMostrarNaoUsados] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingOperador, setEditingOperador] = useState<Operador | null>(
        null
    );
    const [deletingOperador, setDeletingOperador] = useState<Operador | null>(
        null
    );
    const [editNome, setEditNome] = useState("");
    const [editFuncao, setEditFuncao] = useState<"Ataque" | "Defesa">("Ataque");
    const [editArmaId, setEditArmaId] = useState<number>(0);
    const [armas, setArmas] = useState<Arma[]>([]);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [operadoresData, metaAtaqueData, armasData] =
                await Promise.all([
                    operadorService.listAll(),
                    operadorService.getMetaAtaque(),
                    armaService.listAll(),
                ]);
            setOperadores(operadoresData);
            setMetaAtaque(metaAtaqueData);
            setArmas(armasData);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            toast.error("Erro ao carregar operadores", {
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchOperadoresNaoUsados = async () => {
        try {
            setLoadingNaoUsados(true);
            const data = await operadorService.getOperadoresNaoUsados();
            setOperadoresNaoUsados(data);
        } catch (error) {
            console.error("Erro ao buscar operadores não usados:", error);
            toast.error("Erro ao carregar operadores não utilizados", {
                position: "bottom-center",
            });
        } finally {
            setLoadingNaoUsados(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (filter !== "Ataque") {
            setFiltroAtaque("todos");
        }
        if (filter !== "all") {
            setMostrarNaoUsados(false);
        }
    }, [filter]);

    useEffect(() => {
        if (mostrarNaoUsados && operadoresNaoUsados.length === 0) {
            fetchOperadoresNaoUsados();
        }
    }, [mostrarNaoUsados]);

    const handleEdit = (operador: Operador, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingOperador(operador);
        setEditNome(operador.nome);
        setEditFuncao(operador.funcao);
        // Pegar a primeira arma do operador como padrão
        setEditArmaId(operador.armas.length > 0 ? operador.armas[0].idArma : 0);
        setEditDialogOpen(true);
    };

    const handleDelete = (operador: Operador, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeletingOperador(operador);
        setDeleteDialogOpen(true);
    };

    const handleUpdate = async () => {
        if (!editingOperador || !editNome.trim()) {
            toast.error("Por favor, insira um nome válido", {
                position: "bottom-center",
            });
            return;
        }
        if (!editArmaId || editArmaId === 0) {
            toast.error("Por favor, selecione uma arma", {
                position: "bottom-center",
            });
            return;
        }

        try {
            setActionLoading(true);
            const data: OperadorRequest = {
                nome: editNome.trim(),
                funcao: editFuncao,
                armaId: editArmaId,
            };
            await operadorService.update(editingOperador.idOperador, data);
            toast.success("Operador atualizado com sucesso!", {
                position: "bottom-center",
            });
            setEditDialogOpen(false);
            setEditingOperador(null);
            setEditNome("");
            setEditFuncao("Ataque");
            setEditArmaId(0);
            fetchData();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao atualizar operador: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deletingOperador) return;

        try {
            setActionLoading(true);
            await operadorService.delete(deletingOperador.idOperador);
            toast.success("Operador deletado com sucesso!", {
                position: "bottom-center",
            });
            setDeleteDialogOpen(false);
            setDeletingOperador(null);
            fetchData();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao deletar operador: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setActionLoading(false);
        }
    };

    // Função para buscar meta do operador selecionado
    const selectedOperadorMeta = useMemo(() => {
        if (!selectedOperador || selectedOperador.funcao !== "Ataque") {
            return null;
        }
        return (
            metaAtaque.find((meta) => meta.nome === selectedOperador.nome) ||
            null
        );
    }, [selectedOperador, metaAtaque]);

    const handleCardClick = (operador: Operador) => {
        setSelectedOperador(operador);
        setDialogOpen(true);
    };

    const filteredOperadores = useMemo(() => {
        // Se mostrarNaoUsados estiver ativo, mostrar apenas operadores não utilizados
        if (mostrarNaoUsados && filter === "all") {
            return operadoresNaoUsados
                .map((item) => {
                    const operadorCompleto = operadores.find(
                        (op) => op.nome === item.operadorAtaqueNaoUsado && op.funcao === "Ataque"
                    );
                    return operadorCompleto;
                })
                .filter((op): op is Operador => op !== undefined);
        }

        let filtered = filter === "all"
            ? operadores
            : operadores.filter((op) => op.funcao === filter);

        // Se o filtro for Ataque e o filtroAtaque for "mais-usados", ordenar por popularidade
        if (filter === "Ataque" && filtroAtaque === "mais-usados") {
            filtered = [...filtered].sort((a, b) => {
                const metaA = metaAtaque.find((m) => m.nome === a.nome);
                const metaB = metaAtaque.find((m) => m.nome === b.nome);
                const totalA = metaA?.totalJogadoresQueUsam || 0;
                const totalB = metaB?.totalJogadoresQueUsam || 0;
                return totalB - totalA; // Ordem decrescente
            });
        }

        return filtered;
    }, [operadores, filter, filtroAtaque, metaAtaque, mostrarNaoUsados, operadoresNaoUsados]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">
                            Carregando operadores...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                    <Shield className="h-10 w-10 text-primary" />
                    Operadores
                </h1>
                <p className="text-muted-foreground">
                    Explore todos os operadores disponíveis no Rainbow Six Siege
                </p>
            </div>

            {/* Filtros */}
            <div className="mb-6">
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setFilter("all")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                            filter === "all"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter("Ataque")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                            filter === "Ataque"
                                ? "bg-red-600 text-white"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                    >
                        <Sword className="h-4 w-4" />
                        Ataque
                    </button>
                    <button
                        onClick={() => setFilter("Defesa")}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                            filter === "Defesa"
                                ? "bg-blue-600 text-white"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                    >
                        <Shield className="h-4 w-4" />
                        Defesa
                    </button>
                    {/* Filtro Mais Utilizados - aparece apenas quando Ataque está selecionado */}
                    {filter === "Ataque" && (
                        <button
                            onClick={() => setFiltroAtaque(filtroAtaque === "mais-usados" ? "todos" : "mais-usados")}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                                filtroAtaque === "mais-usados"
                                    ? "bg-orange-600 text-white hover:bg-orange-700"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                        >
                            <TrendingUp className="h-4 w-4" />
                            Mais Utilizados
                        </button>
                    )}
                    {/* Filtro Não Utilizados - aparece apenas quando Todos está selecionado */}
                    {filter === "all" && (
                        <button
                            onClick={() => setMostrarNaoUsados(!mostrarNaoUsados)}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2",
                                mostrarNaoUsados
                                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                            disabled={loadingNaoUsados}
                        >
                            {loadingNaoUsados ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Carregando...
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="h-4 w-4" />
                                    Não Utilizados
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Grid de Cards */}
            {mostrarNaoUsados && filteredOperadores.length === 0 && !loadingNaoUsados ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <AlertCircle className="h-16 w-16 text-muted-foreground" />
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-2">
                            Nenhum operador não utilizado
                        </h3>
                        <p className="text-muted-foreground">
                            Todos os operadores de ataque estão sendo utilizados por pelo menos um jogador.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredOperadores.map((operador) => {
                        const metaOperador = filter === "Ataque" && filtroAtaque === "mais-usados"
                            ? metaAtaque.find((m) => m.nome === operador.nome)
                            : null;
                        
                        return (
                        <Card
                            key={operador.idOperador}
                            className={cn(
                                "hover:shadow-lg transition-all duration-300 cursor-pointer group relative",
                                mostrarNaoUsados
                                    ? "border-yellow-500/20 hover:border-yellow-500/40"
                                    : operador.funcao === "Ataque"
                                    ? "border-red-500/20 hover:border-red-500/40"
                                    : "border-blue-500/20 hover:border-blue-500/40"
                            )}
                            onClick={() => handleCardClick(operador)}
                        >
                        {/* Botões de ação */}
                        <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                size="icon"
                                variant="secondary"
                                className="h-8 w-8 bg-background/90 hover:bg-background"
                                onClick={(e) => handleEdit(operador, e)}
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="destructive"
                                className="h-8 w-8 bg-destructive/90 hover:bg-destructive"
                                onClick={(e) => handleDelete(operador, e)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col items-center gap-3">
                                <div
                                    className={cn(
                                        "p-3 rounded-lg transition-colors",
                                        mostrarNaoUsados
                                            ? "bg-yellow-500/10 group-hover:bg-yellow-500/20"
                                            : operador.funcao === "Ataque"
                                            ? "bg-red-500/10 group-hover:bg-red-500/20"
                                            : "bg-blue-500/10 group-hover:bg-blue-500/20"
                                    )}
                                >
                                    <OperatorIcon
                                        operatorName={operador.nome}
                                        className="h-16 w-16"
                                    />
                                </div>
                                <div className="text-center w-full">
                                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                                        {operador.nome}
                                    </CardTitle>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "mt-2",
                                            mostrarNaoUsados
                                                ? "border-yellow-500/50 text-yellow-600 dark:text-yellow-400"
                                                : operador.funcao === "Ataque"
                                                ? "border-red-500/50 text-red-600 dark:text-red-400"
                                                : "border-blue-500/50 text-blue-600 dark:text-blue-400"
                                        )}
                                    >
                                        {mostrarNaoUsados ? "Não Utilizado" : operador.funcao}
                                    </Badge>
                                    {filter === "Ataque" && filtroAtaque === "mais-usados" && metaOperador && (
                                        <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                                            <Users className="h-3 w-3" />
                                            <span>{metaOperador.totalJogadoresQueUsam} jogadores</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center text-xs">
                                Clique para ver detalhes
                            </CardDescription>
                        </CardContent>
                    </Card>
                        );
                    })}
                </div>
            )}

            {/* Dialog de Detalhes */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-4">
                            {selectedOperador && (
                                <OperatorIcon
                                    operatorName={selectedOperador.nome}
                                    className="h-16 w-16"
                                />
                            )}
                            <div className="flex-1">
                                <DialogTitle className="text-2xl flex items-center gap-2">
                                    {selectedOperador?.nome}
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            selectedOperador?.funcao ===
                                                "Ataque"
                                                ? "border-red-500/50 text-red-600 dark:text-red-400"
                                                : "border-blue-500/50 text-blue-600 dark:text-blue-400"
                                        )}
                                    >
                                        {selectedOperador?.funcao}
                                    </Badge>
                                </DialogTitle>
                                <DialogDescription>
                                    Informações detalhadas do operador
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    <div className="mt-6 space-y-6">
                        {/* Habilidades */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold text-lg">
                                    Habilidade Especial
                                </h3>
                            </div>
                            <div className="pl-7">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {
                                        selectedOperador?.habilidades
                                            .gadgetAbility
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Armas */}
                        {selectedOperador &&
                            selectedOperador.armas.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Sword className="h-5 w-5 text-primary" />
                                        <h3 className="font-semibold text-lg">
                                            Armas (
                                            {selectedOperador.armas.length})
                                        </h3>
                                    </div>
                                    <div className="pl-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedOperador.armas.map((arma) => (
                                            <Card key={arma.idArma}>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base">
                                                        {arma.nome}
                                                    </CardTitle>
                                                    <CardDescription className="text-xs">
                                                        {arma.tipo}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-muted-foreground">
                                                            Dano
                                                        </span>
                                                        <span className="text-sm font-semibold">
                                                            {arma.dano}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {/* Meta do Operador (apenas para ataque) */}
                        {selectedOperador?.funcao === "Ataque" &&
                            selectedOperadorMeta && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                        <h3 className="font-semibold text-lg">
                                            Estatísticas de Uso
                                        </h3>
                                    </div>
                                    <div className="pl-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-2">
                                                    <Gauge className="h-4 w-4 text-muted-foreground" />
                                                    <CardTitle className="text-sm">
                                                        Velocidade
                                                    </CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-2xl font-bold">
                                                    {
                                                        selectedOperadorMeta.velocidade
                                                    }
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                                                    <CardTitle className="text-sm">
                                                        Blindagem
                                                    </CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-2xl font-bold">
                                                    {
                                                        selectedOperadorMeta.blindagem
                                                    }
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    <CardTitle className="text-sm">
                                                        Jogadores
                                                    </CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-2xl font-bold">
                                                    {
                                                        selectedOperadorMeta.totalJogadoresQueUsam
                                                    }
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    jogadores usando
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                                    <CardTitle className="text-sm">
                                                        Win Rate Médio
                                                    </CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-2xl font-bold">
                                                    {selectedOperadorMeta.winrateMedioEntreEles
                                                        ? selectedOperadorMeta.winrateMedioEntreEles.toFixed(
                                                              1
                                                          )
                                                        : "N/A"}
                                                </p>
                                                {selectedOperadorMeta.winrateMedioEntreEles && (
                                                    <p className="text-xs text-muted-foreground">
                                                        entre os usuários
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="pl-7 mt-4 space-y-2">
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">
                                                Unidade Especial
                                            </p>
                                            <p className="text-sm font-medium">
                                                {
                                                    selectedOperadorMeta.unidadeEspecial
                                                }
                                            </p>
                                        </div>
                                        {selectedOperadorMeta.gadgetUnicoAtaque && (
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">
                                                    Gadget Único
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {
                                                        selectedOperadorMeta.gadgetUnicoAtaque
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        {/* Informações Adicionais */}
                        <div className="pt-4 border-t">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">
                                        ID do Operador
                                    </p>
                                    <p className="text-sm font-medium">
                                        #{selectedOperador?.idOperador}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">
                                        Função
                                    </p>
                                    <p className="text-sm font-medium">
                                        {selectedOperador?.funcao}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog de Edição */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5 text-primary" />
                            Editar Operador
                        </DialogTitle>
                        <DialogDescription>
                            Atualize as informações do operador
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="edit-nome">Nome do Operador</Label>
                            <Input
                                id="edit-nome"
                                value={editNome}
                                onChange={(e) => setEditNome(e.target.value)}
                                placeholder="Ex: Ash"
                                required
                                disabled={actionLoading}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-funcao">Função</Label>
                            <Select
                                value={editFuncao}
                                onValueChange={(value) =>
                                    setEditFuncao(value as "Ataque" | "Defesa")
                                }
                                disabled={actionLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a função" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Ataque">
                                        Ataque
                                    </SelectItem>
                                    <SelectItem value="Defesa">
                                        Defesa
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="edit-armaId">Arma</Label>
                            <Select
                                value={editArmaId.toString()}
                                onValueChange={(value) =>
                                    setEditArmaId(parseInt(value))
                                }
                                disabled={actionLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma arma" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                    {armas.map((arma) => (
                                        <SelectItem
                                            key={arma.idArma}
                                            value={arma.idArma.toString()}
                                        >
                                            {arma.nome} ({arma.tipo})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setEditDialogOpen(false);
                                setEditingOperador(null);
                                setEditNome("");
                                setEditFuncao("Ataque");
                                setEditArmaId(0);
                            }}
                            disabled={actionLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            onClick={handleUpdate}
                            disabled={
                                actionLoading || !editNome.trim() || !editArmaId
                            }
                        >
                            {actionLoading ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog de Confirmação de Deleção */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-destructive" />
                            Confirmar Deleção
                        </DialogTitle>
                        <DialogDescription>
                            Você tem certeza que deseja deletar o operador{" "}
                            <strong className="text-destructive">
                                {deletingOperador?.nome}
                            </strong>
                            ? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setDeleteDialogOpen(false);
                                setDeletingOperador(null);
                            }}
                            disabled={actionLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={actionLoading}
                        >
                            {actionLoading ? "Deletando..." : "Deletar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Botão flutuante para criar operador */}
            <CreateOperatorButton onOperatorCreated={fetchData} />
        </div>
    );
}
