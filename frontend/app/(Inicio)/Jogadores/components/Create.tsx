"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Plus, X } from "lucide-react";
import { Jogador, JogadorRequest } from "@/types/jogador";
import { jogadorService } from "@/services/JogadorService";

interface CreateProps {
    setJogador: (jogador: Jogador | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string;
    setError: (error: string) => void;
    handleError: (error: unknown, message: string) => void;
}

export default function Create({ setJogador, loading, setLoading, error, setError, handleError }: CreateProps) {
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
            mainRole: "Suporte",
            preferenciaJogo: "Casual",
            mapaFavoritoId: null,
            mapaMaisVitoriasId: null,
            mapaMaisDerrotasId: null
        },
        operadoresAtaque: [],
        operadoresDefesa: []
    });

    const [novoOperadorAtaque, setNovoOperadorAtaque] = useState({ operadorId: 0, winrate: 0 });
    const [novoOperadorDefesa, setNovoOperadorDefesa] = useState({ operadorId: 0, winrate: 0 });

    const criarJogador = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const created = await jogadorService.create(formData);
            setJogador(created);
            // Reset do form
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
                    mainRole: "Suporte",
                    preferenciaJogo: "Casual",
                    mapaFavoritoId: null,
                    mapaMaisVitoriasId: null,
                    mapaMaisDerrotasId: null
                },
                operadoresAtaque: [],
                operadoresDefesa: []
            });
            alert("Jogador criado com sucesso!");
        } catch (error) {
            handleError(error, "Erro ao criar jogador");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        section?: string
    ) => {
        const { name, value } = e.target;
        
        if (section === "dados") {
            const isNumeric = ["nivel", "winrate", "headshot", "kd", "horasJogadas", "mapaFavoritoId", "mapaMaisVitoriasId", "mapaMaisDerrotasId"].includes(name);
            setFormData({
                ...formData,
                dados: {
                    ...formData.dados,
                    [name]: isNumeric ? (value ? Number(value) : (name.includes("Id") ? null : 0)) : value,
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const adicionarOperadorAtaque = () => {
        if (novoOperadorAtaque.operadorId <= 0 || novoOperadorAtaque.winrate <= 0) {
            return;
        }
        setFormData({
            ...formData,
            operadoresAtaque: [...formData.operadoresAtaque, { ...novoOperadorAtaque }]
        });
        setNovoOperadorAtaque({ operadorId: 0, winrate: 0 });
    };

    const adicionarOperadorDefesa = () => {
        if (novoOperadorDefesa.operadorId <= 0 || novoOperadorDefesa.winrate <= 0) {
            return;
        }
        setFormData({
            ...formData,
            operadoresDefesa: [...formData.operadoresDefesa, { ...novoOperadorDefesa }]
        });
        setNovoOperadorDefesa({ operadorId: 0, winrate: 0 });
    };

    const removerOperadorAtaque = (index: number) => {
        setFormData({
            ...formData,
            operadoresAtaque: formData.operadoresAtaque.filter((_, i) => i !== index)
        });
    };

    const removerOperadorDefesa = (index: number) => {
        setFormData({
            ...formData,
            operadoresDefesa: formData.operadoresDefesa.filter((_, i) => i !== index)
        });
    };

    const jogadorForm = (
        handleSubmit: (e: React.FormEvent) => void,
        submitText: string
    ) => (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 space-y-4">
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
                    <legend className="font-semibold">Dados do Jogador</legend>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="nivel">Nível</Label>
                            <Input
                                id="nivel"
                                name="nivel"
                                type="number"
                                placeholder="Nível"
                                value={formData.dados.nivel}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="winrate">Winrate (%)</Label>
                            <Input
                                id="winrate"
                                name="winrate"
                                type="number"
                                step="0.01"
                                placeholder="Winrate"
                                value={formData.dados.winrate}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="rankJogador">Rank</Label>
                            <Input
                                id="rankJogador"
                                name="rankJogador"
                                placeholder="Ex: Emerald IV"
                                value={formData.dados.rankJogador}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="headshot">Headshot (%)</Label>
                            <Input
                                id="headshot"
                                name="headshot"
                                type="number"
                                step="0.01"
                                placeholder="Headshot"
                                value={formData.dados.headshot}
                                onChange={(e) => handleInputChange(e, "dados")}
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
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="plataforma">Plataforma</Label>
                            <Input
                                id="plataforma"
                                name="plataforma"
                                placeholder="PC, Xbox, PlayStation"
                                value={formData.dados.plataforma}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="horasJogadas">Horas Jogadas</Label>
                            <Input
                                id="horasJogadas"
                                name="horasJogadas"
                                type="number"
                                placeholder="Horas jogadas"
                                value={formData.dados.horasJogadas}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="mainRole">Função Principal</Label>
                            <Input
                                id="mainRole"
                                name="mainRole"
                                placeholder="Suporte, Fragger, etc."
                                value={formData.dados.mainRole}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="preferenciaJogo">Preferência de Jogo</Label>
                            <Input
                                id="preferenciaJogo"
                                name="preferenciaJogo"
                                placeholder="Ranked, Casual, etc."
                                value={formData.dados.preferenciaJogo}
                                onChange={(e) => handleInputChange(e, "dados")}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="mapaFavoritoId">ID Mapa Favorito (Opcional)</Label>
                            <Input
                                id="mapaFavoritoId"
                                name="mapaFavoritoId"
                                type="number"
                                placeholder="ID do mapa"
                                value={formData.dados.mapaFavoritoId || ""}
                                onChange={(e) => handleInputChange(e, "dados")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="mapaMaisVitoriasId">ID Mapa Mais Vitórias (Opcional)</Label>
                            <Input
                                id="mapaMaisVitoriasId"
                                name="mapaMaisVitoriasId"
                                type="number"
                                placeholder="ID do mapa"
                                value={formData.dados.mapaMaisVitoriasId || ""}
                                onChange={(e) => handleInputChange(e, "dados")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="mapaMaisDerrotasId">ID Mapa Mais Derrotas (Opcional)</Label>
                            <Input
                                id="mapaMaisDerrotasId"
                                name="mapaMaisDerrotasId"
                                type="number"
                                placeholder="ID do mapa"
                                value={formData.dados.mapaMaisDerrotasId || ""}
                                onChange={(e) => handleInputChange(e, "dados")}
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Operadores de Ataque */}
                <fieldset className="border p-4 rounded space-y-4">
                    <legend className="font-semibold">Operadores de Ataque</legend>
                    
                    {/* Lista de operadores de ataque */}
                    {formData.operadoresAtaque.map((op, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <div className="flex-1">
                                <span>Operador ID: {op.operadorId} - Winrate: {op.winrate}%</span>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removerOperadorAtaque(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    
                    {/* Adicionar novo operador de ataque */}
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="ID do Operador"
                            value={novoOperadorAtaque.operadorId || ""}
                            onChange={(e) => setNovoOperadorAtaque({
                                ...novoOperadorAtaque,
                                operadorId: parseInt(e.target.value) || 0
                            })}
                        />
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Winrate"
                            value={novoOperadorAtaque.winrate || ""}
                            onChange={(e) => setNovoOperadorAtaque({
                                ...novoOperadorAtaque,
                                winrate: parseFloat(e.target.value) || 0
                            })}
                        />
                        <Button
                            type="button"
                            onClick={adicionarOperadorAtaque}
                            disabled={!novoOperadorAtaque.operadorId || !novoOperadorAtaque.winrate}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </fieldset>

                {/* Operadores de Defesa */}
                <fieldset className="border p-4 rounded space-y-4">
                    <legend className="font-semibold">Operadores de Defesa</legend>
                    
                    {/* Lista de operadores de defesa */}
                    {formData.operadoresDefesa.map((op, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <div className="flex-1">
                                <span>Operador ID: {op.operadorId} - Winrate: {op.winrate}%</span>
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removerOperadorDefesa(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    
                    {/* Adicionar novo operador de defesa */}
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="ID do Operador"
                            value={novoOperadorDefesa.operadorId || ""}
                            onChange={(e) => setNovoOperadorDefesa({
                                ...novoOperadorDefesa,
                                operadorId: parseInt(e.target.value) || 0
                            })}
                        />
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Winrate"
                            value={novoOperadorDefesa.winrate || ""}
                            onChange={(e) => setNovoOperadorDefesa({
                                ...novoOperadorDefesa,
                                winrate: parseFloat(e.target.value) || 0
                            })}
                        />
                        <Button
                            type="button"
                            onClick={adicionarOperadorDefesa}
                            disabled={!novoOperadorDefesa.operadorId || !novoOperadorDefesa.winrate}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </fieldset>

                <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {submitText}
                </Button>
            </div>
        </form>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                Criar Novo Jogador
            </h2>
            <Card className="overflow-y-auto">
                {jogadorForm(criarJogador, "Criar Jogador")}
            </Card>
        </div>
    );
}
