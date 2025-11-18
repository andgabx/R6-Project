"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, TrendingUp, ArrowLeft } from "lucide-react";
import { teamService } from "@/services/TeamService";
import { Time } from "@/types/team";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CompetitivoPage() {
    const [teams, setTeams] = useState<Time[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await teamService.listAll();
                // Filtrar apenas times com jogadores (times competitivos)
                const teamsWithPlayers = data.filter(
                    (team) => team.jogadores && team.jogadores.length > 0
                );
                setTeams(teamsWithPlayers);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    // Calcular estatísticas do time
    const getTeamStats = (team: Time) => {
        if (!team.jogadores || team.jogadores.length === 0) {
            return {
                avgKd: 0,
                avgWinrate: 0,
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

        return {
            avgKd: (totalKd / team.jogadores.length).toFixed(2),
            avgWinrate: (totalWinrate / team.jogadores.length).toFixed(1),
            totalPlayers: team.jogadores.length,
        };
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8">
                <Link
                    href="/"
                    className="text-primary hover:underline mb-4 flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para o início
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Trophy className="h-12 w-12 text-primary" />
                        <div>
                            <h1 className="text-4xl font-bold">
                                Times Competitivos
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Explore os times profissionais e suas estatísticas
                            </p>
                        </div>
                    </div>
                    <Link href="/Competitivo/Relacao">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Ver Relação Completa
                        </Button>
                    </Link>
                </div>
            </header>

            {loading ? (
                <Card>
                    <CardContent className="py-8">
                        <p className="text-muted-foreground text-center">
                            Carregando times...
                        </p>
                    </CardContent>
                </Card>
            ) : teams.length === 0 ? (
                <Card>
                    <CardContent className="py-8">
                        <p className="text-muted-foreground text-center">
                            Nenhum time competitivo encontrado
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team) => {
                        const stats = getTeamStats(team);
                        return (
                            <Link
                                key={team.idTime}
                                href={`/Competitivo/${team.idTime}`}
                                className="group"
                            >
                                <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                {team.nome}
                                            </CardTitle>
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Jogadores
                                                </span>
                                                <Badge variant="outline">
                                                    {stats.totalPlayers}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground flex items-center gap-1">
                                                    <TrendingUp className="h-3 w-3" />
                                                    K/D Médio
                                                </span>
                                                <span className="font-semibold">
                                                    {stats.avgKd}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Winrate Médio
                                                </span>
                                                <span className="font-semibold">
                                                    {stats.avgWinrate}%
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
