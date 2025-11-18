"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2, Users, Gamepad2, TrendingUp, Target } from "lucide-react";
import { jogadorService } from "@/services/JogadorService";
import { KpiDTO } from "@/types/jogador";

export const KpisCard = () => {
    const [kpis, setKpis] = useState<KpiDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKpis = async () => {
            try {
                setLoading(true);
                const data = await jogadorService.getKpis();
                setKpis(data);
            } catch (error) {
                console.error("Erro ao buscar KPIs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchKpis();
    }, []);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>KPIs do Sistema</CardTitle>
                    <CardDescription>Métricas principais do dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!kpis) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    KPIs do Sistema
                </CardTitle>
                <CardDescription>Métricas principais do dashboard</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            Total de Jogadores
                        </div>
                        <div className="text-2xl font-bold">{kpis.totalJogadores}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Gamepad2 className="h-4 w-4" />
                            Total de Partidas
                        </div>
                        <div className="text-2xl font-bold">{kpis.totalPartidas}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <TrendingUp className="h-4 w-4" />
                            Média de K/D
                        </div>
                        <div className="text-2xl font-bold">
                            {kpis.mediaKd.toFixed(2)}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Target className="h-4 w-4" />
                            Média de Winrate
                        </div>
                        <div className="text-2xl font-bold">
                            {kpis.mediaWinrate.toFixed(2)}%
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

