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
import { useApp } from "@/app/context/app-context";

export function ProviderProfileFunctional({ 
  onBack, 
  onSchedule,
  onMessage 
}: { 
  onBack: () => void;
  onSchedule: () => void;
  onMessage: () => void;
}) {
  const { selectedProvider } = useApp();

  if (!selectedProvider) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p>Nenhum profissional selecionado</p>
      </div>
    );
  }

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
              src={selectedProvider.image}
              alt={selectedProvider.name}
              className="w-32 h-32 rounded-lg object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl">{selectedProvider.name}</h2>
                    {selectedProvider.verified && (
                      <Badge className="bg-primary text-primary-foreground">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedProvider.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xl">{selectedProvider.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">({selectedProvider.reviews.length} avaliações)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {selectedProvider.distance} de você
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {selectedProvider.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedProvider.specialties.map((specialty) => (
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
            <TabsTrigger value="reviews">Avaliações ({selectedProvider.reviews.length})</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio">
            <Card className="p-6">
              <h3 className="text-xl mb-6">Trabalhos Realizados</h3>
              {selectedProvider.portfolio.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProvider.portfolio.map((image, index) => (
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
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum trabalho no portfólio ainda
                </p>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-4">
              {selectedProvider.reviews.length > 0 ? (
                selectedProvider.reviews.map((review) => (
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
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">Nenhuma avaliação ainda</p>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <Card className="p-6">
              <h3 className="text-xl mb-4">Sobre o Profissional</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>{selectedProvider.bio}</p>
                
                <div className="pt-4 border-t">
                  <h4 className="text-base text-foreground mb-3">Informações</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm">Experiência:</span>
                      <p className="text-foreground">{selectedProvider.experience}</p>
                    </div>
                    <div>
                      <span className="text-sm">Serviços completos:</span>
                      <p className="text-foreground">{selectedProvider.completedJobs}</p>
                    </div>
                    <div>
                      <span className="text-sm">Taxa de resposta:</span>
                      <p className="text-foreground">{selectedProvider.responseRate}%</p>
                    </div>
                    <div>
                      <span className="text-sm">Tempo médio de resposta:</span>
                      <p className="text-foreground">{selectedProvider.responseTime}</p>
                    </div>
                  </div>
                </div>
                
                {selectedProvider.certifications.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="text-base text-foreground mb-3">Certificações</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProvider.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
