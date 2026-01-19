import { useState } from "react";
import { HomePage } from "@/app/components/home-page";
import { ProviderProfilePage } from "@/app/components/provider-profile";
import { SchedulingModal } from "@/app/components/scheduling-modal";
import { ChatPage } from "@/app/components/chat-page";
import { CheckoutPage } from "@/app/components/checkout-page";
import { AuthPage } from "@/app/components/auth-page";

type Page = "auth" | "home" | "profile" | "chat" | "checkout";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("auth");
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  const handleLogin = () => {
    setCurrentPage("home");
  };

  const handleProviderSelect = () => {
    setCurrentPage("profile");
  };

  const handleSchedule = () => {
    setIsSchedulingOpen(true);
  };

  const handleScheduleConfirm = () => {
    setIsSchedulingOpen(false);
    setCurrentPage("checkout");
  };

  const handleMessage = () => {
    setCurrentPage("chat");
  };

  const handleBack = () => {
    if (currentPage === "profile") {
      setCurrentPage("home");
    } else if (currentPage === "chat") {
      setCurrentPage("profile");
    } else if (currentPage === "checkout") {
      setCurrentPage("profile");
    }
  };

  return (
    <div className="font-sans">
      {currentPage === "auth" && (
        <AuthPage onLogin={handleLogin} />
      )}
      
      {currentPage === "home" && (
        <HomePage onProviderSelect={handleProviderSelect} />
      )}
      
      {currentPage === "profile" && (
        <ProviderProfilePage 
          onBack={handleBack}
          onSchedule={handleSchedule}
          onMessage={handleMessage}
        />
      )}
      
      {currentPage === "chat" && (
        <ChatPage onBack={handleBack} />
      )}
      
      {currentPage === "checkout" && (
        <CheckoutPage onBack={handleBack} />
      )}
      
      <SchedulingModal 
        isOpen={isSchedulingOpen}
        onClose={() => setIsSchedulingOpen(false)}
        onConfirm={handleScheduleConfirm}
      />
    </div>
  );
}
