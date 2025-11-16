"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { jogadorService } from "@/services/JogadorService";
import { Jogador } from "@/types/jogador";

interface MinWinRateProps {
    jogadores: Jogador[];
    setJogadores: (jogadores: Jogador[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
    handleError: (error: unknown, message: string) => void;
}

export default function MinWinRate({ jogadores, setJogadores, loading, setLoading, error, setError, handleError }: MinWinRateProps) {
    const [minWinRate, setMinWinRate] = useState<number>(0);

    const buscarPorWinRateMinimo = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await jogadorService.listByMinWinRate(minWinRate);
            setJogadores(data);
        } catch (error) {
            handleError(error, "Erro ao buscar jogadores por Win Rate mínimo");
        } finally {
            setLoading(false);
        }
    };

    const renderJogadorList = (actions?: {
        onEdit?: (j: Jogador) => void;
        onDelete?: (j: Jogador) => void;
    }) => (
        <div>
            <h3 className="text-xl font-semibold mb-4">
                Resultados ({jogadores.length} jogadores)
            </h3>
            {jogadores.length === 0 ? (
                <p className="text-muted-foreground">
                    Nenhum jogador encontrado.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jogadores.map((j) => (
                        <Card key={j.idJogador}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {j.nickname}
                                    <span className="text-sm font-normal text-muted-foreground">
                                        ID: {j.idJogador}
                                    </span>
                                </CardTitle>
                                {j.dados && (
                                    <CardDescription>
                                        Nível {j.dados.nivel} -{" "}
                                        {j.dados.rankJogador}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent className="flex justify-between items-center">
                                {j.dados ? (
                                    <div>
                                        <p>
                                            <strong className="text-primary">
                                                K/D:
                                            </strong>{" "}
                                            {j.dados.kd}
                                        </p>
                                        <p>
                                            <strong className="text-primary">
                                                Winrate:
                                            </strong>{" "}
                                            {j.dados.winrate}%
                                        </p>
                                        <p>
                                            <strong className="text-primary">
                                                Horas Jogadas:
                                            </strong>{" "}
                                            {j.dados.horasJogadas}
                                        </p>
                                        <p>
                                            <strong className="text-primary">
                                                Plataforma:
                                            </strong>{" "}
                                            {j.dados.plataforma}
                                        </p>
                                        <p>
                                            <strong className="text-primary">
                                                Função Principal:
                                            </strong>{" "}
                                            {j.dados.mainRole}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Sem dados.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                Jogadores por Win Rate Mínimo
            </h2>
            <div className="flex items-center gap-2 mb-6">
                <Input
                    type="number"
                    step="0.1"
                    placeholder="Win Rate mínimo"
                    value={minWinRate || ""}
                    onChange={(e) =>
                        setMinWinRate(
                            parseFloat(e.target.value) || 0
                        )
                    }
                />
                <Button onClick={buscarPorWinRateMinimo}>
                    <Search className="mr-2 h-4 w-4" /> Buscar
                </Button>
            </div>
            {renderJogadorList()}
        </div>
    );
}
