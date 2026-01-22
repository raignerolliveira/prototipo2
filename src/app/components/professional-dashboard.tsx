import { useState } from "react";
import { 
  Briefcase, 
  Calendar, 
  DollarSign, 
  LogOut, 
  Star, 
  User, 
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Upload,
  Trash2,
  Edit
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { useApp } from "@/app/context/app-context";
import { toast } from "sonner";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

interface ServiceRequest {
  id: string;
  clientName: string;
  serviceType: string;
  description: string;
  location: string;
  budget: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  date: string;
  images?: string[];
}

export function ProfessionalDashboard({ onLogout }: { onLogout: () => void }) {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState("requests");
  
  // Portfolio Management
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "Construção de Laje Residencial",
      description: "Laje pré-moldada de 80m² em residência",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
      date: "2025-01-15"
    },
    {
      id: "2",
      title: "Reforma de Banheiro",
      description: "Reforma completa com troca de revestimentos",
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400",
      date: "2025-01-10"
    }
  ]);
  
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    description: "",
    image: ""
  });
  
  // Service Requests
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: "req-1",
      clientName: "Maria Silva",
      serviceType: "Construção de Laje",
      description: "Preciso construir uma laje de aproximadamente 60m² em minha residência. O local já está preparado.",
      location: "São Paulo - SP",
      budget: "R$ 8.000,00 - R$ 12.000,00",
      status: "pending",
      date: "2025-01-20",
      images: [
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400",
        "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400"
      ]
    },
    {
      id: "req-2",
      clientName: "João Santos",
      serviceType: "Reboco de Parede",
      description: "Necessito de reboco em 3 paredes externas da casa, aproximadamente 40m².",
      location: "São Paulo - SP",
      budget: "R$ 3.000,00 - R$ 5.000,00",
      status: "pending",
      date: "2025-01-21",
      images: []
    },
    {
      id: "req-3",
      clientName: "Ana Costa",
      serviceType: "Pintura Residencial",
      description: "Pintura interna de apartamento de 80m², incluindo teto e paredes.",
      location: "São Paulo - SP",
      budget: "R$ 4.000,00 - R$ 6.000,00",
      status: "accepted",
      date: "2025-01-18",
      images: []
    }
  ]);
  
  const [proposalValues, setProposalValues] = useState<Record<string, string>>({});
  
  // Profile Data
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "",
    specialty: currentUser?.specialty || "",
    bio: "Profissional experiente com 10 anos de atuação no mercado.",
    hourlyRate: "150",
    experience: "10 anos"
  });
  
  const handleAddPortfolio = () => {
    if (!newPortfolio.title || !newPortfolio.description) {
      toast.error("Preencha título e descrição");
      return;
    }
    
    const item: PortfolioItem = {
      id: Date.now().toString(),
      title: newPortfolio.title,
      description: newPortfolio.description,
      image: newPortfolio.image || "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400",
      date: new Date().toISOString().split('T')[0]
    };
    
    setPortfolio([...portfolio, item]);
    setNewPortfolio({ title: "", description: "", image: "" });
    setShowAddPortfolio(false);
    toast.success("Item adicionado ao portfólio!");
  };
  
  const handleDeletePortfolio = (id: string) => {
    setPortfolio(portfolio.filter(item => item.id !== id));
    toast.success("Item removido do portfólio");
  };
  
  const handleSendProposal = (requestId: string) => {
    const value = proposalValues[requestId];
    if (!value) {
      toast.error("Digite um valor para a proposta");
      return;
    }
    
    setServiceRequests(serviceRequests.map(req => 
      req.id === requestId ? { ...req, status: "accepted" as const } : req
    ));
    
    toast.success("Proposta enviada com sucesso!");
    setProposalValues({ ...proposalValues, [requestId]: "" });
  };
  
  const handleRejectRequest = (requestId: string) => {
    setServiceRequests(serviceRequests.map(req => 
      req.id === requestId ? { ...req, status: "rejected" as const } : req
    ));
    toast.info("Solicitação recusada");
  };
  
  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    onLogout();
  };
  
  const handleUpdateProfile = () => {
    toast.success("Perfil atualizado com sucesso!");
  };
  
  const pendingRequests = serviceRequests.filter(r => r.status === "pending");
  const acceptedRequests = serviceRequests.filter(r => r.status === "accepted");
  const completedRequests = serviceRequests.filter(r => r.status === "completed");
  
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl">Dashboard Profissional</h1>
            <p className="text-sm text-primary-foreground/80 mt-1">ServiçoPRO</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
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
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Pendentes</p>
                <p className="text-xl sm:text-2xl">{pendingRequests.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Aceitos</p>
                <p className="text-xl sm:text-2xl">{acceptedRequests.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Avaliação</p>
                <p className="text-xl sm:text-2xl">4.8</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Portfólio</p>
                <p className="text-xl sm:text-2xl">{portfolio.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="requests" className="text-xs sm:text-sm">
              <MessageSquare className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Solicitações</span>
              <span className="sm:hidden">Pedidos</span>
              {pendingRequests.length > 0 && (
                <Badge className="ml-2 bg-accent text-accent-foreground">{pendingRequests.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs sm:text-sm">
              <Briefcase className="w-4 h-4 mr-1 sm:mr-2" />
              Portfólio
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs sm:text-sm">
              <User className="w-4 h-4 mr-1 sm:mr-2" />
              Perfil
            </TabsTrigger>
          </TabsList>

          {/* Service Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl">Solicitações de Orçamento</h2>
            </div>
            
            {serviceRequests.length === 0 ? (
              <Card className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma solicitação no momento</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {serviceRequests.map((request) => (
                  <Card key={request.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-base sm:text-lg">{request.serviceType}</h3>
                          <Badge className={
                            request.status === "pending" ? "bg-yellow-500" :
                            request.status === "accepted" ? "bg-green-500" :
                            request.status === "rejected" ? "bg-red-500" :
                            "bg-blue-500"
                          }>
                            {request.status === "pending" ? "Pendente" :
                             request.status === "accepted" ? "Aceito" :
                             request.status === "rejected" ? "Recusado" :
                             "Concluído"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Cliente: {request.clientName}
                        </p>
                        <p className="text-sm mb-2">{request.description}</p>
                        <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-muted-foreground">
                          <span>📍 {request.location}</span>
                          <span>💰 {request.budget}</span>
                          <span>📅 {new Date(request.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    
                    {request.images && request.images.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm mb-2">Imagens do cliente:</p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {request.images.map((img, idx) => (
                            <img 
                              key={idx}
                              src={img} 
                              alt={`Imagem ${idx + 1}`}
                              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {request.status === "pending" && (
                      <div className="border-t pt-4 space-y-3">
                        <div>
                          <Label htmlFor={`proposal-${request.id}`}>Enviar Proposta</Label>
                          <div className="flex gap-2 mt-2">
                            <Input 
                              id={`proposal-${request.id}`}
                              placeholder="R$ 0,00"
                              value={proposalValues[request.id] || ""}
                              onChange={(e) => setProposalValues({
                                ...proposalValues,
                                [request.id]: e.target.value
                              })}
                              className="flex-1"
                            />
                            <Button 
                              onClick={() => handleSendProposal(request.id)}
                              className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                            >
                              Enviar
                            </Button>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => handleRejectRequest(request.id)}
                          className="w-full sm:w-auto"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Recusar
                        </Button>
                      </div>
                    )}
                    
                    {request.status === "accepted" && (
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm">Proposta aceita! Aguardando início do serviço.</span>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-lg sm:text-xl">Meu Portfólio</h2>
              <Button 
                onClick={() => setShowAddPortfolio(!showAddPortfolio)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Trabalho
              </Button>
            </div>
            
            {showAddPortfolio && (
              <Card className="p-4 sm:p-6 mb-4">
                <h3 className="text-base sm:text-lg mb-4">Novo Item do Portfólio</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="portfolio-title">Título do Trabalho *</Label>
                    <Input 
                      id="portfolio-title"
                      placeholder="Ex: Construção de Laje..."
                      value={newPortfolio.title}
                      onChange={(e) => setNewPortfolio({...newPortfolio, title: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="portfolio-description">Descrição *</Label>
                    <Textarea 
                      id="portfolio-description"
                      placeholder="Descreva o trabalho realizado..."
                      value={newPortfolio.description}
                      onChange={(e) => setNewPortfolio({...newPortfolio, description: e.target.value})}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="portfolio-image">URL da Imagem (opcional)</Label>
                    <Input 
                      id="portfolio-image"
                      placeholder="https://..."
                      value={newPortfolio.image}
                      onChange={(e) => setNewPortfolio({...newPortfolio, image: e.target.value})}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Deixe em branco para usar imagem padrão
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleAddPortfolio}
                      className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
                    >
                      Salvar
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowAddPortfolio(false);
                        setNewPortfolio({ title: "", description: "", image: "" });
                      }}
                      className="flex-1 sm:flex-none"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </Card>
            )}
            
            {portfolio.length === 0 ? (
              <Card className="p-8 text-center">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Seu portfólio está vazio</p>
                <Button 
                  onClick={() => setShowAddPortfolio(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Trabalho
                </Button>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolio.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-base mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString('pt-BR')}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeletePortfolio(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl mb-6">Meus Dados</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="profile-name">Nome Completo</Label>
                  <Input 
                    id="profile-name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="profile-specialty">Especialidade</Label>
                  <Input 
                    id="profile-specialty"
                    value={profileData.specialty}
                    onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="profile-bio">Sobre Mim</Label>
                  <Textarea 
                    id="profile-bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="mt-1"
                    rows={4}
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profile-rate">Valor/Hora (R$)</Label>
                    <Input 
                      id="profile-rate"
                      value={profileData.hourlyRate}
                      onChange={(e) => setProfileData({...profileData, hourlyRate: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="profile-experience">Experiência</Label>
                    <Input 
                      id="profile-experience"
                      value={profileData.experience}
                      onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                      className="mt-1"
                      placeholder="Ex: 10 anos"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleUpdateProfile}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </Card>
            
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Serviços Concluídos</span>
                  <span className="text-base">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Taxa de Resposta</span>
                  <span className="text-base">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tempo Médio de Resposta</span>
                  <span className="text-base">2 horas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avaliação Média</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-base">4.8</span>
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
