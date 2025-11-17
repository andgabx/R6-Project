"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Jogador } from "@/types/jogador";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RecentPlayersTableProps {
    players: Jogador[];
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "success":
        case "ativo":
            return "bg-green-500";
        case "error":
        case "inativo":
            return "bg-red-500";
        case "running":
        case "jogando":
            return "bg-blue-500";
        default:
            return "bg-gray-500";
    }
};

export const RecentPlayersTable = ({ players }: RecentPlayersTableProps) => {
    // Ordenar por nível (maior primeiro) e pegar os top 5
    const topPlayersByLevel = [...players]
        .sort((a, b) => {
            const nivelA = a.dados?.nivel || 0;
            const nivelB = b.dados?.nivel || 0;
            return nivelB - nivelA;
        })
        .slice(0, 5);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Jogadores com Maior Nível</CardTitle>
                <CardDescription>
                    Top 5 jogadores com os maiores níveis
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                {/* <th className="text-left text-sm font-medium text-muted-foreground pb-2">
                                    ID
                                </th> */}
                                <th className="text-left text-sm font-medium text-muted-foreground pb-2">
                                    Jogador
                                </th>
                                <th className="text-left text-sm font-medium text-muted-foreground pb-2">
                                    Nível
                                </th>
                                <th className="text-left text-sm font-medium text-muted-foreground pb-2">
                                    K/D
                                </th>
                                <th className="text-left text-sm font-medium text-muted-foreground pb-2">
                                    Win Rate
                                </th>
                                <th className="text-left text-sm font-medium text-muted-foreground pb-2">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {topPlayersByLevel.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center text-muted-foreground py-8"
                                    >
                                        Nenhum jogador encontrado
                                    </td>
                                </tr>
                            ) : (
                                topPlayersByLevel.map((player) => (
                                    <tr
                                        key={player.idJogador}
                                        className="border-b hover:bg-muted/50 transition-colors"
                                    >
                                        {/* <td className="py-3 text-sm">
                                            {player.idJogador}
                                        </td> */}
                                        <td className="py-3">
                                            <Link
                                                href={`/Jogadores/${player.idJogador}`}
                                                className="text-sm font-medium hover:text-primary transition-colors"
                                            >
                                                {player.nickname}
                                            </Link>
                                        </td>
                                        <td className="py-3 text-sm">
                                            {player.dados?.nivel || "N/A"}
                                        </td>
                                        <td className="py-3 text-sm">
                                            {player.dados?.kd?.toFixed(2) ||
                                                "N/A"}
                                        </td>
                                        <td className="py-3 text-sm">
                                            {player.dados?.winrate !== undefined
                                                ? player.dados.winrate.toFixed(
                                                      3
                                                  )
                                                : "N/A"}
                                        </td>
                                        <td className="py-3">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        getStatusColor("ativo")
                                                    )}
                                                />
                                                <span className="text-sm text-muted-foreground">
                                                    Ativo
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};
