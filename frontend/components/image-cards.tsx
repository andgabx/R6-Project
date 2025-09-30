"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
// Dados de exemplo - você pode substituir por dados reais
const cardsData = [
  {
    id: 1,
    title: "Card 1",
    description: "Descrição do primeiro card",
    category: "Categoria A",
    imageUrl: "/placeholder.jpg", // Substitua pela URL real da imagem
  },
  {
    id: 2,
    title: "Card 2",
    description: "Descrição do segundo card",
    category: "Categoria B",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: 3,
    title: "Card 3",
    description: "Descrição do terceiro card",
    category: "Categoria A",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: 4,
    title: "Card 4",
    description: "Descrição do quarto card",
    category: "Categoria C",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: 5,
    title: "Card 5",
    description: "Descrição do quinto card",
    category: "Categoria B",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: 6,
    title: "Card 6",
    description: "Descrição do sexto card",
    category: "Categoria A",
    imageUrl: "/placeholder.jpg",
  },
];

const CardsGrid = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Galeria de Cards</h2>
      
      {/* Grid responsivo de cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardsData.map((card) => (
          <Card key={card.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Área da imagem */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              {/* Skeleton enquanto a imagem não carrega */}
              <Skeleton className="absolute inset-0" />
              
              {/* Substitua este div pela tag <Image> do Next.js ou <img> */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              
              {/* Badge de categoria */}
              <Badge className="absolute top-2 right-2" variant="secondary">
                {card.category}
              </Badge>
            </div>
            
            <CardHeader>
              <CardTitle className="line-clamp-1">{card.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {card.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Adicione mais conteúdo aqui se necessário
              </p>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Ver Detalhes
              </Button>
              <Button size="sm">
                Ação
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardsGrid;
