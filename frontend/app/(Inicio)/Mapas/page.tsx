"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { mapaService, MapaRequest } from "@/services/MapaService";
import { Mapa } from "@/types/mapa";
import { Card, CardTitle } from "@/components/ui/card";
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
import { Map, Loader2, Edit, Trash2 } from "lucide-react";
import { CreateMapButton } from "@/components/create-map-button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Descrições/histórias dos mapas (mock data - pode ser substituído por dados reais)
const mapDescriptions: Record<string, { description: string; image?: string }> =
    {
        Banco: {
            description:
                "O Banco é um mapa urbano localizado em um distrito financeiro. Os operadores devem navegar por escritórios modernos, cofres seguros e áreas de lobby. A arquitetura vertical oferece múltiplas rotas de ataque e defesa.",
        },
        Fronteira: {
            description:
                "Fronteira é um posto de controle militar na fronteira entre dois países. O mapa apresenta estruturas fortificadas, torres de observação e áreas abertas que exigem estratégia cuidadosa tanto para atacantes quanto defensores.",
        },
        "Casa de Campo": {
            description:
                "Uma luxuosa propriedade rural que serve como esconderijo. O mapa combina áreas internas elegantes com espaços externos abertos, oferecendo diversas opções táticas para ambos os times.",
        },
        Litoral: {
            description:
                "Litoral é um resort à beira-mar transformado em zona de combate. O mapa apresenta múltiplos níveis, varandas com vista para o oceano e áreas internas que criam oportunidades para emboscadas e manobras táticas.",
        },
        Consulado: {
            description:
                "O Consulado é uma embaixada fortificada em um país estrangeiro. Com múltiplos andares, salas de reuniões e áreas administrativas, oferece um ambiente complexo para operações táticas.",
        },
        Favela: {
            description:
                "Favela representa um ambiente urbano denso e vertical. As estruturas próximas criam múltiplas rotas verticais e horizontais, exigindo comunicação constante e conhecimento do mapa para sucesso.",
        },
        Fortaleza: {
            description:
                "Uma fortaleza histórica adaptada para combate moderno. O mapa combina arquitetura antiga com elementos contemporâneos, oferecendo posições defensivas estratégicas e rotas de infiltração.",
        },
        "Hereford (Novo)": {
            description:
                "A nova versão da Base Hereford mantém a essência da instalação de treinamento original, mas com melhorias significativas no layout e design. É um mapa icônico que testa habilidades fundamentais.",
        },
        "Arranha-Céu (Novo)": {
            description:
                "Um arranha-céu moderno no coração de uma metrópole. O mapa vertical oferece múltiplos níveis e rotas, criando um ambiente dinâmico onde o controle vertical é crucial para a vitória.",
        },
        "Canal (Novo)": {
            description:
                "Canal é um mapa aquático único com estruturas sobre a água. A navegação requer atenção especial às rotas e pontos de entrada, criando um ambiente tático distinto.",
        },
        "Kafe Dostoyevsky": {
            description:
                "Um café elegante em São Petersburgo que serve como local de operação. O mapa combina áreas públicas com espaços privados, oferecendo múltiplas estratégias de ataque e defesa.",
        },
        "Oregon (Novo)": {
            description:
                "A nova versão de Oregon mantém o ambiente rural americano, mas com melhorias significativas. O mapa apresenta uma fazenda com múltiplos edifícios e áreas abertas.",
        },
        "Outback (Novo)": {
            description:
                "Um posto de serviço no deserto australiano. O mapa compacto oferece combate intenso em espaços fechados, exigindo precisão e coordenação da equipe.",
        },
        "Parque Temático (Novo)": {
            description:
                "Um parque temático abandonado que serve como campo de batalha. O mapa apresenta áreas temáticas distintas, criando um ambiente único e memorável para combate.",
        },
        "Arranha-Céu": {
            description:
                "A versão clássica do Arranha-Céu, um mapa vertical icônico que testa habilidades de combate em múltiplos níveis.",
        },
        Torre: {
            description:
                "Uma torre de comunicação que oferece combate vertical intenso. O mapa testa habilidades de navegação e controle de múltiplos níveis simultaneamente.",
        },
        Vila: {
            description:
                "Uma vila rural que combina estruturas tradicionais com elementos modernos. O mapa oferece combate em espaços abertos e fechados.",
        },
        Iate: {
            description:
                "Um iate de luxo transformado em zona de combate. O espaço compacto e os múltiplos níveis criam um ambiente único para operações táticas.",
        },
        "Nighthaven Labs": {
            description:
                "Os laboratórios da Nighthaven representam tecnologia de ponta e pesquisa avançada. O mapa moderno oferece ambientes científicos com equipamentos que podem ser usados taticamente.",
        },
        Covil: {
            description:
                "Um esconderijo secreto usado por organizações criminosas. O mapa apresenta áreas escuras e labirínticas que favorecem emboscadas e combate furtivo.",
        },
        Esmeralda: {
            description:
                "Esmeralda é um mapa que combina elementos urbanos e naturais, oferecendo uma experiência tática única com múltiplas rotas e estratégias.",
        },
        "Estádio (Ranqueado)": {
            description:
                "Um estádio esportivo adaptado para combate. O mapa apresenta áreas amplas e estruturas complexas que testam habilidades de equipe.",
        },
        "Casa (Ranqueado)": {
            description:
                "Uma casa residencial que serve como campo de batalha. O mapa compacto oferece combate intenso em múltiplos cômodos.",
        },
        "Avião (Casual)": {
            description:
                "Um avião comercial transformado em zona de combate. O espaço confinado e linear cria um ambiente único para operações táticas.",
        },
        "Base Hereford (Antiga)": {
            description:
                "A versão clássica da Base Hereford, um mapa icônico que serviu como local de treinamento. Mantém a essência do mapa original com seu design característico.",
        },
        "Universidade Bartlett": {
            description:
                "Uma universidade que serve como campo de batalha. O mapa apresenta salas de aula, corredores e áreas comuns que oferecem múltiplas rotas táticas.",
        },
        "Fábrica (TDM)": {
            description:
                "Uma fábrica industrial adaptada para combate. O mapa oferece espaços abertos e áreas de cobertura para diferentes estilos de jogo.",
        },
        "Arena (TDM)": {
            description:
                "Uma arena esportiva transformada em campo de batalha. O mapa oferece combate em espaços amplos com múltiplas áreas de cobertura.",
        },
        "Mapa de Evento 1": {
            description:
                "Um mapa especial criado para eventos e temporadas limitadas. Oferece uma experiência única e memorável para os jogadores.",
        },
        "Mapa de Evento 2": {
            description:
                "Outro mapa especial de evento, apresentando design e mecânicas únicas para criar experiências de jogo distintas.",
        },
    };

