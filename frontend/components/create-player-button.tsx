"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { UserPlus, Plus, X } from "lucide-react";
import { JogadorRequest } from "@/types/jogador";
import { jogadorService } from "@/services/JogadorService";
import { mapaService } from "@/services/MapaService";
import { Mapa } from "@/types/mapa";
import { operadorService } from "@/services/OperadorService";
import { Operador } from "@/types/operador";
import { toast } from "sonner";

interface CreatePlayerButtonProps {
    onPlayerCreated?: () => void;
}

export function CreatePlayerButton({
    onPlayerCreated,
}: CreatePlayerButtonProps = {}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [mapas, setMapas] = useState<Mapa[]>([]);
    const [operadores, setOperadores] = useState<Operador[]>([]);
    const [rankNome, setRankNome] = useState<string>("Bronze");
    const [rankNumero, setRankNumero] = useState<string>("I");
    const [formData, setFormData] = useState<JogadorRequest>({
        nickname: "",
        dados: {
            nivel: 1,
            winrate: 50.0,
            rankJogador: "Bronze",
            headshot: 0.0,
            kd: 1.0,
            plataforma: "PC",
            horasJogadas: 0,
            mainRole: "Support",
            preferenciaJogo: "Solo",
            mapaFavoritoId: null,
            mapaMaisVitoriasId: null,
            mapaMaisDerrotasId: null,
        },
        operadoresAtaque: [],
        operadoresDefesa: [],
    });

    const [novoOperadorAtaque, setNovoOperadorAtaque] = useState({
        operadorId: 0,
        operadorNome: "",
        winrate: 0,
    });
    const [novoOperadorDefesa, setNovoOperadorDefesa] = useState({
        operadorId: 0,
        operadorNome: "",
        winrate: 0,
    });

    // Funções auxiliares para operadores

    const operadoresAtaque = operadores.filter((o) => o.funcao === "Ataque");
    const operadoresDefesa = operadores.filter((o) => o.funcao === "Defesa");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mapasData, operadoresData] = await Promise.all([
                    mapaService.listAll(),
                    operadorService.listAll(),
                ]);
                setMapas(mapasData);
                setOperadores(operadoresData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, []);

    // Handler para atualizar rank
    const handleRankChange = (nome: string, numero: string) => {
        setRankNome(nome);
        setRankNumero(numero);
        const rankCompleto = numero === "none" ? nome : `${nome} ${numero}`;
        setFormData((prev) => ({
            ...prev,
            dados: {
                ...prev.dados,
                rankJogador: rankCompleto,
            },
        }));
    };

    // Função para obter ID do mapa pelo nome
    const getMapaIdByName = (nome: string | null): number | null => {
        if (!nome) return null;
        const mapa = mapas.find((m) => m.nome === nome);
        return mapa ? mapa.idMapa : null;
    };

    // Função para obter nome do mapa pelo ID
    const getMapaNameById = (id: number | null): string => {
        if (!id) return "none";
        const mapa = mapas.find((m) => m.idMapa === id);
        return mapa ? mapa.nome : "none";
    };

    // Handler para mudança de mapa
    const handleMapaChange = (
        field: "mapaFavoritoId" | "mapaMaisVitoriasId" | "mapaMaisDerrotasId",
        nome: string
    ) => {
        const id = nome === "none" ? null : getMapaIdByName(nome);
        setFormData((prev) => ({
            ...prev,
            dados: {
                ...prev.dados,
                [field]: id,
            },
        }));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section?: string
    ) => {
        const { name, value } = e.target;

        if (section === "dados") {
            const isNumeric = [
                "nivel",
                "winrate",
                "headshot",
                "kd",
                "horasJogadas",
                "mapaFavoritoId",
                "mapaMaisVitoriasId",
                "mapaMaisDerrotasId",
            ].includes(name);
            setFormData((prev) => ({
                ...prev,
                dados: {
                    ...prev.dados,
                    [name]: isNumeric
                        ? value
                            ? Number(value)
                            : name.includes("Id")
                            ? null
                            : 0
                        : value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const adicionarOperadorAtaque = () => {
        if (
            !novoOperadorAtaque.operadorNome ||
            novoOperadorAtaque.winrate <= 0
        ) {
            console.log(
                "Validação falhou - não adicionando operador de ataque"
            );
            return;
        }
        const novoOperador = {
            nomeOperador: novoOperadorAtaque.operadorNome,
            winrate: novoOperadorAtaque.winrate,
        };
        console.log("Adicionando operador de ataque:", novoOperador);
        console.log(
            "Estado atual de operadoresAtaque:",
            formData.operadoresAtaque
        );

        setFormData((prev) => {
            const novoArray = [...prev.operadoresAtaque, novoOperador];
            console.log("Novo array de operadoresAtaque:", novoArray);
            return {
                ...prev,
                operadoresAtaque: novoArray,
            };
        });
        setNovoOperadorAtaque({ operadorId: 0, operadorNome: "", winrate: 0 });
    };

    const adicionarOperadorDefesa = () => {
        if (
            !novoOperadorDefesa.operadorNome ||
            novoOperadorDefesa.winrate <= 0
        ) {
            console.log(
                "Validação falhou - não adicionando operador de defesa"
            );
            return;
        }
        const novoOperador = {
            nomeOperador: novoOperadorDefesa.operadorNome,
            winrate: novoOperadorDefesa.winrate,
        };
        console.log("Adicionando operador de defesa:", novoOperador);
        console.log(
            "Estado atual de operadoresDefesa:",
            formData.operadoresDefesa
        );

        setFormData((prev) => {
            const novoArray = [...prev.operadoresDefesa, novoOperador];
            console.log("Novo array de operadoresDefesa:", novoArray);
            return {
                ...prev,
                operadoresDefesa: novoArray,
            };
        });
        setNovoOperadorDefesa({ operadorId: 0, operadorNome: "", winrate: 0 });
    };

    const removerOperadorAtaque = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            operadoresAtaque: prev.operadoresAtaque.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const removerOperadorDefesa = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            operadoresDefesa: prev.operadoresDefesa.filter(
                (_, i) => i !== index
            ),
        }));
    };

    const resetForm = () => {
        setFormData({
            nickname: "",
            dados: {
                nivel: 1,
                winrate: 50.0,
                rankJogador: "Bronze",
                headshot: 0.0,
                kd: 1.0,
                plataforma: "PC",
                horasJogadas: 0,
                mainRole: "Support",
                preferenciaJogo: "Solo",
                mapaFavoritoId: null,
                mapaMaisVitoriasId: null,
                mapaMaisDerrotasId: null,
            },
            operadoresAtaque: [],
            operadoresDefesa: [],
        });
        setNovoOperadorAtaque({ operadorId: 0, operadorNome: "", winrate: 0 });
        setNovoOperadorDefesa({ operadorId: 0, operadorNome: "", winrate: 0 });
        setRankNome("Bronze");
        setRankNumero("I");
        setError("");
    };

    const criarJogador = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            // Debug: verificar estado do formData antes de processar
            console.log("=== DEBUG: Estado do formData ===");
            console.log("formData completo:", formData);
            console.log(
                "operadoresAtaque no formData:",
                formData.operadoresAtaque
            );
            console.log(
                "operadoresDefesa no formData:",
                formData.operadoresDefesa
            );
            console.log(
                "Tipo de operadoresAtaque:",
                typeof formData.operadoresAtaque
            );
            console.log("É array?", Array.isArray(formData.operadoresAtaque));
            console.log(
                "Tamanho do array ataque:",
                formData.operadoresAtaque?.length
            );
            console.log(
                "Tamanho do array defesa:",
                formData.operadoresDefesa?.length
            );

            // Preparar dados para envio - garantir formato correto
            const operadoresAtaqueEnvio = Array.isArray(
                formData.operadoresAtaque
            )
                ? formData.operadoresAtaque.map((op) => ({
                      nomeOperador: op.nomeOperador,
                      winrate: op.winrate,
                  }))
                : [];

            const operadoresDefesaEnvio = Array.isArray(
                formData.operadoresDefesa
            )
                ? formData.operadoresDefesa.map((op) => ({
                      nomeOperador: op.nomeOperador,
                      winrate: op.winrate,
                  }))
                : [];

            console.log("operadoresAtaqueEnvio:", operadoresAtaqueEnvio);
            console.log("operadoresDefesaEnvio:", operadoresDefesaEnvio);

            const dadosParaEnvio = {
                nickname: formData.nickname,
                dados: {
                    nivel: formData.dados.nivel,
                    winrate: formData.dados.winrate,
                    rankJogador: formData.dados.rankJogador,
                    headshot: formData.dados.headshot,
                    kd: formData.dados.kd,
                    plataforma: formData.dados.plataforma,
                    horasJogadas: formData.dados.horasJogadas,
                    mainRole: formData.dados.mainRole,
                    preferenciaJogo: formData.dados.preferenciaJogo,
                    mapaFavoritoId: formData.dados.mapaFavoritoId ?? 0,
                    mapaMaisVitoriasId: formData.dados.mapaMaisVitoriasId ?? 0,
                    mapaMaisDerrotasId: formData.dados.mapaMaisDerrotasId ?? 0,
                },
                operadoresAtaque: operadoresAtaqueEnvio,
                operadoresDefesa: operadoresDefesaEnvio,
            };

            // Debug: mostrar JSON no console
            console.log("=== JSON sendo enviado para criar jogador ===");
            console.log(JSON.stringify(dadosParaEnvio, null, 2));

            await jogadorService.create(dadosParaEnvio);
            toast.success("Jogador criado com sucesso!", {
                position: "bottom-center",
            });
            onPlayerCreated?.();
            resetForm();
            setDialogOpen(false);
        } catch (error) {
            console.error("Erro ao criar jogador:", error);
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao criar jogador: ${errorMessage}`, {
                position: "bottom-center",
            });
            setError(`Erro ao criar jogador: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => setDialogOpen(true)}
                className="fixed bottom-3.5 right-20 h-12 w-12 shadow-lg z-50 bg-primary hover:bg-primary/90 p-0"
            >
                <UserPlus className="h-6 w-6" />
                <span className="sr-only">Criar novo jogador</span>
            </Button>

            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) {
                        resetForm();
                    }
                }}
            >
                <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-full flex flex-col p-0 gap-0">
                    <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b">
                        <DialogTitle>Criar Novo Jogador</DialogTitle>
                        <DialogDescription>
                            Preencha os dados abaixo para criar um novo jogador.
                        </DialogDescription>
                    </DialogHeader>

                    {error && (
                        <div className="mx-6 mt-4 bg-destructive/10 border border-destructive text-destructive p-3 rounded flex-shrink-0">
                            {error}
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        <form
                            id="create-player-form"
                            onSubmit={criarJogador}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                {/* Informações básicas */}
                                <div className="space-y-2">
                                    <Label htmlFor="nickname">Nickname</Label>
                                    <Input
                                        id="nickname"
                                        name="nickname"
                                        placeholder="Nickname do jogador"
                                        value={formData.nickname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Dados do jogador */}
                                <fieldset className="border p-4 rounded space-y-4">
                                    <legend className="font-semibold">
                                        Dados do Jogador
                                    </legend>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="nivel">Nível</Label>
                                            <Input
                                                id="nivel"
                                                name="nivel"
                                                type="number"
                                                placeholder="Nível"
                                                value={formData.dados.nivel}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        "dados"
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="winrate">
                                                Winrate (%)
                                            </Label>
                                            <Input
                                                id="winrate"
                                                name="winrate"
                                                type="number"
                                                step="0.01"
                                                placeholder="Winrate"
                                                value={formData.dados.winrate}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        "dados"
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <Label htmlFor="rankNome">
                                                    Rank (Nome)
                                                </Label>
                                                <Select
                                                    value={rankNome}
                                                    onValueChange={(nome) =>
                                                        handleRankChange(
                                                            nome,
                                                            rankNumero
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o rank" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        <SelectItem value="Cobre">
                                                            Cobre
                                                        </SelectItem>
                                                        <SelectItem value="Bronze">
                                                            Bronze
                                                        </SelectItem>
                                                        <SelectItem value="Prata">
                                                            Prata
                                                        </SelectItem>
                                                        <SelectItem value="Ouro">
                                                            Ouro
                                                        </SelectItem>
                                                        <SelectItem value="Platina">
                                                            Platina
                                                        </SelectItem>
                                                        <SelectItem value="Esmeralda">
                                                            Esmeralda
                                                        </SelectItem>
                                                        <SelectItem value="Diamante">
                                                            Diamante
                                                        </SelectItem>
                                                        <SelectItem value="Campeão">
                                                            Campeão
                                                        </SelectItem>
                                                        <SelectItem value="Desconhecido">
                                                            Desconhecido
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="rankNumero">
                                                    Rank (Número)
                                                </Label>
                                                <Select
                                                    value={rankNumero}
                                                    onValueChange={(numero) =>
                                                        handleRankChange(
                                                            rankNome,
                                                            numero
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione o número" />
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        <SelectItem value="none">
                                                            Sem número
                                                        </SelectItem>
                                                        <SelectItem value="I">
                                                            I
                                                        </SelectItem>
                                                        <SelectItem value="II">
                                                            II
                                                        </SelectItem>
                                                        <SelectItem value="III">
                                                            III
                                                        </SelectItem>
                                                        <SelectItem value="IV">
                                                            IV
                                                        </SelectItem>
                                                        <SelectItem value="V">
                                                            V
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="headshot">
                                                Headshot (%)
                                            </Label>
                                            <Input
                                                id="headshot"
                                                name="headshot"
                                                type="number"
                                                step="0.01"
                                                placeholder="Headshot"
                                                value={formData.dados.headshot}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        "dados"
                                                    )
                                                }
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
                                                placeholder="K/D Ratio"
                                                value={formData.dados.kd}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        "dados"
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="plataforma">
                                                Plataforma
                                            </Label>
                                            <Input
                                                id="plataforma"
                                                name="plataforma"
                                                placeholder="PC, Xbox, PlayStation"
                                                value={
                                                    formData.dados.plataforma
                                                }
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        "dados"
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="horasJogadas">
                                                Horas Jogadas
                                            </Label>
                                            <Input
                                                id="horasJogadas"
                                                name="horasJogadas"
                                                type="number"
                                                placeholder="Horas jogadas"
                                                value={
                                                    formData.dados.horasJogadas
                                                }
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        "dados"
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="mainRole">
                                                Função Principal
                                            </Label>
                                            <Select
                                                value={formData.dados.mainRole}
                                                onValueChange={(value) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        dados: {
                                                            ...prev.dados,
                                                            mainRole: value,
                                                        },
                                                    }))
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a função" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[200px]">
                                                    <SelectItem value="Entry Fragger">
                                                        Entry Fragger
                                                    </SelectItem>
                                                    <SelectItem value="Support">
                                                        Support
                                                    </SelectItem>
                                                    <SelectItem value="Hard Breacher">
                                                        Hard Breacher
                                                    </SelectItem>
                                                    <SelectItem value="Soft Breacher">
                                                        Soft Breacher
                                                    </SelectItem>
                                                    <SelectItem value="Flank Watch">
                                                        Flank Watch
                                                    </SelectItem>
                                                    <SelectItem value="Anchor">
                                                        Anchor
                                                    </SelectItem>
                                                    <SelectItem value="Roamer">
                                                        Roamer
                                                    </SelectItem>
                                                    <SelectItem value="Anti-Hard Breach">
                                                        Anti-Hard Breach
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="preferenciaJogo">
                                                Preferência de Jogo
                                            </Label>
                                            <Select
                                                value={
                                                    formData.dados
                                                        .preferenciaJogo
                                                }
                                                onValueChange={(value) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        dados: {
                                                            ...prev.dados,
                                                            preferenciaJogo:
                                                                value,
                                                        },
                                                    }))
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a preferência" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[200px]">
                                                    <SelectItem value="Solo">
                                                        Solo
                                                    </SelectItem>
                                                    <SelectItem value="Duo">
                                                        Duo
                                                    </SelectItem>
                                                    <SelectItem value="Squad">
                                                        Squad
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="mapaFavoritoId">
                                                Mapa Favorito (Opcional)
                                            </Label>
                                            <Select
                                                value={getMapaNameById(
                                                    formData.dados
                                                        .mapaFavoritoId
                                                )}
                                                onValueChange={(nome) =>
                                                    handleMapaChange(
                                                        "mapaFavoritoId",
                                                        nome
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um mapa" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[200px]">
                                                    <SelectItem value="none">
                                                        Nenhum
                                                    </SelectItem>
                                                    {mapas.map((mapa) => (
                                                        <SelectItem
                                                            key={mapa.idMapa}
                                                            value={mapa.nome}
                                                        >
                                                            {mapa.nome}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="mapaMaisVitoriasId">
                                                Mapa Mais Vitórias (Opcional)
                                            </Label>
                                            <Select
                                                value={getMapaNameById(
                                                    formData.dados
                                                        .mapaMaisVitoriasId
                                                )}
                                                onValueChange={(nome) =>
                                                    handleMapaChange(
                                                        "mapaMaisVitoriasId",
                                                        nome
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um mapa" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[200px]">
                                                    <SelectItem value="none">
                                                        Nenhum
                                                    </SelectItem>
                                                    {mapas.map((mapa) => (
                                                        <SelectItem
                                                            key={mapa.idMapa}
                                                            value={mapa.nome}
                                                        >
                                                            {mapa.nome}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="mapaMaisDerrotasId">
                                                Mapa Mais Derrotas (Opcional)
                                            </Label>
                                            <Select
                                                value={getMapaNameById(
                                                    formData.dados
                                                        .mapaMaisDerrotasId
                                                )}
                                                onValueChange={(nome) =>
                                                    handleMapaChange(
                                                        "mapaMaisDerrotasId",
                                                        nome
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um mapa" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[200px]">
                                                    <SelectItem value="none">
                                                        Nenhum
                                                    </SelectItem>
                                                    {mapas.map((mapa) => (
                                                        <SelectItem
                                                            key={mapa.idMapa}
                                                            value={mapa.nome}
                                                        >
                                                            {mapa.nome}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </fieldset>

                                {/* Operadores de Ataque */}
                                <fieldset className="border p-4 rounded space-y-4">
                                    <legend className="font-semibold">
                                        Operadores de Ataque
                                    </legend>

                                    {formData.operadoresAtaque.map(
                                        (op, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-2 border rounded"
                                            >
                                                <div className="flex-1">
                                                    <span>
                                                        {op.nomeOperador} -
                                                        Winrate: {op.winrate}%
                                                    </span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        removerOperadorAtaque(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )
                                    )}

                                    <div className="flex gap-2">
                                        <Select
                                            value={
                                                novoOperadorAtaque.operadorNome
                                            }
                                            onValueChange={(nome) =>
                                                setNovoOperadorAtaque({
                                                    ...novoOperadorAtaque,
                                                    operadorNome: nome,
                                                })
                                            }
                                        >
                                            <SelectTrigger className="flex-1">
                                                <SelectValue placeholder="Selecione um operador" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[200px]">
                                                {operadoresAtaque.map((op) => (
                                                    <SelectItem
                                                        key={op.idOperador}
                                                        value={op.nome}
                                                    >
                                                        {op.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="Winrate"
                                            className="w-32"
                                            value={
                                                novoOperadorAtaque.winrate || ""
                                            }
                                            onChange={(e) =>
                                                setNovoOperadorAtaque({
                                                    ...novoOperadorAtaque,
                                                    winrate:
                                                        parseFloat(
                                                            e.target.value
                                                        ) || 0,
                                                })
                                            }
                                        />
                                        <Button
                                            type="button"
                                            onClick={adicionarOperadorAtaque}
                                            disabled={
                                                !novoOperadorAtaque.operadorNome ||
                                                !novoOperadorAtaque.winrate
                                            }
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </fieldset>

                                {/* Operadores de Defesa */}
                                <fieldset className="border p-4 rounded space-y-4">
                                    <legend className="font-semibold">
                                        Operadores de Defesa
                                    </legend>

                                    {formData.operadoresDefesa.map(
                                        (op, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-2 border rounded"
                                            >
                                                <div className="flex-1">
                                                    <span>
                                                        {op.nomeOperador} -
                                                        Winrate: {op.winrate}%
                                                    </span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        removerOperadorDefesa(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )
                                    )}

                                    <div className="flex gap-2">
                                        <Select
                                            value={
                                                novoOperadorDefesa.operadorNome
                                            }
                                            onValueChange={(nome) =>
                                                setNovoOperadorDefesa({
                                                    ...novoOperadorDefesa,
                                                    operadorNome: nome,
                                                })
                                            }
                                        >
                                            <SelectTrigger className="flex-1">
                                                <SelectValue placeholder="Selecione um operador" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-[200px]">
                                                {operadoresDefesa.map((op) => (
                                                    <SelectItem
                                                        key={op.idOperador}
                                                        value={op.nome}
                                                    >
                                                        {op.nome}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="Winrate"
                                            className="w-32"
                                            value={
                                                novoOperadorDefesa.winrate || ""
                                            }
                                            onChange={(e) =>
                                                setNovoOperadorDefesa({
                                                    ...novoOperadorDefesa,
                                                    winrate:
                                                        parseFloat(
                                                            e.target.value
                                                        ) || 0,
                                                })
                                            }
                                        />
                                        <Button
                                            type="button"
                                            onClick={adicionarOperadorDefesa}
                                            disabled={
                                                !novoOperadorDefesa.operadorNome ||
                                                !novoOperadorDefesa.winrate
                                            }
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </fieldset>
                            </div>
                        </form>
                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t flex-shrink-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setDialogOpen(false);
                                resetForm();
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            disabled={loading}
                            onClick={(e) => {
                                e.preventDefault();
                                const form = document.getElementById(
                                    "create-player-form"
                                ) as HTMLFormElement;
                                if (form) {
                                    form.requestSubmit();
                                }
                            }}
                        >
                            {loading ? "Criando..." : "Criar Jogador"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
