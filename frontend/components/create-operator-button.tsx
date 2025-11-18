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
import { Shield, Plus } from "lucide-react";
import { operadorService, OperadorRequest } from "@/services/OperadorService";
import { armaService } from "@/services/ArmaService";
import { Arma } from "@/types/arma";
import { toast } from "sonner";

interface CreateOperatorButtonProps {
    onOperatorCreated?: () => void;
}

export function CreateOperatorButton({
    onOperatorCreated,
}: CreateOperatorButtonProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [armas, setArmas] = useState<Arma[]>([]);
    const [nome, setNome] = useState("");
    const [funcao, setFuncao] = useState<"Ataque" | "Defesa">("Ataque");
    const [armaId, setArmaId] = useState<number>(0);

    useEffect(() => {
        const fetchArmas = async () => {
            try {
                const data = await armaService.listAll();
                setArmas(data);
            } catch (error) {
                console.error("Erro ao buscar armas:", error);
            }
        };
        if (dialogOpen) {
            fetchArmas();
        }
    }, [dialogOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome.trim()) {
            toast.error("Por favor, insira um nome para o operador", {
                position: "bottom-center",
            });
            return;
        }
        if (!armaId || armaId === 0) {
            toast.error("Por favor, selecione uma arma", {
                position: "bottom-center",
            });
            return;
        }

        try {
            setLoading(true);
            const data: OperadorRequest = {
                nome: nome.trim(),
                funcao: funcao,
                armaId: armaId,
            };
            await operadorService.create(data);
            toast.success("Operador criado com sucesso!", {
                position: "bottom-center",
            });
            setDialogOpen(false);
            setNome("");
            setFuncao("Ataque");
            setArmaId(0);
            onOperatorCreated?.();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao criar operador: ${errorMessage}`, {
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
                className="fixed bottom-3.5 right-20 h-12 w-12 shadow-lg z-50 bg-primary hover:bg-primary/90 p-0"
                size="icon"
            >
                <Shield className="h-6 w-6" />
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            Criar Novo Operador
                        </DialogTitle>
                        <DialogDescription>
                            Adicione um novo operador ao sistema
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} id="create-operator-form">
                        <div className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="nome">Nome do Operador</Label>
                                <Input
                                    id="nome"
                                    name="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Ex: Ash"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <Label htmlFor="funcao">Função</Label>
                                <Select
                                    value={funcao}
                                    onValueChange={(value) =>
                                        setFuncao(value as "Ataque" | "Defesa")
                                    }
                                    disabled={loading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a função" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Ataque">Ataque</SelectItem>
                                        <SelectItem value="Defesa">Defesa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="armaId">Arma</Label>
                                <Select
                                    value={armaId.toString()}
                                    onValueChange={(value) =>
                                        setArmaId(parseInt(value))
                                    }
                                    disabled={loading}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione uma arma" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[200px]">
                                        {armas.map((arma) => (
                                            <SelectItem
                                                key={arma.idArma}
                                                value={arma.idArma.toString()}
                                            >
                                                {arma.nome} ({arma.tipo})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                setFuncao("Ataque");
                                setArmaId(0);
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
                                    "create-operator-form"
                                ) as HTMLFormElement;
                                if (form) {
                                    form.requestSubmit();
                                }
                            }}
                        >
                            {loading ? "Criando..." : "Criar Operador"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

