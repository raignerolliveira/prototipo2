import { useState } from "react";
import { 
  ArrowLeft,
  Shield,
  CreditCard,
  Lock,
  Clock
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { useApp } from "@/app/context/app-context";
import { Payment } from "@/app/types";
import { toast } from "sonner";

export function CheckoutPageFunctional({ 
  onBack,
  onPaymentConfirmed 
}: { 
  onBack: () => void;
  onPaymentConfirmed: () => void;
}) {
  const { selectedProvider, proposals, setCurrentPayment } = useApp();
  const activeProposal = proposals.find(p => p.status === "accepted");

  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "pix" | "boleto">("credit-card");
  const [installments, setInstallments] = useState("1x");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  if (!selectedProvider || !activeProposal) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p>Nenhuma proposta ativa encontrada</p>
      </div>
    );
  }

  const handleConfirmPayment = () => {
    if (paymentMethod === "credit-card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
        toast.error("Preencha todos os dados do cartão");
        return;
      }
    }

    const payment: Payment = {
      proposalId: activeProposal.id,
      amount: activeProposal.value,
      method: paymentMethod,
      installments: parseInt(installments),
      status: "held",
      cardData: paymentMethod === "credit-card" ? {
        number: cardNumber,
        name: cardName,
        expiry: cardExpiry,
        cvv: cardCVV
      } : undefined
    };

    setCurrentPayment(payment);
    toast.success("Pagamento confirmado! Seu dinheiro está em escrow.");
    
    setTimeout(() => {
      onPaymentConfirmed();
    }, 1500);
  };

  const totalValue = parseFloat(activeProposal.value.replace('.', '').replace(',', '.'));
  const installmentOptions = [
    { value: "1x", label: "1x sem juros", amount: totalValue },
    { value: "2x", label: "2x sem juros", amount: totalValue / 2 },
    { value: "3x", label: "3x sem juros", amount: totalValue / 3 }
  ];

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
            <h1 className="text-xl">Checkout Seguro</h1>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Escrow Alert */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base mb-2 flex items-center gap-2">
                    Pagamento Seguro (Escrow)
                    <Badge className="bg-primary text-primary-foreground">Protegido</Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Seu dinheiro fica retido em segurança até a conclusão do serviço. 
                    O profissional só recebe após você confirmar que o trabalho foi concluído 
                    com qualidade. Você está 100% protegido!
                  </p>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h3 className="text-lg mb-4">Forma de Pagamento</h3>
              
              <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <div className="space-y-3">
                  <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === "credit-card" ? "border-primary bg-primary/5" : "hover:bg-gray-50"
                  }`}>
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <span>Cartão de Crédito</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === "pix" ? "border-primary bg-primary/5" : "hover:bg-gray-50"
                  }`}>
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">🔷</span>
                        <span>PIX - Aprovação instantânea</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === "boleto" ? "border-primary bg-primary/5" : "hover:bg-gray-50"
                  }`}>
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">📄</span>
                        <span>Boleto Bancário</span>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </Card>

            {/* Card Details */}
            {paymentMethod === "credit-card" && (
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Dados do Cartão
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-number">Número do Cartão</Label>
                    <Input 
                      id="card-number"
                      placeholder="0000 0000 0000 0000"
                      className="mt-1"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="card-name">Nome no Cartão</Label>
                    <Input 
                      id="card-name"
                      placeholder="Como está no cartão"
                      className="mt-1"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Validade</Label>
                      <Input 
                        id="expiry"
                        placeholder="MM/AA"
                        className="mt-1"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input 
                        id="cvv"
                        placeholder="000"
                        type="password"
                        maxLength={3}
                        className="mt-1"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {paymentMethod === "pix" && (
              <Card className="p-6 text-center">
                <div className="space-y-4">
                  <div className="w-48 h-48 mx-auto bg-gray-200 rounded flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">QR Code PIX</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Escaneie o QR Code acima com o app do seu banco
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    Copiar Código PIX
                  </Button>
                </div>
              </Card>
            )}

            {paymentMethod === "boleto" && (
              <Card className="p-6 text-center">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    O boleto será gerado após a confirmação
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Prazo de pagamento: 3 dias úteis
                  </p>
                </div>
              </Card>
            )}

            {/* Installments */}
            {paymentMethod === "credit-card" && (
              <Card className="p-6">
                <h3 className="text-lg mb-4">Parcelamento</h3>
                
                <RadioGroup value={installments} onValueChange={setInstallments}>
                  <div className="space-y-2">
                    {installmentOptions.map((option) => (
                      <div 
                        key={option.value}
                        className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          installments === option.value ? "border-primary bg-primary/5" : "hover:bg-gray-50"
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>{option.label}</span>
                            <span>R$ {option.amount.toFixed(2).replace('.', ',')}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="text-lg mb-4">Resumo do Pedido</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <img 
                    src={selectedProvider.image}
                    alt={selectedProvider.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm">{selectedProvider.name}</h4>
                    <p className="text-xs text-muted-foreground">{selectedProvider.specialty}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Serviço</p>
                  <p className="text-sm">{activeProposal.serviceType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prazo</p>
                  <p className="text-sm">{activeProposal.deadline}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valor do Serviço</span>
                    <span>R$ {activeProposal.value}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de Plataforma</span>
                    <span>R$ 0,00</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-base">Total</span>
                  <span className="text-2xl text-primary">R$ {activeProposal.value}</span>
                </div>
                
                <Button 
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={handleConfirmPayment}
                >
                  Confirmar Pagamento
                </Button>
                
                <div className="pt-4 border-t">
                  <h4 className="text-sm mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Como funciona o Escrow?
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0">
                        1
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Você paga e o valor fica retido em segurança
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0">
                        2
                      </div>
                      <p className="text-xs text-muted-foreground">
                        O profissional realiza o serviço
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0">
                        3
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Você confirma a conclusão e liberamos o pagamento
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary/5 p-3 rounded-lg">
                  <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Seu pagamento está protegido
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
