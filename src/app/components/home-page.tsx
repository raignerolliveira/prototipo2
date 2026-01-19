import { 
  MapPin, 
  Search, 
  Star, 
  Sliders,
  Navigation
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Slider } from "@/app/components/ui/slider";

interface ProviderCardProps {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  image: string;
  verified: boolean;
  onSelect: () => void;
}

function ProviderCard({ name, specialty, rating, reviews, distance, price, image, verified, onSelect }: ProviderCardProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={onSelect}>
      <div className="flex gap-4">
        <img 
          src={image} 
          alt={name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base">{name}</h3>
                {verified && (
                  <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0">
                    Verificado
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{specialty}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {distance}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm">A partir de <span className="text-primary">R$ {price}</span></span>
            <Button 
              size="sm" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Contratar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function HomePage({ onProviderSelect }: { onProviderSelect: () => void }) {
  const providers = [
    {
      id: 1,
      name: "Carlos Silva",
      specialty: "Pedreiro Especializado",
      rating: 4.9,
      reviews: 127,
      distance: "2.3 km",
      price: "150/hora",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      verified: true
    },
    {
      id: 2,
      name: "João Santos",
      specialty: "Eletricista Residencial",
      rating: 4.8,
      reviews: 93,
      distance: "3.1 km",
      price: "120/hora",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      verified: true
    },
    {
      id: 3,
      name: "Maria Oliveira",
      specialty: "Pintora Profissional",
      rating: 5.0,
      reviews: 156,
      distance: "1.8 km",
      price: "100/hora",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      verified: true
    },
    {
      id: 4,
      name: "Pedro Costa",
      specialty: "Encanador",
      rating: 4.7,
      reviews: 84,
      distance: "4.2 km",
      price: "130/hora",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      verified: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl">ServiçoPRO</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/90">
              Para Profissionais
            </Button>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary/90">
              Entrar
            </Button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-primary text-primary-foreground py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl mb-2 text-center">Encontre o profissional ideal</h2>
          <p className="text-center text-primary-foreground/80 mb-8">
            Conectamos você aos melhores profissionais de serviços residenciais
          </p>
          
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="grid md:grid-cols-12 gap-4">
              <div className="md:col-span-7">
                <label className="text-sm text-gray-700 mb-2 block">Qual serviço precisa?</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    placeholder="Ex: Pedreiro, Eletricista, Pintor..." 
                    className="pl-10 h-12 border-gray-300"
                  />
                </div>
              </div>
              
              <div className="md:col-span-5 flex gap-2">
                <div className="flex-1">
                  <label className="text-sm text-gray-700 mb-2 block">CEP ou Localização</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input 
                      placeholder="Digite seu CEP" 
                      className="pl-10 h-12 border-gray-300"
                    />
                  </div>
                </div>
                <div className="self-end">
                  <Button 
                    size="lg"
                    className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Navigation className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3">
            <Card className="p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <Sliders className="w-5 h-5 text-primary" />
                <h3 className="text-lg">Filtros</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm mb-3 block">Distância máxima</label>
                  <Slider defaultValue={[5]} max={20} step={1} className="mb-2" />
                  <span className="text-xs text-muted-foreground">Até 5 km</span>
                </div>
                
                <div>
                  <label className="text-sm mb-3 block">Avaliação mínima</label>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            {rating === 5 ? 'ou mais' : `+ ${rating} estrelas`}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm mb-3 block">Faixa de preço</label>
                  <Slider defaultValue={[100, 300]} max={500} step={10} className="mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>R$ 100</span>
                    <span>R$ 300</span>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Apenas verificados</span>
                  </label>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                Aplicar Filtros
              </Button>
            </Card>
          </div>

          {/* Providers List */}
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl">Profissionais próximos</h2>
              <span className="text-sm text-muted-foreground">{providers.length} encontrados</span>
            </div>
            
            <div className="space-y-4">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} {...provider} onSelect={onProviderSelect} />
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-4">
            <Card className="p-0 overflow-hidden sticky top-6 h-[600px]">
              <div className="relative w-full h-full bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800" 
                  alt="Mapa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm">Mapa Interativo</p>
                    <p className="text-xs text-muted-foreground">
                      Visualize prestadores próximos
                    </p>
                  </div>
                </div>
                
                {/* Map Markers */}
                <div className="absolute top-[20%] left-[30%]">
                  <div className="bg-accent text-accent-foreground rounded-full p-2 shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-[40%] right-[25%]">
                  <div className="bg-accent text-accent-foreground rounded-full p-2 shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-[30%] left-[40%]">
                  <div className="bg-accent text-accent-foreground rounded-full p-2 shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
