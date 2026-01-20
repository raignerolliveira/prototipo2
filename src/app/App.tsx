import { useState } from "react";
import { AppProvider } from "@/app/context/app-context";
import { AuthPageFunctional } from "@/app/components/auth-page-functional";
import { HomePageFunctional } from "@/app/components/home-page-functional";
import { ProviderProfileFunctional } from "@/app/components/provider-profile-functional";
import { SchedulingModal } from "@/app/components/scheduling-modal";
import { ChatPageFunctional } from "@/app/components/chat-page-functional";
import { CheckoutPageFunctional } from "@/app/components/checkout-page-functional";
import { ServiceCompletionPage } from "@/app/components/service-completion-page";
import { Toaster } from "@/app/components/ui/sonner";
import { Proposal } from "@/app/types";

type Page = "auth" | "home" | "profile" | "chat" | "checkout" | "completion" | "success";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("auth");
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  const handleLogin = () => {
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setCurrentPage("auth");
  };

  const handleProviderSelect = () => {
    setCurrentPage("profile");
  };

  const handleSchedule = () => {
    setIsSchedulingOpen(true);
  };

  const handleScheduleConfirm = () => {
    setIsSchedulingOpen(false);
    setCurrentPage("chat");
  };

  const handleMessage = () => {
    setCurrentPage("chat");
  };

  const handleProposalAccepted = (proposal: Proposal) => {
    setCurrentPage("checkout");
  };

  const handlePaymentConfirmed = () => {
    setCurrentPage("completion");
  };

  const handleServiceCompleted = () => {
    setCurrentPage("success");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
  };

  const handleBack = () => {
    if (currentPage === "profile") {
      setCurrentPage("home");
    } else if (currentPage === "chat") {
      setCurrentPage("profile");
    } else if (currentPage === "checkout") {
      setCurrentPage("chat");
    } else if (currentPage === "completion") {
      setCurrentPage("checkout");
    }
  };

  return (
    <AppProvider>
      <div className="font-sans">
        {currentPage === "auth" && (
          <AuthPageFunctional onLogin={handleLogin} />
        )}
        
        {currentPage === "home" && (
          <HomePageFunctional 
            onProviderSelect={handleProviderSelect}
            onLogout={handleLogout}
          />
        )}
        
        {currentPage === "profile" && (
          <ProviderProfileFunctional 
            onBack={handleBack}
            onSchedule={handleSchedule}
            onMessage={handleMessage}
          />
        )}
        
        {currentPage === "chat" && (
          <ChatPageFunctional 
            onBack={handleBack}
            onProposalAccepted={handleProposalAccepted}
          />
        )}
        
        {currentPage === "checkout" && (
          <CheckoutPageFunctional 
            onBack={handleBack}
            onPaymentConfirmed={handlePaymentConfirmed}
          />
        )}
        
        {currentPage === "completion" && (
          <ServiceCompletionPage 
            onBack={handleBack}
            onComplete={handleServiceCompleted}
          />
        )}
        
        {currentPage === "success" && (
          <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
            <div className="max-w-md w-full">
              <div className="bg-white rounded-lg shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl mb-4">Serviço Finalizado!</h2>
                <p className="text-muted-foreground mb-6">
                  Pagamento liberado ao profissional e avaliação registrada com sucesso.
                  Obrigado por usar o ServiçoPRO!
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={handleBackToHome}
                    className="w-full bg-[#EA580C] hover:bg-[#EA580C]/90 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Buscar Novos Serviços
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg transition-colors"
                  >
                    Sair
                  </button>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    💡 Dica: Você pode acessar seu histórico de serviços a qualquer momento
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <SchedulingModal 
          isOpen={isSchedulingOpen}
          onClose={() => setIsSchedulingOpen(false)}
          onConfirm={handleScheduleConfirm}
        />
        
        <Toaster />
      </div>
    </AppProvider>
  );
}