export default function MapasPage() {
    const [mapas, setMapas] = useState<Mapa[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMapa, setSelectedMapa] = useState<Mapa | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingMapa, setEditingMapa] = useState<Mapa | null>(null);
    const [deletingMapa, setDeletingMapa] = useState<Mapa | null>(null);
    const [editNome, setEditNome] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    const fetchMapas = async () => {
        try {
            setLoading(true);
            const data = await mapaService.listAll();
            setMapas(data);
        } catch (error) {
            console.error("Erro ao buscar mapas:", error);
            toast.error("Erro ao carregar mapas", {
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMapas();
    }, []);

    const handleEdit = (mapa: Mapa, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingMapa(mapa);
        setEditNome(mapa.nome);
        setEditDialogOpen(true);
    };

    const handleDelete = (mapa: Mapa, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeletingMapa(mapa);
        setDeleteDialogOpen(true);
    };

    const handleUpdate = async () => {
        if (!editingMapa || !editNome.trim()) {
            toast.error("Por favor, insira um nome válido", {
                position: "bottom-center",
            });
            return;
        }

        try {
            setActionLoading(true);
            const data: MapaRequest = { nome: editNome.trim() };
            await mapaService.update(editingMapa.idMapa, data);
            toast.success("Mapa atualizado com sucesso!", {
                position: "bottom-center",
            });
            setEditDialogOpen(false);
            setEditingMapa(null);
            setEditNome("");
            fetchMapas();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao atualizar mapa: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deletingMapa) return;

        try {
            setActionLoading(true);
            await mapaService.delete(deletingMapa.idMapa);
            toast.success("Mapa deletado com sucesso!", {
                position: "bottom-center",
            });
            setDeleteDialogOpen(false);
            setDeletingMapa(null);
            fetchMapas();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Erro desconhecido";
            toast.error(`Erro ao deletar mapa: ${errorMessage}`, {
                position: "bottom-center",
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleCardClick = (mapa: Mapa) => {
        setSelectedMapa(mapa);
        setDialogOpen(true);
    };

    const getMapDescription = (nome: string) => {
        return (
            mapDescriptions[nome]?.description ||
            `O mapa ${nome} oferece uma experiência única de combate tático. Explore suas rotas e estratégias para dominar o campo de batalha.`
        );
    };

    /**
     * Converte o nome do mapa para o nome da pasta de imagens
     * Ex: "Consulado" -> "consulate", "Kafe Dostoyevsky" -> "kafe"
     */
    const getMapImagePath = (nome: string): string | null => {
        const mapNameMapping: Record<string, string> = {
            Banco: "border",
            Fronteira: "border",
            "Casa de Campo": "chalet",
            Litoral: "coastline",
            Consulado: "consulate",
            Favela: "favela",
            "Hereford (Novo)": "hereford",
            "Arranha-Céu (Novo)": "skyscraper",
            "Canal (Novo)": "kanal",
            "Kafe Dostoyevsky": "kafe",
            "Oregon (Novo)": "oregon",
            "Parque Temático (Novo)": "themepark",
            "Arranha-Céu": "skyscraper",
            Torre: "tower",
            Iate: "yacht",
            "Avião (Casual)": "plane",
            "Casa (Ranqueado)": "house",
        };

        const folderName = mapNameMapping[nome];
        if (!folderName) return null;

        // Tenta encontrar a primeira imagem disponível (geralmente -0.jpg ou -1.jpg)
        return `/maps/${folderName}/${folderName}-0.jpg`;
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">
                            Carregando mapas...
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
                    <Map className="h-10 w-10 text-primary" />
                    Mapas do Jogo
                </h1>
                <p className="text-muted-foreground">
                    Explore todos os mapas disponíveis no Rainbow Six Siege
                </p>
            </div>

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {mapas.map((mapa) => {
                    const hasImage = getMapImagePath(mapa.nome);

                    return (
                        <Card
                            key={mapa.idMapa}
                            className={cn(
                                "overflow-hidden p-0 h-full relative group",
                                hasImage &&
                                    "hover:shadow-lg transition-all duration-300 cursor-pointer"
                            )}
                            onClick={
                                hasImage
                                    ? () => handleCardClick(mapa)
                                    : undefined
                            }
                        >
                            <div className="relative w-full h-full min-h-[200px] overflow-hidden">
                                {hasImage ? (
                                    <>
                                        <Image
                                            src={getMapImagePath(mapa.nome)!}
                                            alt={mapa.nome}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Overlay escurecido */}
                                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
                                        {/* Conteúdo sobreposto */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
                                            <CardTitle className="text-center text-base md:text-lg text-white font-bold drop-shadow-lg mb-2">
                                                {mapa.nome}
                                            </CardTitle>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-muted flex flex-col items-center justify-center p-4 relative">
                                        <Map className="h-16 w-16 text-muted-foreground mb-3" />
                                        <CardTitle className="text-center text-base md:text-lg text-muted-foreground font-bold">
                                            {mapa.nome}
                                        </CardTitle>
                                    </div>
                                )}
                                {/* Botões de ação */}
                                <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="h-8 w-8 bg-background/90 hover:bg-background"
                                        onClick={(e) => handleEdit(mapa, e)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="h-8 w-8 bg-destructive/90 hover:bg-destructive"
                                        onClick={(e) => handleDelete(mapa, e)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Dialog de Detalhes */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            <Map className="h-6 w-6 text-primary" />
                            {selectedMapa?.nome}
                        </DialogTitle>
                        <DialogDescription>
                            Informações e história do mapa
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        {/* Imagem do Mapa */}
                        {selectedMapa && getMapImagePath(selectedMapa.nome) ? (
                            <div className="relative w-full h-64 rounded-lg overflow-hidden">
                                <Image
                                    src={getMapImagePath(selectedMapa.nome)!}
                                    alt={selectedMapa.nome}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 768px"
                                />
                                {/* Overlay escurecido */}
                                <div className="absolute inset-0 bg-black/60" />
                                {/* Nome do mapa sobre a imagem */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                                        {selectedMapa.nome}
                                    </h3>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <Map className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                                    <p className="text-sm text-muted-foreground">
                                        {selectedMapa?.nome}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Descrição */}
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Descrição</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {selectedMapa
                                    ? getMapDescription(selectedMapa.nome)
                                    : ""}
                            </p>
                        </div>

                        {/* Informações Adicionais */}
                        <div className="pt-4 border-t">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">
                                        ID do Mapa
                                    </p>
                                    <p className="text-sm font-medium">
                                        #{selectedMapa?.idMapa}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">
                                        Nome
                                    </p>
                                    <p className="text-sm font-medium">
                                        {selectedMapa?.nome}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog de Edição */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5 text-primary" />
                            Editar Mapa
                        </DialogTitle>
                        <DialogDescription>
                            Atualize as informações do mapa
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="edit-nome">Nome do Mapa</Label>
                            <Input
                                id="edit-nome"
                                value={editNome}
                                onChange={(e) => setEditNome(e.target.value)}
                                placeholder="Ex: Consulado"
                                required
                                disabled={actionLoading}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setEditDialogOpen(false);
                                setEditingMapa(null);
                                setEditNome("");
                            }}
                            disabled={actionLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            onClick={handleUpdate}
                            disabled={actionLoading || !editNome.trim()}
                        >
                            {actionLoading ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog de Confirmação de Deleção */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-destructive" />
                            Confirmar Deleção
                        </DialogTitle>
                        <DialogDescription>
                            Você tem certeza que deseja deletar o mapa{" "}
                            <strong className="text-destructive">
                                {deletingMapa?.nome}
                            </strong>
                            ? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setDeleteDialogOpen(false);
                                setDeletingMapa(null);
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

            {/* Botão flutuante para criar mapa */}
            <CreateMapButton onMapCreated={fetchMapas} />
        </div>
    );
}
