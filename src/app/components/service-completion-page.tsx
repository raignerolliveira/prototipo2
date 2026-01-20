import { useState } from "react";
import { 
  ArrowLeft,
  CheckCircle,
  Star,
  Shield,
  AlertCircle
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Textarea } from "@/app/components/ui/textarea";
import { Separator } from "@/app/components/ui/separator";
import { useApp } from "@/app/context/app-context";
import { toast } from "sonner";

export function ServiceCompletionPage({ 
  onBack,
  onComplete 
}: { 
  onBack: () => void;
  onComplete: () => void;
}) {
  const { selectedProvider, currentPayment, proposals } = useApp();
  const activeProposal = proposals.find(p => p.status === "accepted");

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [serviceCompleted, setServiceCompleted] = useState(false);

  if (!selectedProvider || !currentPayment || !activeProposal) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p>Informações do serviço não encontradas</p>
      </div>
    );
  }

  const handleConfirmCompletion = () => {
    if (!serviceCompleted) {
      toast.error("Marque a confirmação de que o serviço foi concluído");
      return;
    }

    if (rating === 0) {
      toast.error("Por favor, avalie o profissional");
      return;
    }

    if (!comment.trim()) {
      toast.error("Por favor, deixe um comentário sobre o serviço");
      return;
    }

    toast.success("Pagamento liberado ao profissional!");
    toast.success("Avaliação registrada com sucesso!");
    
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const handleReportProblem = () => {
    toast.info("Suporte contatado. Nosso time irá analisar o caso.");
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
            <h1 className="text-xl">Finalização do Serviço</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Payment Status Card */}
        <Card className="p-6 mb-6 bg-yellow-50 border-yellow-200">
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-base mb-2 flex items-center gap-2">
                <Badge className="bg-yellow-600 text-white">
                  Pagamento em Escrow
                </Badge>
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                O valor de <strong>R$ {currentPayment.amount}</strong> está retido em segurança 
                até você confirmar a conclusão do serviço.
              </p>
              <p className="text-xs text-yellow-700">
                ⏱️ Aguardando confirmação de conclusão
              </p>
            </div>
          </div>
        </Card>

        {/* Service Details */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg mb-4">Detalhes do Serviço</h3>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <img 
                src={selectedProvider.image}
                alt={selectedProvider.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="text-base">{selectedProvider.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedProvider.specialty}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{selectedProvider.rating}</span>
                  {selectedProvider.verified && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Verificado
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Serviço</p>
                <p className="text-sm">{activeProposal.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Valor</p>
                <p className="text-sm text-primary">R$ {currentPayment.amount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Prazo Acordado</p>
                <p className="text-sm">{activeProposal.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Forma de Pagamento</p>
                <p className="text-sm capitalize">
                  {currentPayment.method === "credit-card" ? "Cartão de Crédito" : currentPayment.method.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Completion Confirmation */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg mb-4">Confirmação de Conclusão</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <input 
                type="checkbox"
                id="service-completed"
                className="mt-1"
                checked={serviceCompleted}
                onChange={(e) => setServiceCompleted(e.target.checked)}
              />
              <label htmlFor="service-completed" className="text-sm cursor-pointer">
                <strong>Confirmo que o serviço foi concluído conforme acordado</strong>
                <p className="text-muted-foreground mt-1">
                  Ao marcar esta opção, você autoriza a liberação do pagamento para o profissional.
                </p>
              </label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>
                  Importante: Só confirme após verificar que todo o trabalho foi realizado 
                  corretamente e está de acordo com o combinado.
                </span>
              </p>
            </div>
          </div>
        </Card>

        {/* Rating */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg mb-4">Avalie o Profissional</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Como foi sua experiência com {selectedProvider.name}?
              </p>
              
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              
              {rating > 0 && (
                <p className="text-sm text-muted-foreground">
                  {rating === 5 && "⭐ Excelente!"}
                  {rating === 4 && "😊 Muito Bom!"}
                  {rating === 3 && "👍 Bom"}
                  {rating === 2 && "😐 Regular"}
                  {rating === 1 && "😞 Precisa Melhorar"}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm mb-2 block">
                Comentário sobre o serviço *
              </label>
              <Textarea
                placeholder="Conte como foi sua experiência. Isso ajuda outros clientes e o profissional a melhorar..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Mínimo de 20 caracteres
              </p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            size="lg"
            variant="outline"
            className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
            onClick={handleReportProblem}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            Reportar Problema
          </Button>
          
          <Button
            size="lg"
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={handleConfirmCompletion}
            disabled={!serviceCompleted}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirmar e Liberar Pagamento
          </Button>
        </div>

        {/* Info Box */}
        <Card className="p-4 mt-6 bg-gray-50">
          <p className="text-xs text-center text-muted-foreground">
            💡 Após confirmar, o pagamento será liberado ao profissional em até 24 horas úteis
          </p>
        </Card>
      </div>
    </div>
  );
}
