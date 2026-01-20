import { useState, useRef } from "react";
import { 
  Send, 
  Paperclip, 
  ArrowLeft,
  CheckCircle,
  X,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Textarea } from "@/app/components/ui/textarea";
import { useApp } from "@/app/context/app-context";
import { Message, Proposal } from "@/app/types";
import { toast } from "sonner";

export function ChatPageFunctional({ onBack, onProposalAccepted }: { 
  onBack: () => void;
  onProposalAccepted: (proposal: Proposal) => void;
}) {
  const { selectedProvider, messages, addMessage, addProposal } = useApp();
  const [newMessage, setNewMessage] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentMessages = selectedProvider ? messages[selectedProvider.id] || [] : [];

  const handleSendMessage = () => {
    if (!selectedProvider) return;
    
    if (!newMessage.trim() && uploadedImages.length === 0) {
      toast.error("Digite uma mensagem ou envie uma imagem");
      return;
    }

    if (newMessage.trim()) {
      const newMsg: Message = {
        id: currentMessages.length + 1,
        text: newMessage,
        sender: "user",
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      addMessage(selectedProvider.id, newMsg);
    }

    // Send uploaded images
    uploadedImages.forEach((imageUrl, index) => {
      const imgMsg: Message = {
        id: currentMessages.length + index + 2,
        text: "",
        sender: "user",
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        type: "image",
        imageUrl
      };
      addMessage(selectedProvider.id, imgMsg);
    });

    if (uploadedImages.length > 0) {
      toast.success(`${uploadedImages.length} imagem(ns) enviada(s)!`);
      // Simulate provider response
      setTimeout(() => {
        const response: Message = {
          id: currentMessages.length + uploadedImages.length + 3,
          text: "Obrigado pelas fotos! Estou analisando e já preparo um orçamento para você.",
          sender: "provider",
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        addMessage(selectedProvider.id, response);
      }, 2000);
    }

    setNewMessage("");
    setUploadedImages([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Simulate file upload - in a real app, you'd upload to a server
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    
    toast.success("Imagens carregadas! Clique em enviar.");
  };

  const handleSendProposal = () => {
    if (!selectedProvider) return;

    const proposal: Proposal = {
      id: Math.random().toString(36).substr(2, 9),
      value: "8.500,00",
      description: `${selectedProvider.specialty} - Serviço completo incluindo materiais e mão de obra. Prazo estimado: 10 dias úteis.`,
      status: "pending",
      providerId: selectedProvider.id,
      serviceType: selectedProvider.specialty,
      deadline: "10 dias úteis"
    };

    const proposalMsg: Message = {
      id: currentMessages.length + 1,
      text: "",
      sender: "provider",
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      type: "proposal",
      proposalData: proposal
    };

    addMessage(selectedProvider.id, proposalMsg);
    addProposal(proposal);
    toast.success("Proposta enviada!");
  };

  const handleProposalAction = (message: Message, action: "accept" | "reject" | "negotiate") => {
    if (!message.proposalData) return;

    if (action === "accept") {
      message.proposalData.status = "accepted";
      toast.success("Proposta aceita! Redirecionando para pagamento...");
      setTimeout(() => {
        onProposalAccepted(message.proposalData!);
      }, 1500);
    } else if (action === "reject") {
      message.proposalData.status = "rejected";
      toast.error("Proposta recusada");
    } else {
      message.proposalData.status = "negotiating";
      toast.info("Negociação iniciada");
    }
  };

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
            <h1 className="text-xl">Chat com {selectedProvider.name}</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary/90"
            onClick={handleSendProposal}
          >
            Simular Envio de Proposta
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center gap-3">
            <img 
              src={selectedProvider.image}
              alt={selectedProvider.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-base">{selectedProvider.name}</h3>
              <span className="text-xs text-muted-foreground">{selectedProvider.specialty}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "proposal" ? (
                  <Card className="max-w-md p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-accent text-accent-foreground">
                        Proposta de Orçamento
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Valor Total</p>
                        <p className="text-2xl text-primary">R$ {message.proposalData?.value}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Descrição</p>
                        <p className="text-sm">{message.proposalData?.description}</p>
                      </div>

                      {message.proposalData?.status === "pending" && (
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm"
                            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                            onClick={() => handleProposalAction(message, "accept")}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Aceitar
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleProposalAction(message, "negotiate")}
                          >
                            Negociar
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline"
                            className="border-destructive text-destructive hover:bg-destructive/10"
                            onClick={() => handleProposalAction(message, "reject")}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {message.proposalData?.status === "accepted" && (
                        <div className="bg-green-50 border border-green-200 rounded p-2 text-sm text-green-700">
                          ✓ Proposta aceita! Prossiga para o pagamento.
                        </div>
                      )}

                      {message.proposalData?.status === "rejected" && (
                        <div className="bg-red-50 border border-red-200 rounded p-2 text-sm text-red-700">
                          ✗ Proposta recusada
                        </div>
                      )}

                      {message.proposalData?.status === "negotiating" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm text-yellow-700">
                          💬 Em negociação
                        </div>
                      )}
                    </div>
                    
                    <span className="text-xs text-muted-foreground block mt-3">
                      {message.time}
                    </span>
                  </Card>
                ) : message.type === "image" ? (
                  <div className={`max-w-xs`}>
                    <img 
                      src={message.imageUrl}
                      alt="Imagem enviada"
                      className="rounded-lg max-h-64 object-cover"
                    />
                    <span className={`
                      text-xs block mt-1
                      ${message.sender === "user" 
                        ? "text-right text-muted-foreground" 
                        : "text-muted-foreground"
                      }
                    `}>
                      {message.time}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`
                      max-w-md px-4 py-2 rounded-lg
                      ${message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-100 text-foreground"
                      }
                    `}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className={`
                      text-xs block mt-1
                      ${message.sender === "user" 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                      }
                    `}>
                      {message.time}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image Preview */}
          {uploadedImages.length > 0 && (
            <div className="px-4 py-2 border-t bg-gray-50">
              <div className="flex gap-2 overflow-x-auto">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="relative shrink-0">
                    <img 
                      src={img} 
                      alt={`Upload ${index + 1}`}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <button
                      onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button 
                variant="outline" 
                size="icon"
                className="shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                size="icon"
                className="bg-primary hover:bg-primary/90 shrink-0"
                onClick={handleSendMessage}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" />
              Clique no 📎 para enviar fotos do problema
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
