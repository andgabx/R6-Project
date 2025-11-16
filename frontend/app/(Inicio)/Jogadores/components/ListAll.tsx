"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { jogadorService } from "@/services/JogadorService";
import { Jogador } from "@/types/jogador";

interface ListAllProps {
    jogadores: Jogador[];
    setJogadores: (jogadores: Jogador[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
    handleError: (error: unknown, message: string) => void;
}

export default function ListAll({
    jogadores,
    setJogadores,
    loading,
    setLoading,
    error,
    setError,
    handleError,
}: ListAllProps) {
    const carregarTodosJogadores = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await jogadorService.listAll();
            setJogadores(data);
        } catch (error) {
            handleError(error, "Erro ao carregar jogadores");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarTodosJogadores();
    }, []);

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
                <ScrollArea className="h-[60vh] w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {jogadores.map((j) => (
                            <Link key={j.idJogador} href={`/Jogadores/${j.idJogador}`} passHref>
                                <Card className="cursor-pointer hover:border-primary transition-all duration-200 h-full">
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
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Todos os Jogadores</h2>
            <Button onClick={carregarTodosJogadores}>Recarregar Lista</Button>
            <div className="mt-6">{renderJogadorList()}</div>
        </div>
    );
}
