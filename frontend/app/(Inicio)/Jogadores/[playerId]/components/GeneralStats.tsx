"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Jogador } from "@/types/jogador";
import { BarChart } from "lucide-react";

interface GeneralStatsProps {
    player: Jogador;
}

export function GeneralStats({ player }: GeneralStatsProps) {
    return (
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
                            <p className="text-2xl font-semibold">{player.dados.mainRole ?? "Sem preferência"}</p>
                        </div>
                    </div>
                ) : (
                    <p>Sem dados de estatísticas disponíveis.</p>
                )}
            </CardContent>
        </Card>
    );
}
