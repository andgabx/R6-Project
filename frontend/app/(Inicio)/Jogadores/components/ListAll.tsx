"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Trash2, Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter as DialogFooterComponent, // Renomeado para evitar conflito
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
    setLoading,
    setError,
    handleError,
}: ListAllProps) {
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
            carregarTodosJogadores(); // Recarrega a lista
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

    // Placeholder para a função de editar
    const handleEdit = (jogador: Jogador) => {
        alert(`Implementar lógica de edição para: ${jogador.nickname}`);
        
        // Ex: router.push(`/Jogadores/${jogador.idJogador}/edit`);
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
                <ScrollArea className="h-[60vh] w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {jogadores.map((j) => (
                            <Card key={j.idJogador} className="flex flex-col justify-between h-full">
                                {/* O Link agora envolve apenas a parte clicável (Header e Content) */}
                                <Link href={`/Jogadores/${j.idJogador}`} passHref>
                                    <div className="cursor-pointer hover:border-primary transition-all duration-200">
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
                                    </div>
                                </Link>

                                {/* CardFooter com os botões de ação */}
                                {(actions?.onEdit || actions?.onDelete) && (
                                    <CardFooter className="flex justify-end gap-2 pt-4 border-t">
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
                                                onClick={() => actions.onDelete?.(j)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </CardFooter>
                                )}
                            </Card>
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
            
            <div className="mt-6">
                {renderJogadorList({ onEdit: handleEdit, onDelete: openDeleteModal })}
            </div>

            {/* O Dialog de confirmação, copiado do Delete.tsx */}
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
                    <DialogFooterComponent>
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
                    </DialogFooterComponent>
                </DialogContent>
            </Dialog>
        </div>
    );
}