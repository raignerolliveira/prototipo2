import { createContext, useContext, useState, ReactNode } from "react";
import { User, Provider, Message, ServiceRequest, Payment, Proposal } from "@/app/types";
import { mockProviders } from "@/app/data/mock-data";

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  providers: Provider[];
  filteredProviders: Provider[];
  setFilteredProviders: (providers: Provider[]) => void;
  selectedProvider: Provider | null;
  setSelectedProvider: (provider: Provider | null) => void;
  messages: Record<number, Message[]>;
  addMessage: (providerId: number, message: Message) => void;
  serviceRequests: ServiceRequest[];
  addServiceRequest: (request: ServiceRequest) => void;
  updateServiceRequest: (id: string, updates: Partial<ServiceRequest>) => void;
  currentPayment: Payment | null;
  setCurrentPayment: (payment: Payment | null) => void;
  proposals: Proposal[];
  addProposal: (proposal: Proposal) => void;
  updateProposal: (id: string, updates: Partial<Proposal>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [providers] = useState<Provider[]>(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(mockProviders);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({
    1: [
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
      }
    ]
  });
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const addMessage = (providerId: number, message: Message) => {
    setMessages(prev => ({
      ...prev,
      [providerId]: [...(prev[providerId] || []), message]
    }));
  };

  const addServiceRequest = (request: ServiceRequest) => {
    setServiceRequests(prev => [...prev, request]);
  };

  const updateServiceRequest = (id: string, updates: Partial<ServiceRequest>) => {
    setServiceRequests(prev =>
      prev.map(req => req.id === id ? { ...req, ...updates } : req)
    );
  };

  const addProposal = (proposal: Proposal) => {
    setProposals(prev => [...prev, proposal]);
  };

  const updateProposal = (id: string, updates: Partial<Proposal>) => {
    setProposals(prev =>
      prev.map(prop => prop.id === id ? { ...prop, ...updates } : prop)
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        providers,
        filteredProviders,
        setFilteredProviders,
        selectedProvider,
        setSelectedProvider,
        messages,
        addMessage,
        serviceRequests,
        addServiceRequest,
        updateServiceRequest,
        currentPayment,
        setCurrentPayment,
        proposals,
        addProposal,
        updateProposal
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
