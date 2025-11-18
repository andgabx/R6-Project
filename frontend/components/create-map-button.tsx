"use client";

import { useState } from "react";
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
import { Map } from "lucide-react";
import { mapaService, MapaRequest } from "@/services/MapaService";
import { toast } from "sonner";

interface CreateMapButtonProps {
    onMapCreated?: () => void;
}

export function CreateMapButton({ onMapCreated }: CreateMapButtonProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome.trim()) {
            toast.error("Por favor, insira um nome para o mapa", {
                position: "bottom-center",
            });
            return;
        }

        try {
            setLoading(true);
            const data: MapaRequest = { nome: nome.trim() };
            await mapaService.create(data);
            toast.success("Mapa criado com sucesso!", {
                position: "bottom-center",
            });
            setDialogOpen(false);
            setNome("");
            onMapCreated?.();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao criar mapa: ${errorMessage}`, {
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
                <Map className="h-6 w-6" />
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Map className="h-5 w-5 text-primary" />
                            Criar Novo Mapa
                        </DialogTitle>
                        <DialogDescription>
                            Adicione um novo mapa ao sistema
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} id="create-map-form">
                        <div className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="nome">Nome do Mapa</Label>
                                <Input
                                    id="nome"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Ex: Consulado"
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
                                setNome("");
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
                                    "create-map-form"
                                ) as HTMLFormElement;
                                if (form) {
                                    form.requestSubmit();
                                }
                            }}
                        >
                            {loading ? "Criando..." : "Criar Mapa"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
