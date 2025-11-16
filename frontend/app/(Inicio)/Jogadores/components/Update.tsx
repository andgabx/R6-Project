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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { jogadorService } from "@/services/JogadorService";
import { Jogador, JogadorRequest } from "@/types/jogador";

interface UpdateProps {
    jogadores: Jogador[];
    setJogadores: (jogadores: Jogador[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
    handleError: (error: unknown, message: string) => void;
}

export default function Update({ jogadores, setJogadores, loading, setLoading, error, setError, handleError }: UpdateProps) {
    const [selectedJogador, setSelectedJogador] = useState<Jogador | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedJogador) return;
        
        try {
            setLoading(true);
            setError("");
            
            const updateData: JogadorRequest = {
                nickname: selectedJogador.nickname,
                dados: {
                    nivel: selectedJogador.dados?.nivel || 1,
                    winrate: selectedJogador.dados?.winrate || 50.0,
                    rankJogador: selectedJogador.dados?.rankJogador || "Bronze",
                    headshot: selectedJogador.dados?.headshot || 0.0,
                    kd: selectedJogador.dados?.kd || 1.0,
                    plataforma: selectedJogador.dados?.plataforma || "PC",
                    horasJogadas: selectedJogador.dados?.horasJogadas || 0,
                    mainRole: selectedJogador.dados?.mainRole || "Suporte",
                    preferenciaJogo: selectedJogador.dados?.preferenciaJogo || "Casual",
                    mapaFavoritoId: selectedJogador.dados?.mapaFavorito?.idMapa || null,
                    mapaMaisVitoriasId: selectedJogador.dados?.mapaMaisVitorias?.idMapa || null,
                    mapaMaisDerrotasId: selectedJogador.dados?.mapaMaisDerrotas?.idMapa || null
                },
                operadoresAtaque: selectedJogador.operadoresAtaque.map(op => ({
                    operadorId: op.operador.idOperador || 0,
                    winrate: op.winrate || 0
                })),
                operadoresDefesa: selectedJogador.operadoresDefesa.map(op => ({
                    operadorId: op.operador.idOperador || 0,
                    winrate: op.winrate || 0
                }))
            };

            const updated = await jogadorService.update(selectedJogador.idJogador, updateData);
            setIsEditModalOpen(false);
            alert("Jogador atualizado com sucesso!");
            carregarTodosJogadores();
        } catch (error) {
            handleError(error, "Erro ao atualizar jogador");
        } finally {
            setLoading(false);
        }
    };

    const handleEditInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section?: string,
        index?: number,
        field?: string
    ) => {
        const { name, value } = event.target;
        if (!selectedJogador) return;

        if (section === "dados") {
            setSelectedJogador((prev) =>
                prev
                    ? {
                          ...prev,
                          dados: prev.dados ? {
                              ...prev.dados,
                              [name]:
                                  name === "nivel" ||
                                  name === "winrate" ||
                                  name === "headshot" ||
                                  name === "kd" ||
                                  name === "horasJogadas"
                                      ? Number(value)
                                      : value,
                          } : prev.dados,
                      }
                    : prev
            );
        } else if (
            section === "operadoresAtaque" &&
            typeof index === "number" &&
            field
        ) {
            setSelectedJogador((prev) => {
                if (!prev) return prev;
                const newOperadoresAtaque = [...prev.operadoresAtaque];
                newOperadoresAtaque[index] = {
                    ...newOperadoresAtaque[index],
                    [field]:
                        field === "operadorId" || field === "winrate"
                            ? Number(value)
                            : value,
                };
                return {
                    ...prev,
                    operadoresAtaque: newOperadoresAtaque,
                };
            });
        } else if (
            section === "operadoresDefesa" &&
            typeof index === "number" &&
            field
        ) {
            setSelectedJogador((prev) => {
                if (!prev) return prev;
                const newOperadoresDefesa = [...prev.operadoresDefesa];
                newOperadoresDefesa[index] = {
                    ...newOperadoresDefesa[index],
                    [field]:
                        field === "operadorId" || field === "winrate"
                            ? Number(value)
                            : value,
                };
                return {
                    ...prev,
                    operadoresDefesa: newOperadoresDefesa,
                };
            });
        } else {
            setSelectedJogador((prev) =>
                prev
                    ? {
                          ...prev,
                          [name]: value,
                      }
                    : prev
            );
        }
    };

    const jogadorEditForm = () => {
        if (!selectedJogador) return null;
        return (
            <form onSubmit={handleUpdateSubmit} className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input
                        id="nickname"
                        name="nickname"
                        value={selectedJogador.nickname}
                        onChange={handleEditInputChange}
                        required
                    />
                </div>

                <fieldset className="border p-4 rounded">
                    <legend className="font-semibold">Dados</legend>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="nivel">Nível</Label>
                            <Input
                                id="nivel"
                                name="nivel"
                                type="number"
                                value={selectedJogador.dados?.nivel || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="winrate">Winrate</Label>
                            <Input
                                id="winrate"
                                name="winrate"
                                type="number"
                                step="0.01"
                                value={selectedJogador.dados?.winrate || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="rankJogador">Rank Jogador</Label>
                            <Input
                                id="rankJogador"
                                name="rankJogador"
                                value={selectedJogador.dados?.rankJogador || ""}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="headshot">Headshot</Label>
                            <Input
                                id="headshot"
                                name="headshot"
                                type="number"
                                step="0.01"
                                value={selectedJogador.dados?.headshot || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="kd">K/D</Label>
                            <Input
                                id="kd"
                                name="kd"
                                type="number"
                                step="0.01"
                                value={selectedJogador.dados?.kd || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="plataforma">Plataforma</Label>
                            <Input
                                id="plataforma"
                                name="plataforma"
                                value={selectedJogador.dados?.plataforma || ""}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="horasJogadas">Horas Jogadas</Label>
                            <Input
                                id="horasJogadas"
                                name="horasJogadas"
                                type="number"
                                value={selectedJogador.dados?.horasJogadas || 0}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="mainRole">Main Role</Label>
                            <Input
                                id="mainRole"
                                name="mainRole"
                                value={selectedJogador.dados?.mainRole || ""}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="preferenciaJogo">Preferência de Jogo</Label>
                            <Input
                                id="preferenciaJogo"
                                name="preferenciaJogo"
                                value={selectedJogador.dados?.preferenciaJogo || ""}
                                onChange={(e) => handleEditInputChange(e, "dados")}
                                required
                            />
                        </div>
                    </div>
                </fieldset>

                <Button type="submit">Salvar Alterações</Button>
            </form>
        );
    };

    const openEditModal = (jogador: Jogador) => {
        setSelectedJogador(jogador);
        setIsEditModalOpen(true);
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
                Atualizar Jogador
            </h2>
            <p className="text-muted-foreground mb-4">
                Selecione um jogador da lista para editar.
            </p>
            {renderJogadorList({ onEdit: openEditModal })}

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>
                            Editar Jogador: {selectedJogador?.nickname}
                        </DialogTitle>
                        <DialogDescription>
                            Faça as alterações necessárias e clique em salvar.
                        </DialogDescription>
                    </DialogHeader>
                    {jogadorEditForm()}
                </DialogContent>
            </Dialog>
        </div>
    );
}
