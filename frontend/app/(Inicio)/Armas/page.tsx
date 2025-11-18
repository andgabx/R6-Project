"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Crosshair,
    Loader2,
    Trash2,
    Search,
    Edit,
} from "lucide-react";
import { armaService, ArmaRequest } from "@/services/ArmaService";
import { Arma } from "@/types/arma";
import { CreateWeaponButton } from "@/components/create-weapon-button";
import { toast } from "sonner";

export default function ArmasPage() {
    const [armas, setArmas] = useState<Arma[]>([]);
    const [allArmas, setAllArmas] = useState<Arma[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedArma, setSelectedArma] = useState<Arma | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    // Estados de busca
    const [searchId, setSearchId] = useState<number>(0);
    const [minDano, setMinDano] = useState<number>(0);
    const [activeSearch, setActiveSearch] = useState<
        "id" | "dano" | null
    >(null);
    const [searchedArma, setSearchedArma] = useState<Arma | null>(null);

    // Estados do formulário de edição
    const [editNome, setEditNome] = useState("");
    const [editTipo, setEditTipo] = useState("");
    const [editDano, setEditDano] = useState<number>(0);

    const tiposArmas = [
        "Assault Rifles",
        "Submachine Guns (SMGs)",
        "Shotguns",
        "Marksman Rifles",
        "Light Machine Guns (LMGs)",
        "Machine Pistols",
        "Handguns",
    ];

    const fetchArmas = async () => {
        try {
            setLoading(true);
            const data = await armaService.listAll();
            setAllArmas(data);
            setArmas(data);
        } catch (error) {
            console.error("Erro ao buscar armas:", error);
            toast.error("Erro ao carregar armas", {
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArmas();
    }, []);

    const buscarArmaPorId = async () => {
        if (!searchId) {
            toast.error("Por favor, insira um ID válido", {
                position: "bottom-center",
            });
            return;
        }
        try {
            setLoading(true);
            setActiveSearch("id");
            const data = await armaService.findById(searchId);
            if (data) {
                setSearchedArma(data);
                setArmas([data]);
                toast.success(`Arma encontrada: ${data.nome}`, {
                    position: "bottom-center",
                });
            } else {
                toast.error(
                    `Nenhuma arma foi encontrada com o ID ${searchId}`,
                    {
                        position: "bottom-center",
                    }
                );
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(
                `Não foi possível encontrar a arma com ID ${searchId}: ${errorMessage}`,
                {
                    position: "bottom-center",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const buscarPorDanoMinimo = async () => {
        if (!minDano || minDano <= 0) {
            toast.error("Por favor, insira um dano mínimo válido", {
                position: "bottom-center",
            });
            return;
        }
        try {
            setLoading(true);
            setActiveSearch("dano");
            const data = await armaService.listByMinDamage(minDano);
            setAllArmas(data);
            setArmas(data);
            toast.success(
                `Encontradas ${data.length} arma(s) com dano mínimo de ${minDano}`,
                {
                    position: "bottom-center",
                }
            );
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(
                `Erro ao buscar armas por dano mínimo: ${errorMessage}`,
                {
                    position: "bottom-center",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const limparBusca = () => {
        setSearchId(0);
        setMinDano(0);
        setSearchedArma(null);
        setActiveSearch(null);
        fetchArmas();
    };

    const handleEdit = (arma: Arma) => {
        setSelectedArma(arma);
        setEditNome(arma.nome);
        setEditTipo(arma.tipo);
        setEditDano(arma.dano);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        if (!selectedArma || !editNome.trim() || !editTipo || !editDano) {
            toast.error("Por favor, preencha todos os campos", {
                position: "bottom-center",
            });
            return;
        }

        try {
            setActionLoading(true);
            const data: ArmaRequest = {
                nome: editNome.trim(),
                tipo: editTipo,
                dano: editDano,
            };
            await armaService.update(selectedArma.idArma, data);
            toast.success("Arma atualizada com sucesso!", {
                position: "bottom-center",
            });
            setIsEditModalOpen(false);
            setSelectedArma(null);
            fetchArmas();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao atualizar arma: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = (arma: Arma) => {
        setSelectedArma(arma);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedArma) return;

        try {
            setActionLoading(true);
            await armaService.delete(selectedArma.idArma);
            toast.success("Arma deletada com sucesso!", {
                position: "bottom-center",
            });
            setIsDeleteModalOpen(false);
            setSelectedArma(null);
            fetchArmas();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao deletar arma: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setActionLoading(false);
        }
    };

    if (loading && armas.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">
                            Carregando armas...
                        </p>
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
                    <Crosshair className="h-10 w-10 text-primary" />
                    Armas do Jogo
                </h1>
                <p className="text-muted-foreground">
                    Explore todas as armas disponíveis no Rainbow Six Siege
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Todas as Armas</h2>
                <Button
                    onClick={() => fetchArmas()}
                    variant="outline"
                >
                    Recarregar
                </Button>
            </div>

            {/* Buscas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Busca por ID */}
                <div className="flex flex-col gap-2">
                    <Input
                        type="number"
                        placeholder="Buscar por ID"
                        value={searchId || ""}
                        onChange={(e) =>
                            setSearchId(parseInt(e.target.value) || 0)
                        }
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={buscarArmaPorId}
                            variant="outline"
                            className="flex-1"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            Buscar
                        </Button>
                        {activeSearch === "id" && (
                            <Button onClick={limparBusca} variant="ghost">
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>

                {/* Busca por Dano Mínimo */}
                <div className="flex flex-col gap-2">
                    <Input
                        type="number"
                        placeholder="Dano mínimo"
                        value={minDano || ""}
                        onChange={(e) =>
                            setMinDano(parseInt(e.target.value) || 0)
                        }
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={buscarPorDanoMinimo}
                            variant="outline"
                            className="flex-1"
                        >
                            <Search className="h-4 w-4 mr-2" />
                            Buscar
                        </Button>
                        {activeSearch === "dano" && (
                            <Button onClick={limparBusca} variant="ghost">
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Indicadores de busca ativa */}
            {activeSearch === "id" && searchedArma && (
                <Card className="mb-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                            Mostrando resultado da busca por ID:{" "}
                            <strong className="text-primary">{searchId}</strong>
                        </p>
                    </CardContent>
                </Card>
            )}

            {activeSearch === "dano" && (
                <Card className="mb-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">
                            Mostrando armas com dano mínimo de:{" "}
                            <strong className="text-primary">{minDano}</strong>
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Lista de Armas */}
            <div>
                <h3 className="text-xl font-semibold mb-4">
                    Resultados ({armas.length} armas)
                </h3>
                {armas.length === 0 ? (
                    <p className="text-muted-foreground">
                        Nenhuma arma encontrada.
                    </p>
                ) : (
                    <ScrollArea className="h-[55vh] w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {armas.map((arma) => (
                                <Card
                                    key={arma.idArma}
                                    className="flex flex-col justify-between h-full hover:bg-primary/5 transition-all duration-200"
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            {arma.nome}
                                            <span className="text-sm font-normal text-muted-foreground">
                                                ID: {arma.idArma}
                                            </span>
                                        </CardTitle>
                                        <CardDescription>{arma.tipo}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>
                                            <strong className="text-primary">
                                                Dano:
                                            </strong>{" "}
                                            {arma.dano}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-2 pt-4 border-t">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleEdit(arma)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(arma)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>

            {/* Dialog de Edição */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5 text-primary" />
                            Editar Arma
                        </DialogTitle>
                        <DialogDescription>
                            Atualize as informações da arma
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="edit-nome">Nome da Arma</Label>
                            <Input
                                id="edit-nome"
                                value={editNome}
                                onChange={(e) => setEditNome(e.target.value)}
                                placeholder="Ex: AK-12"
                                required
                                disabled={actionLoading}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-tipo">Tipo</Label>
                            <Select
                                value={editTipo}
                                onValueChange={setEditTipo}
                                disabled={actionLoading}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tiposArmas.map((tipo) => (
                                        <SelectItem key={tipo} value={tipo}>
                                            {tipo}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="edit-dano">Dano</Label>
                            <Input
                                id="edit-dano"
                                type="number"
                                value={editDano || ""}
                                onChange={(e) =>
                                    setEditDano(parseInt(e.target.value) || 0)
                                }
                                placeholder="Ex: 45"
                                required
                                disabled={actionLoading}
                                min="1"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsEditModalOpen(false);
                                setSelectedArma(null);
                                setEditNome("");
                                setEditTipo("");
                                setEditDano(0);
                            }}
                            disabled={actionLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            onClick={handleUpdate}
                            disabled={
                                actionLoading ||
                                !editNome.trim() ||
                                !editTipo ||
                                !editDano
                            }
                        >
                            {actionLoading ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog de Confirmação de Deleção */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-destructive" />
                            Confirmar Deleção
                        </DialogTitle>
                        <DialogDescription>
                            Você tem certeza que deseja deletar a arma{" "}
                            <strong className="text-destructive">
                                {selectedArma?.nome}
                            </strong>
                            ? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsDeleteModalOpen(false);
                                setSelectedArma(null);
                            }}
                            disabled={actionLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={actionLoading}
                        >
                            {actionLoading ? "Deletando..." : "Deletar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Botão flutuante para criar arma */}
            <CreateWeaponButton onWeaponCreated={fetchArmas} />
        </div>
    );
}
