"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { jogadorService } from "@/services/JogadorService";
import { RankLog } from "@/types/jogador";
import { ArrowUp, ArrowDown } from "lucide-react";

const statusColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
};

// Função para determinar se o rank subiu ou desceu
const getRankChange = (
    rankAntigo: string,
    rankNovo: string
): {
    status: "success" | "error" | "warning" | "info";
    isUpgrade: boolean;
} => {
    // Ordem dos ranks (do menor para o maior)
    const rankOrder = [
        "Cobre V",
        "Cobre IV",
        "Cobre III",
        "Cobre II",
        "Cobre I",
        "Cobre",
        "Bronze V",
        "Bronze IV",
        "Bronze III",
        "Bronze II",
        "Bronze I",
        "Bronze",
        "Prata V",
        "Prata IV",
        "Prata III",
        "Prata II",
        "Prata I",
        "Prata",
        "Ouro V",
        "Ouro IV",
        "Ouro III",
        "Ouro II",
        "Ouro I",
        "Ouro",
        "Platina V",
        "Platina IV",
        "Platina III",
        "Platina II",
        "Platina I",
        "Platina",
        "Esmeralda V",
        "Esmeralda IV",
        "Esmeralda III",
        "Esmeralda II",
        "Esmeralda I",
        "Esmeralda",
        "Diamante V",
        "Diamante IV",
        "Diamante III",
        "Diamante II",
        "Diamante I",
        "Diamante",
        "Campeão",
    ];

    // Função auxiliar para encontrar o índice do rank (com fallback para versões sem número)
    const findRankIndex = (rank: string): number => {
        let index = rankOrder.indexOf(rank);
        if (index === -1) {
            // Se não encontrar exato, tenta encontrar pelo nome base (ex: "Diamante" sem número)
            const baseRank = rank.split(" ")[0];
            // Procura pela versão sem número primeiro (ex: "Diamante" ao invés de "Diamante V")
            const baseIndex = rankOrder.findIndex((r) => r === baseRank);
            if (baseIndex !== -1) {
                return baseIndex;
            }
            // Se não encontrar, pega o primeiro que começa com o nome base
            index = rankOrder.findIndex((r) => r.startsWith(baseRank));
        }
        return index;
    };

    const oldIndex = findRankIndex(rankAntigo);
    const newIndex = findRankIndex(rankNovo);

    // Se não encontrar os ranks, retorna info
    if (oldIndex === -1 || newIndex === -1) {
        return { status: "info", isUpgrade: false };
    }

    const isUpgrade = newIndex > oldIndex;
    return {
        status: isUpgrade ? "success" : "error",
        isUpgrade,
    };
};

// Função para formatar a data
const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return "agora mesmo";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} ${
            diffInMinutes === 1 ? "minuto" : "minutos"
        } atrás`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? "hora" : "horas"} atrás`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? "dia" : "dias"} atrás`;
};

export const RecentActivity = () => {
    const [rankLogs, setRankLogs] = useState<RankLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRankLogs = async () => {
            try {
                setLoading(true);
                const logs = await jogadorService.getRankLogs();
                // Ordenar por data mais recente primeiro e pegar os 6 primeiros
                const sortedLogs = logs
                    .sort(
                        (a, b) =>
                            new Date(b.dataAlteracao).getTime() -
                            new Date(a.dataAlteracao).getTime()
                    )
                    .slice(0, 6);
                setRankLogs(sortedLogs);
            } catch (error) {
                console.error("Erro ao buscar logs de rank:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRankLogs();
    }, []);

    if (loading) {
        return (
            <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <CardTitle>Atividade Recente</CardTitle>
                    <CardDescription>
                        Últimas alterações de rank dos jogadores
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        Carregando...
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (rankLogs.length === 0) {
        return (
            <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                    <CardTitle>Atividade Recente</CardTitle>
                    <CardDescription>
                        Últimas alterações de rank dos jogadores
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        Nenhuma alteração de rank recente
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                    Últimas alterações de rank dos jogadores
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                    {rankLogs.map((log) => {
                        const { status, isUpgrade } = getRankChange(
                            log.rankAntigo,
                            log.rankNovo
                        );

                        return (
                            <div
                                key={log.logId}
                                className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0"
                            >
                                <div
                                    className={cn(
                                        "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                                        statusColors[status]
                                    )}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium">
                                            Alteração de Rank
                                        </p>
                                        {isUpgrade ? (
                                            <ArrowUp className="h-3 w-3 text-green-600 dark:text-green-400" />
                                        ) : (
                                            <ArrowDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        <span className="font-medium">
                                            {log.rankAntigo}
                                        </span>{" "}
                                        →{" "}
                                        <span className="font-medium">
                                            {log.rankNovo}
                                        </span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formatTimeAgo(log.dataAlteracao)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};
