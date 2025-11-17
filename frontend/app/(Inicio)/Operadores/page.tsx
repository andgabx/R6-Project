"use client";

import { useEffect, useState, useMemo } from "react";
import { operadorService } from "@/services/OperadorService";
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
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
} from "lucide-react";
import OperatorIcon from "@/components/ui/OperatorIcon";
import { cn } from "@/lib/utils";

export default function OperadoresPage() {
    const [operadores, setOperadores] = useState<Operador[]>([]);
    const [metaAtaque, setMetaAtaque] = useState<MetaAtaque[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOperador, setSelectedOperador] = useState<Operador | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filter, setFilter] = useState<"all" | "Ataque" | "Defesa">("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [operadoresData, metaAtaqueData] = await Promise.all([
                    operadorService.listAll(),
                    operadorService.getMetaAtaque(),
                ]);
                setOperadores(operadoresData);
                setMetaAtaque(metaAtaqueData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    const filteredOperadores =
        filter === "all"
            ? operadores
            : operadores.filter((op) => op.funcao === filter);

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
            <div className="mb-6 flex gap-2">
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
            </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredOperadores.map((operador) => (
                    <Card
                        key={operador.idOperador}
                        className={cn(
                            "hover:shadow-lg transition-all duration-300 cursor-pointer group",
                            operador.funcao === "Ataque"
                                ? "border-red-500/20 hover:border-red-500/40"
                                : "border-blue-500/20 hover:border-blue-500/40"
                        )}
                        onClick={() => handleCardClick(operador)}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex flex-col items-center gap-3">
                                <div
                                    className={cn(
                                        "p-3 rounded-lg transition-colors",
                                        operador.funcao === "Ataque"
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
                                            operador.funcao === "Ataque"
                                                ? "border-red-500/50 text-red-600 dark:text-red-400"
                                                : "border-blue-500/50 text-blue-600 dark:text-blue-400"
                                        )}
                                    >
                                        {operador.funcao}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-center text-xs">
                                Clique para ver detalhes
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

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
        </div>
    );
}
