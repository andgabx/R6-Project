"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Loader2, ArrowLeft } from "lucide-react";
import { jogadorService } from "@/services/JogadorService";
import { JogadorTime } from "@/types/jogador";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RelacaoPage() {
    const [jogadoresTimes, setJogadoresTimes] = useState<JogadorTime[]>([]);
    const [loadingJogadoresTimes, setLoadingJogadoresTimes] = useState(false);

    useEffect(() => {
        const fetchJogadoresTimes = async () => {
            try {
                setLoadingJogadoresTimes(true);
                const data = await jogadorService.getJogadoresTimes();
                setJogadoresTimes(data);
            } catch (error) {
                console.error("Erro ao buscar relação jogadores-times:", error);
            } finally {
                setLoadingJogadoresTimes(false);
            }
        };

        fetchJogadoresTimes();
    }, []);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8">
                <Link
                    href="/Competitivo"
                    className="text-primary hover:underline mb-4 flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Times Competitivos
                </Link>
                <div className="flex items-center gap-4">
                    <Users className="h-12 w-12 text-primary" />
                    <div>
                        <h1 className="text-4xl font-bold">
                            Relação Completa: Jogadores e Times
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Mostra todos os jogadores (mesmo sem time) e todos os times (mesmo sem jogadores)
                        </p>
                    </div>
                </div>
            </header>

            {loadingJogadoresTimes ? (
                <Card>
                    <CardContent className="py-8">
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            <p className="text-muted-foreground">
                                Carregando relação...
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <ScrollArea className="h-[calc(100vh-250px)] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
                        {jogadoresTimes.map((item, index) => (
                            <Card key={index} className="p-3">
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Jogador
                                        </p>
                                        <p className="text-sm font-medium">
                                            {item.jogador || (
                                                <span className="text-muted-foreground italic">
                                                    Sem jogador
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Time
                                        </p>
                                        <p className="text-sm font-medium">
                                            {item.time || (
                                                <span className="text-muted-foreground italic">
                                                    Sem time
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            )}
        </div>
    );
}

