import { 
  Star, 
  MapPin, 
  CheckCircle, 
  MessageSquare,
  Calendar,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

export function ProviderProfilePage({ 
  onBack, 
  onSchedule,
  onMessage 
}: { 
  onBack: () => void;
  onSchedule: () => void;
  onMessage: () => void;
}) {
  const portfolioImages = [
    "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600",
    "https://images.unsplash.com/photo-1595814433015-e6f5ce69e8f9?w=600",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600",
    "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600"
  ];

  const reviews = [
    {
      id: 1,
      name: "Ana Paula",
      rating: 5,
      date: "15/01/2026",
      comment: "Excelente profissional! Pontual, cuidadoso e fez um trabalho impecável na reforma do banheiro.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    },
    {
      id: 2,
      name: "Roberto Mendes",
      rating: 5,
      date: "10/01/2026",
      comment: "Contratei para construir uma laje. Trabalho perfeito, dentro do prazo e orçamento. Super recomendo!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
    },
    {
      id: 3,
      name: "Juliana Costa",
      rating: 4,
      date: "05/01/2026",
      comment: "Muito bom profissional. Atencioso e fez um ótimo serviço de reboco nas paredes externas.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
    }
  ];

  const specialties = [
    "Especialista em Lajes",
    "Pintura de Fachadas",
    "Alvenaria",
    "Reboco e Acabamento",
    "Construção",
    "Reformas"
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-primary-foreground hover:bg-primary/90"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <h1 className="text-xl">Perfil do Profissional</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-8">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
              alt="Carlos Silva"
              className="w-32 h-32 rounded-lg object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl">Carlos Silva</h2>
                    <Badge className="bg-primary text-primary-foreground">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verificado
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xl">4.9</span>
                      <span className="text-muted-foreground">(127 avaliações)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      2.3 km de você
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    Pedreiro com 15 anos de experiência em construção civil e reformas. 
                    Especializado em lajes, alvenaria e acabamentos de alta qualidade.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={onSchedule}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Serviço
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={onMessage}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações ({reviews.length})</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio">
            <Card className="p-6">
              <h3 className="text-xl mb-6">Trabalhos Realizados</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioImages.map((image, index) => (
                  <div 
                    key={index}
                    className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
                  >
                    <img 
                      src={image}
                      alt={`Trabalho ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm">Ver detalhes</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex gap-4">
                    <img 
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-base">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <Card className="p-6">
              <h3 className="text-xl mb-4">Sobre o Profissional</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Carlos Silva é um pedreiro profissional com mais de 15 anos de experiência 
                  em construção civil. Começou sua carreira trabalhando em grandes obras e 
                  hoje se dedica a projetos residenciais e reformas.
                </p>
                <p>
                  Especializado em estruturas de lajes, alvenaria estrutural e acabamentos 
                  finos, Carlos é conhecido pela sua atenção aos detalhes e compromisso com 
                  prazos.
                </p>
                
                <div className="pt-4 border-t">
                  <h4 className="text-base text-foreground mb-3">Informações</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm">Experiência:</span>
                      <p className="text-foreground">15 anos</p>
                    </div>
                    <div>
                      <span className="text-sm">Serviços completos:</span>
                      <p className="text-foreground">247</p>
                    </div>
                    <div>
                      <span className="text-sm">Taxa de resposta:</span>
                      <p className="text-foreground">98%</p>
                    </div>
                    <div>
                      <span className="text-sm">Tempo médio de resposta:</span>
                      <p className="text-foreground">2 horas</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-base text-foreground mb-3">Certificações</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">NR-35 - Trabalho em Altura</Badge>
                    <Badge variant="outline">Curso de Alvenaria Estrutural</Badge>
                    <Badge variant="outline">Atendimento ao Cliente</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
