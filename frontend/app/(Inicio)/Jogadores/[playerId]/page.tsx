import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { jogadorService } from "@/services/JogadorService";
import { Jogador } from "@/types/jogador";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Users, BarChart, Shield, Sword, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import OperatorIcon from "@/components/ui/OperatorIcon";
import { PlayerRadarChart } from "./components/PlayerRadarChart";

async function getPlayer(playerId: string): Promise<Jogador | null> {
    try {
        const id = parseInt(playerId, 10);
        if (isNaN(id)) return null;
        return await jogadorService.findById(id);
    } catch (error) {
        console.error("Failed to fetch player:", error);
        return null;
    }
}

export default async function Page({
    params,
}: {
    params: { playerId: string };
}) {
    const player = await getPlayer(params.playerId);

    if (!player) {
        notFound();
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8">
                <Link href="/Jogadores" className="text-primary hover:underline mb-4 block">
                    &larr; Voltar para a lista de jogadores
                </Link>
                <div className="flex items-center gap-4">
                    <Users className="h-12 w-12 text-primary" />
                    <div>
                        <h1 className="text-4xl font-bold">{player.nickname}</h1>
                        {player.dados && (
                            <p className="text-muted-foreground text-lg">
                                Nível {player.dados.nivel} - Rank {player.dados.rankJogador}
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
                                        <p className="text-sm text-muted-foreground">K/D Ratio</p>
                                        <p className="text-3xl font-bold">{player.dados.kd}</p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">Win Rate</p>
                                        <p className="text-3xl font-bold">{player.dados.winrate}%</p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">Horas Jogadas</p>
                                        <p className="text-3xl font-bold">{player.dados.horasJogadas}</p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">Plataforma</p>
                                        <p className="text-2xl font-semibold">{player.dados.plataforma}</p>
                                    </div>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">Função</p>
                                        <p className="text-2xl font-semibold">{player.dados.mainRole ?? "Sem função"}</p>
                                    </div>
                                </div>
                            ) : (
                                <p>Sem dados de estatísticas disponíveis.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Radar Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <PlayerRadarChart
                            title="Estilo de Jogo"
                            description="Performance em diferentes aspectos do jogo."
                            data={[
                                { subject: 'K/D', value: player.dados?.kd ?? 0 },
                                { subject: 'Winrate', value: player.dados?.winrate ?? 0 },
                                { subject: 'Headshot %', value: player.dados?.headshot ?? 0 },

                            ]}
                        />
                        <PlayerRadarChart
                            title="Preferências"
                            description="Foco em diferentes estratégias e funções."
                            data={[
                                { subject: 'Agressividade', value: 80 },
                                { subject: 'Suporte', value: 70 },
                                { subject: 'Objetivo', value: 90 },
                                { subject: 'Flexibilidade', value: 75 },
                                { subject: 'Liderança', value: 60 },
                            ]}
                        />
                    </div>
                </div>

                {/* Coluna Lateral */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sword className="h-6 w-6 text-red-500" />
                                Operadores de Ataque
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {player.operadoresAtaque && player.operadoresAtaque.length > 0 ? (
                                <ul className="space-y-3">
                                    {player.operadoresAtaque.map(op => (
                                        <li key={op.nomeOperador} className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors">
                                            <div className="flex items-center gap-3">
                                                <OperatorIcon operatorName={op.nomeOperador} />
                                                <span className="font-medium">{op.nomeOperador}</span>
                                            </div>
                                            <Badge className="text-md" variant="secondary">WR: {op.winrate}%</Badge>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>Nenhum operador de ataque registrado.</p>}
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
                            {player.operadoresDefesa && player.operadoresDefesa.length > 0 ? (
                                <ul className="space-y-3">
                                    {player.operadoresDefesa.map(op => (
                                        <li key={op.nomeOperador} className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors">
                                            <div className="flex items-center gap-3">
                                                <OperatorIcon operatorName={op.nomeOperador} />
                                                <span className="font-medium">{op.nomeOperador}</span>
                                            </div>
                                            <Badge variant="secondary">WR: {op.winrate}%</Badge>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p>Nenhum operador de defesa registrado.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
