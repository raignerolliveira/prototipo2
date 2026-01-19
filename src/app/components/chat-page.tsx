import { 
  Send, 
  Paperclip, 
  ArrowLeft,
  CheckCircle,
  X
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Textarea } from "@/app/components/ui/textarea";
import { useState } from "react";

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "provider";
  time: string;
  type?: "text" | "proposal";
  proposalData?: {
    value: string;
    description: string;
    status: "pending" | "accepted" | "rejected";
  };
}

export function ChatPage({ onBack }: { onBack: () => void }) {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [newMessage, setNewMessage] = useState("");

  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Carlos Silva",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      lastMessage: "Posso fazer uma visita amanhã para avaliar o trabalho",
      time: "10:30",
      unread: 2
    },
    {
      id: 2,
      name: "João Santos",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      lastMessage: "Obrigado pelo interesse! Vou preparar o orçamento",
      time: "Ontem",
      unread: 0
    },
    {
      id: 3,
      name: "Maria Oliveira",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      lastMessage: "Perfeito! Quando podemos começar?",
      time: "15/01",
      unread: 1
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Vi seu perfil e gostaria de um orçamento para construção de uma laje.",
      sender: "user",
      time: "09:15"
    },
    {
      id: 2,
      text: "Bom dia! Fico feliz com seu interesse. Poderia me enviar algumas fotos do local e as medidas aproximadas?",
      sender: "provider",
      time: "09:20"
    },
    {
      id: 3,
      text: "Claro! Vou enviar as fotos agora.",
      sender: "user",
      time: "09:22"
    },
    {
      id: 4,
      text: "Perfeito! Baseado nas informações e fotos, preparei uma proposta de orçamento para você.",
      sender: "provider",
      time: "10:15"
    },
    {
      id: 5,
      text: "",
      sender: "provider",
      time: "10:15",
      type: "proposal",
      proposalData: {
        value: "8.500,00",
        description: "Construção de laje 6x8m incluindo materiais (ferro, cimento, areia, brita), mão de obra e acabamento. Prazo estimado: 10 dias úteis.",
        status: "pending"
      }
    },
    {
      id: 6,
      text: "Posso fazer uma visita amanhã para avaliar melhor o trabalho e tirar dúvidas",
      sender: "provider",
      time: "10:30"
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleProposalAction = (action: "accept" | "reject" | "negotiate") => {
    // Handle proposal action
    console.log("Proposal action:", action);
  };

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
            <h1 className="text-xl">Mensagens e Orçamentos</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-180px)]">
          {/* Conversations List */}
          <div className="lg:col-span-4">
            <Card className="h-full flex flex-col">
              <div className="p-4 border-b">
                <h3 className="text-lg">Conversas</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                    className={`
                      p-4 border-b cursor-pointer transition-colors
                      ${selectedChat === conversation.id 
                        ? 'bg-primary/5 border-l-4 border-l-primary' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex gap-3">
                      <img 
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-sm truncate">{conversation.name}</h4>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-accent text-accent-foreground">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-8">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center gap-3">
                <img 
                  src={conversations[selectedChat - 1].avatar}
                  alt={conversations[selectedChat - 1].name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base">{conversations[selectedChat - 1].name}</h3>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
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
                                onClick={() => handleProposalAction("accept")}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Aceitar
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleProposalAction("negotiate")}
                              >
                                Negociar
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline"
                                className="border-destructive text-destructive hover:bg-destructive/10"
                                onClick={() => handleProposalAction("reject")}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <span className="text-xs text-muted-foreground block mt-3">
                          {message.time}
                        </span>
                      </Card>
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

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="shrink-0"
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
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Dica: Você pode enviar fotos e vídeos para facilitar o orçamento
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
