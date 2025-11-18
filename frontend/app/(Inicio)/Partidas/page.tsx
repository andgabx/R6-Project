"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Loader2, Edit, Trash2, Calendar, Map, Users, Shield } from "lucide-react";
import { partidaService } from "@/services/PartidaService";
import { Partida } from "@/types/partida";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CreatePartidaButton } from "@/components/create-partida-button";
import { mapaService } from "@/services/MapaService";
import { Mapa } from "@/types/mapa";
import { jogadorService } from "@/services/JogadorService";
import { Jogador } from "@/types/jogador";
import { operadorService } from "@/services/OperadorService";
import { Operador } from "@/types/operador";

export default function PartidasPage() {
    const [partidas, setPartidas] = useState<Partida[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPartida, setSelectedPartida] = useState<Partida | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingPartida, setEditingPartida] = useState<Partida | null>(null);
    const [deletingPartida, setDeletingPartida] = useState<Partida | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    // Estados para edição
    const [editResultado, setEditResultado] = useState("");
    const [editMapaId, setEditMapaId] = useState<number | null>(null);
    const [editModoDeJogoId, setEditModoDeJogoId] = useState<number | null>(null);
    const [editDataHora, setEditDataHora] = useState("");

    // Dados para selects
    const [mapas, setMapas] = useState<Mapa[]>([]);
    const [jogadores, setJogadores] = useState<Jogador[]>([]);
    const [operadores, setOperadores] = useState<Operador[]>([]);
    const [modosDeJogo, setModosDeJogo] = useState<Array<{ id: number; nome: string; descricao: string; tipo: string }>>([]);

    const fetchPartidas = async () => {
        try {
            setLoading(true);
            const data = await partidaService.listAll();
            setPartidas(data);
        } catch (error) {
            console.error("Erro ao buscar partidas:", error);
            toast.error("Erro ao carregar partidas", {
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartidas();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mapasData, jogadoresData, operadoresData] = await Promise.all([
                    mapaService.listAll(),
                    jogadorService.listAll(),
                    operadorService.listAll(),
                ]);
                setMapas(mapasData);
                setJogadores(jogadoresData);
                setOperadores(operadoresData);

                // Mock de modos de jogo - você pode substituir por uma chamada à API se existir
                setModosDeJogo([
                    { id: 1, nome: "Ranqueado", descricao: "Modo competitivo ranqueado", tipo: "Competitivo" },
                    { id: 2, nome: "Casual", descricao: "Modo casual", tipo: "Casual" },
                    { id: 3, nome: "Treino", descricao: "Modo de treinamento", tipo: "Treino" },
                ]);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (partida: Partida, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingPartida(partida);
        setEditResultado(partida.resultado);
        setEditMapaId(partida.mapa?.idMapa || null);
        setEditModoDeJogoId(partida.modoDeJogo?.idModoDeJogo || null);
        const date = new Date(partida.dataHora);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        setEditDataHora(`${year}-${month}-${day}T${hours}:${minutes}`);
        setEditDialogOpen(true);
    };

    const handleDelete = (partida: Partida, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeletingPartida(partida);
        setDeleteDialogOpen(true);
    };

    const handleEditConfirm = async () => {
        if (!editingPartida || !editMapaId || !editModoDeJogoId) return;

        try {
            setActionLoading(true);
            const data = {
                resultado: editResultado.trim(),
                mapaId: editMapaId,
                modoDeJogoId: editModoDeJogoId,
                dataHora: new Date(editDataHora).toISOString(),
            };
            await partidaService.update(editingPartida.idPartida, data);
            toast.success("Partida atualizada com sucesso!", {
                position: "bottom-center",
            });
            setEditDialogOpen(false);
            setEditingPartida(null);
            fetchPartidas();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao atualizar partida: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deletingPartida) return;

        try {
            setActionLoading(true);
            await partidaService.delete(deletingPartida.idPartida);
            toast.success("Partida deletada com sucesso!", {
                position: "bottom-center",
            });
            setDeleteDialogOpen(false);
            setDeletingPartida(null);
            fetchPartidas();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao deletar partida: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleCardClick = (partida: Partida) => {
        setSelectedPartida(partida);
        setDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getResultadoColor = (resultado: string) => {
        const lower = resultado.toLowerCase();
        if (lower.includes("vitória") || lower.includes("vitoria") || lower.includes("win")) {
            return "bg-green-500";
        } else if (lower.includes("derrota") || lower.includes("loss")) {
            return "bg-red-500";
        } else if (lower.includes("empate") || lower.includes("draw")) {
            return "bg-yellow-500";
        }
        return "bg-gray-500";
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Carregando partidas...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                    <Gamepad2 className="h-10 w-10 text-primary" />
                    Partidas
                </h1>
                <p className="text-muted-foreground">
                    Gerenciamento de partidas
                </p>
            </div>

            {/* Grid de Cards */}
            {partidas.length === 0 ? (
                <Card>
                    <CardContent className="py-8">
                        <p className="text-muted-foreground text-center">
                            Nenhuma partida encontrada
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partidas.map((partida) => (
                        <Card
                            key={partida.idPartida}
                            className="cursor-pointer hover:shadow-lg transition-all"
                            onClick={() => handleCardClick(partida)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">
                                        Partida #{partida.idPartida}
                                    </CardTitle>
                                    <Badge className={getResultadoColor(partida.resultado)}>
                                        {partida.resultado}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">
                                            {formatDate(partida.dataHora)}
                                        </span>
                                    </div>
                                    {partida.mapa && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Map className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{partida.mapa.nome}</span>
                                        </div>
                                    )}
                                    {partida.modoDeJogo && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                {partida.modoDeJogo.nome}
                                            </span>
                                        </div>
                                    )}
                                    {partida.jogador && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                {partida.jogador.nickname}
                                            </span>
                                        </div>
                                    )}
                                    {partida.operador && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Shield className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                {partida.operador.nome}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => handleEdit(partida, e)}
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        Editar
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={(e) => handleDelete(partida, e)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Deletar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Dialog de Detalhes */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            <Gamepad2 className="h-6 w-6 text-primary" />
                            Partida #{selectedPartida?.idPartida}
                        </DialogTitle>
                        <DialogDescription>
                            Detalhes da partida
                        </DialogDescription>
                    </DialogHeader>
                    {selectedPartida && (
                        <div className="space-y-4">
                            <div>
                                <Label>Resultado</Label>
                                <Badge className={getResultadoColor(selectedPartida.resultado)}>
                                    {selectedPartida.resultado}
                                </Badge>
                            </div>
                            <div>
                                <Label>Data e Hora</Label>
                                <p className="text-sm font-medium">
                                    {formatDate(selectedPartida.dataHora)}
                                </p>
                            </div>
                            {selectedPartida.mapa && (
                                <div>
                                    <Label>Mapa</Label>
                                    <p className="text-sm font-medium">
                                        {selectedPartida.mapa.nome}
                                    </p>
                                </div>
                            )}
                            {selectedPartida.modoDeJogo && (
                                <div>
                                    <Label>Modo de Jogo</Label>
                                    <p className="text-sm font-medium">
                                        {selectedPartida.modoDeJogo.nome} ({selectedPartida.modoDeJogo.tipo})
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {selectedPartida.modoDeJogo.descricao}
                                    </p>
                                </div>
                            )}
                            {selectedPartida.jogador && (
                                <div>
                                    <Label>Jogador</Label>
                                    <p className="text-sm font-medium">
                                        {selectedPartida.jogador.nickname}
                                    </p>
                                </div>
                            )}
                            {selectedPartida.operador && (
                                <div>
                                    <Label>Operador</Label>
                                    <p className="text-sm font-medium">
                                        {selectedPartida.operador.nome} ({selectedPartida.operador.funcao})
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog de Edição */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Editar Partida</DialogTitle>
                        <DialogDescription>
                            Atualize as informações da partida
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="editResultado">Resultado</Label>
                            <Input
                                id="editResultado"
                                value={editResultado}
                                onChange={(e) => setEditResultado(e.target.value)}
                                placeholder="Ex: Vitória, Derrota, Empate"
                                disabled={actionLoading}
                            />
                        </div>
                        <div>
                            <Label htmlFor="editMapa">Mapa</Label>
                            <Select
                                value={editMapaId?.toString() || ""}
                                onValueChange={(value) => setEditMapaId(parseInt(value))}
                                disabled={actionLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o mapa" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mapas.map((mapa) => (
                                        <SelectItem key={mapa.idMapa} value={mapa.idMapa.toString()}>
                                            {mapa.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="editModoDeJogo">Modo de Jogo</Label>
                            <Select
                                value={editModoDeJogoId?.toString() || ""}
                                onValueChange={(value) => setEditModoDeJogoId(parseInt(value))}
                                disabled={actionLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o modo de jogo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {modosDeJogo.map((modo) => (
                                        <SelectItem key={modo.id} value={modo.id.toString()}>
                                            {modo.nome}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="editDataHora">Data e Hora</Label>
                            <Input
                                id="editDataHora"
                                type="datetime-local"
                                value={editDataHora}
                                onChange={(e) => setEditDataHora(e.target.value)}
                                disabled={actionLoading}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setEditDialogOpen(false)}
                            disabled={actionLoading}
                        >
                            Cancelar
                        </Button>
                        <Button onClick={handleEditConfirm} disabled={actionLoading}>
                            {actionLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                "Salvar"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog de Confirmação de Exclusão */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja deletar a partida #{deletingPartida?.idPartida}?
                            Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={actionLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={actionLoading}
                        >
                            {actionLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Deletando...
                                </>
                            ) : (
                                "Deletar"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <CreatePartidaButton onPartidaCreated={fetchPartidas} />
        </div>
    );
}

