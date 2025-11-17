"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { teamService } from "@/services/TeamService";
import { Time } from "@/types/team";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Trophy,
    Users,
    ArrowLeft,
    TrendingUp,
    Award,
    Activity,
} from "lucide-react";
import OperatorIcon from "@/components/ui/OperatorIcon";

export default function TeamDetailPage() {
    const params = useParams();
    const teamId = params?.teamId as string;
    const [team, setTeam] = useState<Time | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const id = parseInt(teamId, 10);
                if (isNaN(id)) {
                    setTeam(null);
                    return;
                }

                const teams = await teamService.listAll();
                const foundTeam = teams.find((t) => t.idTime === id);
                setTeam(foundTeam || null);
            } catch (error) {
                console.error("Failed to fetch team:", error);
                setTeam(null);
            } finally {
                setLoading(false);
            }
        };

        if (teamId) {
            fetchTeam();
        }
    }, [teamId]);

    if (loading) {
        return (
            <div className="container mx-auto p-4 md:p-8">
                <Card>
                    <CardContent className="py-8">
                        <p className="text-muted-foreground text-center">
                            Carregando informações do time...
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!team) {
        return (
            <div className="container mx-auto p-4 md:p-8">
                <header className="mb-8">
                    <Link
                        href="/Competitivo"
                        className="text-primary hover:underline mb-4 flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para a lista de times
                    </Link>
                </header>
                <Card>
                    <CardContent className="py-8">
                        <p className="text-muted-foreground text-center">
                            Time não encontrado
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Calcular estatísticas do time
    const getTeamStats = () => {
        if (!team.jogadores || team.jogadores.length === 0) {
            return {
                avgKd: 0,
                avgWinrate: 0,
                avgHeadshot: 0,
                avgNivel: 0,
                totalPlayers: 0,
            };
        }

        const totalKd = team.jogadores.reduce(
            (sum, player) => sum + (player.dados?.kd || 0),
            0
        );
        const totalWinrate = team.jogadores.reduce(
            (sum, player) => sum + (player.dados?.winrate || 0),
            0
        );
        const totalHeadshot = team.jogadores.reduce(
            (sum, player) => sum + (player.dados?.headshot || 0),
            0
        );
        const totalNivel = team.jogadores.reduce(
            (sum, player) => sum + (player.dados?.nivel || 0),
            0
        );

        return {
            avgKd: (totalKd / team.jogadores.length).toFixed(2),
            avgWinrate: (totalWinrate / team.jogadores.length).toFixed(1),
            avgHeadshot: (totalHeadshot / team.jogadores.length).toFixed(1),
            avgNivel: Math.round(totalNivel / team.jogadores.length),
            totalPlayers: team.jogadores.length,
        };
    };

    const stats = getTeamStats();

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8">
                <Link
                    href="/Competitivo"
                    className="text-primary hover:underline mb-4 flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para a lista de times
                </Link>
                <div className="flex items-center gap-4">
                    <Trophy className="h-12 w-12 text-primary" />
                    <div>
                        <h1 className="text-4xl font-bold">{team.nome}</h1>
                        <p className="text-muted-foreground text-lg">
                            Time Competitivo
                        </p>
                    </div>
                </div>
            </header>

            {/* Estatísticas Gerais do Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Jogadores
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalPlayers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                K/D Médio
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.avgKd}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Winrate Médio
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.avgWinrate}%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Nível Médio
                            </CardTitle>
                            <Award className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.avgNivel}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Lista de Jogadores */}
            <Card>
                <CardHeader>
                    <CardTitle>Jogadores do Time</CardTitle>
                </CardHeader>
                <CardContent>
                    {team.jogadores && team.jogadores.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {team.jogadores.map((player) => (
                                <Link
                                    key={player.idJogador}
                                    href={`/Jogadores/${player.idJogador}`}
                                    className="group"
                                >
                                    <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                    {player.nickname}
                                                </CardTitle>
                                                <Badge variant="outline">
                                                    {player.dados?.rankJogador || "N/A"}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        Nível
                                                    </span>
                                                    <span className="font-semibold">
                                                        {player.dados?.nivel || 0}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        K/D
                                                    </span>
                                                    <span className="font-semibold">
                                                        {player.dados?.kd?.toFixed(2) || "0.00"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        Winrate
                                                    </span>
                                                    <span className="font-semibold">
                                                        {player.dados?.winrate?.toFixed(1) || "0.0"}%
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        Headshot
                                                    </span>
                                                    <span className="font-semibold">
                                                        {(player.dados?.headshot || 0).toFixed(1)}%
                                                    </span>
                                                </div>
                                                {player.dados?.mainRole && (
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            Função
                                                        </span>
                                                        <Badge variant="secondary">
                                                            {player.dados.mainRole}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Operadores de Ataque */}
                                            {player.operadoresAtaque &&
                                                player.operadoresAtaque.length > 0 && (
                                                    <div className="mt-4 pt-4 border-t">
                                                        <p className="text-xs text-muted-foreground mb-2">
                                                            Ataque
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {player.operadoresAtaque.map(
                                                                (op, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className="flex items-center gap-1"
                                                                    >
                                                                        <OperatorIcon
                                                                            operatorName={
                                                                                op.nomeOperador
                                                                            }
                                                                            className="h-6 w-6"
                                                                        />
                                                                        <span className="text-xs">
                                                                            {op.winrate.toFixed(1)}%
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                            {/* Operadores de Defesa */}
                                            {player.operadoresDefesa &&
                                                player.operadoresDefesa.length > 0 && (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-muted-foreground mb-2">
                                                            Defesa
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {player.operadoresDefesa.map(
                                                                (op, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className="flex items-center gap-1"
                                                                    >
                                                                        <OperatorIcon
                                                                            operatorName={
                                                                                op.nomeOperador
                                                                            }
                                                                            className="h-6 w-6"
                                                                        />
                                                                        <span className="text-xs">
                                                                            {op.winrate.toFixed(1)}%
                                                                        </span>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">
                            Este time não possui jogadores cadastrados
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

