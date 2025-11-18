"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Gamepad2, Loader2 } from "lucide-react";
import { partidaService } from "@/services/PartidaService";
import { PartidaRequest } from "@/types/partida";
import { toast } from "sonner";
import { mapaService } from "@/services/MapaService";
import { Mapa } from "@/types/mapa";

interface CreatePartidaButtonProps {
    onPartidaCreated?: () => void;
}

export function CreatePartidaButton({ onPartidaCreated }: CreatePartidaButtonProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState("");
    const [mapaId, setMapaId] = useState<number | null>(null);
    const [modoDeJogoId, setModoDeJogoId] = useState<number | null>(null);
    const [dataHora, setDataHora] = useState("");
    const [mapas, setMapas] = useState<Mapa[]>([]);
    const [modosDeJogo] = useState([
        { id: 1, nome: "Ranqueado", descricao: "Modo competitivo ranqueado", tipo: "Competitivo" },
        { id: 2, nome: "Casual", descricao: "Modo casual", tipo: "Casual" },
        { id: 3, nome: "Treino", descricao: "Modo de treinamento", tipo: "Treino" },
    ]);

    useEffect(() => {
        const fetchMapas = async () => {
            try {
                const data = await mapaService.listAll();
                setMapas(data);
            } catch (error) {
                console.error("Erro ao buscar mapas:", error);
            }
        };
        fetchMapas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resultado.trim() || !mapaId || !modoDeJogoId || !dataHora) {
            toast.error("Por favor, preencha todos os campos", {
                position: "bottom-center",
            });
            return;
        }

        try {
            setLoading(true);
            const data: PartidaRequest = {
                resultado: resultado.trim(),
                mapaId,
                modoDeJogoId,
                dataHora: new Date(dataHora).toISOString(),
            };
            await partidaService.create(data);
            toast.success("Partida criada com sucesso!", {
                position: "bottom-center",
            });
            setDialogOpen(false);
            setResultado("");
            setMapaId(null);
            setModoDeJogoId(null);
            setDataHora("");
            onPartidaCreated?.();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao criar partida: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => setDialogOpen(true)}
                className="fixed bottom-3.5 right-20 h-12 w-12 shadow-lg z-50 bg-primary hover:bg-primary/90 p-0 rounded-full"
                size="icon"
            >
                <Gamepad2 className="h-6 w-6" />
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Gamepad2 className="h-5 w-5 text-primary" />
                            Criar Nova Partida
                        </DialogTitle>
                        <DialogDescription>
                            Adicione uma nova partida ao sistema
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} id="create-partida-form">
                        <div className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="resultado">Resultado</Label>
                                <Input
                                    id="resultado"
                                    name="resultado"
                                    value={resultado}
                                    onChange={(e) => setResultado(e.target.value)}
                                    placeholder="Ex: Vitória, Derrota, Empate"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="mapa">Mapa</Label>
                                <Select
                                    value={mapaId?.toString() || ""}
                                    onValueChange={(value) => setMapaId(parseInt(value))}
                                    disabled={loading}
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
                                <Label htmlFor="modoDeJogo">Modo de Jogo</Label>
                                <Select
                                    value={modoDeJogoId?.toString() || ""}
                                    onValueChange={(value) => setModoDeJogoId(parseInt(value))}
                                    disabled={loading}
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
                                <Label htmlFor="dataHora">Data e Hora</Label>
                                <Input
                                    id="dataHora"
                                    type="datetime-local"
                                    value={dataHora}
                                    onChange={(e) => setDataHora(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </form>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setDialogOpen(false);
                                setResultado("");
                                setMapaId(null);
                                setModoDeJogoId(null);
                                setDataHora("");
                            }}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            disabled={loading}
                            onClick={(e) => {
                                e.preventDefault();
                                const form = document.getElementById(
                                    "create-partida-form"
                                ) as HTMLFormElement;
                                if (form) {
                                    form.requestSubmit();
                                }
                            }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Criando...
                                </>
                            ) : (
                                "Criar Partida"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

