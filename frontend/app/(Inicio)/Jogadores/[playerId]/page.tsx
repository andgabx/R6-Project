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
import { Users } from "lucide-react";

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
        // mostra 404 se não existir
        notFound();
    }

    return (
        <div className="container mx-auto p-4 md:p-12">
            <header className="mb-8">
                <Link href="/Jogadores" className="text-primary hover:underline mb-4 block">
                    &larr; Voltar para a lista de jogadores
                </Link>
                <h1 className="text-4xl font-bold flex items-center gap-3">
                    <Users className="h-10 w-10 text-primary" />
                    Detalhes de {player.nickname}
                </h1>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>{player.nickname}</CardTitle>
                    {player.dados && (
                        <CardDescription>
                            Nível {player.dados.nivel} - {player.dados.rankJogador}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    {player.dados ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><strong>K/D:</strong> {player.dados.kd}</p>
                            <p><strong>Winrate:</strong> {player.dados.winrate}%</p>
                            <p><strong>Horas Jogadas:</strong> {player.dados.horasJogadas}</p>
                            <p><strong>Plataforma:</strong> {player.dados.plataforma}</p>
                            <p><strong>Função Principal:</strong> {player.dados.mainRole}</p>
                        </div>
                    ) : (
                        <p>Sem dados adicionais disponíveis.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
