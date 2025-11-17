"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { jogadorService } from "@/services/JogadorService";
import { Jogador } from "@/types/jogador";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BarChart, Shield, Sword, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import OperatorIcon from "@/components/ui/OperatorIcon";
import { PlayerPerformanceRadarChart } from "./components/PlayerPerformanceRadarChart";

export default function Page() {
    const params = useParams();
    const playerId = params.playerId as string;
    const [player, setPlayer] = useState<Jogador | null>(null);
    const [playerTeam, setPlayerTeam] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const id = parseInt(playerId, 10);
                if (isNaN(id)) return;

                // Buscar dados do jogador
                const playerData = await jogadorService.findById(id);
                setPlayer(playerData);

                // Buscar relação jogador-time
                const jogadoresTimes = await jogadorService.getJogadoresTimes();
                const jogadorTime = jogadoresTimes.find(
                    (jt) => jt.jogador === playerData.nickname
                );
                setPlayerTeam(jogadorTime?.time || null);
            } catch (error) {
                console.error("Failed to fetch player:", error);
            } finally {
                setLoading(false);
            }
        };

        if (playerId) {
            fetchData();
        }
    }, [playerId]);

    if (loading) {
        return (
            <div className="container mx-auto p-4 md:p-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!player) {
        return (
            <div className="container mx-auto p-4 md:p-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground">
                        Jogador não encontrado
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8">
                <Link
                    href="/Jogadores"
                    className="text-primary hover:underline mb-4 block"
                >
                    &larr; Voltar para a lista de jogadores
                </Link>
                <div className="flex items-center gap-4">
                    <Users className="h-12 w-12 text-primary" />
                    <div>
                        <h1 className="text-4xl font-bold">
                            {player.nickname}
                        </h1>
                        {player.dados && (
                            <p className="text-muted-foreground text-lg">
                                Nível {player.dados.nivel} - Rank{" "}
                                {player.dados.rankJogador}
                            </p>
                        )}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coluna Principal de Stats */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart className="h-6 w-6" />
                                Estatísticas Gerais
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {player.dados ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            K/D Ratio
                                        </p>
                                        <p className="text-3xl font-bold">
                                            {player.dados.kd}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            Win Rate
                                        </p>
                                        <p className="text-3xl font-bold">
                                            {player.dados.winrate}%
                                        </p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            Horas Jogadas
                                        </p>
                                        <p className="text-3xl font-bold">
                                            {player.dados.horasJogadas}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            Plataforma
                                        </p>
                                        <p className="text-2xl font-semibold">
                                            {player.dados.plataforma}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            Função
                                        </p>
                                        <p className="text-2xl font-semibold">
                                            {player.dados.mainRole ??
                                                "Sem função"}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            Time
                                        </p>
                                        <p className="text-2xl font-semibold">
                                            {playerTeam ||
                                                "Não tem nenhum time afiliado"}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p>Sem dados de estatísticas disponíveis.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Radar Chart */}
                    <div className="mt-6">
                        <PlayerPerformanceRadarChart player={player} />
                    </div>
                </div>

                {/* Coluna Lateral */}
                <div className="space-y-6">
                    {/* Card de Time */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users2 className="h-6 w-6 text-primary" />
                                Time Afiliado
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {playerTeam ? (
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="text-lg px-4 py-2"
                                    >
                                        {playerTeam}
                                    </Badge>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">
                                    Não tem nenhum time afiliado
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sword className="h-6 w-6 text-red-500" />
                                Operadores de Ataque
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {player.operadoresAtaque &&
                            player.operadoresAtaque.length > 0 ? (
                                <ul className="space-y-3">
                                    {player.operadoresAtaque.map((op) => (
                                        <li
                                            key={op.nomeOperador}
                                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <OperatorIcon
                                                    operatorName={
                                                        op.nomeOperador
                                                    }
                                                />
                                                <span className="font-medium">
                                                    {op.nomeOperador}
                                                </span>
                                            </div>
                                            <Badge
                                                className="text-md"
                                                variant="secondary"
                                            >
                                                WR: {op.winrate}%
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nenhum operador de ataque registrado.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-6 w-6 text-blue-500" />
                                Operadores de Defesa
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {player.operadoresDefesa &&
                            player.operadoresDefesa.length > 0 ? (
                                <ul className="space-y-3">
                                    {player.operadoresDefesa.map((op) => (
                                        <li
                                            key={op.nomeOperador}
                                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <OperatorIcon
                                                    operatorName={
                                                        op.nomeOperador
                                                    }
                                                />
                                                <span className="font-medium">
                                                    {op.nomeOperador}
                                                </span>
                                            </div>
                                            <Badge variant="secondary">
                                                WR: {op.winrate}%
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Nenhum operador de defesa registrado.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
