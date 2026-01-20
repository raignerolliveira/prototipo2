import { useState, useEffect } from "react";
import { 
  MapPin, 
  Search, 
  Star, 
  Sliders,
  Navigation,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Slider } from "@/app/components/ui/slider";
import { useApp } from "@/app/context/app-context";
import { Provider } from "@/app/types";
import { toast } from "sonner";

export function HomePageFunctional({ 
  onProviderSelect,
  onLogout 
}: { 
  onProviderSelect: () => void;
  onLogout: () => void;
}) {
  const { currentUser, providers, filteredProviders, setFilteredProviders, setSelectedProvider } = useApp();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [maxDistance, setMaxDistance] = useState([20]);
  const [minRating, setMinRating] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, maxDistance, minRating, priceRange, verifiedOnly]);

  const applyFilters = () => {
    let filtered = [...providers];

    // Search by specialty
    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by distance
    filtered = filtered.filter(provider => {
      const distance = parseFloat(provider.distance.replace(' km', ''));
      return distance <= maxDistance[0];
    });

    // Filter by rating
    if (minRating.length > 0) {
      const minValue = Math.max(...minRating);
      filtered = filtered.filter(provider => provider.rating >= minValue);
    }

    // Filter by price
    filtered = filtered.filter(provider => {
      const price = parseFloat(provider.price.split('/')[0]);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter verified only
    if (verifiedOnly) {
      filtered = filtered.filter(provider => provider.verified);
    }

    setFilteredProviders(filtered);
  };

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
    onProviderSelect();
  };

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl">ServiçoPRO</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="text-sm">{currentUser?.name}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-primary-foreground hover:bg-primary/90"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                      value={locationTerm}
                      onChange={(e) => setLocationTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="self-end">
                  <Button 
                    size="lg"
                    className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => {
                      if (locationTerm) {
                        toast.success("Localização atualizada!");
                      }
                    }}
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
                  <Slider 
                    value={maxDistance} 
                    onValueChange={setMaxDistance}
                    max={20} 
                    step={1} 
                    className="mb-2" 
                  />
                  <span className="text-xs text-muted-foreground">Até {maxDistance[0]} km</span>
                </div>
                
                <div>
                  <label className="text-sm mb-3 block">Avaliação mínima</label>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="rounded"
                          checked={minRating.includes(rating)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setMinRating([...minRating, rating]);
                            } else {
                              setMinRating(minRating.filter(r => r !== rating));
                            }
                          }}
                        />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">
                            {rating === 5 ? 'Excelente' : `${rating}+ estrelas`}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm mb-3 block">Faixa de preço (R$/hora)</label>
                  <Slider 
                    value={priceRange} 
                    onValueChange={setPriceRange}
                    max={500} 
                    step={10} 
                    className="mb-2" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded" 
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                    />
                    <span className="text-sm">Apenas verificados</span>
                  </label>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-primary hover:bg-primary/90"
                onClick={() => {
                  applyFilters();
                  toast.success("Filtros aplicados!");
                }}
              >
                Aplicar Filtros
              </Button>
            </Card>
          </div>

          {/* Providers List */}
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl">Profissionais próximos</h2>
              <span className="text-sm text-muted-foreground">
                {filteredProviders.length} encontrado{filteredProviders.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {filteredProviders.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Nenhum profissional encontrado com os filtros selecionados
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setMaxDistance([20]);
                    setMinRating([]);
                    setPriceRange([0, 500]);
                    setVerifiedOnly(false);
                  }}
                >
                  Limpar Filtros
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredProviders.map((provider) => (
                  <Card 
                    key={provider.id} 
                    className="p-4 hover:shadow-lg transition-shadow cursor-pointer" 
                    onClick={() => handleProviderClick(provider)}
                  >
                    <div className="flex gap-4">
                      <img 
                        src={provider.image} 
                        alt={provider.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base">{provider.name}</h3>
                              {provider.verified && (
                                <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0">
                                  Verificado
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{provider.rating}</span>
                            <span className="text-xs text-muted-foreground">({provider.reviews.length})</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {provider.distance}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm">A partir de <span className="text-primary">R$ {provider.price}</span></span>
                          <Button 
                            size="sm" 
                            className="bg-accent hover:bg-accent/90 text-accent-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProviderClick(provider);
                            }}
                          >
                            Ver Perfil
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
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
                      {filteredProviders.length} profissionais próximos
                    </p>
                  </div>
                </div>
                
                {/* Map Markers */}
                {filteredProviders.slice(0, 3).map((_, index) => (
                  <div 
                    key={index}
                    className="absolute"
                    style={{
                      top: `${20 + index * 20}%`,
                      left: `${30 + index * 10}%`
                    }}
                  >
                    <div className={`bg-accent text-accent-foreground rounded-full p-2 shadow-lg ${index === 0 ? 'animate-bounce' : ''}`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
