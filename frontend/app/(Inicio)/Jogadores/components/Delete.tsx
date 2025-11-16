"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { jogadorService } from "@/services/JogadorService";
import { Jogador } from "@/types/jogador";

interface DeleteProps {
    jogadores: Jogador[];
    setJogadores: (jogadores: Jogador[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
    handleError: (error: unknown, message: string) => void;
}

export default function Delete({ jogadores, setJogadores, loading, setLoading, error, setError, handleError }: DeleteProps) {
    const [selectedJogador, setSelectedJogador] = useState<Jogador | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    const handleDeleteConfirm = async () => {
        if (!selectedJogador) return;
        try {
            setLoading(true);
            setError("");
            await jogadorService.delete(selectedJogador.idJogador);
            setIsDeleteModalOpen(false);
            alert("Jogador deletado com sucesso!");
            carregarTodosJogadores();
        } catch (error) {
            handleError(error, "Erro ao deletar jogador");
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (jogador: Jogador) => {
        setSelectedJogador(jogador);
        setIsDeleteModalOpen(true);
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
                                <div className="flex gap-2">
                                    {actions?.onEdit && (
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => actions.onEdit?.(j)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    )}
                                    {actions?.onDelete && (
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() =>
                                                actions.onDelete?.(j)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
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
                Deletar Jogador
            </h2>
            <p className="text-muted-foreground mb-4">
                Selecione um jogador da lista para deletar.
            </p>
            {renderJogadorList({ onDelete: openDeleteModal })}

            <Dialog
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Deleção</DialogTitle>
                        <DialogDescription>
                            Você tem certeza que deseja deletar o jogador{" "}
                            <strong className="text-destructive">
                                {selectedJogador?.nickname}
                            </strong>
                            ? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                        >
                            Deletar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
