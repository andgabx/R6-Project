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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Crosshair } from "lucide-react";
import { armaService, ArmaRequest } from "@/services/ArmaService";
import { toast } from "sonner";

interface CreateWeaponButtonProps {
    onWeaponCreated?: () => void;
}

export function CreateWeaponButton({
    onWeaponCreated,
}: CreateWeaponButtonProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [dano, setDano] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome.trim()) {
            toast.error("Por favor, insira um nome para a arma", {
                position: "bottom-center",
            });
            return;
        }
        if (!tipo) {
            toast.error("Por favor, selecione um tipo", {
                position: "bottom-center",
            });
            return;
        }
        if (!dano || dano <= 0) {
            toast.error("Por favor, insira um dano válido", {
                position: "bottom-center",
            });
            return;
        }

        try {
            setLoading(true);
            const data: ArmaRequest = {
                nome: nome.trim(),
                tipo: tipo,
                dano: dano,
            };
            await armaService.create(data);
            toast.success("Arma criada com sucesso!", {
                position: "bottom-center",
            });
            setDialogOpen(false);
            setNome("");
            setTipo("");
            setDano(0);
            onWeaponCreated?.();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao criar arma: ${errorMessage}`, {
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
                <Crosshair className="h-6 w-6" />
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Crosshair className="h-5 w-5 text-primary" />
                            Criar Nova Arma
                        </DialogTitle>
                        <DialogDescription>
                            Adicione uma nova arma ao sistema
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} id="create-weapon-form">
                        <div className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="nome">Nome da Arma</Label>
                                <Input
                                    id="nome"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Ex: AK-12"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="tipo">Tipo</Label>
                                <Select
                                    value={tipo}
                                    onValueChange={setTipo}
                                    disabled={loading}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Assault Rifles">
                                            Assault Rifles
                                        </SelectItem>
                                        <SelectItem value="Submachine Guns (SMGs)">
                                            Submachine Guns (SMGs)
                                        </SelectItem>
                                        <SelectItem value="Shotguns">Shotguns</SelectItem>
                                        <SelectItem value="Marksman Rifles">
                                            Marksman Rifles
                                        </SelectItem>
                                        <SelectItem value="Light Machine Guns (LMGs)">
                                            Light Machine Guns (LMGs)
                                        </SelectItem>
                                        <SelectItem value="Machine Pistols">
                                            Machine Pistols
                                        </SelectItem>
                                        <SelectItem value="Handguns">Handguns</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="dano">Dano</Label>
                                <Input
                                    id="dano"
                                    name="dano"
                                    type="number"
                                    value={dano || ""}
                                    onChange={(e) =>
                                        setDano(parseInt(e.target.value) || 0)
                                    }
                                    placeholder="Ex: 45"
                                    required
                                    disabled={loading}
                                    min="1"
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
                                setTipo("");
                                setDano(0);
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
                                    "create-weapon-form"
                                ) as HTMLFormElement;
                                if (form) {
                                    form.requestSubmit();
                                }
                            }}
                        >
                            {loading ? "Criando..." : "Criar Arma"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

