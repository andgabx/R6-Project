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

interface FindByIdProps {
    jogador: Jogador | null;
    setJogador: (jogador: Jogador | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
    handleError: (error: unknown, message: string) => void;
    isNotFoundModalOpen: boolean;
    setIsNotFoundModalOpen: (isOpen: boolean) => void;
}

export default function FindById({
    jogador,
    setJogador,
    loading,
    setLoading,
    error,
    setError,
    handleError,
    isNotFoundModalOpen,
    setIsNotFoundModalOpen,
}: FindByIdProps) {
    const [searchId, setSearchId] = useState<number>(0);

    const buscarJogadorPorId = async () => {
        if (!searchId) {
            setError("Por favor, insira um ID válido");
            return;
        }
        try {
            setLoading(true);
            setError("");
            setJogador(null);
            const data = await jogadorService.findById(searchId);
            if (data) {
                setJogador(data);
            } else {
                setIsNotFoundModalOpen(true);
            }
        } catch (error) {
            setIsNotFoundModalOpen(true);
            handleError(
                error,
                `Não foi possível encontrar o jogador com ID ${searchId}`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Buscar Jogador por ID</h2>
            <div className="flex items-center gap-2 mb-6">
                <Input
                    type="number"
                    placeholder="Digite o ID do jogador"
                    value={searchId || ""}
                    onChange={(e) => setSearchId(parseInt(e.target.value) || 0)}
                />
                <Button onClick={buscarJogadorPorId}>
                    <Search className="mr-2 h-4 w-4" /> Buscar
                </Button>
            </div>
            {jogador && (
                <Card>
                    <CardHeader>
                        <CardTitle>{jogador.nickname}</CardTitle>
                        {jogador.dados && (
                            <CardDescription>
                                Nível {jogador.dados.nivel} -{" "}
                                {jogador.dados.rankJogador}
                            </CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        {/* Detalhes do jogador encontrado */}
                        {jogador.dados && (
                            <div className="space-y-2">
                                <p>
                                    <strong>K/D:</strong> {jogador.dados.kd}
                                </p>
                                <p>
                                    <strong>Winrate:</strong>{" "}
                                    {jogador.dados.winrate}%
                                </p>
                                <p>
                                    <strong>Headshot:</strong>{" "}
                                    {jogador.dados.headshot}%
                                </p>
                                <p>
                                    <strong>Plataforma:</strong>{" "}
                                    {jogador.dados.plataforma}
                                </p>
                                <p>
                                    <strong>Horas jogadas:</strong>{" "}
                                    {jogador.dados.horasJogadas}
                                </p>
                                <p>
                                    <strong>Função Principal:</strong>{" "}
                                    {jogador.dados.mainRole}
                                </p>
                                <p>
                                    <strong>Preferência de jogo:</strong>{" "}
                                    {jogador.dados.preferenciaJogo}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
