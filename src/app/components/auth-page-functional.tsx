import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Checkbox } from "@/app/components/ui/checkbox";
import { UserCircle, Briefcase } from "lucide-react";
import { useApp } from "@/app/context/app-context";
import { toast } from "sonner";

export function AuthPageFunctional({ onLogin }: { onLogin: () => void }) {
  const { setCurrentUser } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"client" | "professional">("client");
  
  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regSpecialty, setRegSpecialty] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error("Preencha todos os campos");
      return;
    }

    // Mock login - aceita qualquer email/senha
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: loginEmail.split('@')[0],
      email: loginEmail,
      phone: "(11) 99999-9999",
      type: userType,
      avatar: userType === "client" 
        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    };

    setCurrentUser(user);
    toast.success(`Bem-vindo, ${user.name}!`);
    onLogin();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!regName || !regEmail || !regPhone || !regPassword || !regConfirm) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (userType === "professional" && !regSpecialty) {
      toast.error("Profissionais devem informar sua especialidade");
      return;
    }

    if (regPassword !== regConfirm) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (regPassword.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres");
      return;
    }

    if (!acceptedTerms) {
      toast.error("Você deve aceitar os termos de uso");
      return;
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: regName,
      email: regEmail,
      phone: regPhone,
      type: userType,
      specialty: regSpecialty,
      avatar: userType === "client" 
        ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    };

    setCurrentUser(user);
    toast.success(`Conta criada com sucesso! Bem-vindo, ${user.name}!`);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl text-primary mb-2">ServiçoPRO</h1>
              <p className="text-xl text-muted-foreground">
                Conectamos você aos melhores profissionais de serviços residenciais
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base mb-1">Profissionais Verificados</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos os prestadores passam por rigorosa verificação
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base mb-1">Pagamento Seguro</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistema Escrow protege seu dinheiro até a conclusão
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base mb-1">Avaliações Reais</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistema transparente de avaliações de clientes
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <img 
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600"
                alt="Profissional trabalhando"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl mb-2">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLogin 
                ? 'Entre com suas credenciais para acessar sua conta' 
                : 'Preencha os dados abaixo para começar'
              }
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setUserType("client")}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${userType === "client" 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <UserCircle className={`w-8 h-8 mx-auto mb-2 ${userType === "client" ? 'text-primary' : 'text-gray-400'}`} />
              <p className="text-sm">Sou Cliente</p>
            </button>
            
            <button
              onClick={() => setUserType("professional")}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${userType === "professional" 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <Briefcase className={`w-8 h-8 mx-auto mb-2 ${userType === "professional" ? 'text-primary' : 'text-gray-400'}`} />
              <p className="text-sm">Sou Profissional</p>
            </button>
          </div>

          <Tabs value={isLogin ? "login" : "register"} onValueChange={(v) => setIsLogin(v === "login")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="mt-1"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm cursor-pointer"
                    >
                      Lembrar de mim
                    </label>
                  </div>
                  
                  <a href="#" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Entrar
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  💡 Use qualquer e-mail e senha para testar
                </p>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                  <Label htmlFor="reg-name">Nome Completo *</Label>
                  <Input 
                    id="reg-name"
                    placeholder="Seu nome"
                    className="mt-1"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="reg-email">E-mail *</Label>
                  <Input 
                    id="reg-email"
                    type="email"
                    placeholder="seu@email.com"
                    className="mt-1"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="reg-phone">Telefone *</Label>
                  <Input 
                    id="reg-phone"
                    placeholder="(00) 00000-0000"
                    className="mt-1"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                </div>
                
                {userType === "professional" && (
                  <div>
                    <Label htmlFor="specialty">Especialidade *</Label>
                    <Input 
                      id="specialty"
                      placeholder="Ex: Pedreiro, Eletricista..."
                      className="mt-1"
                      value={regSpecialty}
                      onChange={(e) => setRegSpecialty(e.target.value)}
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="reg-password">Senha *</Label>
                  <Input 
                    id="reg-password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className="mt-1"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="reg-confirm">Confirmar Senha *</Label>
                  <Input 
                    id="reg-confirm"
                    type="password"
                    placeholder="Digite a senha novamente"
                    className="mt-1"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    className="mt-1" 
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    Aceito os termos de uso e política de privacidade
                  </label>
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Criar Conta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
